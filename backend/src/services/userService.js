import { firebaseEnabled, db } from '../config/firebase.js';
import { mockStore } from '../utils/mockStore.js';
import ApiError from '../utils/ApiError.js';

const COLLECTION = 'users';

/**
 * List all users (admin only).
 * @returns {Promise<object[]>}
 */
export async function listUsers() {
  if (firebaseEnabled) {
    const snap = await db.collection(COLLECTION).get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  return Array.from(mockStore.users.values());
}

/**
 * Get a single user by id.
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getUser(id) {
  if (firebaseEnabled) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) throw new ApiError(404, 'User not found');
    return { id: doc.id, ...doc.data() };
  }
  const user = mockStore.users.get(id);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
}

/**
 * Find a user by their Firebase uid (used by auth/me).
 * @param {string} uid
 * @returns {Promise<object|null>}
 */
export async function findByUid(uid) {
  if (firebaseEnabled) {
    const snap = await db.collection(COLLECTION).where('uid', '==', uid).limit(1).get();
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  }
  for (const u of mockStore.users.values()) {
    if (u.uid === uid) return u;
  }
  return null;
}

/**
 * Create a new user record. Passwords are never stored — auth is handled by
 * Firebase (or mock tokens). `password` is accepted but ignored.
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function createUser(data) {
  const ts = new Date().toISOString();
  const payload = {
    uid: data.uid || null,
    name: data.name || '',
    email: data.email || '',
    role: data.role || 'user',
    createdAt: ts,
    updatedAt: ts,
  };

  if (firebaseEnabled) {
    const ref = await db.collection(COLLECTION).add(payload);
    return { id: ref.id, ...payload };
  }
  const id = mockStore.nextId('u');
  const user = { id, ...payload };
  mockStore.users.set(id, user);
  return user;
}

/**
 * Update a user.
 * @param {string} id
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function updateUser(id, data) {
  // Never persist a password field.
  const { password, ...safe } = data;

  if (firebaseEnabled) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new ApiError(404, 'User not found');
    const update = { ...safe, updatedAt: new Date().toISOString() };
    await ref.update(update);
    return { id, ...doc.data(), ...update };
  }
  const user = mockStore.users.get(id);
  if (!user) throw new ApiError(404, 'User not found');
  const updated = { ...user, ...safe, updatedAt: new Date().toISOString() };
  mockStore.users.set(id, updated);
  return updated;
}

/**
 * Delete a user.
 * @param {string} id
 * @returns {Promise<{id:string}>}
 */
export async function deleteUser(id) {
  if (firebaseEnabled) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new ApiError(404, 'User not found');
    await ref.delete();
    return { id };
  }
  if (!mockStore.users.has(id)) throw new ApiError(404, 'User not found');
  mockStore.users.delete(id);
  return { id };
}

export default { listUsers, getUser, findByUid, createUser, updateUser, deleteUser };
