/**
 * @file Unified command catalog repository entry point.
 * Commands are partitioned into domain-specific modules in ./commands/*.ts:
 *  - essentials.ts: Universal coreutils, port killers, and daily shortcuts
 *  - git.ts: Git superpowers, reflog, worktree, bisect, and GitHub CLI
 *  - runtimes.ts: Modern package managers and runtimes (uv, pnpm, bun, cargo, brew, apt)
 *  - files-text.ts: File search, archives, and stream wrangling (find, tar, rsync, grep, sed, awk, jq)
 *  - system-process.ts: Systemd services, processes, btop, tmux, and container management
 *  - network-security.ts: Remote access, firewalls, and SSL/TLS diagnostics (ssh, ufw, openssl)
 *  - ai-media.ts: Local LLMs, inference engines, and media processing (ollama, vllm, whisper, ffmpeg)
 *  - kubernetes.ts: Pod crashloop triage, ephemeral debug containers, rollouts, and cluster ops
 *  - data-science.ts: Jupyter & ipykernel, bash value_counts & CSV profiling, GPU VRAM triage, DuckDB, and Streamlit
 */

export * from './commands/index';
