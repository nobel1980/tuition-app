# 🚀 Ibrahim Tuition Platform

Ibrahim Tuition is a high-performance, responsive web platform built using **Next.js (App Router)** and **TypeScript**. It includes a modern public-facing website optimized for SEO and responsiveness, paired with a secure, multi-role portal (Admin, Teacher, Student) that operates serverless using a custom client-side database layer.

The application compiles into a **100% Static Export** (`output: 'export'`), enabling sub-second load times, excellent security, and zero-cost hosting deployment on standard shared hosting environments (Apache/cPanel).

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** Next.js 16 (Turbopack enabled) & React 19
* **Styling & Icons:** Tailwind CSS, Lucide React icons, and Framer Motion (micro-animations)
* **Programming Language:** TypeScript
* **State & Data Persistence:** Local-storage backed mock relational database (`clientDb.ts`)
* **DevOps & Pipeline:** GitHub Actions for continuous build and automated FTPS sync
* **Server Fallback:** Custom Apache `.htaccess` rewrite configurations for client-side routing fallback

---

## ✨ Features

### 1. Public Marketing Website
* **Fully Responsive:** Sleek mobile-first design utilizing Tailwind grid and flex layouts.
* **SEO Optimized:** Structured JSON-LD metadata for local tutoring businesses, dynamic OpenGraph/Twitter social cards, and search crawler validation.
* **Dynamic Course Routes:** Dynamic pages pre-rendered at build time utilizing Next.js `generateStaticParams`.
* **Automated SEO Helpers:** Configured static exports for dynamic `/sitemap.xml` and `/robots.txt` paths.

### 2. Multi-Role Client Dashboard Portal
Includes three distinct dashboards based on authentication roles:
* **Admin Dashboard:** Full user and dashboard roster management, create/delete accounts, manage fee status.
* **Teacher Dashboard:** Attendance recording, schedule overview, student performance logs.
* **Student Dashboard:** Schedule schedules, curriculum outline, homework checks, and monthly fee logs.

### 3. Serverless Local Mock Database Engine
* **Engineered `clientDb.ts`:** Mirrored relational database structure entirely in browser `localStorage`.
* **Dynamic Header Routing:** Replaces "Login" with a "Portal" button linking to the user's dashboard once active session is stored.

---

## ⚙️ Getting Started & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test Static Export
Compiles the static site inside the `./out/` directory:
```bash
npm run build
```

---

## 🚀 CI/CD & Deployment Strategy

This project features fully automated deployments triggered by pushes to the `main` branch.

### GitHub Actions Pipeline (`.github/workflows/deploy.yml`)
1. **Checkout & Setup:** Checks out code, configures Node.js, and installs dependencies.
2. **Build:** Executes `npm run build` to output the static site to the `./out/` folder.
3. **Inject Routing:** Generates a custom `.htaccess` file inside `./out/` to handle Apache URL rewriting:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```
4. **Deploy:** Syncs the static files securely to the web server's document root via FTPS.

### Required GitHub Secrets
To run the action, configure the following secrets in GitHub Repository Settings:
* `FTP_SERVER`: The IP address or FTP hostname of the target host.
* `FTP_USERNAME`: The FTP account username.
* `FTP_PASSWORD`: The FTP account password.

---

## 🔑 Demo Portal Credentials

You can test the portal dashboards using these credentials (password for all is `password123`):

| Role | Username (Email) | Purpose |
| :--- | :--- | :--- |
| **Admin** | `admin@ibrahimtuition.co.uk` | User registration, CRUD operations, Fee management |
| **Teacher** | `sarah.teacher@example.com` | Attendance logs, student notes |
| **Student** | `john.student@example.com` | Homework tracking, schedules, fees |
