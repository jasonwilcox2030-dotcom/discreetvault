# Discreet Vault Logistics

Premium logistics website — secure, silent, delivered.

## What's inside
- Next.js 14 + TypeScript
- Clean editorial design with **deep emerald accent** 🟢
- Live tracking dashboard with custody chain timeline
- 6-stage shipment journey (including **On Hold**)
- Pricing tiers (Standard / Premium / Black Vault)
- Supabase ready (drop in your keys)

## Setup (3 commands)

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Try it without Supabase
The site has 3 demo vault IDs built in:
- `VLT-7281-A4F9` — In transit
- `VLT-9912-04B7` — On hold (customs)
- `VLT-5503-D8E2` — Delivered

Just paste any into the track bar and hit Enter.

## Add your Supabase
Edit `.env.local` and replace `YOUR_SUPABASE_ANON_KEY_HERE` with your real key.

## Deploy
1. Push to GitHub
2. Connect repo on Vercel
3. Add `.env.local` vars in Vercel settings
4. Done — point your `discreetvaultlogistics.us` domain at it
