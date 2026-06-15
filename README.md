# J&K Cabinetry CT — Customer Frontend

Public website and authenticated customer portal for **J&K Cabinetry CT**, a wholesale cabinetry platform for dealers, contractors, showrooms, and other approved business partners. This application handles marketing pages, product browsing, registration, login, cart/checkout, and the customer dashboard (orders, profile, messaging, settings).

This repo is the **customer-facing Next.js frontend**. It works together with:

| Repository | Role |
|------------|------|
| `jk-cabinetryct-backend` | REST API, auth, orders, uploads, Socket.IO |
| `jk-cabinetryct-dashboard` | Admin / super-admin portal (separate React app) |

---

## Features

### Public website
- Home, About J&K, Our Cabinets, Services, Gallery, FAQ, Multi-Unit, Homeowner resources
- Cabinet catalog, collections, cabinet lines, stock parts, assembly instructions
- Quality pages (craftsmanship, sustainability, standard features, maintenance)
- Contact form, privacy policy, terms and conditions
- Wholesale registration with business document upload

### Authentication
- Login, forgot password, OTP verification, reset password
- JWT access + refresh tokens stored in cookies and `sessionStorage`
- Role guard: **admin** and **super_admin** accounts must use the admin portal, not this site
- New registrations start as **unverified** until an admin approves them in the dashboard

### Customer dashboard (`/dashboard/*`)
- Dashboard home with order stats
- Profile view/edit (contact, business info, documents)
- Orders list and order details
- Inbox / real-time messaging (Socket.IO)
- Account settings (password change, delete account)

### Commerce
- Shopping cart (Redux Persist)
- Payment & shipping checkout flow
- Restricted catalog/pricing for approved members only

---

## Technology stack

| Layer | Tools |
|-------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack in dev) |
| UI | React 19, Tailwind CSS 4, Radix UI, shadcn-style components |
| State | Redux Toolkit, RTK Query, Redux Persist (cart) |
| Forms | React Hook Form, Zod |
| Realtime | Socket.IO client |
| Auth storage | `js-cookie`, `sessionStorage` |
| Notifications | Sonner, react-hot-toast |

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** (or compatible package manager)
- Running **backend API** (`jk-cabinetryct-backend`, default port `9879`)
- MongoDB and S3 configured on the backend for full functionality

---

## Environment variables

Create a `.env` file in the project root (see `.env` example below). All public vars must be prefixed with `NEXT_PUBLIC_`.

| Variable | Description | Example (local) |
|----------|-------------|-----------------|
| `NODE_ENV` | `development` or `production` | `development` |
| `NEXT_PUBLIC_API_BASE_URL` | Backend REST API base URL | `http://localhost:9879/api/v1` |
| `NEXT_PUBLIC_SOCKET_URL` | Socket.IO server URL | `http://localhost:9879` |

**Local development**

```env
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:9879/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:9879
```

**Production**

```env
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.jkcabinetryct.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://api.jkcabinetryct.com
```

> Do not commit `.env` — it is listed in `.gitignore`.

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd jk-cabinetryct

# Install dependencies
npm install

# Copy and configure environment (create .env in project root)
# Use the example values in the Environment variables section below

# Start the backend first (separate repo)
# cd ../jk-cabinetryct-backend && npm run dev

# Start the frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build (TypeScript check + static generation) |
| `npm run start` | Run production server (after `build`) |
| `npm run lint` | Run ESLint |

---

## Project structure

```
jk-cabinetryct/
├── public/                 # Static assets (favicon, robots.txt, default avatar)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (main)/         # Public marketing & shop routes
│   │   ├── auth/           # Login, forgot password, OTP, reset password
│   │   └── dashboard/      # Protected customer dashboard
│   ├── components/
│   │   ├── auth/           # ProtectedRoute
│   │   ├── forms/          # Login, register, OTP, etc.
│   │   ├── layouts/        # MainLayout, DashboardLayout, AuthLayout
│   │   └── ui/             # Shared UI primitives
│   ├── context/            # SocketProvider
│   ├── hooks/              # useAuth, useLogout, useMessaging, …
│   ├── lib/                # Utils, Zod validation schemas
│   ├── store/
│   │   ├── api/            # RTK Query endpoints (auth, cart, orders, …)
│   │   ├── slices/         # cart, messaging
│   │   └── providers/      # ReduxProvider + PersistGate
│   ├── types/              # TypeScript interfaces
│   └── utils/              # auth, profile, socket, metadata helpers
├── next.config.ts          # Image domains (S3), standalone output
├── tailwind.config.js
└── tsconfig.json
```

---

## Main routes

### Public (`src/app/(main)/`)

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/about-jk` | About J&K |
| `/our-cabinets` | Product overview |
| `/catalog` | Catalog |
| `/collections`, `/collections/[slug]` | Collections |
| `/cabinet-lines`, `/cabinet-lines/[slug]` | Cabinet lines |
| `/stock-parts-details/[slug]` | Stock item details |
| `/cart` | Shopping cart |
| `/payment-shipping` | Checkout |
| `/registration` | Wholesale account registration |
| `/contact` | Contact form |
| `/gallery`, `/services`, `/faq`, `/homeowner`, `/multi-unit` | Content pages |
| `/quality/*` | Quality & care content |
| `/privacy-policy`, `/terms-and-conditions` | Legal |

### Auth (`src/app/auth/`)

| Path | Purpose |
|------|---------|
| `/auth/login` | Customer login |
| `/auth/forgot-password` | Request reset OTP |
| `/auth/verify-otp` | Verify OTP |
| `/auth/reset-password` | Set new password |

### Dashboard (`src/app/dashboard/`) — requires login

| Path | Purpose |
|------|---------|
| `/dashboard` | Dashboard home |
| `/dashboard/profile` | View profile |
| `/dashboard/profile/edit` | Edit profile & documents |
| `/dashboard/orders` | Order history |
| `/dashboard/orders/[orderNumber]` | Order details |
| `/dashboard/inbox` | Messages |
| `/dashboard/settings` | Password & account settings |

---

## Authentication flow

1. User submits login → `POST /auth/login` → receives `accessToken` and `refreshToken` in the JSON response.
2. Tokens are saved via `setAuthTokens()` (cookies + `sessionStorage`).
3. User profile is cached and fetched from `GET /user/get-my-profile`.
4. Protected dashboard routes use `ProtectedRoute` + `useAuth()`.
5. On **401**, RTK Query attempts refresh via `POST /auth/refresh-token`.
6. Logout clears tokens, resets API cache, disconnects socket, and redirects to `/auth/login`.

**Notes**
- Admin users see an error on this login page and must use `jk-cabinetryct-dashboard`.
- Unverified users cannot log in until approved in the admin dashboard.

---

## API integration

RTK Query base URL: `NEXT_PUBLIC_API_BASE_URL` (see `src/store/api/baseApi.ts`).

Main API modules:

- `authApi` — login, register, logout, OTP, password reset
- `profileApi` — profile CRUD, change password
- `orderApi` — orders
- `cartApi` — cart operations
- `collectionsApi`, `cabinetryApi`, `partsApi` — catalog
- `contactApi` — contact form
- `shippingApi` — shipping options

Images are loaded from AWS S3 (`jk-cabinetry.s3.us-east-1.amazonaws.com`), configured in `next.config.ts`.

---

## Real-time messaging

The app uses **Socket.IO** (`src/context/SocketContext.tsx`, `src/utils/socket.ts`) for inbox/chat. The socket connects with the JWT access token when the user is authenticated. Ensure `NEXT_PUBLIC_SOCKET_URL` points to the same backend host that runs the socket server.

---

## Production build & deployment

### Build locally or on server

```bash
npm install
npm run build
npm run start   # default port 3000
```

The project uses `output: "standalone"` in `next.config.ts` for efficient Node deployments.

### EC2 / VPS checklist

1. Install Node.js 18+ on the server.
2. Clone repo and set production `.env` with live API/socket URLs.
3. Start the **backend** API on the expected port (e.g. `9879`).
4. Run `npm run build` — fix any TypeScript errors before deploy.
5. Run with `npm run start`, or use a process manager (PM2) / reverse proxy (Nginx).
6. Point Nginx (or similar) to `localhost:3000` for your domain.
7. Ensure CORS and socket origins on the backend allow your frontend domain.

**Common build issue:** TypeScript errors in forms or API types — run `npm run build` locally before pushing to catch them early.

**Image note:** Turbopack may warn about unsupported `.avif` assets during build; this is a warning, not a build failure.

---

## Browser support

Configured via `browserslist` in `package.json` — modern evergreen browsers; IE11 and legacy Edge are excluded.

---

## Related documentation

- Backend setup and API: see `jk-cabinetryct-backend/readme.md`
- Admin panel: `jk-cabinetryct-dashboard` (user verification, orders, inventory)

---

## License

Private — J&K Cabinetry CT. All rights reserved.
