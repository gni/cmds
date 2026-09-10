import type { CategoryInfo } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'quick-wins',
    name: 'Quick Wins',
    icon: '⚡',
    description: 'Instant life-savers, emergency one-liners, and high-frequency shortcuts.'
  },
  {
    id: 'networking',
    name: 'Networking & DNS',
    icon: '🌐',
    description: 'Ports, sockets, DNS propagation, bandwidth, reverse proxies, and packet trace.'
  },
  {
    id: 'system',
    name: 'System Diagnostics',
    icon: '📊',
    description: 'CPU, RAM, disk I/O, temperature, hardware introspection, and system logs.'
  },
  {
    id: 'process',
    name: 'Process & Tasks',
    icon: '⚙️',
    description: 'Inspect, prioritize, throttle, background, and terminate running processes.'
  },
  {
    id: 'filesystem',
    name: 'Files & Storage',
    icon: '📁',
    description: 'Search, disk cleanup, batch rename, archiving, rsync, and permissions.'
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    icon: '🐳',
    description: 'Prune dangling resources, container inspect, logs tail, and compose pipelines.'
  },
  {
    id: 'git',
    name: 'Git Superpowers',
    icon: '🐙',
    description: 'Reflog rescues, soft reset, branch visualization, bisect, and cherry-pick.'
  },
  {
    id: 'text',
    name: 'Text & CLI Wrangling',
    icon: '🪄',
    description: 'ripgrep, jq, sed, awk, xargs parallel, and streaming transformations.'
  },
  {
    id: 'media',
    name: 'Media & ffmpeg',
    icon: '🎬',
    description: 'Video compression, audio extraction, lossless cuts, gif conversion, and webp.'
  },
  {
    id: 'security',
    name: 'Security & SSH',
    icon: '🔐',
    description: 'Keygen ed25519, SSL cert audits, SOCKS proxies, firewalls, and checksums.'
  },
  {
    id: 'windows',
    name: 'Windows & PowerShell',
    icon: '🪟',
    description: 'PowerShell 7+, winget, robocopy, WMI queries, and WSL management.'
  },
  {
    id: 'macos',
    name: 'macOS Native',
    icon: '🍎',
    description: 'caffeinate, defaults write, pbcopy/pbpaste, purge RAM, and launchctl.'
  },
  {
    id: 'package-managers',
    name: 'Package Managers',
    icon: '📦',
    description: 'brew, apt, pacman, dnf, winget, choco, and cache purges.'
  }
];
