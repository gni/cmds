import type { TerminalCommand } from "../types";

/**
 * System Diagnostics (📊)
 * CPU, RAM, disk I/O, temperature, hardware introspection, and system logs.
 */
export const systemCommands: TerminalCommand[] = [
  {
    id: "top-memory-processes",
    title: "List Top 10 RAM Consuming Processes",
    description: "Sorts active processes by memory consumption percentage in descending order with PID and user.",
    command: "ps aux --sort=-%mem | head -n 11",
    platforms: ["linux"],
    category: "system",
    tags: ["memory", "ram", "ps", "oom", "leak", "monitor"],
    dangerLevel: "safe",
    proTip: "On macOS, BSD ps uses \"ps -arcwwwxo pid,%mem,command | head -n 11\".",
    alternatives: [
      {
        platform: "macos",
        command: "ps -arcwwwxo pid,%mem,command | head -n 11",
        note: "macOS BSD ps"
      },
      {
        platform: "windows",
        command: "Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 10 -Property Id, ProcessName, @{Name=\"MB\";Expression={\"{0:N1}\" -f ($_.WorkingSet / 1MB)}}",
        note: "PowerShell"
      }
    ]
  },
  {
    id: "kernel-dmesg-errors",
    title: "Inspect Hardware & Kernel Error Logs",
    description: "Dumps kernel ring buffer messages filtered for errors, hardware warnings, or OOM crashes.",
    command: "dmesg -T --level=err,crit,alert,emerg",
    platforms: ["linux"],
    category: "system",
    tags: ["dmesg", "kernel", "hardware", "oom", "crash", "logs"],
    dangerLevel: "safe",
    proTip: "The -T flag renders human-readable timestamps instead of seconds since boot.",
    outputExample: "[Thu Sep 10 20:12:01 2026] Out of memory: Kill process 28149 (java) score 852 or sacrifice child"
  },
  {
    id: "system-disk-free-human",
    title: "Inspect Disk Filesystem Capacity & Free Space",
    description: "Displays all mounted partitions, filesystem types, and percentage used in human-readable sizes (GB/TB).",
    command: "df -h -T -x tmpfs -x devtmpfs",
    platforms: ["linux"],
    category: "system",
    tags: ["df", "disk", "storage", "partition", "space"],
    dangerLevel: "safe",
    proTip: "Excluding tmpfs removes noisy memory-backed virtual filesystems.",
    alternatives: [
      { platform: "macos", command: "df -h", note: "macOS BSD df" },
      {
        platform: "windows",
        command: "Get-PSDrive -PSProvider FileSystem | Select-Object Name, @{Name=\"FreeGB\";Expression={\"{0:N1}\" -f ($_.Free / 1GB)}}, @{Name=\"UsedGB\";Expression={\"{0:N1}\" -f ($_.Used / 1GB)}}",
        note: "PowerShell"
      }
    ]
  },
  {
    id: "system-live-io-stats",
    title: "Real-Time Disk Read/Write IOPS & Throughput",
    description: "Reports device input/output metrics to find which disk or NVMe drive is saturated.",
    command: "iostat -xz 1 10",
    platforms: ["linux"],
    category: "system",
    tags: ["iostat", "disk", "iops", "performance", "nvme"],
    dangerLevel: "safe",
    proTip: "Look at the %util column: if near 100%, your disk is a major bottleneck.",
    outputExample: "Device   r/s     w/s     rMB/s   wMB/s   %util\nnvme0n1  124.0   312.0   12.4    48.2    34.2%"
  },
  {
    id: "system-ram-usage-free",
    title: "Check Physical & Swap Memory Consumption",
    description: "Prints total, used, free, shared, and available memory in gigabytes.",
    command: "free -h --giga",
    platforms: ["linux"],
    category: "system",
    tags: ["free", "ram", "memory", "swap", "linux"],
    dangerLevel: "safe",
    proTip: "Focus on \"available\" rather than \"free\", since modern OSes utilize unused RAM for buffer cache.",
    outputExample: "               total        used        free      shared  buff/cache   available\nMem:            32Gi        12Gi       8.2Gi       410Mi        11Gi        19Gi"
  },
  {
    id: "system-hardware-cpu-info",
    title: "Detailed CPU Architecture & Core Details",
    description: "Displays processor model, socket count, hardware virtualization flags, and clock speeds.",
    command: "lscpu",
    platforms: ["linux"],
    category: "system",
    tags: ["cpu", "hardware", "lscpu", "architecture", "cores"],
    dangerLevel: "safe",
    alternatives: [
      {
        platform: "macos",
        command: "sysctl -n machdep.cpu.brand_string; sysctl -n hw.ncpu",
        note: "macOS CPU architecture"
      },
      {
        platform: "windows",
        command: "Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors",
        note: "PowerShell"
      }
    ]
  },
  {
    id: "journalctl-follow-service",
    title: "Stream Systemd Service Logs in Real Time",
    description: "Tails the live log output of a specific systemd unit service with full formatting.",
    command: "journalctl -u {{service}} -f -n 100 --no-pager",
    platforms: ["linux"],
    category: "system",
    tags: ["journalctl", "systemd", "logs", "tail", "stream", "service"],
    dangerLevel: "safe",
    proTip: "Add \"-b\" to limit output to the current boot only.",
    params: [
      { name: "service", label: "Service Name", default: "nginx", placeholder: "docker" }
    ],
    outputExample: "Sep 10 21:50:12 server nginx[1204]: [notice] start worker processes"
  },
  {
    id: "systemctl-status-nonblock",
    title: "Check Systemd Service Status Cleanly",
    description: "Inspects whether a service is active and running without spawning a pager.",
    command: "systemctl status {{service}} --no-pager -l",
    platforms: ["linux"],
    category: "system",
    tags: ["systemctl", "systemd", "service", "status"],
    dangerLevel: "safe",
    params: [
      { name: "service", label: "Service Unit", default: "nginx", placeholder: "service" }
    ]
  },
  {
    id: "btop-system-monitor",
    title: "Monitor System Activity (btop)",
    description: "Terminal activity monitor for CPU, memory, disks, and network with graphs.",
    command: "btop --utf-force",
    platforms: ["linux", "macos"],
    category: "system",
    tags: ["btop", "htop", "monitor", "cpu", "gpu", "process"],
    dangerLevel: "safe"
  },
  {
    id: "tail-multiple-logs-wildcard",
    title: "Stream Follow Multiple Log Files Simultaneously",
    description: "Follows multiple active log files in parallel, prepending the file name to every incoming line.",
    command: "tail -f -n 50 {{logPattern}}",
    platforms: ["linux", "macos"],
    category: "system",
    tags: ["tail", "logs", "stream", "wildcard", "follow"],
    dangerLevel: "safe",
    params: [
      {
        name: "logPattern",
        label: "Log Files Glob",
        default: "/var/log/nginx/*.log",
        placeholder: "/var/log/*.log"
      }
    ]
  },
  {
    id: "systemd-analyze-blame",
    title: "Profile Slowest Systemd Services",
    description: "Rank initializing services by startup duration to identify boot bottlenecks.",
    command: "systemd-analyze blame | head -n 15",
    platforms: ["linux"],
    category: "system",
    tags: ["systemd", "boot", "performance", "blame", "profile", "sre"],
    dangerLevel: "safe",
    outputExample: "9.421s docker.service\n4.120s containerd.service\n2.810s cloud-init.service\n1.420s systemd-udev-settle.service\n0.980s networking.service"
  }
];
