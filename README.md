# **LeaffyEarth**
🚀 **LeaffyEarth** is a modern **contact center platform** designed for seamless customer communication and efficient call management. This monorepo setup uses **PNPM Workspaces** and **Turborepo** for scalable development.

---

## **📌 Workspaces Overview**
This repository consists of three main workspaces:

### **📍 `apps/web` (Frontend)**
- **Technology:** Next.js 15 (App Router) + React 19 + TailwindCSS
- **Purpose:** The main user interface for managing the contact center
- **Location:** `apps/web`
- **How to Start:** `pnpm --filter web run dev`

---

### **📍 `packages/ui` (Internal UI Library)**
- **Technology:** React + TailwindCSS
- **Purpose:** Reusable UI components used across the contact center
- **Location:** `packages/ui`
- **How It's Used in `web`:**  
  ```tsx
  import { Button } from "@leaffyearth/ui";

  export default function HomePage() {
    return <Button text="Click Me" />;
  }


## **📍 `packages/ui` (Internal UI Library)**
- **Technology:** typescript
- **Purpose:** Common utility functions (formatting, API helpers, etc.)
- **Location:** `packages/utils`
- **How It's Used in `web`:**  
  ```tsx
  import { formatText } from "@leaffyearth/ui";

  

## **📌 Prerequisites**
Before running LeaffyEarth, ensure you have the following installed:

✅ **Node.js** (`>=18`) → [Download](https://nodejs.org/)  
✅ **PNPM** (`>=10.6.3`) → Install using:


## **📌 Setting Up the Project**
### 1️⃣ Install Dependencies
- At the root of the project, run:
  ```sh
  pnpm install
✅ This installs all dependencies and links the workspace packages.

### 2️⃣ Start the Next.js App
- To run the Next.js dashboard (apps/www), use:
  ```sh
  pnpm --filter web run dev
✅ This starts the app on http://localhost:3000.


## **📌 Adding a New Package to the Monorepo**
You can add a new package inside packages/ and link it to other workspaces.
### 📍 1️⃣ Create a New Package (packages/auth)
- Run:
  ```sh
  pnpm add axios -F web

## **📌 Troubleshooting**
### 📍 1️⃣ 1️Dependencies Not Found
If @leaffyearth/ui, @leaffyearth/utils, or @leaffyearth/auth are missing:
- Run:
  ```sh
  pnpm list --depth=1
If they are missing, reinstall dependencies:
- Run:
  ```sh
  rm -rf node_modules pnpm-lock.yaml
  pnpm install

## **📌 Monorepo Structure**

- ```bash
  LeaffyEarth/
    │── apps/
    │   ├── www/          # Next.js frontend (Contact Center UI)
    │── packages/
    │   ├── ui/           # Internal UI components
    │   ├── utils/        # Shared utility functions
    │   ├── auth/         # New authentication package
    │── pnpm-workspace.yaml  # Defines workspace packages
    │── turbo.json        # Turborepo configuration
    │── package.json      # Root package.json


  

  
---

### **🚀 Summary of Features in this README**
1. **Introduction to each workspace (`apps/web`, `packages/ui`, `packages/utils`).**
2. **Step-by-step setup instructions to run the project.**
3. **Instructions on how to add a new package (`@leaffyearth/auth`).**
4. **Debugging & troubleshooting steps for workspace issues.**

✅ **This README is now fully ready for developers!** 🚀  
Would you like to include **Docker setup** or **environment variable configuration**?



