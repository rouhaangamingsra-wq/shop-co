import { firebaseEnabled, db } from '../config/firebase.js';
import { mockStore } from '../utils/mockStore.js';
import ApiError from '../utils/ApiError.js';

const COLLECTION = 'categories';

function fromDoc(doc) {
  return { id: doc.id, ...doc.data() };
}

export async function listCategories() {
  if (firebaseEnabled) {
    const snap = await db.collection(COLLECTION).get();
    return snap.docs.map(fromDoc);
  }
  return Array.from(mockStore.categories?.values() || []);
}

export async function getCategory(id) {
  if (firebaseEnabled) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) throw new ApiError(404, 'Category not found');
    return fromDoc(doc);
  }
  const cat = mockStore.categories?.get(id);
  if (!cat) throw new ApiError(404, 'Category not found');
  return cat;
}

export async function createCategory(data) {
  const ts = new Date().toISOString();
  const payload = {
    name: data.name,
    slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, '-'),
    image: data.image || '',
    createdAt: ts,
    updatedAt: ts,
  };

  if (firebaseEnabled) {
    const ref = db.collection(COLLECTION).doc(payload.slug);
    await ref.set(payload);
    return { id: ref.id, ...payload };
  }
  const id = payload.slug;
  mockStore.categories.set(id, { id, ...payload });
  return { id, ...payload };
}

export async function updateCategory(id, data) {
  if (firebaseEnabled) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new ApiError(404, 'Category not found');
    const update = { ...data, updatedAt: new Date().toISOString() };
    await ref.update(update);
    return { id, ...doc.data(), ...update };
  }
  const cat = mockStore.categories?.get(id);
  if (!cat) throw new ApiError(404, 'Category not found');
  const updated = { ...cat, ...data, updatedAt: new Date().toISOString() };
  mockStore.categories.set(id, updated);
  return updated;
}

export async function deleteCategory(id) {
  if (firebaseEnabled) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new ApiError(404, 'Category not found');
    await ref.delete();
    return { id };
  }
  if (!mockStore.categories?.has(id)) throw new ApiError(404, 'Category not found');
  mockStore.categories.delete(id);
  return { id };
}

export default { listCategories, getCategory, createCategory, updateCategory, deleteCategory };
