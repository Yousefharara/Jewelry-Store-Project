# 💎 Jewelry Store Checkout App

A modern checkout form built with **Next.js**, **TailwindCSS**, **ShadCN**, and **Sonner** for notifications. Allows users to select jewelry materials, enter shipping info, and submit an order.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Yousefharara/Jewelry-Store-Project.git
cd Jewelry-Store-Project
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔁 Convert the Model (if you're using 3D)

Skip this section if not using 3D models with React Three Fiber.


If you're using `.glb` or `.gltf` files:

Install `@react-three/gltfjsx:`

```bash
npm install -g @react-three/gltfjsx
```

Convert your `model:`

```bash
gltfjsx ./public/model.glb
```
It will generate a React component you can import directly.


## 🎨 Customizing Materials

You can customize the metal and gem types inside the `ProductContext.tsx` file:

```bash
const metals = ["Gold", "Silver", "Platinum"];
const gems = ["Ruby", "Emerald", "Sapphire"];
```

## 📦 Tech Stack

✅ Next.js 14+

✅ Tailwind CSS

✅ Shadcn/UI

✅ Sonner (for modern toast notifications)

✅ Context API (for state management)

## 🔗 Live Demo
[Jewelry Store Project](https://jewelry-store-project.vercel.app/) 