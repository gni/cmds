# cmds

Terminal commands reference for Linux, macOS, and Windows.

* Repository: [github.com/gni/cmds](https://github.com/gni/cmds)
* Host: [loop.brain.fr/cmds](https://loop.brain.fr/cmds/)
* Stack: Astro 7, Tailwind CSS v4, TypeScript

---

## Overview

A fast, searchable reference of practical terminal commands across common developer workflows:

- **Daily Essentials**: Coreutils (`ls`, `grep`, `find`, `du`, `diff`), port killers, and common shortcuts.
- **Kubernetes**: Pod crashloop triage, ephemeral debug containers, log streaming, rollouts, port forwarding, and cluster diagnostics.
- **Data Science & ML**: Jupyter kernels, shell CSV profiling, GPU VRAM triage, DuckDB on Parquet, Streamlit, and S3 dataset sync.
- **Git & GitHub**: Reflog recovery, worktrees, bisect debugging, cherry-pick ranges, and `gh` CLI.
- **Dev & Runtimes**: Package managers and language runtimes (`uv`, `pnpm`, `bun`, `cargo`, `brew`, `apt`).
- **Files & Text**: Search, archives, and stream manipulation (`find`, `tar`, `rsync`, `sed`, `awk`, `xargs`, `jq`).
- **System & Processes**: Systemd services, `journalctl`, `btop`, `tmux`, process signals, and containers.
- **Network & Security**: SSH tunneling, `ufw`/`iptables`, and SSL/TLS auditing with `openssl`.
- **AI & Media**: Local models via `ollama`, `vllm`, `whisper`, and media processing with `ffmpeg`/`ffprobe`.

---

## Features

- **Search**: Fuzzy filter across command names, descriptions, tools, and flags.
- **Inline Variables**: Default parameter tokens (such as ports and file paths) are directly editable inside command snippets.
- **Platform Switching**: Direct tabs between POSIX bash/zsh and Windows PowerShell equivalents.
- **Command Palette**: Press <kbd>⌘K</kbd> (or <kbd>Ctrl+K</kbd>) to search and copy commands.
- **Export**: Export commands as Markdown, shell aliases, or JSON.

---

## Development

```bash
# Start local development server
docker compose up dev --build
# Open http://localhost:4321/cmds/

# Build and preview production Nginx build
docker compose up test --build
# Open http://localhost:8080/cmds/

# Stop containers
docker compose down
```

---

## Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> | Open Command Palette |
| <kbd>/</kbd> | Focus Search Field |
| <kbd>`</kbd> | Toggle Terminal Drawer |
| <kbd>Esc</kbd> | Close Modal / Terminal Drawer |

---

## License

MIT
