import type { TerminalCommand } from "../types";

/**
 * macOS Native (🍎)
 * caffeinate, defaults write, pbcopy/pbpaste, purge RAM, and launchctl.
 */
export const macosCommands: TerminalCommand[] = [
  {
    id: "mac-caffeinate-timer",
    title: "Keep Mac Awake During Long Tasks",
    description: "Prevents display sleep, system sleep, and disk idle timeout while a build or download runs.",
    command: "caffeinate -dims -t {{seconds}}",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "caffeinate", "sleep", "display", "awake"],
    dangerLevel: "safe",
    proTip: "You can also wrap a command: \"caffeinate -i npm run build\" keeps the Mac awake only while npm runs!",
    params: [
      { name: "seconds", label: "Seconds (3600 = 1 hr)", default: "3600", placeholder: "3600" }
    ]
  },
  {
    id: "mac-flush-dns-cache",
    title: "Flush macOS DNS Cache Completely",
    description: "Clears the mDNSResponder and local resolver cache after changing DNS records or hosts file.",
    command: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "dns", "flush", "network", "mdns"],
    dangerLevel: "safe",
    proTip: "Works on macOS Monterey, Ventura, Sonoma, and Sequoia."
  },
  {
    id: "mac-show-hidden-files",
    title: "Toggle Hidden Files in Finder",
    description: "Reveals all hidden dotfiles (e.g. .env, .git) in macOS Finder windows.",
    command: "defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "finder", "hidden", "dotfiles", "defaults"],
    dangerLevel: "safe",
    proTip: "Keyboard shortcut in Finder: Press \"Cmd + Shift + .\" to toggle hidden files instantly."
  },
  {
    id: "mac-toggle-desktop-icons",
    title: "Hide / Show Desktop Icons for Screen Sharing",
    description: "Hides all desktop icons for pristine presentations or video recording without moving files.",
    command: "defaults write com.apple.finder CreateDesktop -bool false && killall Finder",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "desktop", "clean", "presentation", "finder"],
    dangerLevel: "safe",
    proTip: "To restore desktop icons, change \"false\" to \"true\" and run again."
  },
  {
    id: "mac-purge-inactive-ram",
    title: "Purge Inactive Memory & Clear Disk Caches",
    description: "Forces the macOS kernel to flush disk and file system caches to free real physical RAM.",
    command: "sudo purge",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "ram", "memory", "purge", "speed"],
    dangerLevel: "safe"
  },
  {
    id: "mac-clipboard-pipe",
    title: "Pipe Command Output Directly to Clipboard",
    description: "Copies any terminal output straight into macOS clipboard with pbcopy, and pastes with pbpaste.",
    command: "cat {{file}} | pbcopy",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "pbcopy", "pbpaste", "clipboard"],
    dangerLevel: "safe",
    params: [
      {
        name: "file",
        label: "File to copy",
        default: "~/.ssh/id_ed25519.pub",
        placeholder: "path"
      }
    ]
  },
  {
    id: "mac-listen-bonjour-services",
    title: "Discover Local Bonjour / mDNS Services on Network",
    description: "Browses local LAN for advertised services like AirPlay, SSH, HTTP, and printer endpoints.",
    command: "dns-sd -B _http._tcp local.",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "bonjour", "mdns", "lan", "discovery"],
    dangerLevel: "safe"
  },
  {
    id: "mac-diskutil-apfs",
    title: "Inspect macOS APFS Volumes and Physical Disks",
    description: "Lists all physical SSDs, synthesised APFS containers, EFI partitions, and recovery volumes.",
    command: "diskutil list",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "diskutil", "apfs", "ssd", "partitions"],
    dangerLevel: "safe"
  },
  {
    id: "mac-softwareupdate-cli",
    title: "Check & Install macOS System Updates via CLI",
    description: "Downloads and applies pending macOS software and security updates directly from Apple CDN.",
    command: "softwareupdate -ia --verbose",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "softwareupdate", "apple", "security", "upgrade"],
    dangerLevel: "caution",
    proTip: "Use \"softwareupdate -l\" to list available updates first without installing."
  }
];
