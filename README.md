# cmds

An operational terminal reference manual for Linux, macOS, and Windows. Indexes 238 commands across 9 functional pillars.

| Property | Value |
| :--- | :--- |
| Host | [loop.brain.fr/cmds](https://loop.brain.fr/cmds/) |
| Base Path | `/cmds/` |
| Author | Lucian bletan |
| Architecture | Static site generation (SSG), zero-runtime client baseline |
| Stack | Astro 7, Tailwind CSS v4, TypeScript, Docker |
| Commands | 238 verified commands across 9 pillars |
| License | MIT |

---

## Architectural overview

`cmds` provides an authoritative, rapid-lookup catalog of terminal operations designed for software engineers, systems operators, and data practitioners. The application is delivered as a zero-JS static document for read paths, progressively enhancing into an interactive command workbench with inline variable tuning and a client-side execution simulator.

### Design principles

* **Evidence over assertion**: Commands index concrete flags, arguments, and verified output examples rather than generic advice.
* **Direct manipulation**: Variables within commands (ports, paths, hostnames) are inline editable tokens with production defaults.
* **Calm ergonomics**: Deep monochrome interface, baseline alignment, zero simulated typing delays, zero decorative gradients, and no fake status telemetry.
* **Dual reading velocities**: Rapid executive scanning via category filters and quick-copy alongside deep technical audits through complete flag descriptions and stdout examples.

---

## Command pillars

The catalog organizes 238 operations across 9 distinct technical domains:

| Pillar | Scope and triage scenarios | Primary utilities | Commands |
| :--- | :--- | :--- | ---: |
| **Daily Essentials** | Core filesystem navigation, search, disk usage, and port termination | `ls`, `grep`, `find`, `du`, `diff` | 19 |
| **Files & Text** | Stream processing, archives, regular expressions, and transformations | `find`, `tar`, `rsync`, `sed`, `awk`, `jq` | 20 |
| **Git & Version Control** | Reflog salvage, worktree isolation, bisect debugging, and cherry-pick ranges | `git`, `gh` | 23 |
| **Dev Runtimes** | Deterministic package management, locks, toolchains, and environment isolation | `python3`, `uv`, `pnpm`, `bun`, `cargo`, `brew`, `apt` | 32 |
| **System & Processes** | Service management, journal inspection, system limits, and multiplexing | `systemctl`, `journalctl`, `btop`, `tmux` | 29 |
| **Network & Security** | Tunneling, socket inspection, firewall configuration, and TLS auditing | `ssh`, `ss`, `ufw`, `iptables`, `openssl` | 24 |
| **Kubernetes** | CrashLoopBackOff triage, ephemeral debugging, rollouts, and port forwarding | `kubectl` | 24 |
| **Data Science & ML** | Kernel registration, GPU VRAM triage, Parquet queries, and S3 synchronization | `ipykernel`, `nvidia-smi`, `duckdb`, `aws s3` | 22 |
| **AI Models & Media** | Local inference, model quantization, speech recognition, and media encoding | `ollama`, `vllm`, `whisper`, `ffmpeg`, `ffprobe` | 45 |
| **Total** | | | **238** |

---

## Interface capabilities

### Inline parameter tuning

Commands containing configurable values expose them as interactive inline tokens (`contenteditable="true"`). Users can click directly on any placeholder (such as a port number, filename, or container ID) to edit it in place. Changes update the clipboard payload immediately without requiring external configuration forms.

### Docked terminal simulator

A bottom-docked terminal drawer provides output verification for unfamiliar commands. Users can click the simulate action on any card to review authentic stdout and stderr output examples, exit codes, and operational notes in a clean terminal container.

### Keyboard-driven navigation

The entire catalog is operable without pointer interaction:

| Key | Context | Action |
| :--- | :--- | :--- |
| <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> | Global | Open command palette search modal |
| <kbd>/</kbd> | Global | Focus primary keyword filter field |
| <kbd>`</kbd> | Global | Toggle docked terminal simulator |
| <kbd>Esc</kbd> | Global | Close active modal, drawer, or clear filter |
| <kbd>Enter</kbd> | Command palette | Copy selected command directly to clipboard |

### Format export

Users can export the entire catalog or filtered subsets in three portable formats:

* **Markdown**: Formatted technical reference document organized by category headings.
* **Shell aliases**: Clean `.sh` file defining standard `alias cmd_*` entries for `~/.bashrc` or `~/.zshrc`.
* **JSON**: Typed structured ledger containing all command IDs, titles, descriptions, and syntax templates.

---

## Development and build

### Prerequisites

* Node.js 20+
* Docker with Compose V2 (optional)

### Native workflow

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile static distribution to dist/
npm run build

# Preview compiled static distribution
npm run preview
```

### Docker workflow

The project provides a multi-stage Docker setup matching the production deployment:

```bash
# 1. Start live development container with hot module replacement
docker compose up dev --build
# Endpoint: http://localhost:4321/cmds/

# 2. Build and verify production Nginx static container
docker compose up test --build
# Endpoint: http://localhost:8080/cmds/

# 3. Stop containers
docker compose down
```

---

## Deployment specification

The static site is hosted under the path `/cmds/` on `https://loop.brain.fr`.

### Nginx routing and cache policy

* Root `/` redirects with status 301 to `/cmds/`.
* Static assets (`css`, `js`, `svg`, `woff2`) carry immutable 1-year cache headers (`Cache-Control: public, max-age=31536000, immutable`).
* HTML entry points are served with `Cache-Control: no-cache` to ensure immediate availability of catalog updates.
* Gzip compression is enabled across all text, SVG, and JSON MIME types.

---

## Authorship and license

* **Author**: Lucian bletan
* **License**: MIT

