# Prisma Blog Client (`prisma-blog-client`)

The official premium frontend client driving a modern, interactive content and analytics platform. Engineered on **Next.js 15 (App Router)** and built with **TypeScript**, this interface delivers instant page rendering using hybrid Server-Client state pipelines. It features state-of-the-art slot parallel layouts, real-time activity metrics capturing, and fluid theme state shifts styled with **Tailwind CSS** and **Shadcn UI**.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## 🌐 Live Demo

* **Live Interface Client Link:** [https://blog-post-khaki.vercel.app](https://blog-post-khaki.vercel.app)
* **Corresponding Data Core Server:** [https://prisma-blog-server-a55e.onrender.com](https://prisma-blog-server-a55e.onrender.com)

> This is the **frontend only**. It requires the corresponding backend server to be running. You can find the backend repository here
> **[prisma-blog-server](https://github.com/Sani-Mohibur/prisma-blog-server)**

---

## 🚀 Core Client Architecture Features

* **Parallel Route Workspace Gating (`@admin` & `@user`):** Leverages Next.js slot architecture within `(dashboardLayout)` to mount contextual dashboards cleanly, eliminating layout flashes by matching access vectors straight from `auth-client.ts`.
* **Hybrid Server Actions Performance:** Routes critical mutating flows—like `blog.action.ts` and `comment.action.ts`—through optimized, low-overhead Next.js Server Actions to ensure direct server communications.
* **Granular Skeleton Layout Hydration:** Minimizes perceived latency via responsive dark/light mode card layout skeletons in dynamic view blocks, including the active homepage sections.
* **Live Reading Analytics (`ReadTimeTracker`):** Tracks reading interaction blocks on single article views, sending metric captures back to the backend platform via automated server background pipelines.
* **Unified UI Blueprint:** Interfaces beautiful, accessible control panels utilizing native Shadcn accessibility foundations (`sonner`, `dialog`, `accordion`, `sidebar`).

---

## 📂 Project Component Directory

```text
prisma-blog-client/
├── src/
│   ├── actions/                   # Next.js Server Actions pipelines
│   ├── app/                       # App Router file-system nodes
│   │   ├── (commonLayout)/        # Public viewport architecture
│   │   │   ├── blogs/[id]/        # Article reads + nested thread nodes
│   │   │   └── login/             # Identity entrance point
│   │   └── (dashboardLayout)/     # Authenticated administrative slots
│   │       ├── @admin/            # Management workspace
│   │       └── @user/             # Creator workspace
│   ├── components/
│   │   ├── layout/                # Global layout elements (Navbar, Sidebar)
│   │   ├── modules/               # Domain-specific module elements
│   │   └── ui/                    # Atomic design primitive elements (Shadcn)
│   ├── lib/                       # Better Auth clients and configuration hooks
│   ├── services/                  # Network API processing blueprints
│   └── types/                     # Core system structural types

```

---

## 🛠️ Core Technology Stack

* **Application Framework:** Next.js 15 (App Router, Server Actions)
* **Language Runtime:** TypeScript
* **Styling & Primitives:** Tailwind CSS, Shadcn UI, Radix Primitives
* **Authentication SDK:** Better Auth Web Client Client-Side Hook Strategy
* **Icon Framework:** Lucide React

---

## ⚙️ Environment Configuration

Rename `.env.example` to `.env`:

```bash
cp .env.example .env
```

---

## 🚦 Installation & Local Deployment Setup

Follow these core execution commands to boot up the web service:

### 1. Initialize Node Package Dependencies

```bash
npm install

```

### 2. Verify Client-Side Types Hydration

Compile routing declarations and standard component type validations:

```bash
npm run build

```

### 3. Launch the Local Development Cluster

Spin up the local Next.js client engine pipeline:

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your choice browser software to see the dynamic blog engine interface.

---

## 🔒 Session Router Guard Reference

* **Public Core Viewports `(commonLayout)`:** Fully search-engine indexable static routes containing article grids, markdown blogs parsing, and open legal layout structures (`/privacy`, `/terms`).
* **Protected Creators Slot Workspace (`(dashboardLayout)/@user`):** Mounts a dedicated interface enabling users to create and edit articles, review performance logs, and inspect creation histories.
* **Administrative Operations Control Slot (`(dashboardLayout)/@admin`):** Grants platform administrators deep analytical overview metrics, comment moderation states, and systemic access settings.
