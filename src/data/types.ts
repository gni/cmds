export type Platform = 'linux' | 'macos' | 'windows' | 'all';

export type DangerLevel = 'safe' | 'caution' | 'dangerous';

export type CategoryId = 
  | 'quick-wins'
  | 'networking'
  | 'system'
  | 'process'
  | 'filesystem'
  | 'docker'
  | 'git'
  | 'text'
  | 'media'
  | 'security'
  | 'windows'
  | 'macos'
  | 'package-managers';

export interface CommandParam {
  name: string;
  label: string;
  default: string;
  placeholder?: string;
  description?: string;
}

export interface CommandFlag {
  flag: string;
  description: string;
}

export interface TerminalCommand {
  id: string;
  title: string;
  description: string;
  command: string; // Template syntax with {{paramName}}
  platforms: Platform[];
  category: CategoryId;
  tags: string[];
  dangerLevel: DangerLevel;
  proTip?: string;
  params?: CommandParam[];
  flags?: CommandFlag[];
  alternatives?: {
    platform: Platform;
    command: string;
    note?: string;
  }[];
  outputExample?: string;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
  badgeCount?: number;
}
