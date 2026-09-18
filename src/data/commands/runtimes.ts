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
    title: "Fast Pip Install (uv)",
    description: "Resolve and install Python dependencies using hard-linked caching and parallel resolution.",
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
    id: "uv-run-inline-ephemeral-deps",
    title: "Run Python One-Liner with Ephemeral Dependencies (uv)",
    description: "Execute inline code with on-the-fly PyPI package injection without touching any local virtualenv.",
    command: "uv run --with \"{{packages}}\" python -c \"{{code}}\"",
    platforms: ["all"],
    category: "runtimes",
    tags: ["uv", "python", "inline", "ephemeral", "dependencies"],
    dangerLevel: "safe",
    proTip: "Use --with multiple times or comma-separate packages to pull dependencies into an isolated ephemeral cache.",
    params: [
      { name: "packages", label: "Packages", default: "httpx,rich", placeholder: "package1,package2" },
      { name: "code", label: "Inline Code", default: "import httpx, rich; r=httpx.get('https://httpbin.org/json'); rich.print(r.json())", placeholder: "import ..." }
    ]
  },
  {
    id: "python-venv-copies-custom-prompt",
    title: "Create Standalone Virtualenv with Physical Copies",
    description: "Create an isolated environment with copied binaries instead of symlinks and custom shell prompt.",
    command: "python3 -m venv --copies --clear --prompt \"{{promptName}}\" {{venvDir}}",
    platforms: ["linux", "macos"],
    category: "runtimes",
    tags: ["python", "venv", "virtualenv", "copies", "isolation"],
    dangerLevel: "safe",
    proTip: "Using --copies prevents venv breakage when the underlying system Python or Homebrew package receives a minor version update.",
    params: [
      { name: "promptName", label: "Prompt Label", default: "worker-env", placeholder: "my-env" },
      { name: "venvDir", label: "Directory", default: ".venv", placeholder: ".venv" }
    ],
    outputExample: "Created virtual environment at .venv using copies of interpreter binaries"
  },
  {
    id: "python-venv-direct-exec",
    title: "Execute Module Directly via Virtualenv Interpreter",
    description: "Run scripts or modules through the virtualenv binary directly without activating a subshell.",
    command: "./{{venvDir}}/bin/python -m {{module}} {{args}}",
    platforms: ["linux", "macos"],
    category: "runtimes",
    tags: ["python", "venv", "exec", "subshell", "automation"],
    dangerLevel: "safe",
    proTip: "The interpreter automatically resolves site-packages relative to sys.executable via pyvenv.cfg; activating the subshell is never required in scripts or systemd units.",
    params: [
      { name: "venvDir", label: "Venv Directory", default: ".venv", placeholder: ".venv" },
      { name: "module", label: "Module Name", default: "uvicorn", placeholder: "uvicorn" },
      { name: "args", label: "Arguments", default: "app.main:app --port 8000", placeholder: "main:app" }
    ]
  },
  {
    id: "python-venv-repair-broken-symlinks",
    title: "Repair Broken Virtualenv Symlinks After Host Upgrade",
    description: "Delete dangling symlinks caused by system Python upgrades and re-point the virtual environment.",
    command: "find {{venvDir}} -type l ! -exec test -e {} \\; -delete && python3 -m venv --upgrade {{venvDir}}",
    platforms: ["linux", "macos"],
    category: "runtimes",
    tags: ["python", "venv", "repair", "symlink", "upgrade"],
    dangerLevel: "caution",
    proTip: "Run this when python inside .venv fails with 'No such file or directory' after an OS or brew upgrade.",
    params: [
      { name: "venvDir", label: "Target Directory", default: ".venv", placeholder: ".venv" }
    ]
  },
  {
    id: "python-inspect-interpreter-paths",
    title: "Audit Active Interpreter Paths and Site-Packages",
    description: "Print exact executable binary, sys.prefix boundaries, and resolved site-packages directories.",
    command: "python3 -c \"import sys, site; print('bin:', sys.executable); print('prefix:', sys.prefix); print('site:', site.getsitepackages())\"",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "sys", "debug", "site-packages", "path"],
    dangerLevel: "safe",
    proTip: "Compare sys.prefix with sys.base_prefix to verify whether code is executing inside an active virtualenv.",
    outputExample: "bin: /workspace/.venv/bin/python3\nprefix: /workspace/.venv\nsite: ['/workspace/.venv/lib/python3.12/site-packages']"
  },
  {
    id: "python-live-thread-stack-dump",
    title: "Dump Running Thread Call Stacks on Demand",
    description: "Print traceback frames for every thread currently running in the Python process.",
    command: "python3 -c \"import sys, traceback; [traceback.print_stack(f) for f in sys._current_frames().values()]\"",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "thread", "stack", "traceback", "debug"],
    dangerLevel: "safe",
    proTip: "Use sys._current_frames() to diagnose deadlocks and hung workers in multi-threaded services without gdb."
  },
  {
    id: "python-disassemble-bytecode",
    title: "Disassemble Python Source to CPython Bytecode",
    description: "Inspect generated CPython bytecode instructions, opcodes, and jump targets for a script.",
    command: "python3 -m dis {{script}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "dis", "bytecode", "compiler", "internals"],
    dangerLevel: "safe",
    proTip: "Useful for checking whether an operation results in LOAD_FAST vs LOAD_GLOBAL and verifying loop optimizations.",
    params: [
      { name: "script", label: "Target Script", default: "script.py", placeholder: "script.py" }
    ],
    outputExample: "  1           0 RESUME                   0\n  2           2 LOAD_CONST               1 (10)\n              4 STORE_FAST               0 (x)\n              6 RETURN_CONST             0 (None)"
  },
  {
    id: "python-profile-cpu-cumulative",
    title: "Profile CPU Hotspots with cProfile",
    description: "Measure per-function invocation count and cumulative execution time sorted descending.",
    command: "python3 -m cProfile -s cumtime {{script}} | head -n 25",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "cprofile", "benchmark", "profiling", "performance"],
    dangerLevel: "safe",
    proTip: "Use -s cumtime to highlight high-level bottleneck functions, or -s tottime for internal function overhead.",
    params: [
      { name: "script", label: "Python Script", default: "app.py", placeholder: "app.py" }
    ]
  },
  {
    id: "python-measure-import-overhead",
    title: "Profile Module Import Latency with importtime",
    description: "Measure compilation and execution time of imported modules to detect slow startup bottlenecks.",
    command: "python3 -X importtime {{script}} 2>&1 | sort -k2 -n -r | head -n 20",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "importtime", "profiling", "startup", "latency"],
    dangerLevel: "safe",
    proTip: "The self [us] column shows time spent strictly within that module, excluding sub-imports.",
    params: [
      { name: "script", label: "Python Script", default: "main.py", placeholder: "main.py" }
    ],
    outputExample: "import time: self [us] | cumulative | imported package\nimport time:       1240 |       2850 | pandas\nimport time:        850 |        850 | numpy.core"
  },
  {
    id: "python-post-mortem-debugger",
    title: "Attach Post-Mortem Debugger on Uncaught Exception",
    description: "Automatically enter the pdb interactive debugger directly at the stack frame where a crash occurs.",
    command: "python3 -m pdb -c continue {{script}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "pdb", "debug", "crash", "post-mortem"],
    dangerLevel: "safe",
    proTip: "The '-c continue' flag runs the program immediately until an unhandled exception triggers the prompt.",
    params: [
      { name: "script", label: "Python Script", default: "failing_script.py", placeholder: "script.py" }
    ]
  },
  {
    id: "python-find-loaded-c-extensions",
    title: "Enumerate Loaded Native C Extensions in Memory",
    description: "Inspect sys.modules to list all compiled C, C++, or Rust shared libraries currently mapped in memory.",
    command: "python3 -c \"import sys; print('\\n'.join(m for m, mod in sys.modules.items() if getattr(mod, '__file__', '').endswith(('.so', '.pyd'))))\"",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "c-extensions", "so", "pyd", "native", "security"],
    dangerLevel: "safe",
    proTip: "Essential for verifying whether high-performance native kernels (e.g. simd, regex, uvloop) are loaded.",
    outputExample: "_posixsubprocess\nmath\n_socket\n_ssl\nselect"
  },
  {
    id: "python-decode-jwt-payload",
    title: "Decode JWT Payload Claims Without External Dependencies",
    description: "Extract and pretty-print JSON Web Token claims using standard library base64 and json modules.",
    command: "python3 -c \"import sys, json, base64; token=sys.argv[1].split('.')[1]; print(json.dumps(json.loads(base64.urlsafe_b64decode(token + '==')), indent=2))\" {{jwtToken}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "jwt", "base64", "json", "security", "token"],
    dangerLevel: "safe",
    proTip: "Appending '==' handles standard base64 padding requirements automatically.",
    params: [
      { name: "jwtToken", label: "JWT String", default: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvZSJ9.signature", placeholder: "eyJ..." }
    ],
    outputExample: "{\n  \"sub\": \"1234567890\",\n  \"name\": \"Joe\"\n}"
  },
  {
    id: "python-ast-syntax-tree",
    title: "Dump Python Abstract Syntax Tree (AST)",
    description: "Parse source code and output its structured abstract syntax tree directly to stdout.",
    command: "python3 -m ast {{script}}",
    platforms: ["all"],
    category: "runtimes",
    tags: ["python", "ast", "compiler", "parser", "syntax"],
    dangerLevel: "safe",
    proTip: "Use to inspect syntax representations, verify decorator transformations, or debug metaprogramming logic.",
    params: [
      { name: "script", label: "Python Script", default: "main.py", placeholder: "script.py" }
    ],
    outputExample: "Module(\n   body=[\n      Expr(\n         value=Call(\n            func=Name(id='print', ctx=Load()),\n            args=[\n               Constant(value='hello')]))])"
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
