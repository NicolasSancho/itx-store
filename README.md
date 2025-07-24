# ITX Store – Frontend Test

This is the consuming app for the ITX Frontend Test. It displays a product listing, product detail view, cart functionality, and uses a reusable Storybook component library via npm.

---

## 🧰 Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS** (via `tailwind-variants`)
- **React Router v6**
- **Vitest** for testing
- **Shared component Storybook library** via private npm package

---

## 📦 Install Dependencies

> ⚠️ Before running this, ensure your `.npmrc` file is configured with access to the shared Storybook library (see below).

```bash
npm install
```

---

## 🚀 Run Locally

```bash
npm run dev
```

The app will start at [http://localhost:5173](http://localhost:5173).

---

## 🔍 Features

- Responsive product grid
- Search bar with real-time filtering by title or brand
- Product detail page with:
  - Dynamic specifications
  - Color & storage selection
- Cart count with local caching
- Breadcrumb navigation
- Not Found (404) fallback page

---

## 🧪 Run Tests

```bash
npm run test
```

The project uses **Vitest** with global test environment enabled.

---

## 🧩 Consuming the Storybook Component Library

This app uses a private npm package to consume shared UI components that I built with:

- **Atomic Design**
- **Tailwind Variants**
- **TypeScript**
- **Storybook**

find more about it on: [Storybook-core](https://github.com/NicolasSancho/Storybook-core)
---

## 🔐 Setup Access to the Private Package

Create a `.npmrc` file in the root of the project with the following content (Token is temp and read only):

```ini
@NicolasSancho:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${YOUR_TOKEN}
```

This allows `npm install` to fetch the shared package without exposing write access.

---

## 🧠 Notes

- Product data is cached in `localStorage` for 1 hour.
- Cart behavior is handled fully on the frontend:
  - Due to a known backend bug, the API always returns `count = 1`
  - We increment and persist the cart count manually using `localStorage`
- The shared UI library was developed in a separate private repository.

---

## 📁 Project Structure

```
src/
├── api/              # API and caching logic
├── components/       # Layout components (Header, Breadcrumbs)
├── context/          # UIContext for cart state, selected product, etc.
├── hooks/            # Data fetching & cart interaction hooks
├── pages/            # Product list, details, and 404 views
├── utils/            # Formatters and cache helpers
└── _tests_/          # Unit tests for utilities
```

---

## ✅ Example `.n
## 💬 Questions?

If you need access to the component library repository or want to test publishing flows, feel free to reach out sanchonicolas@hotmail.com.
