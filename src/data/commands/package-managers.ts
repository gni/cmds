import type { TerminalCommand } from "../types";

/**
 * Package Managers (📦)
 * brew, apt, pacman, dnf, winget, uv, cargo, and cache purges.
 */
export const packageManagersCommands: TerminalCommand[] = [
  {
    id: "brew-update-cleanup",
    title: "Update All Homebrew Packages & Purge Cache",
    description: "Fetches latest formula updates, upgrades installed packages, and cleans old cached tarballs.",
    command: "brew update && brew upgrade && brew cleanup -s",
    platforms: ["macos", "linux"],
    category: "package-managers",
    tags: ["brew", "homebrew", "update", "cleanup", "upgrade"],
    dangerLevel: "safe",
    proTip: "Use \"brew doctor\" if you encounter dependency or link warnings."
  },
  {
    id: "brew-export-bundle",
    title: "Export Installed Homebrew Packages to Brewfile",
    description: "Generates a reproducible declarative Brewfile listing all CLI tools, casks, and App Store apps.",
    command: "brew bundle dump --force --describe --file={{brewfilePath}}",
    platforms: ["macos"],
    category: "package-managers",
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
    title: "Ubuntu/Debian Full System Update & Autoremove",
    description: "Refreshes apt indices, performs intelligent full upgrades, and purges orphaned dependencies.",
    command: "sudo apt update && sudo apt full-upgrade -y && sudo apt autoremove --purge -y && sudo apt clean",
    platforms: ["linux"],
    category: "package-managers",
    tags: ["apt", "ubuntu", "debian", "update", "upgrade", "clean"],
    dangerLevel: "caution",
    proTip: "\"full-upgrade\" will handle dependencies with new packages, unlike standard \"upgrade\"."
  },
  {
    id: "pacman-arch-sync",
    title: "Arch Linux Complete System Sync & Cache Clean",
    description: "Synchronizes repositories, updates system packages, and removes unneeded orphaned packages.",
    command: "sudo pacman -Syu && sudo pacman -Rns $(pacman -Qtdq 2>/dev/null || true)",
    platforms: ["linux"],
    category: "package-managers",
    tags: ["pacman", "arch", "update", "sync", "clean"],
    dangerLevel: "caution",
    proTip: "To clean old package cache files in /var/cache/pacman/pkg, run: sudo paccache -r"
  }
];
