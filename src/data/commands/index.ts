import type { TerminalCommand, CategoryId, Platform } from "../types";
import { essentialsCommands } from "./essentials";
import { gitCommands } from "./git";
import { runtimesCommands } from "./runtimes";
import { filesTextCommands } from "./files-text";
import { systemProcessCommands } from "./system-process";
import { networkSecurityCommands } from "./network-security";
import { aiMediaCommands } from "./ai-media";
import { kubernetesCommands } from "./kubernetes";
import { dataScienceCommands } from "./data-science";

export {
  essentialsCommands,
  gitCommands,
  runtimesCommands,
  filesTextCommands,
  systemProcessCommands,
  networkSecurityCommands,
  aiMediaCommands,
  kubernetesCommands,
  dataScienceCommands,
};

/**
 * Complete master registry of all terminal commands across the 9 pillars.
 */
export const COMMANDS: TerminalCommand[] = [
  ...essentialsCommands,
  ...gitCommands,
  ...runtimesCommands,
  ...filesTextCommands,
  ...systemProcessCommands,
  ...networkSecurityCommands,
  ...aiMediaCommands,
  ...kubernetesCommands,
  ...dataScienceCommands,
];

/**
 * Fast O(1) category-indexed dictionary.
 */
export const COMMANDS_BY_CATEGORY: Record<CategoryId, TerminalCommand[]> = {
  "essentials": essentialsCommands,
  "git": gitCommands,
  "runtimes": runtimesCommands,
  "files-text": filesTextCommands,
  "system-process": systemProcessCommands,
  "network-security": networkSecurityCommands,
  "ai-media": aiMediaCommands,
  "kubernetes": kubernetesCommands,
  "data-science": dataScienceCommands,
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
