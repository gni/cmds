import type { TerminalCommand } from "../types";

/**
 * Daily Essentials (⚡)
 * Standard, universal built-in Linux/Unix terminal commands:
 * ls, find, grep, du, ln, killall, diff, cat, scp, and high-frequency shortcuts.
 */
export const essentialsCommands: TerminalCommand[] = [
  {
    id: "ls-sort-mtime",
    title: "List Files Sorted by Time (Newest Last)",
    description: "List all files including hidden ones with sizes, sorted chronologically with newest at the bottom.",
    command: "ls -lahtr {{directory}}",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["ls", "files", "list", "sort", "mtime", "recent"],
    dangerLevel: "safe",
    proTip: "The \"-r\" flag reverses the sort order so the most recently modified files appear right next to your shell prompt without scrolling.",
    params: [
      { name: "directory", label: "Directory", default: ".", placeholder: "." }
    ],
    outputExample: "drwxr-xr-x 12 user staff  384B Sep 10 20:14 .git\n-rw-r--r--  1 user staff  1.4K Sep 12 11:00 package.json\n-rw-r--r--  1 user staff  8.2K Sep 12 11:28 src/index.ts"
  },
  {
    id: "symlink-create",
    title: "Create Symbolic Link (Symlink)",
    description: "Create a symbolic link pointing to a target file or folder (target first, link second).",
    command: "ln -s {{targetPath}} {{linkName}}",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["ln", "symlink", "link", "shortcut", "filesystem"],
    dangerLevel: "safe",
    proTip: "Remember the parameter order: \"ln -s <existing-source> <new-shortcut-name>\". Always use absolute paths to avoid broken relative links.",
    params: [
      { name: "targetPath", label: "Target (Source) Path", default: "/var/log/nginx", placeholder: "/path/to/target" },
      { name: "linkName", label: "Link Name", default: "~/nginx_logs", placeholder: "link_name" }
    ]
  },
  {
    id: "grep-recursive-clean",
    title: "Search Text in Directory (Skip Binaries)",
    description: "Search text recursively with line numbers while automatically skipping binary files.",
    command: "grep -rnI \"{{pattern}}\" {{directory}}",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["grep", "search", "text", "find", "code"],
    dangerLevel: "safe",
    proTip: "-r is recursive, -n shows line numbers, and -I skips noisy binary files like images and compiled binaries.",
    params: [
      { name: "pattern", label: "Search Pattern", default: "API_KEY", placeholder: "keyword" },
      { name: "directory", label: "Search Directory", default: ".", placeholder: "." }
    ],
    outputExample: "src/config.ts:14:const API_KEY = process.env.SECRET_KEY;\nsrc/client.ts:88:  headers['Authorization'] = API_KEY;"
  },
  {
    id: "find-by-extension-standard",
    title: "Find Files by Extension (Built-in find)",
    description: "Locate all files matching a specific extension recursively across directories.",
    command: "find {{directory}} -type f -name \"*.{{ext}}\"",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["find", "search", "files", "extension"],
    dangerLevel: "safe",
    proTip: "Add \"-maxdepth 2\" if you only want to inspect top-level subdirectories without descending deeper.",
    params: [
      { name: "directory", label: "Directory", default: ".", placeholder: "." },
      { name: "ext", label: "File Extension", default: "ts", placeholder: "log, ts, json" }
    ],
    outputExample: "./src/data/commands.ts\n./src/pages/index.astro\n./astro.config.mjs"
  },
  {
    id: "du-folders-sorted",
    title: "Top 10 Largest Folders in Path",
    description: "Calculate disk space used by each folder in path and sort by size.",
    command: "du -sh {{path}}/* | sort -hr | head -n 10",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["du", "disk", "storage", "sort", "size", "clean"],
    dangerLevel: "safe",
    proTip: "Standard POSIX coreutil command that works across all Linux distros, macOS, and BSD without installing anything.",
    params: [
      { name: "path", label: "Directory", default: ".", placeholder: "/var" }
    ],
    outputExample: "4.2G    ./node_modules\n1.8G    ./dist\n750M    ./videos\n120M    ./build"
  },
  {
    id: "diff-unified-files",
    title: "Compare Two Files (Unified Diff)",
    description: "Compare differences between two text files side by side with line numbers.",
    command: "diff -u {{file1}} {{file2}}",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["diff", "compare", "patch", "text", "files"],
    dangerLevel: "safe",
    proTip: "Add \"-w\" to ignore whitespace differences when comparing formatted code.",
    params: [
      { name: "file1", label: "Original File", default: "config.env.example", placeholder: "file1" },
      { name: "file2", label: "Modified File", default: "config.env", placeholder: "file2" }
    ],
    outputExample: "--- config.env.example\n+++ config.env\n@@ -1,3 +1,3 @@\n-PORT=3000\n+PORT=8080\n DB_HOST=localhost"
  },
  {
    id: "killall-process-name",
    title: "Kill All Processes by Exact Name",
    description: "Send termination signal to all running instances of a process by executable name.",
    command: "killall -9 {{processName}}",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["killall", "kill", "process", "terminate", "stop"],
    dangerLevel: "dangerous",
    proTip: "Use \"pgrep -fl {{processName}}\" first to verify what processes are currently running before terminating.",
    params: [
      { name: "processName", label: "Process Name", default: "node", placeholder: "python3" }
    ]
  },
  {
    id: "scp-remote-copy",
    title: "Secure Remote File Transfer (SCP)",
    description: "Copy file securely to remote server over SSH connection.",
    command: "scp -P {{port}} {{localFile}} {{user}}@{{host}}:{{remotePath}}",
    platforms: ["linux", "macos", "windows"],
    category: "essentials",
    tags: ["scp", "ssh", "copy", "transfer", "remote"],
    dangerLevel: "safe",
    proTip: "To copy a whole folder recursively, simply add \"-r\" after scp.",
    params: [
      { name: "port", label: "SSH Port", default: "22", placeholder: "22" },
      { name: "localFile", label: "Local File", default: "archive.tar.gz", placeholder: "file.txt" },
      { name: "user", label: "Remote User", default: "ubuntu", placeholder: "root" },
      { name: "host", label: "Remote Host", default: "198.51.100.42", placeholder: "server.com" },
      { name: "remotePath", label: "Remote Destination", default: "/var/www/", placeholder: "/path/" }
    ]
  },
  {
    id: "cat-numbered-lines",
    title: "Print File with Line Numbers",
    description: "Display text file contents with line numbers prefixed to each row.",
    command: "cat -n {{file}} | head -n {{lines}}",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["cat", "lines", "view", "text", "head"],
    dangerLevel: "safe",
    params: [
      { name: "file", label: "File Path", default: "package.json", placeholder: "file.txt" },
      { name: "lines", label: "Max Lines", default: "30", placeholder: "50" }
    ],
    outputExample: "     1  {\n     2    \"name\": \"cmds\",\n     3    \"version\": \"1.0.0\""
  },
  {
    id: "history-grep-search",
    title: "Search Shell Command History",
    description: "Filter terminal command history to find previously executed one-liners.",
    command: "history | grep \"{{keyword}}\"",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["history", "search", "grep", "recall", "bash"],
    dangerLevel: "safe",
    params: [
      { name: "keyword", label: "Search Term", default: "ssh", placeholder: "docker" }
    ],
    outputExample: " 1042  ssh -i ~/.ssh/prod.pem deploy@srv1\n 1089  ssh -L 5432:localhost:5432 bastion"
  },
  {
    id: "tail-follow-live",
    title: "Tail Live Log Output with Auto-Follow",
    description: "Display the last N lines of a file and stream new lines as they are appended.",
    command: "tail -n {{lines}} -f {{file}}",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["tail", "follow", "logs", "stream", "live"],
    dangerLevel: "safe",
    proTip: "Press Ctrl+C to stop following the log stream.",
    params: [
      { name: "lines", label: "Initial Lines", default: "100", placeholder: "50" },
      { name: "file", label: "Log File", default: "/var/log/nginx/access.log", placeholder: "app.log" }
    ]
  },
  {
    id: "kill-port",
    title: "Kill Process by Port",
    description: "Terminate process listening on a specific TCP port.",
    command: "kill -9 $(lsof -t -i:{{port}})",
    platforms: ["linux", "macos"],
    category: "essentials",
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
        note: "PowerShell"
      },
      { platform: "linux", command: "fuser -k {{port}}/tcp", note: "Requires psmisc package" }
    ],
    outputExample: "[1]  + 42819 killed    node server.js"
  },
  {
    id: "quick-http-server",
    title: "Instant Local HTTP Server",
    description: "Serve current directory over HTTP using built-in Python.",
    command: "python3 -m http.server {{port}}",
    platforms: ["linux", "macos", "windows"],
    category: "essentials",
    tags: ["http", "server", "python", "static", "preview", "web"],
    dangerLevel: "safe",
    proTip: "Append \"--bind 127.0.0.1\" if you only want localhost access and not your entire local network.",
    params: [
      { name: "port", label: "Port", default: "8080", placeholder: "8080" }
    ],
    outputExample: "Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ..."
  },
  {
    id: "download-resume",
    title: "Download File with Auto-Resume",
    description: "Download file from URL, automatically resuming if interrupted.",
    command: "curl -C - -O -L {{url}}",
    platforms: ["linux", "macos", "windows"],
    category: "essentials",
    tags: ["curl", "download", "resume", "http", "network"],
    dangerLevel: "safe",
    proTip: "The -L flag follows 301/302 redirects, -O saves with remote file name, -C - enables automatic resume.",
    params: [
      {
        name: "url",
        label: "File URL",
        default: "https://example.com/archive.tar.gz",
        placeholder: "https://..."
      }
    ]
  },
  {
    id: "public-ip",
    title: "Get Public IP Address",
    description: "Retrieve external WAN IP directly from terminal.",
    command: "curl -s https://ifconfig.me",
    platforms: ["linux", "macos", "windows"],
    category: "essentials",
    tags: ["ip", "network", "wan", "curl", "public"],
    dangerLevel: "safe",
    proTip: "Alternatively use \"curl -s https://icanhazip.com\" or \"dig -4 TXT +short o-o.myaddr.l.google.com @ns1.google.com\".",
    outputExample: "198.51.100.42"
  },
  {
    id: "format-json-cli",
    title: "Prettify JSON with Python Built-in",
    description: "Format and colorize JSON stream without third-party dependencies.",
    command: "python3 -m json.tool {{file}}",
    platforms: ["all"],
    category: "essentials",
    tags: ["json", "python", "format", "pretty", "text"],
    dangerLevel: "safe",
    params: [
      { name: "file", label: "File Path", default: "data.json", placeholder: "data.json" }
    ]
  },
  {
    id: "measure-command-time",
    title: "Benchmark Command Execution",
    description: "Measure wall-clock, user, and kernel CPU execution time.",
    command: "time {{command}}",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["perf", "benchmark", "time", "speed", "profile"],
    dangerLevel: "safe",
    params: [
      {
        name: "command",
        label: "Command",
        default: "npm run build",
        placeholder: "command to test"
      }
    ],
    outputExample: "real    0m1.428s\nuser    0m2.110s\nsys     0m0.312s"
  },
  {
    id: "mkdir-cd-single",
    title: "Create Nested Dir and Enter",
    description: "Create directory tree recursively and cd into it in a single step.",
    command: "mkdir -p {{folder}} && cd $_",
    platforms: ["linux", "macos"],
    category: "essentials",
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
    ]
  },
  {
    id: "watch-command-diff",
    title: "Live Command Output Watcher",
    description: "Run command repeatedly and highlight visual differences in real-time.",
    command: "watch -n {{interval}} -d \"{{command}}\"",
    platforms: ["linux", "macos"],
    category: "essentials",
    tags: ["watch", "monitor", "diff", "live", "interval"],
    dangerLevel: "safe",
    proTip: "-d highlights exactly which characters or values changed between iterations.",
    params: [
      { name: "interval", label: "Interval (sec)", default: "1", placeholder: "2" },
      { name: "command", label: "Command", default: "df -h", placeholder: "uptime" }
    ]
  }
];
