# Ruman Jamadder Rabby — Academic Portfolio

A premium, Apple/Vercel/Linear-inspired portfolio for a Master's student in
the Department of Information Science and Library Management, University of
Dhaka.

Built with **React + Vite + Tailwind CSS**, deployed as a static site on
GitHub Pages, with **Supabase** as a small shared database behind the admin
panel — so edits you make show up for every visitor, not just you.

The design's signature motif is the **library catalog card**: index-card
styling with punch holes, call numbers, and dashed stitch lines, used across
the hero, education, skills, projects, and experience sections — a nod to
the subject's own field.

---

## 1. Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node)
- A free [Supabase](https://supabase.com) account (for the admin panel / live data — see step 3)

```bash
node -v
npm -v
```

## 2. Install & run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The site will
load, but Projects/Research/Gallery/Blog/Contact will show "not configured"
or empty states until you complete step 3.

## 3. Connect your database (one-time setup, ~10 minutes)

This is what makes admin panel edits visible to **every visitor**, not just
your own browser.

### 3.1 Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → sign up (free) → **New project**.
2. Pick any name and password (the password is for the Postgres database
   itself — save it somewhere, you likely won't need it again for this project).
3. Wait ~2 minutes for the project to finish provisioning.

### 3.2 Create the database tables

1. In your new project, open **SQL Editor** in the left sidebar → **New query**.
2. Open `supabase/schema.sql` from this project, copy the whole file, paste
   it into the query editor, and click **Run**.
3. This creates five tables (`projects`, `research_interests`, `gallery`,
   `blog_posts`, `contact`), sets up security rules so anyone can *read* but
   only a logged-in admin can *write*, and creates a public storage bucket
   for gallery photos.

### 3.3 Create your admin login

1. Go to **Authentication → Users** → **Add user** → **Create new user**.
2. Enter the email and password you want to sign in with at `#/admin`.
   (Turn off "Auto Confirm User" only if you want an email verification step —
   for a personal admin account, leaving it checked/confirmed is simplest.)

There's no public sign-up page in the app itself — this is the only way to
create an admin account, which is intentional.

### 3.4 Get your API keys

1. Go to **Settings → API**.
2. Copy the **Project URL** and the **anon public** key.

### 3.5 Add the keys to your project

For local development, copy `.env.example` to `.env` and fill in both values:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Restart `npm run dev` after saving. The anon key is designed to be public —
it's safe to ship in your built JS bundle; access control is enforced by the
Row Level Security policies from `schema.sql`, not by keeping this key secret.

For the **deployed** site, see step 6 — you'll add these as GitHub Actions
secrets instead of committing `.env`.

You're done — visit `#/admin`, sign in with the account from step 3.3, and
anything you add will now be visible to every visitor immediately.

## 4. Edit content

Practically everything on the site now lives in Supabase and is editable
from the admin panel — no code edits, no rebuilds, changes go live for every
visitor as soon as they load the page.

### The admin panel

```
yoursite.com/#/admin
```

(also linked from the small "Admin" text in the site footer). Sign in with
the account you created in step 3.3.

Every tab works the same way — **add, edit, delete, search, and (for
ordered lists) reorder** — so it's one consistent system across the whole
site rather than fifteen different ones:

| Tab | What it controls |
|---|---|
| Hero Section | Name, tagline, rotating role text, portrait photo, reader-card details |
| About Me | Both bio paragraphs, the "At a glance" facts card |
| Education Timeline | Every entry, including the highlighted status pill |
| Skills | Each catalogue-card category and its skill tags |
| Projects | Cards in the Projects section |
| Experience | Roles, with reorderable bullet points |
| Research | Research interest cards |
| Gallery | Photo upload, captions, categories, drag-free reordering (↑/↓) |
| Certifications | Data only for now — see note below |
| Social Links | The icon row in Contact (add any platform, not just three) |
| Blog | Posts, each with its own live page at `#/blog/<slug>` |
| Contact Information | Heading, blurb, email, phone, location |
| Resume / CV | Upload a new PDF — updates every "Download CV" link on the site |
| Footer | The tagline and note text in the site footer |
| Website Settings | Browser tab title and SEO meta description |

**A note on Certifications:** there's no Certifications section on the
public site today, so this tab exists to manage the data but nothing is
visible yet — ask if you'd like a display section added.

**Preview and confirm-delete:** every list row has an eye icon that expands
a read-only preview of all its fields, and delete requires a second
confirming click (so nothing is removed by accident).

**Image and file uploads** go to Supabase Storage (not embedded in the
page), so there's no practical size limit — but resize large photos before
uploading for faster load times.

### Static content (rarely changes, edited in code)

`src/data/content.js` still holds a couple of things intentionally left out
of the database because they change essentially never: navigation labels,
and the department/university line under the hero. If you do want those
editable too, they follow the same pattern as everything else here — say
the word.

### Colors, type, and the catalog-card style

Design tokens (colors, fonts, shadows) live in `tailwind.config.js`. The
catalog-card component styles (punch hole, stitched border, call-number
labels) live in `src/index.css` under the `.catalog-card`, `.catalog-hole`,
`.catalog-code`, and `.card-stitch` utility classes. None of this changed in
the admin-panel update — the public site's design is untouched.

## 5. Build for production

```bash
npm run build
```

This outputs a static site to `dist/`. Preview it locally with:

```bash
npm run preview
```

## 6. Deploy to GitHub Pages

### Option A — GitHub Actions (recommended, fully automatic)

This repo includes `.github/workflows/deploy.yml`, which builds and
publishes the site every time you push to `main`, injecting your Supabase
credentials at build time.

1. Push this project to a GitHub repository.
2. Add your Supabase credentials as repository secrets: **Settings → Secrets
   and variables → Actions → New repository secret**. Add two:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   (same values as your local `.env` from step 3.5)
3. Go to **Settings → Pages** → **Build and deployment → Source** → choose
   **GitHub Actions**.
4. Push a commit to `main` (or run the workflow manually from the **Actions**
   tab). The site will build and publish automatically.

Your site will be available at:

```
https://<your-username>.github.io/<your-repo-name>/
```

No changes to `vite.config.js` are needed — it uses a relative base path
(`base: './'`) so the build works from any subpath.

### Option B — `gh-pages` package (manual deploys)

```bash
npm install
npm run build   # make sure .env has your Supabase credentials first
npm run deploy
```

This pushes the contents of `dist/` to a `gh-pages` branch. Then in
**Settings → Pages**, set the source to the `gh-pages` branch. Since this
builds locally, your `.env` file is what gets used — no repository secrets
needed for this option.

## 7. Project structure

```
├── public/
│   ├── cv/                        # Fallback CV (used only until you upload one via admin)
│   └── images/                    # Fallback profile photo
├── supabase/
│   └── schema.sql                 # Run once in the Supabase SQL editor
├── src/
│   ├── admin/
│   │   └── sectionsConfig.js      # Declarative config for all 15 admin sections
│   ├── components/
│   │   ├── admin/
│   │   │   ├── SectionAdmin.jsx   # Generic list CRUD (add/edit/delete/search/reorder)
│   │   │   ├── SingletonAdmin.jsx # Generic single-row form (Hero, About, Contact, Settings…)
│   │   │   └── FieldInput.jsx     # Renders the right input per field type, incl. uploads
│   │   ├── AdminPanel.jsx         # Auth + tab shell, renders Section/SingletonAdmin per tab
│   │   └── ...                    # One component per public-site section/UI piece
│   ├── data/
│   │   ├── content.js             # Static fallback content + rarely-changing values
│   │   └── accents.js             # Blog accent-color class map
│   ├── hooks/
│   │   ├── useTheme.js            # Dark/light mode with localStorage
│   │   └── useSupabaseData.js     # useTable() + useSingleRow() — read/write any table
│   ├── lib/supabaseClient.js      # Supabase client setup
│   ├── App.jsx                    # Assembles all sections + hash router
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Design tokens & catalog-card styles (unchanged)
├── .env.example                   # Copy to .env and fill in your Supabase keys
├── index.html
├── tailwind.config.js
├── vite.config.js
└── .github/workflows/deploy.yml
```

Adding a 16th section later is mostly a config change: add a table to
`schema.sql`, add one entry to `sectionsConfig.js` describing its fields,
and (if it should appear publicly) point the relevant public component at
`useTable`/`useSingleRow` the same way the existing ones do.

## 8. Features included

- Sticky glass navbar with scroll-spy active state and mobile menu
- Scroll progress bar and scroll-to-top button
- Typing-effect role rotator in the hero
- Loading screen on first paint
- Dark/light mode toggle, saved to `localStorage`, respects OS preference
- Name with hover/focus reveal showing your certificate name, gradient accent color
- Lazy-loaded images throughout
- Gallery with dynamic category filters, a keyboard-navigable lightbox, and
  admin-side reordering
- A blog with its own list section and dedicated per-post pages (`#/blog/<slug>`)
- A full admin panel (`#/admin`) with real login (Supabase Auth, persistent
  across visits), protected route, and secure logout
- Add / edit / delete / search / reorder / image upload / preview /
  confirm-before-delete — consistently, across all 15 sections — with every
  change visible to every visitor immediately, no rebuild needed
- Scroll-triggered reveal animations (Framer Motion), reduced-motion aware
- Fully responsive, semantic HTML, visible focus states for accessibility

## 9. Notes

- The contact *form* itself still has no backend — submitting it opens the
  visitor's email client via a `mailto:` link pre-filled with their message.
  Only the site's *content* is backed by Supabase, not form submissions.
- The public site's design, layout, animations, and components are
  unchanged from before this admin-panel build — every public component
  was edited only to swap its data source, never its markup or styling.
- Supabase's free tier is generous for a personal portfolio (500MB database,
  1GB file storage, 50,000 monthly active users) — more than enough here.
- All fonts (Fraunces, Inter, IBM Plex Mono) load from Google Fonts via
  `index.html`. For a fully offline build, self-host the font files instead.
