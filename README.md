# StayScape

Airbnb-style stay booking practice app. Guests can search and reserve homes; hosts can publish and manage listings.

## Tech stack

| Layer              | Technology                                                                             |
| ------------------ | -------------------------------------------------------------------------------------- |
| Framework          | **Next.js 16** (App Router), **React 19**, **TypeScript**                              |
| Styling            | **Tailwind CSS 4**, **shadcn/ui**, **lucide-react**, **next-themes** (dark mode)       |
| Database           | **PostgreSQL** (Neon) via **Prisma 7** + Neon serverless adapter                       |
| Auth               | **NextAuth.js v4** — Credentials (bcrypt) + Google OAuth, Prisma Adapter, JWT sessions |
| Forms / validation | **react-hook-form**, **Zod**, Server Actions                                           |
| Dates              | **date-fns**, **react-day-picker**                                                     |
| Tooling            | **pnpm**, ESLint, Prettier, Husky, `tsx` (Prisma seed)                                 |

## Features

### Guest

- Browse listings from the database (filter by location, category, dates, guests)
- Listing detail: gallery, about, booked ranges, map label, booking sidebar
- Create reservations (overlap check, processing fee)
- View / cancel bookings at `/bookings`

### Host

- Host dashboard with listing stats
- Create listings (title, category, gallery, pricing, capacity, location)
- Edit / delete own listings at `/host` and `/host/listings/[id]/edit`

### Auth & shell

- Register / login (email + password)
- Sign in with Google
- Protected routes: `/host`, `/bookings`, `/account`
- Navbar, theme toggle (light / dark / system)

## App routes

| Route                             | Description                  |
| --------------------------------- | ---------------------------- |
| `/`                               | Home — search + listing grid |
| `/listings/[listingId]`           | Listing detail + book        |
| `/login`, `/register`             | Auth                         |
| `/host`                           | Host dashboard               |
| `/host/listings/[listingId]/edit` | Edit listing                 |
| `/bookings`                       | Guest reservations           |
| `/api/auth/[...nextauth]`         | NextAuth API                 |

## Project structure

```
app/                 # Routes (App Router)
actions/             # Server Actions (auth, listings, reservations)
auth/                # NextAuth config
components/          # UI by domain (home, host, listing, auth, …)
lib/                 # Prisma, auth helpers, listing/reservation queries
validations/         # Zod schemas
prisma/              # Schema, migrations, seed
providers/           # Session + theme providers
types/               # Shared types
```

## Getting started

### 1. Install

```bash
pnpm install
```

### 2. Environment

Create a `.env` file:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."          # optional; used by Prisma CLI if set
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 3. Database

```bash
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

Seed loads demo US listings into Postgres (via `prisma/seed.ts`).

### 4. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful scripts

```bash
pnpm typecheck
pnpm lint
pnpm format
pnpm build
```

## Notes / limitations (MVP)

- Image upload currently stores **data URLs** locally — swap for Cloudinary/S3 for production
- Listing ratings are **placeholder** (no Review model yet)
- No payments, favorites, messaging, or email verification
- Empty database → empty home until you seed or create listings as a host

## License

## Reference

- https://youtu.be/Nzx9JKgEdDw?si=bItns9GXopi8p7NF
