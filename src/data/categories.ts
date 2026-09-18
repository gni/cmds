import type { CategoryInfo } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'essentials',
    name: 'Daily Essentials',
    icon: '⚡',
    description: 'Universal built-ins (ls, ln, grep, find, du, diff), port killers, and high-frequency shortcuts.'
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    icon: '🐙',
    description: 'Git superpowers (reflog, worktree, bisect, cherry-pick) and GitHub CLI (gh pr, gh repo, gh release).'
  },
  {
    id: 'runtimes',
    name: 'Dev & Runtimes',
    icon: '📦',
    description: 'Modern package managers & tools: uv (Python), pnpm, bun, npm, cargo (Rust), brew, and apt.'
  },
  {
    id: 'files-text',
    name: 'Files & Text',
    icon: '📁',
    description: 'Search & archives (find, tar, rsync) and stream wrangling (grep, sed, awk, xargs, jq).'
  },
  {
    id: 'system-process',
    name: 'System & Processes',
    icon: '⚙️',
    description: 'Services, sessions, processes, and containers (systemctl, journalctl, tmux, watch, btop, docker).'
  },
  {
    id: 'network-security',
    name: 'Network & Security',
    icon: '🌐',
    description: 'Remote access (ssh, ssh-copy-id), firewalls (ufw, iptables), SSL inspection (openssl), and networking.'
  },
  {
    id: 'ai-media',
    name: 'AI & Media',
    icon: '🤖',
    description: 'Local LLMs (ollama, vllm, whisper) and production media pipelines (ffmpeg, ffprobe).'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes & K8s',
    icon: '☸️',
    description: 'Pod crashloop triage, ephemeral debug containers, log streaming, rollouts, port forwarding, and cluster diagnostics.'
  },
  {
    id: 'data-science',
    name: 'Data Science & ML',
    icon: '📊',
    description: 'Jupyter & ipykernel, bash value_counts & CSV profiling, GPU VRAM triage, DuckDB on Parquet, Streamlit, and S3 dataset sync.'
  }
];
