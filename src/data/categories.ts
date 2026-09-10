import type { CategoryInfo } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'quick-wins',
    name: 'Quick Wins',
    icon: '⚡',
    description: 'Instant life-savers, emergency one-liners, and high-frequency shortcuts.'
  },
  {
    id: 'devsecops',
    name: 'DevSecOps & Hardening',
    icon: '🛡️',
    description: 'Trivy image scan, Gitleaks secret audits, Cosign signatures, Semgrep SAST, Lynis, and Fail2ban.'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes & K8s',
    icon: '☸️',
    description: 'Pod crashloop logs, rollout restarts, ephemeral debug containers, secret decoding, and helm diff.'
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    icon: '🐳',
    description: 'Prune dangling resources, container inspect, live stats stream, builder cache, and compose profiles.'
  },
  {
    id: 'observability',
    name: 'Observability & SRE',
    icon: '📈',
    description: 'strace system calls, eBPF bpftrace, journalctl JSON, perf profiling, iotop, and socket audits.'
  },
  {
    id: 'iac',
    name: 'IaC & Cloud CLI',
    icon: '☁️',
    description: 'Terraform & OpenTofu plans, Ansible dry-run diffs, AWS STS/SSM sessions, and GitHub CLI automation.'
  },
  {
    id: 'git',
    name: 'Git Superpowers',
    icon: '🐙',
    description: 'Reflog rescues, soft reset, branch visualization, bisect, worktrees, and cherry-pick.'
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
    description: 'Search, disk cleanup, batch rename, archiving, rsync checksums, and permissions.'
  },
  {
    id: 'text',
    name: 'Text & CLI Wrangling',
    icon: '🪄',
    description: 'ripgrep, jq, yq, sed, awk, xargs parallel, and streaming transformations.'
  },
  {
    id: 'security',
    name: 'Security & SSH',
    icon: '🔐',
    description: 'Keygen ed25519, SSL cert audits, SOCKS proxies, firewalls, and checksums.'
  },
  {
    id: 'ai-tooling',
    name: 'AI & Agent CLI',
    icon: '🤖',
    description: 'Ollama local models, uv Python tooling, huggingface-cli, vector stores, and streaming curl pipes.'
  },
  {
    id: 'media',
    name: 'Media & ffmpeg',
    icon: '🎬',
    description: 'Video compression, audio extraction, lossless cuts, gif conversion, and webp.'
  },
  {
    id: 'package-managers',
    name: 'Package Managers',
    icon: '📦',
    description: 'brew, apt, pacman, dnf, winget, uv, cargo, and cache purges.'
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
  }
];
