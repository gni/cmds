# Brain // cmds

An official Brain operational index and reference catalog of terminal commands for Linux, macOS, and Windows.

* **Live surface:** [loop.brain.fr/cmds](https://loop.brain.fr/cmds)
* **Repository:** [github.com/gni/cmds](https://github.com/gni/cmds)
* **Framework:** Astro (Static generation)
* **Typography:** Geist and Geist Mono

---

## Design System

Designed according to Brain brand standards:
- **Monochrome palette:** Automatic system-level light and dark themes using CSS custom properties (`prefers-color-scheme`).
- **Typography:** Geist for interface, prose, and metadata; Geist Mono strictly for commands, syntax, paths, and variables.
- **Restraint:** No decorative gradients, glowing halos, fake terminal animations, or sound effects. High-density, calm, and readable.
- **Fast lookup:** Native command palette (<kbd>⌘K</kbd>), instant keyboard filtering (<kbd>/</kbd>), and multi-format cheatsheet export.

---

## Local Development & Testing

### Using Docker Compose
A multi-stage container setup is provided to build and test during development:

```bash
# 1. Start live development server (with hot module reload)
docker compose up dev --build
# Open http://localhost:4321/cmds/

# 2. Test compiled production build (served via Nginx)
docker compose up test --build
# Open http://localhost:8080/cmds/

# 3. Stop containers
docker compose down
```

### Using Node.js directly
```bash
npm install
npm run dev
# Open http://localhost:4321/cmds/

# Build static output for loop.brain.fr/cmds
npm run build
```

---

## Keyboard Navigation

| Shortcut | Action |
| :--- | :--- |
| <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> | Toggle Command Palette |
| <kbd>/</kbd> | Focus Search Field |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate Palette Entries |
| <kbd>↵ Enter</kbd> | Copy Command & Close Palette |
| <kbd>Esc</kbd> | Dismiss Palette / Clear Input |

---

## License
MIT © [Brain](https://brain.fr)
