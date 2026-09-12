import type { TerminalCommand } from "../types";

/**
 * Dev & Runtimes (📦)
 * Modern package managers and toolchains:
 * uv (Python), pnpm, bun, npm, cargo (Rust), brew, apt, and pacman.
 */
export const runtimesCommands: TerminalCommand[] = [
  {
    id: "uv-venv-create",
    title: "Create Fast Python Virtualenv (uv)",
    description: "Create an isolated Python virtual environment in milliseconds.",
    command: "uv venv {{venvPath}} && source {{venvPath}}/bin/activate",
    platforms: ["linux", "macos"],
    category: "runtimes",
    tags: ["uv", "python", "venv", "virtualenv", "fast"],
    dangerLevel: "safe",
    proTip: "uv creates virtual environments up to 80x faster than traditional python3 -m venv.",
    params: [
      { name: "venvPath", label: "Venv Directory", default: ".venv", placeholder: ".venv" }
    ],
    outputExample: "Using CPython 3.12.3\nCreating virtualenv at: .venv\nActivate with: source .venv/bin/activate"
  },
  {
    id: "uv-pip-install",
    title: "Ultra-Fast Pip Install (uv)",
    description: "Resolve and install Python dependencies at blazingly fast speed.",
    command: "uv pip install -r {{requirements}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["uv", "pip", "python", "install", "requirements"],
    dangerLevel: "safe",
    proTip: "Drop in replacement for pip install that uses a global hard-linked content-addressable cache.",
    params: [
      { name: "requirements", label: "Requirements File", default: "requirements.txt", placeholder: "requirements.txt" }
    ]
  },
  {
    id: "uv-run-script",
    title: "Run Script in Managed Python Env (uv)",
    description: "Execute Python script in an ephemeral environment with automatic dependency resolution.",
    command: "uv run {{script}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["uv", "python", "run", "script"],
    dangerLevel: "safe",
    proTip: "PEP 723 inline script metadata is automatically detected and installed on the fly.",
    params: [
      { name: "script", label: "Python Script", default: "main.py", placeholder: "script.py" }
    ]
  },
  {
    id: "uv-tool-run",
    title: "Run Python CLI Tool Ephemerally (uvx)",
    description: "Execute standalone Python CLI tool without global pip pollution.",
    command: "uv tool run {{tool}} {{args}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["uv", "uvx", "tool", "ruff", "python", "cli"],
    dangerLevel: "safe",
    proTip: "\"uvx {{tool}}\" is the exact shorthand for \"uv tool run {{tool}}\".",
    params: [
      { name: "tool", label: "Tool Name", default: "ruff", placeholder: "ruff, black, mypy" },
      { name: "args", label: "Tool Arguments", default: "check .", placeholder: "check ." }
    ]
  },
  {
    id: "pnpm-dlx-exec",
    title: "Execute Ephemeral Node Package (pnpm dlx)",
    description: "Fetch and execute an npm package binary without installing it globally.",
    command: "pnpm dlx {{package}} {{args}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["pnpm", "dlx", "npx", "node", "execute"],
    dangerLevel: "safe",
    proTip: "Fast alternative to npx that respects pnpm's content-addressable store.",
    params: [
      { name: "package", label: "Package Name", default: "create-astro@latest", placeholder: "package" },
      { name: "args", label: "Arguments", default: "--help", placeholder: "flags" }
    ]
  },
  {
    id: "pnpm-store-prune",
    title: "Prune Unused pnpm Store Cache",
    description: "Clean up unreferenced packages from the global pnpm store to reclaim disk space.",
    command: "pnpm store prune",
    platforms: ["all"],
    category: "runtimes",
    tags: ["pnpm", "store", "prune", "disk", "clean"],
    dangerLevel: "safe",
    outputExample: "Removed 148 unreferenced packages from the store.\nReclaimed 1.42 GB."
  },
  {
    id: "pnpm-outdated",
    title: "Check Outdated Dependencies (pnpm)",
    description: "Inspect packages with newer versions available according to semver.",
    command: "pnpm outdated",
    platforms: ["all"],
    category: "runtimes",
    tags: ["pnpm", "outdated", "update", "dependencies"],
    dangerLevel: "safe",
    proTip: "Run \"pnpm update -i --latest\" for an interactive CLI checkbox updater."
  },
  {
    id: "bun-run-script",
    title: "Execute TS/JS File Instantly (Bun)",
    description: "Run TypeScript or JavaScript directly without transpiration or node_modules setup.",
    command: "bun run {{file}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["bun", "typescript", "javascript", "runtime", "fast"],
    dangerLevel: "safe",
    proTip: "Bun natively understands TypeScript, JSX, and ES modules out of the box.",
    params: [
      { name: "file", label: "Target File", default: "src/index.ts", placeholder: "index.ts" }
    ]
  },
  {
    id: "bun-test-suite",
    title: "Run Fast Tests with Bun Test Runner",
    description: "Run Jest/Vitest compatible test suite at maximum speed.",
    command: "bun test {{testFilter}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["bun", "test", "runner", "vitest", "jest"],
    dangerLevel: "safe",
    params: [
      { name: "testFilter", label: "Filter / File Pattern", default: "", placeholder: "auth" }
    ],
    outputExample: "bun test v1.1.20 (Linux x64)\n✓ src/tests/auth.test.ts > login (1.2ms)\n✓ src/tests/auth.test.ts > logout (0.8ms)\n\n2 pass, 0 fail\nRan 2 tests across 1 file in 22.4ms."
  },
  {
    id: "bun-compile-binary",
    title: "Compile TS Script to Standalone Binary",
    description: "Produce a single standalone executable from a TypeScript file using Bun.",
    command: "bun build {{entry}} --compile --outfile {{output}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["bun", "compile", "binary", "executable", "standalone"],
    dangerLevel: "safe",
    proTip: "The generated binary bundles the Bun runtime and all imports with zero external dependencies.",
    params: [
      { name: "entry", label: "Entry File", default: "./cli.ts", placeholder: "index.ts" },
      { name: "output", label: "Output Binary", default: "./my-cli", placeholder: "my-app" }
    ]
  },
  {
    id: "npm-cache-clean",
    title: "Force Clean npm Global Cache",
    description: "Purge all cached tarballs and metadata from ~/.npm cache.",
    command: "npm cache clean --force && npm cache verify",
    platforms: ["all"],
    category: "runtimes",
    tags: ["npm", "cache", "clean", "purge", "node"],
    dangerLevel: "caution",
    proTip: "Useful when experiencing cryptic EINTEGRITY checksum errors during npm install."
  },
  {
    id: "cargo-check-all",
    title: "Fast Rust Compile Check (Cargo)",
    description: "Type-check code and dependencies without generating machine binaries.",
    command: "cargo check --all-targets --all-features",
    platforms: ["all"],
    category: "runtimes",
    tags: ["cargo", "rust", "check", "compiler", "fast"],
    dangerLevel: "safe",
    proTip: "Runs 5-10x faster than cargo build; ideal for rapid feedback during development.",
    outputExample: "    Checking serde v1.0.204\n    Checking cmds v1.0.0 (/workspace/cmds)\n    Finished dev [unoptimized + debuginfo] target(s) in 0.82s"
  },
  {
    id: "cargo-clippy-pedantic",
    title: "Strict Rust Linting (Clippy)",
    description: "Run comprehensive Rust linter with warnings treated as hard errors.",
    command: "cargo clippy --all-targets -- -D warnings",
    platforms: ["all"],
    category: "runtimes",
    tags: ["cargo", "rust", "clippy", "lint", "code-quality"],
    dangerLevel: "safe",
    proTip: "Run \"cargo clippy --fix\" to automatically apply recommended safe suggestions."
  },
  {
    id: "cargo-audit-deps",
    title: "Audit Rust Crates for Security CVEs",
    description: "Check Cargo.lock against the RustSec Advisory Database for vulnerabilities.",
    command: "cargo audit",
    platforms: ["all"],
    category: "runtimes",
    tags: ["cargo", "rust", "audit", "security", "cve"],
    dangerLevel: "safe",
    outputExample: "    Fetching advisory database from `https://github.com/RustSec/advisory-db`\n      Loaded 612 security advisories\n    Scanning Cargo.lock for vulnerabilities (84 crate dependencies)\nSuccess: 0 vulnerabilities found."
  },
  {
    id: "brew-update-cleanup",
    title: "Update Homebrew & Clean Cache",
    description: "Update formulas, upgrade packages, and purge cache.",
    command: "brew update && brew upgrade && brew cleanup -s",
    platforms: ["macos", "linux"],
    category: "runtimes",
    tags: ["brew", "homebrew", "update", "cleanup", "upgrade"],
    dangerLevel: "safe",
    proTip: "Use \"brew doctor\" if you encounter dependency or link warnings."
  },
  {
    id: "brew-export-bundle",
    title: "Export Brewfile Bundle",
    description: "Export installed CLI tools and casks to Brewfile.",
    command: "brew bundle dump --force --describe --file={{brewfilePath}}",
    platforms: ["macos"],
    category: "runtimes",
    tags: ["brew", "brewfile", "bundle", "backup", "dotfiles"],
    dangerLevel: "safe",
    proTip: "On a new Mac, simply run \"brew bundle install\" to restore all your software automatically.",
    params: [
      {
        name: "brewfilePath",
        label: "Target Brewfile",
        default: "~/Brewfile",
        placeholder: "~/Brewfile"
      }
    ]
  },
  {
    id: "apt-full-clean-update",
    title: "Full APT Upgrade & Clean",
    description: "Update package lists, upgrade system, and autoremove.",
    command: "sudo apt update && sudo apt full-upgrade -y && sudo apt autoremove --purge -y && sudo apt clean",
    platforms: ["linux"],
    category: "runtimes",
    tags: ["apt", "ubuntu", "debian", "update", "upgrade", "clean"],
    dangerLevel: "caution",
    proTip: "\"full-upgrade\" will handle dependencies with new packages, unlike standard \"upgrade\"."
  },
  {
    id: "pacman-arch-sync",
    title: "Arch Linux Sync & Clean",
    description: "Synchronize packages, update system, and clean cache.",
    command: "sudo pacman -Syu && sudo pacman -Rns $(pacman -Qtdq 2>/dev/null || true)",
    platforms: ["linux"],
    category: "runtimes",
    tags: ["pacman", "arch", "update", "sync", "clean"],
    dangerLevel: "caution",
    proTip: "To clean old package cache files in /var/cache/pacman/pkg, run: sudo paccache -r"
  },
  {
    id: "winget-upgrade-all",
    title: "Upgrade All Installed Windows Apps",
    description: "Batch update all installed Windows applications using Windows Package Manager.",
    command: "winget upgrade --all --include-unknown",
    platforms: ["windows"],
    category: "runtimes",
    tags: ["winget", "windows", "package-manager", "upgrade", "update"],
    dangerLevel: "safe",
    proTip: "Add \"--silent\" to run installers in the background without UI dialogs."
  }
];
