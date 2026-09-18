import type { TerminalCommand } from "../types";

/**
 * System & Processes (⚙️)
 * Services, sessions, processes, and container runtimes:
 * systemctl, journalctl, tmux, watch, btop, pgrep, and docker.
 */
export const systemProcessCommands: TerminalCommand[] = [
  {
    id: "systemctl-status-nonblock",
    title: "Check Systemd Service Status Cleanly",
    description: "Check if service is active without spawning a terminal pager.",
    command: "systemctl status {{service}} --no-pager -l",
    platforms: ["linux"],
    category: "system-process",
    tags: ["systemctl", "systemd", "service", "status"],
    dangerLevel: "safe",
    params: [
      { name: "service", label: "Service Unit", default: "nginx", placeholder: "service" }
    ]
  },
  {
    id: "systemctl-list-failed",
    title: "List Failed Systemd Units",
    description: "Instantly list all system services in failed or degraded state.",
    command: "systemctl list-units --state=failed --no-pager",
    platforms: ["linux"],
    category: "system-process",
    tags: ["systemctl", "systemd", "failed", "crash", "triage"],
    dangerLevel: "safe",
    outputExample: "  UNIT                 LOAD   ACTIVE SUB    DESCRIPTION\n* docker-proxy.service loaded failed failed Docker Proxy Engine\n\nLOAD   = Reflects whether the unit definition was properly loaded.\nACTIVE = The high-level unit activation state, i.e. generalization of SUB."
  },
  {
    id: "systemctl-daemon-reload-restart",
    title: "Reload Daemon & Restart Service",
    description: "Reload systemd manager configuration and restart target unit.",
    command: "sudo systemctl daemon-reload && sudo systemctl restart {{service}}",
    platforms: ["linux"],
    category: "system-process",
    tags: ["systemctl", "systemd", "restart", "reload", "daemon"],
    dangerLevel: "caution",
    params: [
      { name: "service", label: "Service Name", default: "nginx", placeholder: "service" }
    ]
  },
  {
    id: "journalctl-follow-service",
    title: "Follow Systemd Service Logs",
    description: "Tail live log stream for a specific systemd unit.",
    command: "journalctl -u {{service}} -f -n 100 --no-pager",
    platforms: ["linux"],
    category: "system-process",
    tags: ["journalctl", "systemd", "logs", "tail", "stream", "service"],
    dangerLevel: "safe",
    proTip: "Add \"-b\" to limit output to the current boot only.",
    params: [
      { name: "service", label: "Service Name", default: "nginx", placeholder: "docker" }
    ],
    outputExample: "Sep 12 11:15:12 server nginx[1204]: [notice] start worker processes"
  },
  {
    id: "journalctl-priority-errors-boot",
    title: "Filter System Logs for Errors Since Boot",
    description: "Extract error, critical, and alert messages across all services from current boot.",
    command: "journalctl -p err..emerg -b --no-pager",
    platforms: ["linux"],
    category: "system-process",
    tags: ["journalctl", "errors", "systemd", "boot", "debug"],
    dangerLevel: "safe",
    proTip: "-p err..emerg filters out normal info/debug messages so you focus on actual incidents.",
    outputExample: "Sep 12 09:14:02 srv kernel: traps: node[4120] general protection fault\nSep 12 10:22:18 srv systemd[1]: Failed to start Docker Application Container Engine."
  },
  {
    id: "systemd-analyze-blame",
    title: "Profile Slowest Boot Services",
    description: "Rank systemd units by initialization time during system startup.",
    command: "systemd-analyze blame | head -n 15",
    platforms: ["linux"],
    category: "system-process",
    tags: ["systemd", "boot", "performance", "blame", "profile"],
    dangerLevel: "safe",
    outputExample: "9.421s docker.service\n4.120s containerd.service\n2.810s cloud-init.service\n1.420s systemd-udev-settle.service"
  },
  {
    id: "btop-system-monitor",
    title: "Monitor System Activity (btop)",
    description: "Modern terminal activity monitor for CPU, memory, disk, and network.",
    command: "btop --utf-force",
    platforms: ["linux", "macos"],
    category: "system-process",
    tags: ["btop", "htop", "monitor", "cpu", "gpu", "process"],
    dangerLevel: "safe"
  },
  {
    id: "top-memory-processes",
    title: "Top RAM Consuming Processes",
    description: "List top processes sorted by RAM usage percentage.",
    command: "ps aux --sort=-%mem | head -n 11",
    platforms: ["linux"],
    category: "system-process",
    tags: ["memory", "ram", "ps", "oom", "leak", "monitor"],
    dangerLevel: "safe",
    alternatives: [
      {
        platform: "macos",
        command: "ps -arcwwwxo pid,%mem,command | head -n 11",
        note: "macOS BSD ps"
      }
    ]
  },
  {
    id: "system-disk-free-human",
    title: "Inspect Disk Space Usage",
    description: "Display filesystem capacity and free space in human-readable GB/TB.",
    command: "df -h -T -x tmpfs -x devtmpfs",
    platforms: ["linux"],
    category: "system-process",
    tags: ["df", "disk", "storage", "partition", "space"],
    dangerLevel: "safe",
    alternatives: [
      { platform: "macos", command: "df -h", note: "macOS BSD df" }
    ]
  },
  {
    id: "system-ram-usage-free",
    title: "Check RAM & Swap Consumption",
    description: "Print total, used, free, and available RAM in gigabytes.",
    command: "free -h --giga",
    platforms: ["linux"],
    category: "system-process",
    tags: ["free", "ram", "memory", "swap", "linux"],
    dangerLevel: "safe",
    outputExample: "               total        used        free      shared  buff/cache   available\nMem:            32Gi        12Gi       8.2Gi       410Mi        11Gi        19Gi"
  },
  {
    id: "system-live-io-stats",
    title: "Real-Time Disk I/O Throughput",
    description: "Report device read/write throughput and IOPS.",
    command: "iostat -xz 1 10",
    platforms: ["linux"],
    category: "system-process",
    tags: ["iostat", "disk", "iops", "performance", "nvme"],
    dangerLevel: "safe",
    outputExample: "Device   r/s     w/s     rMB/s   wMB/s   %util\nnvme0n1  124.0   312.0   12.4    48.2    34.2%"
  },
  {
    id: "kernel-dmesg-errors",
    title: "Inspect Kernel Error Logs",
    description: "Filter kernel ring buffer for hardware errors and OOM events.",
    command: "dmesg -T --level=err,crit,alert,emerg",
    platforms: ["linux"],
    category: "system-process",
    tags: ["dmesg", "kernel", "hardware", "oom", "crash", "logs"],
    dangerLevel: "safe",
    outputExample: "[Thu Sep 10 20:12:01 2026] Out of memory: Kill process 28149 (java) score 852 or sacrifice child"
  },
  {
    id: "pgrep-list-pids",
    title: "List Process PIDs by Name (pgrep)",
    description: "Find process IDs matching name with full command lines printed.",
    command: "pgrep -fl {{pattern}}",
    platforms: ["linux", "macos"],
    category: "system-process",
    tags: ["pgrep", "process", "find", "pid", "ps"],
    dangerLevel: "safe",
    params: [
      { name: "pattern", label: "Process Name", default: "node", placeholder: "python" }
    ],
    outputExample: "1482 node /app/dist/server.js\n19420 /bin/sh /usr/bin/nodemon"
  },
  {
    id: "pkill-regex",
    title: "Kill Processes by Pattern",
    description: "Terminate processes matching command name or regex.",
    command: "pkill -9 -f {{processName}}",
    platforms: ["linux", "macos"],
    category: "system-process",
    tags: ["kill", "pkill", "terminate", "pattern", "regex"],
    dangerLevel: "dangerous",
    proTip: "Run \"pgrep -fl {{processName}}\" first to verify which processes will be hit before killing.",
    params: [
      {
        name: "processName",
        label: "Process Name/Regex",
        default: "node",
        placeholder: "python"
      }
    ]
  },
  {
    id: "run-detached-nohup",
    title: "Run Detached Process (nohup)",
    description: "Run command immune to SIGHUP that outlives terminal session.",
    command: "nohup {{command}} > {{logFile}} 2>&1 &",
    platforms: ["linux", "macos"],
    category: "system-process",
    tags: ["nohup", "background", "daemon", "ssh", "persistent"],
    dangerLevel: "safe",
    params: [
      {
        name: "command",
        label: "Command",
        default: "node app.js",
        placeholder: "python worker.py"
      },
      { name: "logFile", label: "Log File", default: "app.log", placeholder: "output.log" }
    ]
  },
  {
    id: "tmux-attach-or-new",
    title: "Attach or Create Tmux Session",
    description: "Connect to an existing tmux session or create a new one if it does not exist.",
    command: "tmux attach -t {{sessionName}} || tmux new -s {{sessionName}}",
    platforms: ["linux", "macos"],
    category: "system-process",
    tags: ["tmux", "session", "attach", "multiplexer", "ssh"],
    dangerLevel: "safe",
    proTip: "Prefix shortcut \"Ctrl+b d\" detaches from session keeping background jobs running.",
    params: [
      { name: "sessionName", label: "Session Name", default: "dev", placeholder: "main" }
    ]
  },
  {
    id: "tmux-list-sessions",
    title: "List Active Tmux Sessions",
    description: "Display all active detached terminal sessions and window counts.",
    command: "tmux ls",
    platforms: ["linux", "macos"],
    category: "system-process",
    tags: ["tmux", "sessions", "list", "terminal"],
    dangerLevel: "safe",
    outputExample: "dev: 2 windows (created Fri Sep 12 10:14:02 2026) [160x42]\nwork: 1 windows (created Fri Sep 12 11:00:15 2026) [160x42]"
  },
  {
    id: "open-files-by-pid",
    title: "List Open Files for PID (lsof)",
    description: "List open files, network sockets, and shared libs for PID.",
    command: "lsof -p {{pid}}",
    platforms: ["linux", "macos"],
    category: "system-process",
    tags: ["lsof", "descriptors", "files", "sockets", "inspect"],
    dangerLevel: "safe",
    params: [
      { name: "pid", label: "Process ID", default: "1234", placeholder: "1234" }
    ]
  },
  {
    id: "docker-clean-all",
    title: "Prune All Unused Docker Objects",
    description: "Remove stopped containers, unused networks, dangling images, and volumes.",
    command: "docker system prune -af --volumes",
    platforms: ["all"],
    category: "system-process",
    tags: ["docker", "clean", "prune", "disk", "cache", "containers"],
    dangerLevel: "dangerous",
    proTip: "WARNING: The --volumes flag wipes persistent volumes not attached to running containers! Drop --volumes to keep database data safe.",
    outputExample: "Total reclaimed space: 18.42GB"
  },
  {
    id: "docker-stats-live",
    title: "Live Container Resource Stats",
    description: "Stream CPU, memory, I/O, and network usage across containers.",
    command: "docker stats --format \"table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.NetIO}}\\t{{.BlockIO}}\"",
    platforms: ["all"],
    category: "system-process",
    tags: ["docker", "stats", "monitor", "cpu", "memory"],
    dangerLevel: "safe",
    outputExample: "NAME          CPU %     MEM USAGE / LIMIT     NET I/O\napi-gateway   0.45%     142MiB / 7.68GiB      12.4MB / 8.2MB\npostgres-db   1.12%     580MiB / 7.68GiB      45.1MB / 92.4MB"
  },
  {
    id: "docker-exec-interactive",
    title: "Jump into Running Container Shell",
    description: "Open interactive shell inside running container.",
    command: "docker exec -it {{container}} /bin/sh",
    platforms: ["all"],
    category: "system-process",
    tags: ["docker", "exec", "shell", "bash", "debug"],
    dangerLevel: "safe",
    params: [
      {
        name: "container",
        label: "Container ID/Name",
        default: "my-app",
        placeholder: "container_name"
      }
    ]
  },
  {
    id: "docker-compose-stream-logs",
    title: "Stream Compose Service Logs",
    description: "Follow container logs with high-resolution timestamps.",
    command: "docker compose logs -f --tail=100 -t {{service}}",
    platforms: ["all"],
    category: "system-process",
    tags: ["docker", "compose", "logs", "tail", "stream"],
    dangerLevel: "safe",
    params: [
      { name: "service", label: "Service Name", default: "web", placeholder: "api or db" }
    ]
  },
  {
    id: "docker-compose-rebuild-force",
    title: "Force Rebuild Compose Stack",
    description: "Rebuild images without cache and restart containers cleanly.",
    command: "docker compose down && docker compose build --no-cache && docker compose up -d",
    platforms: ["all"],
    category: "system-process",
    tags: ["docker", "compose", "rebuild", "cache", "deploy"],
    dangerLevel: "caution"
  },
  {
    id: "docker-run-detached-port",
    title: "Run Detached Container with Port",
    description: "Start background container with port mapping and restart policy.",
    command: "docker run -d --name {{name}} -p {{hostPort}}:{{containerPort}} --restart unless-stopped {{image}}",
    platforms: ["all"],
    category: "system-process",
    tags: ["docker", "run", "port", "spawn", "container"],
    dangerLevel: "safe",
    params: [
      { name: "name", label: "Container Name", default: "redis-cache", placeholder: "name" },
      { name: "hostPort", label: "Host Port", default: "6379", placeholder: "6379" },
      { name: "containerPort", label: "Container Port", default: "6379", placeholder: "6379" },
      {
        name: "image",
        label: "Docker Image",
        default: "redis:alpine",
        placeholder: "image:tag"
      }
    ]
  },
  {
    id: "docker-cp-container",
    title: "Copy Files In/Out of Container",
    description: "Transfer files directly between host and container filesystem.",
    command: "docker cp {{containerId}}:{{sourcePath}} {{destPath}}",
    platforms: ["all"],
    category: "system-process",
    tags: ["docker", "cp", "transfer", "container", "files"],
    dangerLevel: "safe",
    params: [
      {
        name: "containerId",
        label: "Container ID",
        default: "redis-prod",
        placeholder: "container-name"
      },
      {
        name: "sourcePath",
        label: "Container Path",
        default: "/data/dump.rdb",
        placeholder: "/path"
      },
      {
        name: "destPath",
        label: "Host Destination",
        default: "./redis-backup.rdb",
        placeholder: "./local-file"
      }
    ]
  },
  {
    id: "macos-caffeinate-sleep-prevent",
    title: "Prevent Mac Sleep During Long Task",
    description: "Keep display, system, and disk awake for duration of command or timer.",
    command: "caffeinate -d -i -m -u -t {{seconds}}",
    platforms: ["macos"],
    category: "system-process",
    tags: ["caffeinate", "sleep", "macos", "power"],
    dangerLevel: "safe",
    params: [
      { name: "seconds", label: "Duration (Seconds)", default: "3600", placeholder: "3600" }
    ]
  },
  {
    id: "macos-purge-inactive-memory",
    title: "Purge Inactive RAM Cache (macOS)",
    description: "Force macOS kernel to flush disk and inactive RAM caches.",
    command: "sudo purge",
    platforms: ["macos"],
    category: "system-process",
    tags: ["purge", "ram", "memory", "macos"],
    dangerLevel: "safe"
  },
  {
    id: "k8s-pod-previous-logs",
    title: "Inspect Crashed Pod Logs (k8s)",
    description: "Print stdout/stderr of previously crashed container instance.",
    command: "kubectl logs {{pod}} -n {{namespace}} --previous --tail={{lines}}",
    platforms: ["all"],
    category: "system-process",
    tags: ["kubectl", "k8s", "crashloop", "logs", "debug", "pod"],
    dangerLevel: "safe",
    params: [
      { name: "pod", label: "Pod Name", default: "api-service-674bb8c5f-k9l2m", placeholder: "pod-name" },
      { name: "namespace", label: "Namespace", default: "production", placeholder: "default" },
      { name: "lines", label: "Tail Lines", default: "50", placeholder: "50" }
    ]
  },
  {
    id: "k8s-rollout-restart",
    title: "Zero-Downtime Rollout Restart (k8s)",
    description: "Trigger rolling restart of deployment without configuration changes.",
    command: "kubectl rollout restart deployment/{{deployment}} -n {{namespace}}",
    platforms: ["all"],
    category: "system-process",
    tags: ["kubectl", "k8s", "rollout", "restart", "deployment"],
    dangerLevel: "safe",
    params: [
      { name: "deployment", label: "Deployment", default: "api-service", placeholder: "deployment-name" },
      { name: "namespace", label: "Namespace", default: "production", placeholder: "production" }
    ]
  }
];
