import type { TerminalCommand } from "../types";

/**
 * Observability & SRE (📈)
 * strace system calls, eBPF bpftrace, journalctl JSON, perf profiling, iotop, and socket audits.
 */
export const observabilityCommands: TerminalCommand[] = [
  {
    id: "strace-attach-pid",
    title: "Trace Live System Calls & Network I/O of Process (strace)",
    description: "Attaches to an active process ID and outputs all file descriptor operations, syscalls, and network sockets.",
    command: "strace -p {{pid}} -f -e trace=network,file -s 256",
    platforms: ["linux"],
    category: "observability",
    tags: ["strace", "syscall", "pid", "debug", "sre", "kernel", "trace"],
    dangerLevel: "caution",
    proTip: "Attach with \"-t\" or \"-tt\" to include microsecond-precision timestamps on each syscall.",
    params: [
      { name: "pid", label: "Target PID", default: "1428", placeholder: "1428" }
    ],
    outputExample: "[pid  1428] openat(AT_FDCWD, \"/etc/resolv.conf\", O_RDONLY|O_CLOEXEC) = 4\n[pid  1428] connect(4, {sa_family=AF_INET, sin_port=htons(53), sin_addr=inet_addr(\"127.0.0.53\")}, 16) = 0\n[pid  1428] sendto(4, \"\\322\\10\\1\\0\\0\\1\\0\\0\\0\\0\\0\\0\\4loop\\5brain\\2fr\\0\\0\\1\\0\\1\", 31, MSG_NOSIGNAL, NULL, 0) = 31\n[pid  1428] recvfrom(4, \"\\322\\10\\201\\200\\0\\1\\0\\1\\0\\0\\0\\0\\4loop\\5brain\\2fr\\0\\0\\1\\0\\1\\300\\f\\0\\1\\0\\1\\0\\0\\1,\", 47, 0, NULL, NULL) = 47"
  },
  {
    id: "strace-summary-profile",
    title: "Profile System Call Execution Time and Frequency (strace -c)",
    description: "Runs target command and displays tabular summary ranking syscalls by cumulative runtime, calls, and errors.",
    command: "strace -c {{command}}",
    platforms: ["linux"],
    category: "observability",
    tags: ["strace", "profile", "benchmark", "syscall", "sre", "performance"],
    dangerLevel: "safe",
    proTip: "Add \"-S time\" to sort the summary table by total CPU time.",
    params: [
      {
        name: "command",
        label: "Command",
        default: "curl -s https://loop.brain.fr",
        placeholder: "curl -s ..."
      }
    ],
    outputExample: "% time     seconds  usecs/call     calls    errors syscall\n------ ----------- ----------- --------- --------- ----------------\n 42.10    0.012400         124       100           poll\n 28.50    0.008400          84       100           read\n 15.20    0.004480          32       140           write\n  8.10    0.002380         238        10         2 openat\n------ ----------- ----------- --------- --------- ----------------\n100.00    0.029460                   350         2 total"
  },
  {
    id: "bpftrace-opensnoop",
    title: "Trace Real-Time Kernel File Opens with eBPF bpftrace",
    description: "Instruments the sys_enter_openat tracepoint via eBPF to monitor which files every process is opening system-wide.",
    command: "bpftrace -e 'tracepoint:syscalls:sys_enter_openat { printf(\"%-6d %-16s %s\\n\", pid, comm, str(args->filename)); }'",
    platforms: ["linux"],
    category: "observability",
    tags: ["bpftrace", "ebpf", "kernel", "tracepoint", "sre", "observability", "files"],
    dangerLevel: "caution",
    proTip: "Requires root or CAP_BPF capabilities. Generates near-zero overhead compared to traditional auditd.",
    outputExample: "Attaching 1 probe...\nPID    COMM             FILENAME\n1240   systemd-resolved /etc/hosts\n1892   node             /app/dist/index.html\n1892   node             /app/node_modules/astro/package.json\n2410   sshd             /home/user/.ssh/authorized_keys"
  },
  {
    id: "journalctl-failed-units",
    title: "Inspect High-Priority Systemd Unit Failures Since Boot",
    description: "Queries journald for emergency, alert, and error level logs across all system services for the current boot.",
    command: "journalctl -p 3 -xb --no-pager",
    platforms: ["linux"],
    category: "observability",
    tags: ["journalctl", "systemd", "errors", "sre", "troubleshooting", "boot"],
    dangerLevel: "safe",
    proTip: "Priority level 3 filters for ERR, 2 for CRIT, 1 for ALERT, and 0 for EMERG.",
    outputExample: "-- Boot 5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d --\nSep 10 22:15:02 node-01 kernel: nvme0n1: Read(0x2) [0x00004a20] retry attempt 1\nSep 10 22:15:10 node-01 systemd[1]: Failed to start PostgreSQL Cluster 16-main.\nSep 10 22:15:10 node-01 postgresql@16-main[984]: 2026-09-10 22:15:10 UTC [984] FATAL: lock file \"postmaster.pid\" already exists"
  },
  {
    id: "journalctl-json-tail",
    title: "Stream Systemd Service Logs in Structured JSON",
    description: "Follows active daemon logs formatted as structured JSON records, ideal for piping into jq or logging forwarders.",
    command: "journalctl -u {{service}} -f -o json-pretty",
    platforms: ["linux"],
    category: "observability",
    tags: ["journalctl", "json", "logs", "systemd", "stream", "tail", "sre"],
    dangerLevel: "safe",
    proTip: "Combine with \"| jq '.MESSAGE'\" to parse specific keys in real time.",
    params: [
      { name: "service", label: "Unit Name", default: "docker", placeholder: "docker" }
    ],
    outputExample: "{\n  \"__CURSOR\" : \"s=39b8...;i=2c8;b=5a6b...\",\n  \"_SYSTEMD_UNIT\" : \"docker.service\",\n  \"MESSAGE\" : \"Loading containers: done.\",\n  \"PRIORITY\" : \"6\",\n  \"_PID\" : \"1104\",\n  \"_HOSTNAME\" : \"prod-srv-01\",\n  \"__REALTIME_TIMESTAMP\" : \"1789079410123456\"\n}"
  },
  {
    id: "perf-top-cpu",
    title: "Sample CPU Cycles by Function with Hardware Counters (perf)",
    description: "Real-time dynamic profiling of kernel and userspace functions consuming the highest proportion of CPU execution cycles.",
    command: "perf top -F {{frequency}}",
    platforms: ["linux"],
    category: "observability",
    tags: ["perf", "cpu", "profiling", "sre", "flamegraph", "kernel", "performance"],
    dangerLevel: "caution",
    proTip: "Use \"-p {{pid}}\" to profile an isolated misbehaving process rather than the whole system.",
    params: [
      { name: "frequency", label: "Sample Frequency (Hz)", default: "99", placeholder: "99" }
    ],
    outputExample: "Samples: 14K of event 'cycles', 4000 Hz, Event count (approx.): 298104820\nOverhead  Shared Object       Symbol\n  18.42%  vmlinux             [k] clear_page_erms\n   8.15%  node                [.] v8::internal::Scavenger::Process\n   5.20%  libc.so.6           [.] __memmove_avx_unaligned_erms\n   3.14%  vmlinux             [k] native_queued_spin_lock_slowpath"
  },
  {
    id: "pidstat-io-metrics",
    title: "Track Real-Time Disk Read/Write Bandwidth Per Process",
    description: "Samples input/output rate (kB/s read, kB/s written) for each active thread, isolating I/O bottleneck processes.",
    command: "pidstat -d {{interval}} {{count}}",
    platforms: ["linux"],
    category: "observability",
    tags: ["pidstat", "disk", "io", "iops", "bandwidth", "sre", "metrics"],
    dangerLevel: "safe",
    proTip: "Combine with \"iotop -o\" for an interactive ncurses process disk activity monitor.",
    params: [
      { name: "interval", label: "Interval (seconds)", default: "2", placeholder: "2" },
      { name: "count", label: "Sample Count", default: "3", placeholder: "3" }
    ],
    outputExample: "Linux 6.8.0 (node-01)   09/10/2026      _x86_64_        (8 CPU)\n\n22:30:10 UID       PID   kB_rd/s   kB_wr/s kB_ccwr/s iodelay  Command\n22:30:12 999       842      0.00   8420.00      0.00       2  postgres\n22:30:12 1000     1410   1240.00    210.00      0.00       0  node\n22:30:12 0        2109      0.00    512.00      0.00       1  kworker/u16:2"
  },
  {
    id: "lsof-unlinked-deleted-files",
    title: "Find Open Deleted Files Holding Disk Space Hostage",
    description: "Identifies unlinked files whose link count is zero but whose disk blocks cannot be freed because a process keeps them open.",
    command: "lsof +L1",
    platforms: ["linux", "macos"],
    category: "observability",
    tags: ["lsof", "disk", "storage", "deleted", "unlinked", "fd", "sre"],
    dangerLevel: "safe",
    proTip: "Restart the holding process (or truncate with : > /proc/<PID>/fd/<FD>) to instantly release storage.",
    outputExample: "COMMAND   PID USER   FD   TYPE DEVICE   SIZE/OFF NLINK NODE NAME\nnginx    1420 root    4w   REG  259,2 1482019482     0 8421 /var/log/nginx/access.log (deleted)\njava     2811 app     7u   REG  259,2  524288000     0 9942 /tmp/hsperfdata_app/buffer.dat (deleted)"
  },
  {
    id: "tcpdump-http-sniff",
    title: "Sniff Plaintext HTTP GET/POST Request Headers and URIs",
    description: "Captures live TCP port traffic and decodes packet payloads as readable ASCII to inspect HTTP headers and endpoints.",
    command: "tcpdump -A -s 0 'tcp port {{port}} and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:2]&0xf0)>>2)) != 0)' -i {{interface}}",
    platforms: ["linux"],
    category: "observability",
    tags: ["tcpdump", "http", "packet", "sniff", "network", "debug", "sre"],
    dangerLevel: "caution",
    proTip: "Use \"-w capture.pcap\" instead of \"-A\" to save raw binary captures for analysis in Wireshark.",
    params: [
      { name: "port", label: "Port", default: "80", placeholder: "80" },
      { name: "interface", label: "Interface", default: "eth0", placeholder: "eth0" }
    ],
    outputExample: "22:31:04.120482 IP 192.168.1.50.48291 > 192.168.1.10.80: Flags [P.], seq 1:348, ack 1\n.GET /api/v1/health HTTP/1.1\nHost: api.internal\nUser-Agent: curl/8.5.0\nAccept: */*"
  },
  {
    id: "curl-latency-breakdown",
    title: "Sub-Millisecond HTTP Latency Breakdown (DNS, TLS, TTFB)",
    description: "Queries a URL and outputs high-precision timing variables dissecting DNS lookup, TCP connect, SSL handshake, and TTFB.",
    command: "curl -w \"DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s | TTFB: %{time_starttransfer}s | Total: %{time_total}s\\n\" -o /dev/null -s {{url}}",
    platforms: ["all"],
    category: "observability",
    tags: ["curl", "latency", "ttfb", "dns", "tls", "benchmark", "sre", "networking"],
    dangerLevel: "safe",
    proTip: "Add \"-H 'Accept-Encoding: gzip'\" to verify compression latency impact.",
    params: [
      {
        name: "url",
        label: "Target URL",
        default: "https://brain.fr",
        placeholder: "https://..."
      }
    ],
    outputExample: "DNS: 0.008124s | Connect: 0.024510s | TLS: 0.048912s | TTFB: 0.071204s | Total: 0.078410s"
  }
];
