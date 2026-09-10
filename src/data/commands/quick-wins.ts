import type { TerminalCommand } from "../types";

/**
 * Quick Wins (⚡)
 * Instant life-savers, emergency one-liners, and high-frequency shortcuts.
 */
export const quickWinsCommands: TerminalCommand[] = [
  {
    id: "kill-port",
    title: "Kill Process by Port Number",
    description: "Finds and forcefully terminates whichever process is holding a specific TCP port hostage.",
    command: "kill -9 $(lsof -t -i:{{port}})",
    platforms: ["linux", "macos"],
    category: "quick-wins",
    tags: ["port", "kill", "lsof", "free", "tcp", "server"],
    dangerLevel: "caution",
    proTip: "For Linux systems without lsof installed, use \"fuser -k {{port}}/tcp\".",
    params: [
      { name: "port", label: "Port", default: "3000", placeholder: "3000" }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "Stop-Process -Id (Get-NetTCPConnection -LocalPort {{port}}).OwningProcess -Force",
        note: "PowerShell 5.1 / 7+"
      },
      { platform: "linux", command: "fuser -k {{port}}/tcp", note: "Requires psmisc package" }
    ],
    outputExample: "[1]  + 42819 killed    node server.js"
  },
  {
    id: "find-large-files",
    title: "Find Largest Files on Disk",
    description: "Quickly locates the top 10 heaviest files or directories in the current folder, human-readable.",
    command: "du -ah {{path}} | sort -rh | head -n 10",
    platforms: ["linux", "macos"],
    category: "quick-wins",
    tags: ["disk", "storage", "size", "du", "heavy", "clean"],
    dangerLevel: "safe",
    proTip: "Use ncdu for an interactive cursor-based visual disk usage explorer if installed.",
    params: [
      { name: "path", label: "Directory", default: ".", placeholder: "." }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "Get-ChildItem -Path {{path}} -Recurse -File | Sort-Object Length -Descending | Select-Object -First 10 -Property FullName, @{Name=\"MB\";Expression={\"{0:N2}\" -f ($_.Length / 1MB)}}",
        note: "PowerShell native"
      }
    ],
    outputExample: "4.2G    ./node_modules\n1.8G    ./dist\n750M    ./videos/demo.mp4"
  },
  {
    id: "download-resume",
    title: "Download File with Auto-Resume",
    description: "Downloads a file from a URL and automatically resumes from where it left off if interrupted.",
    command: "curl -C - -O -L {{url}}",
    platforms: ["linux", "macos", "windows"],
    category: "quick-wins",
    tags: ["curl", "download", "resume", "http", "network"],
    dangerLevel: "safe",
    proTip: "The -L flag follows 301/302 redirects, -O saves with remote file name, -C - enables automatic resume.",
    params: [
      {
        name: "url",
        label: "File URL",
        default: "https://example.com/huge-file.iso",
        placeholder: "https://..."
      }
    ],
    alternatives: [
      { platform: "linux", command: "wget -c {{url}}", note: "Wget continuation" }
    ]
  },
  {
    id: "quick-http-server",
    title: "Instant Local HTTP Static Server",
    description: "Serves current directory over HTTP without installing any npm or third-party web server.",
    command: "python3 -m http.server {{port}}",
    platforms: ["linux", "macos", "windows"],
    category: "quick-wins",
    tags: ["http", "server", "python", "static", "preview", "web"],
    dangerLevel: "safe",
    proTip: "Append --bind 127.0.0.1 if you only want localhost access and not your entire LAN.",
    params: [
      { name: "port", label: "Port", default: "8080", placeholder: "8080" }
    ],
    alternatives: [
      { platform: "all", command: "npx serve -l {{port}}", note: "Using Node.js npx" }
    ],
    outputExample: "Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ..."
  },
  {
    id: "public-ip",
    title: "Get Public IP Address Instantly",
    description: "Retrieves your external WAN IP directly from the terminal without opening a browser.",
    command: "curl -s https://ifconfig.me",
    platforms: ["linux", "macos", "windows"],
    category: "quick-wins",
    tags: ["ip", "network", "wan", "curl", "public"],
    dangerLevel: "safe",
    proTip: "Alternatively use \"curl -s https://icanhazip.com\" or \"dig -4 TXT +short o-o.myaddr.l.google.com @ns1.google.com\".",
    outputExample: "198.51.100.42"
  },
  {
    id: "format-json-cli",
    title: "Prettify & Colorize JSON Stream",
    description: "Streams raw minified JSON into readable, syntax-highlighted indentation.",
    command: "cat {{file}} | jq .",
    platforms: ["linux", "macos", "windows"],
    category: "quick-wins",
    tags: ["json", "jq", "format", "pretty", "text"],
    dangerLevel: "safe",
    proTip: "If jq is not installed, use: python3 -m json.tool {{file}}",
    params: [
      { name: "file", label: "File Path", default: "data.json", placeholder: "data.json" }
    ]
  },
  {
    id: "measure-command-time",
    title: "Benchmark Command Execution Speed",
    description: "Measures precise wall-clock, user, and kernel CPU time spent running any command.",
    command: "time {{command}}",
    platforms: ["linux", "macos"],
    category: "quick-wins",
    tags: ["perf", "benchmark", "time", "speed", "profile"],
    dangerLevel: "safe",
    proTip: "For statistical multi-run benchmarks with warm-ups, install and use \"hyperfine '{{command}}'\".",
    params: [
      {
        name: "command",
        label: "Command",
        default: "npm run build",
        placeholder: "command to test"
      }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "Measure-Command { {{command}} }",
        note: "PowerShell native timer"
      }
    ],
    outputExample: "real    0m1.428s\nuser    0m2.110s\nsys     0m0.312s"
  },
  {
    id: "mkdir-cd-single",
    title: "Create Nested Directory and Enter It",
    description: "Creates multi-tier directories recursively and changes into the leaf folder in one step.",
    command: "mkdir -p {{folder}} && cd $_",
    platforms: ["linux", "macos"],
    category: "quick-wins",
    tags: ["mkdir", "cd", "navigation", "bash", "zsh"],
    dangerLevel: "safe",
    proTip: "$_ represents the last argument of the previous command in Bash and Zsh.",
    params: [
      {
        name: "folder",
        label: "Folder Path",
        default: "src/components/ui",
        placeholder: "nested/path"
      }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "New-Item -ItemType Directory -Path {{folder}} -Force; Set-Location {{folder}}",
        note: "PowerShell"
      }
    ]
  },
  {
    id: "fzf-history-search",
    title: "Interactive Fuzzy Reverse Search Terminal History",
    description: "Fuzzy finds previous commands in your shell history and runs or copies the match.",
    command: "cat ~/.bash_history | fzf --tac",
    platforms: ["linux", "macos"],
    category: "quick-wins",
    tags: ["fzf", "history", "fuzzy", "search", "fast"],
    dangerLevel: "safe",
    proTip: "In Zsh use: cat ~/.zsh_history | fzf"
  }
];
