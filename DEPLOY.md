# Starlit Insights — deploy notes

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire site. Single file, no build step, no dependencies to install. |
| `CNAME` | Tells GitHub Pages to serve at `starlitinsights.com`. Must be at repo root. |
| `.nojekyll` | Stops Jekyll from touching the files. Keep it. |
| `robots.txt` / `sitemap.xml` | Basic SEO. |

## Deploy to GitHub Pages

1. Create a **public** repo — name it `starlitinsights.github.io` or anything you like.
2. Upload all five files to the repo **root** (not inside a folder).
3. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)` → Save.
4. Same page, **Custom domain**: enter `starlitinsights.com` → Save.
5. At your domain registrar, add these DNS records:

   **Apex (`starlitinsights.com`) — four A records:**
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   **`www` — one CNAME record:**
   ```
   www  →  <your-github-username>.github.io
   ```
6. Wait for DNS to propagate (minutes to a few hours), then tick **Enforce HTTPS** in Settings → Pages.

> Verify the current GitHub Pages IPs against GitHub's own docs before saving — they change rarely, but they do change.

## Adding the Razorpay embed later

In `index.html`, search for:

```
RAZORPAY SLOT
```

Replace the entire `<div class="pay-slot" id="razorpay-slot">…</div>` block with your Razorpay
payment button / payment page script. Everything around it stays untouched.

While you're in there, the two `₹—` placeholders in the **Readings** section (search `class="price"`)
are where your actual prices go.

## Things to check on first load

- Cal.com embed renders and shows live slots (needs internet; won't work from `file://` in some browsers — test on the live URL or a local server).
- The sidereal calculator returns a result. Sanity check: **24 July 1996, 10:15 IST** → Cancer 7°46′, Puṣya nakṣatra.
- Open on a phone. The nav collapses to a hamburger below 960px.

## Local preview

```bash
cd <folder-with-index.html>
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Notes on the maths

The in-browser calculator uses a low-precision solar ephemeris (±0.01°) plus a linear Lahiri
ayanāṁśa model (23°51′11″ at J2000.0, drifting 50.29″/year). That is accurate enough to resolve the
sign question and matches Swiss Ephemeris output to within a couple of arcminutes for the Sun. It is
deliberately *not* presented as a substitute for a real chart — the copy says so, in the hint text
under the result.

Every numeric claim on the page was verified before it went in:

- Vimśottarī periods sum to exactly 120 years (7+20+6+10+7+18+16+19+17)
- Sidereal year − tropical year = 20 min 24 s
- Ayanāṁśa drifts 1° per 71.6 years
- Ascendant moves 1° per 4 minutes; one navāṁśa per 13 min 20 s
- Nakṣatra arc = 13°20′; Aṣṭakavarga total = 337 bindus (28.08 average)
- Saturn orbit 29.46 y, Jupiter 11.86 y, lunar nodal cycle 18.6 y
- Precession cycle ≈ 25,772 years
