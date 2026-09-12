import type { TerminalCommand } from "../types";

/**
 * Files & Text (📁)
 * Search, archives, rsync, ripgrep, jq, sed, awk, xargs, and permissions.
 */
export const filesTextCommands: TerminalCommand[] = [
  {
    id: "ripgrep-code-search",
    title: "Fast Code Search with Regex (ripgrep)",
    description: "Search code recursively respecting .gitignore with line numbers.",
    command: "rg -n --hidden -g \"!{.git,node_modules,dist}\" \"{{pattern}}\" {{searchPath}}",
    platforms: ["linux", "macos", "windows"],
    category: "files-text",
    tags: ["ripgrep", "rg", "grep", "search", "regex", "fast"],
    dangerLevel: "safe",
    proTip: "Add \"-C 2\" to view 2 lines of surrounding code context for each match.",
    params: [
      {
        name: "pattern",
        label: "Search Query",
        default: "handleWebhook",
        placeholder: "regex query"
      },
      { name: "searchPath", label: "Directory", default: ".", placeholder: "." }
    ],
    alternatives: [
      {
        platform: "all",
        command: "grep -rnI --exclude-dir={.git,node_modules,dist} \"{{pattern}}\" {{searchPath}}",
        note: "Built-in standard grep (no install needed)"
      }
    ],
    outputExample: "src/routes/api.ts:42:export async function handleWebhook(req: Request) {\nsrc/routes/api.ts:89:  logger.info(\"handleWebhook completed\");"
  },
  {
    id: "jq-extract-key-raw",
    title: "Extract Nested JSON Field (jq)",
    description: "Extract unquoted raw string value from nested JSON data.",
    command: "cat {{file}} | jq -r '{{query}}'",
    platforms: ["all"],
    category: "files-text",
    tags: ["jq", "json", "filter", "extract", "parse"],
    dangerLevel: "safe",
    proTip: "The -r flag strips surrounding quotes, perfect for feeding secrets into shell variables.",
    params: [
      { name: "file", label: "JSON File", default: "package.json", placeholder: "file.json" },
      { name: "query", label: "jq Query", default: ".scripts.build", placeholder: ".data.id" }
    ],
    outputExample: "astro build"
  },
  {
    id: "jq-filter-array",
    title: "Filter and Reshape JSON Array (jq)",
    description: "Iterate through items, filter by condition, and construct new object.",
    command: "cat {{file}} | jq '[.items[] | select({{condition}}) | {id, name}]'",
    platforms: ["all"],
    category: "files-text",
    tags: ["jq", "json", "array", "select", "transform"],
    dangerLevel: "safe",
    params: [
      { name: "file", label: "JSON File", default: "response.json", placeholder: "data.json" },
      { name: "condition", label: "Filter Condition", default: ".status == \"active\"", placeholder: ".active == true" }
    ]
  },
  {
    id: "column-table-view",
    title: "Pretty Print CSV/TSV as Aligned Table",
    description: "Format delimited text stream into clean visually aligned columns.",
    command: "column -t -s'{{delimiter}}' {{file}}",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["column", "csv", "table", "format", "text"],
    dangerLevel: "safe",
    params: [
      { name: "delimiter", label: "Delimiter", default: ",", placeholder: "," },
      { name: "file", label: "Delimited File", default: "data.csv", placeholder: "file.csv" }
    ]
  },
  {
    id: "dos2unix-strip-crlf",
    title: "Strip Windows CRLF Line Endings",
    description: "Convert Windows CRLF newlines to Unix LF using tr.",
    command: "tr -d '\\r' < {{inputFile}} > {{outputFile}}",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["tr", "dos2unix", "crlf", "newline", "format"],
    dangerLevel: "safe",
    proTip: "Prevents mysterious \"^M: bad interpreter\" errors when executing bash scripts on Linux.",
    params: [
      { name: "inputFile", label: "Input File", default: "script.sh", placeholder: "windows.sh" },
      { name: "outputFile", label: "Output File", default: "script_unix.sh", placeholder: "clean.sh" }
    ]
  },
  {
    id: "sed-replace-all",
    title: "Batch Replace String in Files in Place",
    description: "Batch replace string in files in place directly on disk.",
    command: "sed -i \"s/{{search}}/{{replace}}/g\" {{files}}",
    platforms: ["linux"],
    category: "files-text",
    tags: ["sed", "replace", "regex", "batch", "substitute"],
    dangerLevel: "caution",
    proTip: "On macOS (BSD sed), use \"sed -i '' 's/find/replace/g' file\" because BSD requires an empty string for backup extension.",
    params: [
      { name: "search", label: "Find", default: "oldApiEndpoint", placeholder: "old_val" },
      { name: "replace", label: "Replace", default: "newApiEndpoint", placeholder: "new_val" },
      { name: "files", label: "Target Files", default: "*.config.json", placeholder: "*.ts" }
    ],
    alternatives: [
      {
        platform: "macos",
        command: "sed -i '' \"s/{{search}}/{{replace}}/g\" {{files}}",
        note: "macOS BSD syntax"
      }
    ]
  },
  {
    id: "awk-column-sum",
    title: "Sum Column Numbers with awk",
    description: "Calculate numerical sum of column N from text stream.",
    command: "awk '{sum += ${{column}}} END {print \"Total: \" sum}' {{file}}",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["awk", "sum", "math", "calc", "column", "csv"],
    dangerLevel: "safe",
    proTip: "Add -F\",\" to handle standard comma-separated CSV files.",
    params: [
      { name: "column", label: "Column Number", default: "2", placeholder: "2" },
      { name: "file", label: "Data File", default: "metrics.txt", placeholder: "data.txt" }
    ],
    outputExample: "Total: 48921.50"
  },
  {
    id: "extract-unique-ips",
    title: "Top Unique IPs from Log",
    description: "Parse access log and rank top visitors by frequency.",
    command: "awk '{print $1}' {{logFile}} | sort | uniq -c | sort -nr | head -n 10",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["awk", "sort", "uniq", "logs", "ip", "ddos", "analytics"],
    dangerLevel: "safe",
    params: [
      {
        name: "logFile",
        label: "Access Log",
        default: "/var/log/nginx/access.log",
        placeholder: "access.log"
      }
    ],
    outputExample: "  1420 192.168.1.50\n   890 10.0.0.12\n   412 172.16.0.4"
  },
  {
    id: "xargs-parallel-execution",
    title: "Parallel Execution with xargs",
    description: "Execute tasks concurrently across CPU cores.",
    command: "cat {{inputList}} | xargs -n 1 -P {{cores}} -I {} {{command}}",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["xargs", "parallel", "multithread", "batch", "speed"],
    dangerLevel: "caution",
    proTip: "-P controls parallel worker processes (e.g. -P 8 for 8 simultaneous tasks).",
    params: [
      { name: "inputList", label: "Input List", default: "urls.txt", placeholder: "urls.txt" },
      { name: "cores", label: "Workers", default: "8", placeholder: "4" },
      {
        name: "command",
        label: "Command template",
        default: "curl -O {}",
        placeholder: "curl -O {}"
      }
    ]
  },
  {
    id: "sed-delete-empty-lines",
    title: "Strip Blank Lines from File",
    description: "Remove blank and whitespace-only lines from a file in place.",
    command: "sed -i '/^[[:space:]]*$/d' {{file}}",
    platforms: ["linux"],
    category: "files-text",
    tags: ["sed", "cleanup", "clean", "lines", "format"],
    dangerLevel: "safe",
    params: [
      { name: "file", label: "Target File", default: "config.env", placeholder: "file.txt" }
    ]
  },
  {
    id: "find-modified-recently",
    title: "Find Recently Modified Files",
    description: "Locate files modified within the last N days or minutes.",
    command: "find {{directory}} -type f -mtime -{{days}}",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["find", "mtime", "modified", "recent", "files"],
    dangerLevel: "safe",
    proTip: "Use \"-mmin -60\" instead of \"-mtime\" to search for changes within the last 60 minutes.",
    params: [
      { name: "directory", label: "Directory", default: ".", placeholder: "." },
      { name: "days", label: "Days", default: "1", placeholder: "1" }
    ]
  },
  {
    id: "purge-node-modules",
    title: "Recursively Delete node_modules",
    description: "Find and delete all node_modules directories in tree.",
    command: "find {{directory}} -name \"node_modules\" -type d -prune -exec rm -rf '{}' +",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["node_modules", "clean", "rm", "disk", "purge"],
    dangerLevel: "caution",
    proTip: "Using -prune prevents find from descending into the node_modules folder itself, speeding it up 10x.",
    params: [
      { name: "directory", label: "Directory", default: ".", placeholder: "~/code" }
    ]
  },
  {
    id: "rsync-backup-sync",
    title: "Mirror Dirs with rsync Resume",
    description: "Delta file sync with permissions and resume capability.",
    command: "rsync -avzP --delete {{source}}/ {{destination}}/",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["rsync", "backup", "mirror", "sync", "transfer"],
    dangerLevel: "caution",
    proTip: "Trailing slashes matter: \"source/\" copies folder contents, while \"source\" copies the folder itself.",
    params: [
      {
        name: "source",
        label: "Source Path",
        default: "./project",
        placeholder: "/path/to/src"
      },
      {
        name: "destination",
        label: "Destination Path",
        default: "/mnt/backup/project",
        placeholder: "/path/to/dest"
      }
    ]
  },
  {
    id: "compress-zstd-tar",
    title: "Compress Archive with Zstandard (zstd)",
    description: "Create tar archive using multi-threaded Zstandard.",
    command: "tar --zstd -cvf {{archiveName}}.tar.zst {{sourceDir}}",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["tar", "zstd", "compress", "archive", "fast"],
    dangerLevel: "safe",
    proTip: "Zstandard compresses 5x faster than gzip with higher compression ratios.",
    params: [
      {
        name: "archiveName",
        label: "Archive Base Name",
        default: "backup_2026",
        placeholder: "backup"
      },
      {
        name: "sourceDir",
        label: "Folder to Compress",
        default: "./data",
        placeholder: "folder"
      }
    ]
  },
  {
    id: "extract-any-archive",
    title: "Extract Compressed Tar Archive",
    description: "Auto-extract tar archive (gz, bz2, xz, zst) to directory.",
    command: "tar -xvf {{archiveFile}} -C {{destDir}}",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["tar", "extract", "unzip", "unpack", "archive"],
    dangerLevel: "safe",
    params: [
      {
        name: "archiveFile",
        label: "Archive File",
        default: "bundle.tar.gz",
        placeholder: "archive.tar.gz"
      },
      { name: "destDir", label: "Target Directory", default: ".", placeholder: "./extracted" }
    ]
  },
  {
    id: "tar-create-gzip",
    title: "Create Standard Gzip Tar Archive",
    description: "Create standard gzip-compressed tar archive compatible with all Unix systems.",
    command: "tar -czvf {{archiveName}}.tar.gz {{sourceDir}}",
    platforms: ["all"],
    category: "files-text",
    tags: ["tar", "gzip", "archive", "compress", "backup"],
    dangerLevel: "safe",
    params: [
      { name: "archiveName", label: "Archive Name", default: "project_backup", placeholder: "archive" },
      { name: "sourceDir", label: "Source Directory", default: "./src", placeholder: "./folder" }
    ]
  },
  {
    id: "shred-secure-delete",
    title: "Securely Shred Sensitive File",
    description: "Overwrite file with random data before unlinking to prevent forensic recovery.",
    command: "shred -u -z -n 3 {{filePath}}",
    platforms: ["linux"],
    category: "files-text",
    tags: ["shred", "secure", "delete", "privacy", "wipe"],
    dangerLevel: "dangerous",
    proTip: "-u removes file after overwriting, -z hides shredding by zero-filling, and -n 3 performs 3 passes.",
    params: [
      {
        name: "filePath",
        label: "File to Shred",
        default: "secret.key",
        placeholder: "secret.key"
      }
    ]
  },
  {
    id: "file-chmod-recursive-dirs-files",
    title: "Fix Dir & File Permissions",
    description: "Apply 755 to directories and 644 to files recursively.",
    command: "find {{directory}} -type d -exec chmod 755 {} + && find {{directory}} -type f -exec chmod 644 {} +",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["chmod", "permissions", "755", "644", "fix"],
    dangerLevel: "caution",
    proTip: "Never run \"chmod -R 777\"! Use this standard split for web servers and project repos.",
    params: [
      {
        name: "directory",
        label: "Target Directory",
        default: "./public",
        placeholder: "/var/www"
      }
    ]
  },
  {
    id: "chown-user-recursive",
    title: "Chown Directory to Current User",
    description: "Recursively transfer ownership of directory to the current user.",
    command: "sudo chown -R $USER:$USER {{directory}}",
    platforms: ["linux", "macos"],
    category: "files-text",
    tags: ["chown", "permissions", "owner", "sudo"],
    dangerLevel: "caution",
    params: [
      {
        name: "directory",
        label: "Target Directory",
        default: "./project",
        placeholder: "/path"
      }
    ]
  },
  {
    id: "macos-pbcopy-paste",
    title: "Copy & Paste via macOS Clipboard",
    description: "Pipe output directly into macOS system clipboard and read it back.",
    command: "{{command}} | pbcopy && pbpaste",
    platforms: ["macos"],
    category: "files-text",
    tags: ["pbcopy", "pbpaste", "clipboard", "macos"],
    dangerLevel: "safe",
    params: [
      { name: "command", label: "Command", default: "cat ~/.ssh/id_ed25519.pub", placeholder: "command" }
    ]
  }
];
