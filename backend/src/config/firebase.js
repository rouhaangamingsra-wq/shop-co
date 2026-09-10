import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Firebase Admin SDK initialization with a safe "mock mode".
 *
 * Looks for credentials in this order:
 *   1. Environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)
 *   2. service-account.json in the project root
 *   3. Falls back to mock mode (no Firebase) for local dev
 */

function loadServiceAccount() {
  // 1. Try env vars first
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }

  // 2. Try service-account.json or any Firebase admin key in the project root
  const roots = [process.cwd(), path.join(__dirname, '..', '..')];
  const candidates = roots.flatMap((root) => {
    try {
      return fs
        .readdirSync(root)
        .filter((f) => f === 'service-account.json' || f.match(/-firebase-adminsdk-.*\.json$/))
        .map((f) => path.join(root, f));
    } catch {
      return [];
    }
  });

  for (const file of candidates) {
    try {
      const raw = fs.readFileSync(file, 'utf8');
      const json = JSON.parse(raw);
      return {
        projectId: json.project_id,
        clientEmail: json.client_email,
        privateKey: json.private_key,
      };
    } catch {
      // try next candidate
    }
  }

  return null;
}

const serviceAccount = loadServiceAccount();
export const firebaseEnabled = Boolean(serviceAccount);

let auth;
let db;

if (firebaseEnabled) {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  auth = admin.auth();
  db = admin.firestore();
} else {
  // ---- Mock auth: accepts any non-empty token -----------------------------
  auth = {
    async verifyIdToken(token) {
      if (!token) {
        const err = new Error('No token provided');
        err.code = 'auth/argument-error';
        throw err;
      }
      const isAdmin = token.startsWith('admin') || token === 'mock-admin-token';
      return {
        uid: token,
        email: isAdmin ? 'admin@shopco.com' : 'mock@user.com',
        role: isAdmin ? 'admin' : 'user',
      };
    },
  };

  // ---- Mock db: a tiny Firestore-like surface used by services ------------
  db = {
    _mock: true,
    collection() {
      return {
        get: async () => ({ docs: [], empty: true }),
      };
    },
  };
}

export { admin, auth, db };
export default { firebaseEnabled, admin, auth, db };
