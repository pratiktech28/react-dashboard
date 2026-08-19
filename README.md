# Nexus personal dashboard

## Structure

```text
app/                 App Router pages and secure route handlers
components/          reusable UI and client-side form components
lib/                 Prisma client, validation and utilities
prisma/              PostgreSQL schema and development seed
auth.ts              Auth.js providers and session callbacks
middleware.ts        redirect boundary for guest/private routes
```

## Database and auth design

`User` owns `UserSettings` and `UserActivity`; Auth.js uses `Account`, `Session`, and `VerificationToken` compatibility models. Credentials are bcrypt hashes only. Auth.js creates a signed, httpOnly JWT session cookie; Google OAuth is handled by the provider and linked through `Account`. Each profile mutation obtains `session.user.id` on the server—no user ID is accepted from the browser.

Middleware redirects unauthenticated visitors from private pages and API namespaces to `/login`; private layouts repeat the server-side check as defense in depth.

## Local setup

1. `Copy-Item .env.example .env`
2. Create a PostgreSQL database and set `DATABASE_URL`.
3. Generate a secret: `openssl rand -base64 32`, then set `AUTH_SECRET`.
4. `npm install`
5. `npx prisma generate`
6. `npx prisma migrate dev --name init`
7. `npm run prisma:seed`
8. `npm run dev`

Seed credentials: `demo@example.com` / `DemoPass1` (change or remove outside development).

## Google OAuth

Create a Google OAuth web client in Google Cloud Console. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI, then fill `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`.

## Production hardening

Set `AUTH_URL` to the HTTPS public URL, use managed PostgreSQL, and add Redis/Upstash rate limiting before `/api/signup`, credentials authorization, and password-reset endpoints. Auth.js CSRF safeguards apply to provider POSTs. Configure a transactional email provider plus expiring hashed reset tokens before enabling real reset delivery.
