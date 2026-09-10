import type { TerminalCommand, CategoryId, Platform } from "../types";
import { quickWinsCommands } from "./quick-wins";
import { devsecopsCommands } from "./devsecops";
import { kubernetesCommands } from "./kubernetes";
import { dockerCommands } from "./docker";
import { observabilityCommands } from "./observability";
import { iacCommands } from "./iac";
import { gitCommands } from "./git";
import { networkingCommands } from "./networking";
import { systemCommands } from "./system";
import { processCommands } from "./process";
import { filesystemCommands } from "./filesystem";
import { textCommands } from "./text";
import { securityCommands } from "./security";
import { aiToolingCommands } from "./ai-tooling";
import { mediaCommands } from "./media";
import { packageManagersCommands } from "./package-managers";
import { windowsCommands } from "./windows";
import { macosCommands } from "./macos";

export {
  quickWinsCommands,
  devsecopsCommands,
  kubernetesCommands,
  dockerCommands,
  observabilityCommands,
  iacCommands,
  gitCommands,
  networkingCommands,
  systemCommands,
  processCommands,
  filesystemCommands,
  textCommands,
  securityCommands,
  aiToolingCommands,
  mediaCommands,
  packageManagersCommands,
  windowsCommands,
  macosCommands,
};

/**
 * Complete master registry of all terminal commands across all domains.
 */
export const COMMANDS: TerminalCommand[] = [
  ...quickWinsCommands,
  ...devsecopsCommands,
  ...kubernetesCommands,
  ...dockerCommands,
  ...observabilityCommands,
  ...iacCommands,
  ...gitCommands,
  ...networkingCommands,
  ...systemCommands,
  ...processCommands,
  ...filesystemCommands,
  ...textCommands,
  ...securityCommands,
  ...aiToolingCommands,
  ...mediaCommands,
  ...packageManagersCommands,
  ...windowsCommands,
  ...macosCommands,
];

/**
 * Fast O(1) category-indexed dictionary.
 */
export const COMMANDS_BY_CATEGORY: Record<CategoryId, TerminalCommand[]> = {
  "quick-wins": quickWinsCommands,
  "devsecops": devsecopsCommands,
  "kubernetes": kubernetesCommands,
  "docker": dockerCommands,
  "observability": observabilityCommands,
  "iac": iacCommands,
  "git": gitCommands,
  "networking": networkingCommands,
  "system": systemCommands,
  "process": processCommands,
  "filesystem": filesystemCommands,
  "text": textCommands,
  "security": securityCommands,
  "ai-tooling": aiToolingCommands,
  "media": mediaCommands,
  "package-managers": packageManagersCommands,
  "windows": windowsCommands,
  "macos": macosCommands,
};

/**
 * Filter commands by domain category.
 */
export function getCommandsByCategory(category: CategoryId): TerminalCommand[] {
  return COMMANDS_BY_CATEGORY[category] || [];
}

/**
 * Lookup single command by unique slug identifier.
 */
export function getCommandById(id: string): TerminalCommand | undefined {
  return COMMANDS.find(cmd => cmd.id === id);
}

/**
 * Filter commands by target operating system.
 */
export function getCommandsByPlatform(platform: Platform): TerminalCommand[] {
  if (platform === "all") return COMMANDS;
  return COMMANDS.filter(cmd => cmd.platforms.includes(platform) || cmd.platforms.includes("all"));
}

/**
 * Search commands by keyword, flag, or tag.
 */
export function searchCommands(query: string, category: string = "all", platform: string = "all"): TerminalCommand[] {
  const q = query.trim().toLowerCase();
  return COMMANDS.filter(cmd => {
    if (category !== "all" && cmd.category !== category) return false;
    if (platform !== "all" && !cmd.platforms.includes("all") && !cmd.platforms.includes(platform as Platform)) return false;
    if (!q) return true;
    return (
      cmd.id.toLowerCase().includes(q) ||
      cmd.title.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.command.toLowerCase().includes(q) ||
      (cmd.tags && cmd.tags.some(t => t.toLowerCase().includes(q)))
    );
  });
}
