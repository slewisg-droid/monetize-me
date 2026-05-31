# Monetize Me™ — Deployment Guide

## What's in this folder

```
monetize-me-app/
├── netlify.toml                          # Netlify config
├── package.json                          # Stripe dependency
├── netlify/functions/
│   ├── create-checkout.js                # Creates Stripe checkout session
│   ├── verify-session.js                 # Verifies payment after checkout
│   └── claude-proxy.js                   # Proxies Claude API calls securely
└── public/
    ├── index.html                         # Landing page ($1/month)
    └── app.html                           # Gated app (requires valid subscription)
```

---

## Step 1 — Push to GitHub

1. Create a new repo at github.com (call it `monetize-me`)
2. Upload all files in this folder to the repo

---

## Step 2 — Deploy to Netlify

1. Go to netlify.com → "Add new site" → "Import an existing project"
2. Connect your GitHub repo
3. Build settings are auto-detected from `netlify.toml`
4. Click **Deploy site**

---

## Step 3 — Add Environment Variables

In Netlify → Site settings → Environment variables, add these 3 variables:

| Key                    | Value                                      |
|------------------------|--------------------------------------------|
| `STRIPE_SECRET_KEY`    | Your `sk_test_...` key (from Stripe → Developers → API keys) |
| `STRIPE_PRICE_ID`      | Your `price_...` key (from Stripe → Products → MonetizeMe → price) |
| `ANTHROPIC_API_KEY`    | Your key from console.anthropic.com → API Keys |

**Important:** When Stripe approves your account in 2-3 days, replace `sk_test_...` with your `sk_live_...` key.

---

## Step 4 — Get Your Anthropic API Key

1. Go to console.anthropic.com
2. Click "API Keys" → "Create Key"
3. Copy the key and add it as `ANTHROPIC_API_KEY` in Netlify

---

## Step 5 — Connect Your Domain

1. In Netlify → Domain settings → Add custom domain
2. Enter your domain (e.g. monetizeme.co)
3. Follow Netlify's instructions to point your DNS

---

## Step 6 — Go Live with Stripe

Once Stripe approves your account:
1. In Netlify → Environment variables
2. Update `STRIPE_SECRET_KEY` to your `sk_live_...` key
3. Redeploy

---

## Testing

Use Stripe test card: `4242 4242 4242 4242` (any future expiry, any CVC)

---

## Revenue Projection

| Subscribers | Monthly Revenue |
|-------------|----------------|
| 1,000       | $1,000         |
| 10,000      | $10,000        |
| 100,000     | $100,000       |
| 1,000,000   | $1,000,000     |

Built with ❤️ by SLG Media
