# CMS-app

A lightweight CMS-powered web application built with [Payload CMS](https://payloadcms.com) and [Root.js](https://github.com/michael-ciniawsky/root.js) for minimal client-side routing.

---

## 🛠 Tech Stack

- **Payload CMS** – Headless CMS (Node.js + Express + Next.js)
- **Root.js** – Lightweight client-side router
- **PostgreSQL** – Database
- **TypeScript** – Typed backend logic
- **Next.js** – Frontend and API routing

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone git@github.com:Indrajit1996/CMS-app.git
cd CMS-app/my-cms-app
npm install
```

Create an env file
```
DATABASE_URI={your-postgres-url}
PAYLOAD_SECRET={your-secret-key}
```

```
npm run dev
```