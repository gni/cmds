import type { TerminalCommand } from "../types";

/**
 * Windows & PowerShell (🪟)
 * PowerShell 7+, winget, robocopy, WMI queries, and WSL management.
 */
export const windowsCommands: TerminalCommand[] = [
  {
    id: "win-upgrade-all-apps",
    title: "Upgrade All Installed Windows Apps (winget)",
    description: "Scans all installed software against official repositories and upgrades everything automatically.",
    command: "winget upgrade --all --include-unknown",
    platforms: ["windows"],
    category: "windows",
    tags: ["winget", "windows", "upgrade", "apps", "update"],
    dangerLevel: "caution",
    proTip: "Run Windows Terminal as Administrator for apps requiring elevation.",
    outputExample: "Upgrading Google Chrome, VS Code, Git, Docker Desktop..."
  },
  {
    id: "win-robocopy-multithread",
    title: "Blazing Fast Multi-Threaded File Mirror (robocopy)",
    description: "Copies millions of files with multi-threading, restartable mode, and mirror sync.",
    command: "robocopy {{source}} {{dest}} /E /MT:{{threads}} /Z /R:2 /W:5",
    platforms: ["windows"],
    category: "windows",
    tags: ["robocopy", "copy", "windows", "backup", "fast"],
    dangerLevel: "safe",
    proTip: "/MT:16 specifies 16 threads (default is 8, max is 128). /Z allows resuming interrupted files.",
    params: [
      {
        name: "source",
        label: "Source Path",
        default: "C:\\Projects",
        placeholder: "C:\\source"
      },
      {
        name: "dest",
        label: "Destination Path",
        default: "D:\\Backup\\Projects",
        placeholder: "D:\\dest"
      },
      { name: "threads", label: "Threads (1-128)", default: "16", placeholder: "16" }
    ]
  },
  {
    id: "win-find-service-status",
    title: "Filter Windows Services by Name",
    description: "Lists Windows background services, their current status (Running/Stopped), and startup type.",
    command: "Get-Service | Where-Object {$_.DisplayName -like \"*{{pattern}}*\"} | Format-Table -AutoSize",
    platforms: ["windows"],
    category: "windows",
    tags: ["windows", "service", "powershell", "status"],
    dangerLevel: "safe",
    params: [
      { name: "pattern", label: "Service Pattern", default: "Docker", placeholder: "SQL" }
    ]
  },
  {
    id: "win-wsl-shutdown",
    title: "Restart / Reset WSL2 Virtual Machine Instance",
    description: "Gracefully shuts down all active WSL2 Linux distros to free allocated RAM back to Windows.",
    command: "wsl --shutdown",
    platforms: ["windows"],
    category: "windows",
    tags: ["wsl", "wsl2", "shutdown", "reset", "ram"],
    dangerLevel: "safe",
    proTip: "Relaunch any WSL distro after running this command and it will cold-boot with clean memory."
  },
  {
    id: "win-port-process-kill",
    title: "Kill Process Holding Port (PowerShell)",
    description: "Finds the owner of a TCP port and forcefully terminates it in one PowerShell pipeline.",
    command: "Stop-Process -Id (Get-NetTCPConnection -LocalPort {{port}}).OwningProcess -Force",
    platforms: ["windows"],
    category: "windows",
    tags: ["windows", "port", "kill", "powershell", "tcp"],
    dangerLevel: "caution",
    params: [
      { name: "port", label: "Port", default: "3000", placeholder: "3000" }
    ]
  },
  {
    id: "win-clear-recycle-bin",
    title: "Empty Recycle Bin Across All Drives (PowerShell)",
    description: "Instantly purges the Windows Recycle Bin on all drives without showing confirmation dialogs.",
    command: "Clear-RecycleBin -Force",
    platforms: ["windows"],
    category: "windows",
    tags: ["windows", "recycle-bin", "clean", "trash", "powershell"],
    dangerLevel: "dangerous"
  },
  {
    id: "win-find-ip-adapters",
    title: "List All Network Adapters and IPv4 Addresses",
    description: "Filters network adapter configurations to display clean active IPv4 addresses and link speeds.",
    command: "Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike \"*Loopback*\"} | Select-Object IPAddress, InterfaceAlias",
    platforms: ["windows"],
    category: "windows",
    tags: ["windows", "ip", "network", "adapters", "powershell"],
    dangerLevel: "safe"
  },
  {
    id: "win-create-symlink",
    title: "Create Filesystem Symbolic Link (PowerShell)",
    description: "Creates a soft symbolic link pointing a folder or file path to another location.",
    command: "New-Item -ItemType SymbolicLink -Path \"{{linkPath}}\" -Target \"{{targetPath}}\"",
    platforms: ["windows"],
    category: "windows",
    tags: ["windows", "symlink", "powershell", "link"],
    dangerLevel: "safe",
    params: [
      {
        name: "linkPath",
        label: "Symlink Name",
        default: "C:\\current_build",
        placeholder: "C:\\link"
      },
      {
        name: "targetPath",
        label: "Target Path",
        default: "C:\\builds\\v2.4",
        placeholder: "C:\\target"
      }
    ],
    alternatives: [
      {
        platform: "linux",
        command: "ln -s {{targetPath}} {{linkPath}}",
        note: "POSIX symlink"
      }
    ]
  }
];
