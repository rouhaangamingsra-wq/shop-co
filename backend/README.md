# SHOP.CO Backend

A Node.js + Express REST API for the SHOP.CO e-commerce project. It supports
**two modes**:

- **Firebase mode** — uses Firebase Admin SDK + Firestore for auth and data.
- **Mock mode** — runs with **no credentials** using an in-memory data store
  seeded with sample products, users, orders and reviews. Perfect for local
  development and demos.

> If `FIREBASE_PROJECT_ID` is not set, the server automatically starts in
> **mock mode** and never crashes on missing credentials.

## Requirements

- Node.js v18+ (tested on Node 24)
- npm 9+

## Setup

```bash
npm install
cp .env.example .env   # then edit values as needed
npm run dev            # starts with node --watch (auto-reload)
```

For production:

```bash
npm start
```

The server listens on `PORT` (default `5000`).

## Environment Variables

| Variable               | Required | Description                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `PORT`                 | no       | Server port (default `5000`).                                               |
| `CORS_ORIGINS`         | no       | Comma-separated allowed origins (default `http://localhost:5173,5174`).     |
| `FIREBASE_PROJECT_ID`  | no\*     | Firebase project id. If absent → **mock mode**.                            |
| `FIREBASE_CLIENT_EMAIL`| no\*     | Firebase service-account client email.                                     |
| `FIREBASE_PRIVATE_KEY` | no\*     | Firebase private key (with `\n` escapes).                                  |
| `ADMIN_EMAIL`          | no       | Bootstrap admin email (used to seed admin in mock mode).                   |
| `ADMIN_PASSWORD`       | no       | Bootstrap admin password (reference only — never stored as plaintext).     |

\*Required only for Firebase mode.

## Firebase Admin Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and
   create/select a project.
2. **Project settings → Service accounts → Generate new private key** — this
   downloads a JSON file. **Do not commit this file.**
3. From that JSON, copy the values into your `.env`:
   - `FIREBASE_PROJECT_ID` → `project_id`
   - `FIREBASE_CLIENT_EMAIL` → `client_email`
   - `FIREBASE_PRIVATE_KEY` → `private_key` (keep the `\n` escape sequences)
4. Enable **Authentication** (Email/Password or any provider) and
   **Cloud Firestore** in the Firebase console.
5. Restart the server — the log will show `Firebase: ENABLED`.

## Mock Mode Auth

In mock mode, any non-empty Bearer token is accepted. Use a token starting with
`admin` (e.g. `admin-token` or `mock-admin-token`) to act as an admin and
access protected endpoints.

Example:

```bash
curl -H "Authorization: Bearer admin-token" http://localhost:5000/api/admin/stats
```

## API Reference

| Method | Endpoint                    | Auth     | Description                                  |
| ------ | --------------------------- | -------- | -------------------------------------------- |
| POST   | `/api/auth/verify`          | bearer   | Verify a token, return user info             |
| GET    | `/api/auth/me`              | required | Current user profile                         |
| GET    | `/api/products`             | public   | List (page, limit, category, dressStyle, minPrice, maxPrice, color, size, sort, search, featured, newArrival, topSelling) |
| GET    | `/api/products/:id`         | public   | Get one product                              |
| POST   | `/api/products`             | admin    | Create product                               |
| PUT    | `/api/products/:id`         | admin    | Update product                               |
| DELETE | `/api/products/:id`         | admin    | Delete product                               |
| GET    | `/api/users`                | admin    | List users                                   |
| GET    | `/api/users/:id`            | admin    | Get one user                                 |
| POST   | `/api/users`                | admin    | Create user                                  |
| PUT    | `/api/users/:id`            | admin    | Update user                                  |
| DELETE | `/api/users/:id`            | admin    | Delete user                                  |
| GET    | `/api/orders`               | required | List orders (admin: all, user: own)          |
| GET    | `/api/orders/:id`           | required | Get one order (owner or admin)               |
| POST   | `/api/orders`               | required | Create order                                 |
| PUT    | `/api/orders/:id/status`    | admin    | Update order status                          |
| GET    | `/api/reviews/:productId`   | public   | List reviews for a product                   |
| POST   | `/api/reviews`              | required | Create a review                              |
| GET    | `/api/admin/stats`          | admin    | Dashboard stats (revenue, orders, users, products, recent, sales-over-time) |
| GET    | `/api/health`               | public   | Health check                                 |

## Project Structure

```
ecommerce-backend/
  src/
    config/firebase.js        # Firebase Admin init + mock mode
    controllers/              # Route handlers (auth, product, user, order, review, admin)
    routes/                   # Express routers
    middleware/               # auth, validate, errorHandler
    services/                 # Business logic (Firestore or in-memory)
    utils/                    # ApiError, asyncHandler, mockStore
  server.js                   # App entrypoint
```

## Notes

- Passwords are **never** stored as plaintext — authentication is delegated to
  Firebase (or mock tokens). The `password` field is accepted by user endpoints
  but discarded.
- No service-account JSON files are committed (see `.gitignore`).
- All errors flow through a single central error handler for consistent
  responses.
