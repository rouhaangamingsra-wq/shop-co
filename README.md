# SHOP.CO — Customer Frontend

React + Vite + Tailwind CSS customer storefront for the SHOP.CO e-commerce project.

## Features

- Figma-faithful SHOP.CO homepage
- Product listing, filters, sorting, search
- Product detail with color/size/quantity selection
- Cart with persistent localStorage
- Mock authentication that works without Firebase credentials
- Routes: Home, Shop, Category, Product, Cart, Checkout, Login, Signup, Account, Orders, Search, 404

## Getting started

1. Copy `.env.example` to `.env` and fill in your Firebase / backend values when ready.
2. Install dependencies:

```bash
npm install
npm run dev
```

The app runs on http://localhost:5173 by default.

## Environment variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_BASE_URL=http://localhost:5000/api
```

If these are empty, the app runs in **mock/dev mode** with sample products and a mock login.

## Build

```bash
npm run build
```
