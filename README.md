# Amitesh Kumar — Portfolio

Personal portfolio website. Static site built with **React + TypeScript + Vite + Framer Motion**. No backend, no database — everything runs in the browser.

## Quick start

```bash
npm install     # install dependencies
npm run dev     # start local dev server (http://localhost:5173)
npm run build   # production build → dist/
npm run preview # preview the production build locally
```

## How to change content

**Everything editable lives in one file: `src/content.ts`.**

- Change your name, headline, bio, email, phone, LinkedIn
- Edit experience, projects, ventures, achievements, skills
- Add a project → add an object to the `projects` array
- Change section headings → edit the `label` / `headline*` fields

You never need to touch `App.tsx` for content edits.

## How to add or change images

1. Put the image file in `public/images/` (e.g. `public/images/thynaa.jpg`)
2. Reference only the **filename** in `src/content.ts`:

```ts
image: "thynaa.jpg",
```

That's it. If an image file is missing, the site shows a tasteful placeholder with the project name instead of breaking.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In the repo: **Settings → Pages → Source: "GitHub Actions"**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on every push to `main`.
4. Your site goes live at `https://<username>.github.io/<repository-name>/`.

The Vite config uses `base: "./"`, so all asset paths are relative and the site works on any sub-path — no extra configuration needed.

Manual alternative: run `npm run build` and publish the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

## Project structure

```
/
├── index.html          # page shell + SEO/meta tags
├── package.json
├── vite.config.ts      # base: "./" for GitHub Pages
├── README.md
│
├── public/
│   └── images/         # ALL images go here
│       ├── profile.jpg
│       ├── thynaa.jpg
│       ├── iskcon.jpg
│       ├── scaler.jpg
│       ├── google-search.jpg
│       └── bowl-beyond.jpg
│
└── src/
    ├── main.tsx        # entry point
    ├── App.tsx         # website structure & rendering
    ├── content.ts      # ← ALL editable content lives here
    └── styles.css      # design system (colors, type, layout)
```

## Visitor counter (optional analytics)

The site supports a lightweight, privacy-friendly visitor counter via [GoatCounter](https://www.goatcounter.com) — free, no API key.

1. Create a free account at https://www.goatcounter.com/signup and pick an account name (e.g. `amiteshkumar`).
2. In GoatCounter settings, enable **"Allow adding visitor counts on your website"**.
3. In `src/content.ts`, set:

```ts
analytics: {
  goatCounterSite: "amiteshkumar",
},
```

A discreet "VISITOR Nº …" appears in the footer, and you get a full private analytics dashboard at `https://amiteshkumar.goatcounter.com`. Leave the field empty and nothing is rendered or tracked.

## Notes

- Animations respect `prefers-reduced-motion`.
- The custom cursor appears on desktop only; touch devices are unaffected.
- Case-study modals close via the ✕ button, the Escape key, or clicking outside.
