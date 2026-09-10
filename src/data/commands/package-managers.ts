import type { TerminalCommand } from "../types";

/**
 * Package Managers (📦)
 * brew, apt, pacman, dnf, winget, uv, cargo, and cache purges.
 */
export const packageManagersCommands: TerminalCommand[] = [
  {
    id: "brew-update-cleanup",
    title: "Update Homebrew & Clean Cache",
    description: "Update formulas, upgrade packages, and purge cache.",
    command: "brew update && brew upgrade && brew cleanup -s",
    platforms: ["macos", "linux"],
    category: "package-managers",
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
    title: "Full APT Upgrade & Clean",
    description: "Update package lists, upgrade system, and autoremove.",
    command: "sudo apt update && sudo apt full-upgrade -y && sudo apt autoremove --purge -y && sudo apt clean",
    platforms: ["linux"],
    category: "package-managers",
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
    category: "package-managers",
    tags: ["pacman", "arch", "update", "sync", "clean"],
    dangerLevel: "caution",
    proTip: "To clean old package cache files in /var/cache/pacman/pkg, run: sudo paccache -r"
  }
];
