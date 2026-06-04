# KlingJWT

Serverless API that mints short-lived JWT tokens for the [Kling](https://klingai.com) API using your access key and secret.

## Endpoints

| Method | Path | Response |
|--------|------|----------|
| `GET` | `/kling-token` | `{ "token", "exp", "expires_at", "expires_in" }` |
| `GET` | `/api/kling-token` | Same (direct serverless route) |

Example response:

```json
{
  "token": "eyJ...",
  "exp": 1780503589,
  "expires_at": "2026-06-03T16:19:49.000Z",
  "expires_in": 1800
}
```

- `exp` — Unix timestamp (matches JWT `exp` claim)
- `expires_at` — ISO 8601 time for Supabase `timestamptz`
- `expires_in` — seconds until expiry (30 minutes)

## Environment variables

| Variable | Description |
|----------|-------------|
| `KLING_API_KEY` | Kling API access key (`iss` in JWT) |
| `KLING_API_SECRET` | Secret used to sign the JWT (HS256) |

Copy `.env.example` to `.env` for local development. **Never commit `.env`.**

## Local development

1. Install the [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
2. Copy env file: `cp .env.example .env` and fill in values
3. Run: `npm run dev` (or `vercel dev`)
4. Request: `curl http://localhost:3000/kling-token`

## Deploy to Vercel

1. Push this folder to GitHub (or use `vercel` from the project root).
2. Import the repo in the [Vercel dashboard](https://vercel.com/new).
3. Add **Environment Variables** for production (and preview if needed):
   - `KLING_API_KEY`
   - `KLING_API_SECRET`
4. Deploy. Your live URL will be `https://<project>.vercel.app/kling-token`.

CLI alternative:

```bash
vercel
vercel env add KLING_API_KEY
vercel env add KLING_API_SECRET
vercel --prod
```
