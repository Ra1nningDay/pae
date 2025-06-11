# #Pae – Student Announcement Board

A modern, graphical web app for university students to post and view announcements. Built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma, and PostgreSQL.

---

## Project Overview

**#Pae** is a digital board for university students to:

- Post and view announcements
- Filter posts by hashtags
- Create posts with a unique, mind-map-like graphical UI
- Enjoy a simple, intuitive user experience

---

## Features

- **Welcome Page**: First-time users enter their name (stored in localStorage)
- **Homepage**: View all posts, search/filter by hashtags, create new posts
- **Graphical Post Creation**: Mind-map style modal for creating posts
- **Post Details**: Each post shows title, author, hashtags, content, and contact info
- **API**: RESTful endpoints for posts (GET, POST, search by tag)
- **Database**: PostgreSQL with Prisma ORM

---

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: PostgreSQL + Prisma ORM
- **Content Moderation**: Thai bad words filter
- **Development**: Docker + Docker Compose
- **Package Manager**: pnpm

---

## Setup & Installation

### Option 1: Docker Development (Recommended)

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd blogs-demo
   ```

2. **Copy environment variables**

   ```bash
   cp .env.example .env
   ```

3. **Start with Docker Compose**

   ```bash
   docker-compose up --build
   ```

   This will:

   - Start PostgreSQL database
   - Install dependencies
   - Run Prisma migrations
   - Start the Next.js development server

4. **Access the application**
   - Frontend: http://localhost:3000
   - Database: PostgreSQL on localhost:5432

### Option 2: Local Development

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
     ```bash
     npx prisma db push
     # or
     npm run db:push
     ```
   - Copy `.env.example` to `.env` and update:
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

## Usage

- Visit `/welcome` to enter your name (first time only)
- View and search posts on the homepage
- Click "Create New Post" to open the graphical post form
- Posts are stored in PostgreSQL and displayed in real-time

---

## Project Structure

```
blogs-demo/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Main layout with shared components
│   │   ├── page.tsx            # Homepage - main board
│   │   ├── welcome/
│   │   │   └── page.tsx        # Name entry screen
│   │   └── api/
│   │       ├── posts/
│   │       │   └── route.ts    # CRUD API for posts
│   │       └── moderate/
│   │           └── route.ts    # Content moderation API
│   ├── components/
│   │   ├── PostForm.tsx        # Graphical post creation form
│   │   └── PostCard.tsx        # Post display card
│   └── lib/
│       └── axios.ts            # API client configuration
├── prisma/
│   ├── schema.prisma           # Database schema (Post, Tag models)
│   └── migrations/             # Database migrations
├── docker-compose.yml          # Docker services configuration
├── Dockerfile.dev              # Development Docker image
├── .env.example               # Environment variables template
└── README.md                  # Project documentation
```

---

## Contributing

1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## Docker Development

The project includes Docker configuration for easy development setup:

### Quick Start with Docker

```bash
# Start all services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f app
```

### Docker Services

- **app**: Next.js application (port 3000)
- **postgres**: PostgreSQL database (port 5432)

### Useful Docker Commands

```bash
# Rebuild and start
docker-compose up --build

# Run Prisma commands in container
docker-compose exec app npx prisma migrate dev
docker-compose exec app npx prisma studio

# Access database directly
docker-compose exec postgres psql -U postgres -d pae_board

# Clean up volumes (reset database)
docker-compose down -v
```

---

## Development Tools

### Database Management

```bash
# Quick schema sync (development prototyping)
npx prisma db push
# or
npm run db:push

# Generate Prisma client
npx prisma generate
# or
npm run db:generate

# Create and run migrations (recommended for teams)
npx prisma migrate dev --name your_migration_name
# or
npm run db:migrate

# Reset database (development only)
npx prisma migrate reset
# or
npm run db:reset

# Open Prisma Studio (database GUI)
npx prisma studio
# or
npm run db:studio
```

### Code Quality

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Useful Debug Commands

```bash
# Check container status
docker-compose ps

# View all logs
docker-compose logs

# Check database connectivity
docker-compose exec postgres pg_isready -U postgres

# Access container shell
docker-compose exec app sh
```

---

## Available Scripts

### Docker Development

```bash
npm run docker:dev     # Start development environment with Docker
npm run docker:down    # Stop all Docker services
npm run docker:reset   # Reset database and restart containers
npm run docker:logs    # View application logs
```

### Database Management

```bash
npm run db:push        # Quick schema sync (prototyping)
npm run db:migrate     # Create and run migrations (recommended)
npm run db:generate    # Generate Prisma client
npm run db:studio      # Open Prisma Studio (database GUI)
npm run db:reset       # Reset database (development only)
```

### Standard Development

```bash
npm run dev           # Start local development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

**Quick Start Commands:**

- **First time setup**: `npm run docker:dev`
- **Daily development**: `npm run dev` (local) or `npm run docker:dev` (Docker)
- **Database changes**: `npm run db:push` (quick) or `npm run db:migrate` (proper)
- **View database**: `npm run db:studio`
