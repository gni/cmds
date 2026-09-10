import type { TerminalCommand } from "../types";

/**
 * macOS Native (🍎)
 * caffeinate, defaults write, pbcopy/pbpaste, purge RAM, and launchctl.
 */
export const macosCommands: TerminalCommand[] = [
  {
    id: "mac-caffeinate-timer",
    title: "Prevent Sleep with caffeinate",
    description: "Prevent system sleep and display timeout during long tasks.",
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
    title: "Flush macOS DNS Cache",
    description: "Clear mDNSResponder and local resolver DNS cache.",
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
    description: "Toggle hidden dotfiles in macOS Finder windows.",
    command: "defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "finder", "hidden", "dotfiles", "defaults"],
    dangerLevel: "safe",
    proTip: "Keyboard shortcut in Finder: Press \"Cmd + Shift + .\" to toggle hidden files instantly."
  },
  {
    id: "mac-toggle-desktop-icons",
    title: "Toggle Desktop Icons Visibility",
    description: "Show or hide desktop icons for presentations.",
    command: "defaults write com.apple.finder CreateDesktop -bool false && killall Finder",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "desktop", "clean", "presentation", "finder"],
    dangerLevel: "safe",
    proTip: "To restore desktop icons, change \"false\" to \"true\" and run again."
  },
  {
    id: "mac-purge-inactive-ram",
    title: "Purge Inactive RAM Cache",
    description: "Flush disk and filesystem caches to free inactive RAM.",
    command: "sudo purge",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "ram", "memory", "purge", "speed"],
    dangerLevel: "safe"
  },
  {
    id: "mac-clipboard-pipe",
    title: "Pipe Output to macOS Clipboard",
    description: "Copy terminal output to clipboard with pbcopy.",
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
    title: "Discover Bonjour/mDNS Services",
    description: "Browse LAN for advertised AirPlay, SSH, and HTTP services.",
    command: "dns-sd -B _http._tcp local.",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "bonjour", "mdns", "lan", "discovery"],
    dangerLevel: "safe"
  },
  {
    id: "mac-diskutil-apfs",
    title: "Inspect APFS Disks & Volumes",
    description: "List physical drives, APFS containers, and partitions.",
    command: "diskutil list",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "diskutil", "apfs", "ssd", "partitions"],
    dangerLevel: "safe"
  },
  {
    id: "mac-softwareupdate-cli",
    title: "Install macOS Updates via CLI",
    description: "Download and apply pending macOS software updates.",
    command: "softwareupdate -ia --verbose",
    platforms: ["macos"],
    category: "macos",
    tags: ["macos", "softwareupdate", "apple", "security", "upgrade"],
    dangerLevel: "caution",
    proTip: "Use \"softwareupdate -l\" to list available updates first without installing."
  }
];
