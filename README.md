# ⚡ cmds // Terminal Superpowers

> The curated, high-velocity terminal command system for Linux, macOS, and Windows for Linux, macOS, and Windows.

[![Site](https://img.shields.io/badge/Site-loop.brain.fr%2Fcmds-6366f1?style=for-the-badge)](https://loop.brain.fr/cmds)
[![GitHub](https://img.shields.io/badge/GitHub-gni%2Fcmds-10b981?style=for-the-badge&logo=github)](https://github.com/gni/cmds)
[![Astro](https://img.shields.io/badge/Astro-v7.3-ff5d01?style=for-the-badge&logo=astro)](https://astro.build)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

---

## 🚀 Features

- 🏎️ **Fuzzy Search & Command Palette (`Cmd+K` / `/`)**: Jump, filter, and copy any command in under 100 milliseconds with full keyboard navigation (`↑`, `↓`, `↵`).
- 🎛️ **Live Parameter Tuning**: Placeholders like `{{port}}`, `{{file}}`, `{{pattern}}`, or `{{domain}}` are live editable inputs directly within the card! Editing an input automatically updates the copy payload in real time.
- 🐧 🍎 🪟 **Trio-OS Native Coverage**: 100+ precision-engineered commands with native alternatives (e.g. Linux `lsof` / `ss` vs macOS BSD vs Windows PowerShell `Stop-Process` / `Test-NetConnection`).
- 🔊 **Zero-Dependency Sound Design**: Web Audio API synthesized mechanical keyboard clicks and futuristic success chimes on copy and filter (toggleable with persistent memory).
- 💻 **Interactive Live Terminal Playground**: Simulate and preview commands in an authentic shell window with realistic output streams.
- ⭐ **Favorites & Bookmarks**: Star any command to assemble a personalized toolkit saved directly to `localStorage`.
- 📦 **Multi-Format Cheatsheet Export**:
  - Export as clean Markdown for Notion, Obsidian, or GitHub READMEs.
  - Export as shell aliases (`.sh`) to paste directly into `~/.bashrc`, `~/.zshrc`, or PowerShell `$PROFILE`.
  - Export as raw JSON dataset.
- 🔗 **Direct Deep Linking**: Every command has a persistent hash URL (e.g. `loop.brain.fr/cmds#kill-port`) that auto-scrolls and highlights the target card.

---

## 📂 Project Architecture

```
cmds/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages / host deployment
├── public/
│   ├── favicon.svg           # Custom neon terminal SVG icon
│   ├── robots.txt            # Search engine directives
│   └── sitemap.xml           # XML sitemap for loop.brain.fr/cmds
├── src/
│   ├── components/
│   │   ├── CommandCard.astro     # Interactive card with param inputs & copy
│   │   ├── CommandPalette.astro  # Cmd+K fuzzy modal dialog
│   │   ├── ExportModal.astro     # Cheatsheet/aliases/JSON export modal
│   │   ├── FilterBar.astro       # Sticky search, OS tabs, & category rail
│   │   ├── Footer.astro          # Footer with keybindings table
│   │   ├── Header.astro          # Glowing brand header & quick actions
│   │   ├── Hero.astro            # Interactive terminal typing simulator
│   │   └── SoundEffects.astro    # Pure Web Audio API sound synthesizer
│   ├── data/
│   │   ├── categories.ts         # Category metadata & icons
│   │   ├── commands.ts           # 100+ commands with tags, platforms & tips
│   │   └── types.ts              # Strict TypeScript definitions
│   ├── pages/
│   │   └── index.astro           # Main entry point & reactive state engine
│   └── styles/
│       └── global.css            # Custom terminal grids, typography & glows
├── astro.config.mjs          # Site & base configuration (loop.brain.fr/cmds)
├── package.json
└── tsconfig.json
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ (recommended 22+)
- npm, pnpm, or bun

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Open in your browser
# http://localhost:4321/cmds/
```

### Production Build
```bash
npm run build
```
The static output will be generated in `dist/`, configured for base path `/cmds`.

---

## 🌐 Deployment to `loop.brain.fr/cmds`

This project is configured out-of-the-box for hosting at `https://loop.brain.fr/cmds`:

1. In `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     site: 'https://loop.brain.fr',
     base: '/cmds',
     vite: {
       plugins: [tailwindcss()],
     },
   });
   ```

2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for cmds"
   git branch -M main
   git remote add origin git@github.com:gni/cmds.git
   git push -u origin main
   ```

3. The included GitHub Actions workflow in `.github/workflows/deploy.yml` will automatically build and publish the site.

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action |
| :--- | :--- |
| <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> | Toggle Command Palette |
| <kbd>/</kbd> | Focus Main Search Input |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate Palette Results |
| <kbd>↵ Enter</kbd> | Copy Command & Dismiss Palette |
| <kbd>Esc</kbd> | Close Modal / Clear Input |

---

## 📄 License
MIT © [gni](https://github.com/gni)
