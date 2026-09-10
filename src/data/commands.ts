/**
 * @file Unified command catalog repository entry point.
 * Commands are partitioned into domain-specific modules in ./commands/*.ts:
 *  - quick-wins.ts: Instant life-savers and emergency shortcuts
 *  - devsecops.ts: CVE scanning, SAST, secrets detection, and hardening
 *  - kubernetes.ts: K8s pod crashloop logs, restarts, debug containers, and diffs
 *  - docker.ts: Multi-platform builds, profiles, container inspection, and prune
 *  - observability.ts: SRE syscall tracing, bpftrace eBPF, perf, and latency breakdown
 *  - iac.ts: Terraform/OpenTofu plans, Ansible diffs, and AWS/GitHub CLI automation
 *  - git.ts: Worktrees, bisect, cherry-pick ranges, and reflog rescues
 *  - networking.ts: Sockets, ports, DNS propagation, and traffic capture
 *  - system.ts: Diagnostics, memory, disk I/O, and boot profiling
 *  - process.ts: PID monitoring, prioritization, and task management
 *  - filesystem.ts: Search, disk cleanup, and rsync checksum sync
 *  - text.ts: ripgrep, jq, sed, awk, and stream transforms
 *  - security.ts: SSH tunnels, SSL certificate audits, and keygen
 *  - ai-tooling.ts: Ollama, uv Python tooling, Hugging Face Hub, and LLM curl streaming
 *  - media.ts: ffmpeg lossless conversion and compression
 *  - package-managers.ts: brew, apt, pacman, dnf, winget, cargo, and cache clean
 *  - windows.ts: PowerShell 7+, robocopy, and WSL management
 *  - macos.ts: macOS native CLI utilities and launchctl
 */

export * from './commands/index';
