# #Pae – Student Announcement Board

A modern, graphical web app for university students to post and view announcements. Built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma, and PostgreSQL.

---

## 🚀 Project Overview

**#Pae** is a digital board for university students to:

- Post and view announcements
- Filter posts by hashtags
- Create posts with a unique, mind-map-like graphical UI
- Enjoy a simple, intuitive user experience

---

## ✨ Features

- **Welcome Page**: First-time users enter their name (stored in localStorage)
- **Homepage**: View all posts, search/filter by hashtags, create new posts
- **Graphical Post Creation**: Mind-map style modal for creating posts
- **Post Details**: Each post shows title, author, hashtags, content, and contact info
- **API**: RESTful endpoints for posts (GET, POST, search by tag)
- **Database**: PostgreSQL with Prisma ORM

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **ORM**: Prisma
- **Database**: PostgreSQL

---

## 📦 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd blogs-demo
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Configure your database**

   - Create a PostgreSQL database
   - Set your connection string in `.env`:
     ```env
     DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
     ```

4. **Run Prisma migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

---

## 🖥️ Usage

- Visit `/welcome` to enter your name (first time only)
- View and search posts on the homepage
- Click "Create New Post" to open the graphical post form
- Posts are stored in PostgreSQL and displayed in real-time

---

## 📁 Project Structure

- `src/app/welcome/page.tsx` – Name entry screen
- `src/app/ayout.tsx` – Shared layout and name validation
- `src/app/page.tsx` – Main board page
- `components/PostForm.tsx` – Graphical post creation form
- `components/PostCard.tsx` – Post display card
- `app/api/posts/route.ts` – API routes for posts
- `prisma/schema.prisma` – Database schema

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request
