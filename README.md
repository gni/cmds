# Brain // cmds

An official Brain operational reference manual and command catalog for Linux, macOS, and Windows.

* **Live site:** [loop.brain.fr/cmds](https://loop.brain.fr/cmds)
* **Repository:** [github.com/gni/cmds](https://github.com/gni/cmds)
* **Stack:** Astro 7 (Static Site Generation), Tailwind CSS v4, Inter & JetBrains Mono

---

## ⚡ Overview

`cmds` is an opinionated, high-density terminal reference engineered for software engineers, systems administrators, and DevOps practitioners. It indexes 104 battle-tested commands across 13 domains:

- **Quick Wins & Life Savers** (kill port, find large files, auto-resume downloads, format JSON)
- **Networking & DNS** (listening ports & PIDs via `ss` / `lsof`, port probes, DNS trace, curl timings)
- **System Diagnostics** (RAM, CPU, I/O bottlenecks, `btop`, `free -h`, `iostat`, `dmesg`)
- **Process Management** (pkill regex, `nohup` detach, `cpulimit`, open file descriptors)
- **Filesystem & Storage** (recent file search, prune `node_modules`, `rsync -avzP`, high-ratio `tar.zst`)
- **Docker & Containers** (`system prune -af`, live `docker stats`, direct exec, compose logs)
- **Git Superpowers** (soft undo commit, pickaxe search across history, reflog rescue, whitespace blame)
- **Text & CLI Wrangling** (`ripgrep` regex, `sed` in-place, `awk` column sum, `uniq` IP visitor ranking)
- **Media & ffmpeg** (CRF web MP4 compression, crisp GIF conversion, lossless cut, audio extraction)
- **Security & SSH** (Ed25519 keygen with 100 bcrypt rounds, remote SSL expiry check, SSH SOCKS5 proxy)
- **Windows & PowerShell** (`winget upgrade --all`, multi-threaded `robocopy /MT:16`, `Stop-Process` by port)
- **macOS Native** (`caffeinate`, flush mDNS cache, toggle hidden files / desktop icons, `purge` RAM)
- **Package Managers** (`brew update && cleanup`, `apt full-upgrade`, `pacman -Syu`, Brewfile export)

---

## 🛠️ Key Capabilities

- **Instant Search:** Fast client-side fuzzy filter across command names, descriptions, tools, and flags.
- **In-Place Variable Tuning:** Placeholders like `{{port}}` or `{{file}}` are editable inputs directly inside each command snippet.
- **Platform Alternatives:** Direct tabs switching between POSIX bash/zsh and Windows PowerShell equivalents.
- **Global Command Palette:** Hit <kbd>⌘K</kbd> (or <kbd>Ctrl+K</kbd>) to search and copy any command in milliseconds.
- **Cheatsheet Export:** Export all commands or saved bookmarks as Markdown, Shell profile aliases (`.sh`), or raw JSON.

---

## 🐳 Docker Compose (Dev & Test)

```bash
# 1. Start live development server (with hot reload)
docker compose up dev --build
# Open http://localhost:4321/cmds/

# 2. Test compiled production build (served via Nginx)
docker compose up test --build
# Open http://localhost:8080/cmds/

# 3. Stop containers
docker compose down
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> | Open Command Palette |
| <kbd>/</kbd> | Focus Search Field |
| <kbd>Esc</kbd> | Close Modal / Clear Search |

---

## 📄 License
MIT © [Brain](https://brain.fr)
