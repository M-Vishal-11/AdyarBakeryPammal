# 🥖 Adyar Bakery Pammal 🍰

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment-02042B?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![Pusher Realtime](https://img.shields.io/badge/Pusher-Realtime-300D4F?style=for-the-badge&logo=pusher)](https://pusher.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-EA4AAA?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A **production-ready, full-stack, real-time on-demand bakery delivery platform** built with **Next.js 15 (App Router)** and **TypeScript**. Designed for a local business to digitalize operations, manage dynamic inventory, automate payment collections, and provide real-time order dispatch updates.

---

## 🚀 Key Highlights & Resume Value

*   **Production Architecture**: Designed and built a complete dual-dashboard system (Admin & Kitchen Operator) linked to a fast, user-friendly customer storefront.
*   **Real-time Event Architecture**: Integrated WebSockets (Pusher) to broadcast incoming orders to the kitchen instantly, complete with browser notifications and audio alarms to minimize food preparation delay.
*   **Secure Payment Infrastructure**: Built seamless Razorpay checkout pipelines with robust, server-side cryptographic payment verification (`HMAC-SHA256`).
*   **Role-Based Security (RBAC)**: Leveraged Clerk Auth middleware to implement path-based route guarding for `customer`, `operator`, and `admin` portals.
*   **Performance Optimization**: 
    *   Reduced initial JS bundle sizes by implementing **React Dynamic Imports** (`next/dynamic`) for heavy interactive components (Confetti, React Icons).
    *   Implemented **Debounced Searching (300ms)** to prevent database request flooding on product lookups.
    *   Optimized database query latency through **Mongoose indexing** on high-frequency search fields (`productName`, `category`, `offer`).

---

## 🎨 System Workflows

```
  [ Customer Storefront ]               [ Razorpay Gateway ]
           │                                      │
     Places Order  ────────────────────────► Secures Payment
           │                                      │
     (Saves Order)                          Verifies Webhook
           │                                      │
           ▼                                      ▼
┌──────────────────────────────────────────────────────────┐
│                 MongoDB / Mongoose Database              │
└──────────────────────────────────────────────────────────┘
           │
     Pushes Event (WebSocket)
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│              Real-Time Operator Terminal                 │
│  - Play Sound Alarm                                      │
│  - Push Browser Notifications                            │
│  - Accept/Reject & Update Status (Preparing ➔ On Way)     │
└──────────────────────────────────────────────────────────┘
           │
      Status Updates
           │
           ▼
  [ Customer Track Page ] (Live Status Updates)
```

---

## ✨ Features

### 🛍️ Client & Storefront
*   **Visual Catalog**: Categorized products (Bread, Cakes, Sweets, etc.) loaded dynamically from MongoDB.
*   **Intelligent Search**: Fast search bar debounced by 300ms to reduce database load.
*   **Interactive Shopping Cart**: Client-side cookie-backed cart for persistence.
*   **Order Tracking**: Dedicated live-status page where users watch their order progress in real-time.
*   **Premium Thank You Flow**: Interactive, confetti-filled gratitude page with Framer Motion animations.

### 🍳 Real-Time Operator (Kitchen) Dashboard
*   **Live Pipeline**: Real-time incoming order cards populated instantly via WebSockets without page reload.
*   **Interactive Alarms**: Play sound notifications and push native browser notifications when new orders arrive.
*   **Pipeline Management**: Simple action buttons to transition order status: `Accept Order` ➔ `Mark as Preparing` ➔ `Dispatch (On the Way)` ➔ `Mark as Delivered`.
*   **Data Cleanup**: One-click action to archive delivered orders.

### ⚙️ Store Administration Panel
*   **Product Manager**: Create new products, upload images directly to Cloudinary, edit descriptions, adjust pricing, and toggle item availability instantly.
*   **Category Manager**: Define and spawn new menu categories.
*   **Store Operations Switch**: Toggle the store status between Open and Closed dynamically, disabling customer checkouts outside business hours.
*   **Delivery Logistics**: Adjust flat delivery charges dynamically across the platform.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15 (App Router)**, React 19, TypeScript | Server Component rendering for rapid load, App Router for clean layout structures, TypeScript for robust type-safety. |
| **Styling** | **Tailwind CSS v4.0** | Modern utility-first CSS engine with improved build times and clean variable-driven theme declarations. |
| **Realtime** | **Pusher** (WebSockets) | Instant order sync without database polling. |
| **Database** | **MongoDB / Mongoose** | Flexible JSON-document schema for dynamic product specifications and scalable order logs. |
| **Auth** | **Clerk** | Secure role-based authorization (RBAC) and profile management. |
| **Payments**| **Razorpay API** | Secure online transactional checkouts with custom HMAC verification. |
| **Media** | **Cloudinary** | Automatic optimization and CDN hosting for high-resolution product imagery. |
| **Animations**| **Framer Motion** | Micro-interactions, bounce effects, and page transition physics. |

---

## 🔑 Environment Variables Reference

Create a `.env.local` file in the root directory and configure the following parameters:

```env
# MongoDB Connection
MONGODB_URL=your_mongodb_connection_string

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Pusher WebSockets (Real-time Channels)
NEXT_PUBLIC_PUSHER_KEY=your_pusher_client_key
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_server_key
PUSHER_SECRET=your_pusher_server_secret
PUSHER_CLUSTER=your_pusher_cluster_name

# Razorpay Payment Settings
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_ID=your_razorpay_secret_key

# Cloudinary Media Storage (Admin Uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 💻 Getting Started Locally

### Prerequisite
*   Node.js (v18.x or later)
*   npm or pnpm

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/AdyarBakeryPammal.git
cd AdyarBakeryPammal
npm install
```

### 2. Run in Development Mode
Next.js 15 runs with the highly optimized Turbopack engine for ultra-fast hot reloading.
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) on your browser.

### 3. Create Production Build
Verify typescript and clean bundling.
```bash
npm run build
npm run start
```

---

## 🔒 Security & Role Management
This application enforces page-level and API-level authorization:
*   **Customer Pages** (`/cart`, `/shop`, `/account`) require standard authenticated user login.
*   **Operator Dashboard** (`/operator-dashboard`) requires Clerk user metadata `role` to be set to `operator` or `admin`.
*   **Admin Dashboard** (`/admin-dashboard`) requires Clerk user metadata `role` to be set to `admin`.
*   Unauthenticated or unauthorized access triggers a clean redirect to `/404`.
