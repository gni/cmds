import type { TerminalCommand } from "../types";

/**
 * Text & CLI Wrangling (🪄)
 * ripgrep, jq, yq, sed, awk, xargs parallel, and streaming transformations.
 */
export const textCommands: TerminalCommand[] = [
  {
    id: "ripgrep-code-search",
    title: "Fast Code Search with Regex (ripgrep)",
    description: "Search codebase recursively respecting .gitignore with line numbers.",
    command: "rg -n --hidden -g \"!{.git,node_modules,dist}\" \"{{pattern}}\" {{searchPath}}",
    platforms: ["linux", "macos", "windows"],
    category: "text",
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
    outputExample: "src/routes/api.ts:42:export async function handleWebhook(req: Request) {\nsrc/routes/api.ts:89:  logger.info(\"handleWebhook completed\");"
  },
  {
    id: "sed-replace-all",
    title: "Batch Replace String in Files in Place",
    description: "Replaces all occurrences of a string across files directly on disk.",
    command: "sed -i \"s/{{search}}/{{replace}}/g\" {{files}}",
    platforms: ["linux"],
    category: "text",
    tags: ["sed", "replace", "regex", "batch", "substitute"],
    dangerLevel: "caution",
    proTip: "On macOS (BSD sed), use \"sed -i '' 's/find/replace/g' file\" because BSD requires an empty string for the backup extension.",
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
    title: "Sum Numbers in a Specific Column with awk",
    description: "Calculates the sum of numbers in column N of a text or log stream.",
    command: "awk '{sum += ${{column}}} END {print \"Total: \" sum}' {{file}}",
    platforms: ["linux", "macos"],
    category: "text",
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
    title: "Extract & Rank Top Unique Visitors from Log",
    description: "Parses web server access log, counts frequency per IP, and displays top 10 visitors.",
    command: "awk '{print $1}' {{logFile}} | sort | uniq -c | sort -nr | head -n 10",
    platforms: ["linux", "macos"],
    category: "text",
    tags: ["awk", "sort", "uniq", "logs", "ip", "ddos", "analytics"],
    dangerLevel: "safe",
    proTip: "Great for identifying scraping bots or DDoS IP addresses during an incident.",
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
    title: "Run Commands in Parallel with xargs",
    description: "Reads lines from stdin and executes tasks concurrently utilizing multiple CPU cores.",
    command: "cat {{inputList}} | xargs -n 1 -P {{cores}} -I {} {{command}}",
    platforms: ["linux", "macos"],
    category: "text",
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
    category: "text",
    tags: ["sed", "cleanup", "clean", "lines", "format"],
    dangerLevel: "safe",
    params: [
      { name: "file", label: "Target File", default: "config.env", placeholder: "file.txt" }
    ]
  }
];
