# 💖 A Little Love Letter — Premium Birthday Website

A luxury, cinematic, interactive birthday website built as a digital love letter.
Soft pastel pink, lavender, cream & gold palette with glassmorphism cards,
floating hearts, sparkles, butterflies, 3D tilt effects and a full-screen
cinematic video player.

Built with **TanStack Start (React 19) + Vite 7 + Tailwind CSS v4 + Framer Motion**.

---

## ✨ Features

- Cinematic hero with cursive typography (Great Vibes + Cormorant Garamond)
- Glassmorphism cards with soft blur, gradients & elegant shadows
- Floating hearts, sparkles, butterflies & flower petals
- 3D tilt on hover for photos & videos
- Fullscreen "Play Our Story" cinematic video modal
- Background music player with mute toggle
- Light / dark theme toggle
- Cursor heart trail
- Fully responsive

---

## 📁 Easy Folder Structure

Replace media without touching the code — just drop files into these folders:

```
public/
├── photos/      ← put your photos here (.jpg / .png / .webp)
├── videos/      ← put your videos here (.mp4)
└── music/       ← put your background music here (.mp3)
```

Then edit **`src/config/love.ts`** and update the filenames/paths + captions,
dates, love notes, and her name. That's the only file you need to touch.

---

## 🚀 Run it in Google Antigravity (Step-by-Step)

> [Antigravity](https://antigravity.google/) is Google's agentic IDE. These
> steps assume you've downloaded the project as a ZIP (or cloned it from GitHub).

### 1. Install prerequisites
- **Node.js 20+** → <https://nodejs.org>
- **Bun** (recommended, fast) → `curl -fsSL https://bun.sh/install | bash`
  *(you can use `npm` or `pnpm` instead — commands below show both)*
- **Google Antigravity IDE** → <https://antigravity.google/download>

### 2. Open the project in Antigravity
1. Launch **Antigravity**.
2. Click **File → Open Folder…**
3. Select the unzipped project folder (the one containing `package.json`).
4. Antigravity will index the workspace and its agent will be ready in the side panel.

### 3. Open the built-in terminal
- Press **`Ctrl + `** ` (backtick) — or **View → Terminal**.

### 4. Install dependencies
```bash
bun install
# or
npm install
```

### 5. Add your own media (optional but recommended)
- Drop photos into `public/photos/`
- Drop videos into `public/videos/`
- Drop music into `public/music/`
- Open `src/config/love.ts` and update paths, her name, dates, and love notes.

> Tip: you can ask the Antigravity agent something like
> *"Update `src/config/love.ts` to use my new photos in `public/photos/`"*
> and it will wire everything up for you.

### 6. Start the dev server
```bash
bun run dev
# or
npm run dev
```
Open **<http://localhost:8080>** in your browser. 💌

### 7. Build for production
```bash
bun run build
bun run start   # preview the production build
```

---

## 🖥️ Run it locally (any IDE — VS Code, Cursor, WebStorm…)

```bash
git clone <your-repo-url>
cd <project-folder>
bun install
bun run dev
```
Visit <http://localhost:8080>.

---

## 📤 Push it to GitHub

```bash
git init
git add .
git commit -m "💖 Initial commit — birthday love letter site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

## 🌍 Deploy

This is a standard TanStack Start app — deploy anywhere that supports Node/Edge:

- **Vercel** — import the GitHub repo, framework preset: *Vite*, done.
- **Netlify** — connect the repo, build command `bun run build`, publish dir `dist`.
- **Cloudflare Pages / Workers** — supported out of the box.

---

## 🛠️ Tech Stack

| Layer          | Tech                                       |
| -------------- | ------------------------------------------ |
| Framework      | TanStack Start v1 + React 19               |
| Bundler        | Vite 7                                     |
| Styling        | Tailwind CSS v4 + custom design tokens     |
| Animation      | Framer Motion + custom 3D tilt             |
| Icons          | lucide-react                               |
| Fonts          | Great Vibes, Cormorant Garamond, Inter     |

---

## 💝 Customization Cheatsheet

| What you want to change     | File to edit                          |
| --------------------------- | ------------------------------------- |
| Her name / dates / messages | `src/config/love.ts`                  |
| Photos                      | `public/photos/` + `src/config/love.ts` |
| Videos                      | `public/videos/` + `src/config/love.ts` |
| Background music            | `public/music/` + `src/config/love.ts` |
| Colors / theme              | `src/styles.css` (CSS variables at top) |
| Page title / meta           | `src/routes/__root.tsx`               |

---

Made with love. 💌