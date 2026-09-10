import type { TerminalCommand } from "../types";

/**
 * Networking & DNS (🌐)
 * Ports, sockets, DNS propagation, bandwidth, reverse proxies, and packet trace.
 */
export const networkingCommands: TerminalCommand[] = [
  {
    id: "list-listening-ports",
    title: "Show Listening Ports & PIDs",
    description: "List all TCP/UDP ports in LISTEN state with PIDs.",
    command: "sudo ss -tulpn",
    platforms: ["linux"],
    category: "networking",
    tags: ["ports", "listen", "sockets", "ss", "network", "pid"],
    dangerLevel: "safe",
    proTip: "\"ss\" is the modern, fast replacement for \"netstat\" on modern Linux kernels.",
    alternatives: [
      {
        platform: "macos",
        command: "sudo lsof -iTCP -sTCP:LISTEN -P -n",
        note: "macOS native listing"
      },
      {
        platform: "windows",
        command: "Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess",
        note: "PowerShell"
      }
    ],
    outputExample: "Netid State  Local Address:Port   Peer Address:Port  Process\ntcp   LISTEN 0.0.0.0:80           0.0.0.0:*          users:((\"nginx\",pid=1142,fd=6))"
  },
  {
    id: "test-port-connectivity",
    title: "Test TCP Port Connectivity",
    description: "Check remote port reachability without telnet.",
    command: "nc -zv -w3 {{host}} {{port}}",
    platforms: ["linux", "macos"],
    category: "networking",
    tags: ["netcat", "nc", "port", "ping", "firewall", "tcp"],
    dangerLevel: "safe",
    proTip: "The -z flag scans without sending data, -v is verbose, and -w3 sets a 3-second timeout.",
    params: [
      { name: "host", label: "Host/Domain", default: "github.com", placeholder: "example.com" },
      { name: "port", label: "Port", default: "443", placeholder: "443" }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "Test-NetConnection -ComputerName {{host}} -Port {{port}}",
        note: "PowerShell built-in cmdlet"
      },
      {
        platform: "all",
        command: "curl -v telnet://{{host}}:{{port}}",
        note: "Portable curl socket test"
      }
    ],
    outputExample: "Connection to github.com port 443 [tcp/https] succeeded!"
  },
  {
    id: "dns-trace-propagation",
    title: "Trace DNS from Root Servers",
    description: "Walk hierarchical DNS path from root to authoritative.",
    command: "dig +trace +nodnssec {{domain}} {{recordType}}",
    platforms: ["linux", "macos"],
    category: "networking",
    tags: ["dns", "dig", "lookup", "trace", "domain", "propagation"],
    dangerLevel: "safe",
    proTip: "Add \"+stats\" to see query round-trip time in milliseconds for troubleshooting slow DNS.",
    params: [
      { name: "domain", label: "Domain", default: "loop.brain.fr", placeholder: "domain.com" },
      {
        name: "recordType",
        label: "Record Type",
        default: "A",
        placeholder: "A, CNAME, MX, TXT"
      }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "Resolve-DnsName -Name {{domain}} -Type {{recordType}} -Server 1.1.1.1",
        note: "PowerShell DNS resolver"
      }
    ]
  },
  {
    id: "curl-timing-breakdown",
    title: "HTTP Latency Breakdown",
    description: "Report DNS, TCP, TLS, and TTFB latency in milliseconds.",
    command: "curl -w \"@-\" -o /dev/null -s {{url}} << 'EOF'\n  DNS:        %{time_namelookup}s\\n  TCP:        %{time_connect}s\\n  TLS:        %{time_appconnect}s\\n  StartXfer:  %{time_starttransfer}s\\n  Total:      %{time_total}s\\n  HTTP Code:  %{http_code}\\nEOF",
    platforms: ["linux", "macos"],
    category: "networking",
    tags: ["curl", "http", "timing", "latency", "ttfb", "performance"],
    dangerLevel: "safe",
    proTip: "Essential for debugging whether high response latency is caused by DNS resolution, SSL handshake, or slow backend code.",
    params: [
      {
        name: "url",
        label: "Target URL",
        default: "https://loop.brain.fr",
        placeholder: "https://..."
      }
    ],
    outputExample: "  DNS:        0.012s\n  TCP:        0.034s\n  TLS:        0.071s\n  StartXfer:  0.118s\n  Total:      0.142s\n  HTTP Code:  200"
  },
  {
    id: "trace-route-mtr",
    title: "Live Path & Packet Loss (MTR)",
    description: "Interactive real-time traceroute and packet loss probe.",
    command: "sudo mtr --report-cycles 10 --report {{host}}",
    platforms: ["linux", "macos"],
    category: "networking",
    tags: ["mtr", "traceroute", "ping", "network", "loss", "hop"],
    dangerLevel: "safe",
    proTip: "Run without \"--report\" for full terminal ncurses interactive mode.",
    params: [
      {
        name: "host",
        label: "Target Host",
        default: "1.1.1.1",
        placeholder: "1.1.1.1 or domain"
      }
    ],
    alternatives: [
      { platform: "windows", command: "tracert {{host}}", note: "Windows Command Prompt" }
    ]
  },
  {
    id: "ssh-reverse-tunnel",
    title: "Expose Port via Reverse SSH",
    description: "Tunnel remote server port back to local dev machine.",
    command: "ssh -N -R {{remotePort}}:localhost:{{localPort}} {{remoteUser}}@{{remoteHost}}",
    platforms: ["linux", "macos", "windows"],
    category: "networking",
    tags: ["ssh", "tunnel", "forward", "remote", "ngrok-alternative"],
    dangerLevel: "caution",
    proTip: "Ensure \"GatewayPorts clientspecified\" or \"yes\" is enabled in /etc/ssh/sshd_config on the remote server.",
    params: [
      { name: "remotePort", label: "Remote Port", default: "8080", placeholder: "8080" },
      { name: "localPort", label: "Local Port", default: "3000", placeholder: "3000" },
      { name: "remoteUser", label: "User", default: "deploy", placeholder: "root" },
      {
        name: "remoteHost",
        label: "Server IP/Host",
        default: "vps.example.com",
        placeholder: "ip.or.domain"
      }
    ]
  },
  {
    id: "sniff-http-traffic",
    title: "Sniff Plaintext HTTP Traffic",
    description: "Capture HTTP GET/POST headers and payloads in ASCII.",
    command: "sudo tcpdump -i {{interface}} -A -s 0 'tcp port {{port}} and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:2]&0xf0)>>2)) != 0)'",
    platforms: ["linux", "macos"],
    category: "networking",
    tags: ["tcpdump", "sniff", "packet", "http", "traffic", "debug"],
    dangerLevel: "caution",
    proTip: "Use \"ip link\" or \"ifconfig\" to list interface names (e.g. eth0, wlan0, en0).",
    params: [
      { name: "interface", label: "Interface", default: "any", placeholder: "eth0, any" },
      { name: "port", label: "Port", default: "80", placeholder: "80" }
    ]
  },
  {
    id: "network-ping-interval-sweep",
    title: "Fast Sub-Second Ping Test",
    description: "Send high-frequency pings to detect network jitter.",
    command: "ping -i {{interval}} -c {{count}} {{host}}",
    platforms: ["linux", "macos"],
    category: "networking",
    tags: ["ping", "latency", "jitter", "icmp", "network"],
    dangerLevel: "safe",
    params: [
      { name: "interval", label: "Interval (seconds)", default: "0.2", placeholder: "0.2" },
      { name: "count", label: "Packet Count", default: "20", placeholder: "10" },
      { name: "host", label: "Target Host", default: "1.1.1.1", placeholder: "8.8.8.8" }
    ]
  },
  {
    id: "network-ip-route-default",
    title: "Show Default Gateway & Routing Table",
    description: "Display default outbound gateway interface and metric.",
    command: "ip route show default",
    platforms: ["linux"],
    category: "networking",
    tags: ["ip", "route", "gateway", "network", "interface"],
    dangerLevel: "safe",
    alternatives: [
      { platform: "macos", command: "netstat -nr | grep default", note: "macOS route table" },
      {
        platform: "windows",
        command: "Get-NetRoute -DestinationPrefix \"0.0.0.0/0\" | Select-Object NextHop, InterfaceAlias",
        note: "PowerShell"
      }
    ],
    outputExample: "default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.42 metric 100"
  },
  {
    id: "curl-stream-json-api",
    title: "Send Authenticated JSON POST",
    description: "POST JSON payload with bearer auth token and pipe to jq.",
    command: "curl -s -X POST {{url}} -H \"Content-Type: application/json\" -H \"Authorization: Bearer {{token}}\" -d '{{payload}}' | jq .",
    platforms: ["all"],
    category: "networking",
    tags: ["curl", "api", "post", "json", "auth", "bearer"],
    dangerLevel: "safe",
    params: [
      {
        name: "url",
        label: "API Endpoint",
        default: "https://api.example.com/v1/data",
        placeholder: "https://..."
      },
      { name: "token", label: "Bearer Token", default: "xyz123abc", placeholder: "token" },
      {
        name: "payload",
        label: "JSON Body",
        default: "{\"active\": true}",
        placeholder: "{\"key\":\"val\"}"
      }
    ]
  }
];
