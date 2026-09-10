import type { TerminalCommand } from "../types";

/**
 * Process & Tasks (⚙️)
 * Inspect, prioritize, throttle, background, and terminate running processes.
 */
export const processCommands: TerminalCommand[] = [
  {
    id: "pkill-regex",
    title: "Kill Processes by Pattern",
    description: "Terminate processes matching command name or regex.",
    command: "pkill -9 -f {{processName}}",
    platforms: ["linux", "macos"],
    category: "process",
    tags: ["kill", "pkill", "terminate", "pattern", "regex"],
    dangerLevel: "dangerous",
    proTip: "Run \"pgrep -fl {{processName}}\" first to verify which processes will be hit before killing.",
    params: [
      {
        name: "processName",
        label: "Process Name/Regex",
        default: "chrome",
        placeholder: "node"
      }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "Stop-Process -Name {{processName}} -Force",
        note: "PowerShell"
      }
    ]
  },
  {
    id: "run-detached-nohup",
    title: "Run Detached Process (nohup)",
    description: "Run command immune to SIGHUP that outlives session.",
    command: "nohup {{command}} > {{logFile}} 2>&1 &",
    platforms: ["linux", "macos"],
    category: "process",
    tags: ["nohup", "background", "daemon", "ssh", "persistent"],
    dangerLevel: "safe",
    proTip: "To check running jobs in current bash session, run \"jobs\" or \"disown -h %1\".",
    params: [
      {
        name: "command",
        label: "Command",
        default: "node app.js",
        placeholder: "python worker.py"
      },
      { name: "logFile", label: "Log File", default: "app.log", placeholder: "output.log" }
    ]
  },
  {
    id: "limit-cpu-process",
    title: "Limit Process CPU Usage",
    description: "Cap maximum CPU percentage allowed for a PID.",
    command: "cpulimit -l {{maxPercent}} -p {{pid}}",
    platforms: ["linux"],
    category: "process",
    tags: ["cpulimit", "cpu", "throttle", "limit", "performance"],
    dangerLevel: "safe",
    proTip: "Percentage is calculated per core (e.g., 200% on a 4-core machine means 2 full cores).",
    params: [
      { name: "maxPercent", label: "Max CPU %", default: "50", placeholder: "50" },
      { name: "pid", label: "Process PID", default: "1234", placeholder: "1234" }
    ]
  },
  {
    id: "open-files-by-pid",
    title: "List Open Files for PID",
    description: "List open files, network sockets, and shared libs for PID.",
    command: "lsof -p {{pid}}",
    platforms: ["linux", "macos"],
    category: "process",
    tags: ["lsof", "descriptors", "files", "sockets", "inspect"],
    dangerLevel: "safe",
    proTip: "Add \"-n -P\" to avoid slow DNS and port resolution for fast output.",
    params: [
      { name: "pid", label: "Process ID", default: "1234", placeholder: "1234" }
    ]
  },
  {
    id: "tmux-new-session",
    title: "Create Named Tmux Session",
    description: "Start persistent terminal session detachable from SSH.",
    command: "tmux new-session -s {{sessionName}}",
    platforms: ["linux", "macos"],
    category: "process",
    tags: ["tmux", "session", "terminal", "multiplexer", "detach"],
    dangerLevel: "safe",
    proTip: "Detach using \"Ctrl+b d\". Re-attach later using: tmux attach -t {{sessionName}}",
    params: [
      { name: "sessionName", label: "Session Name", default: "dev", placeholder: "workspace" }
    ]
  }
];
