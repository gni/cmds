import type { TerminalCommand } from "../types";

/**
 * Network & Security (🌐)
 * Remote access, firewalls, network diagnostics, and SSL certificates:
 * ssh, ufw, iptables, openssl, curl, dig, and socket audits.
 */
export const networkSecurityCommands: TerminalCommand[] = [
  {
    id: "ssh-copy-id-key",
    title: "Install SSH Key on Remote Host",
    description: "Copy public SSH key to remote host's ~/.ssh/authorized_keys.",
    command: "ssh-copy-id -i {{publicKey}} {{user}}@{{host}}",
    platforms: ["linux", "macos"],
    category: "network-security",
    tags: ["ssh", "ssh-copy-id", "auth", "key", "remote"],
    dangerLevel: "safe",
    params: [
      { name: "publicKey", label: "Public Key", default: "~/.ssh/id_ed25519.pub", placeholder: "~/.ssh/id_ed25519.pub" },
      { name: "user", label: "Remote User", default: "ubuntu", placeholder: "user" },
      { name: "host", label: "Remote Host", default: "server.example.com", placeholder: "ip" }
    ],
    outputExample: "Number of key(s) added: 1\nNow try logging into the machine, with: \"ssh 'ubuntu@server.example.com'\""
  },
  {
    id: "ssh-local-port-forward",
    title: "Secure Local SSH Port Forward (Tunnel)",
    description: "Forward remote internal database or service port to localhost securely.",
    command: "ssh -L {{localPort}}:localhost:{{remotePort}} -N -f {{user}}@{{host}}",
    platforms: ["all"],
    category: "network-security",
    tags: ["ssh", "tunnel", "forward", "database", "secure"],
    dangerLevel: "safe",
    proTip: "The -N flag prevents remote shell allocation, -f sends ssh into background immediately.",
    params: [
      { name: "localPort", label: "Local Port", default: "5432", placeholder: "5432" },
      { name: "remotePort", label: "Remote Port", default: "5432", placeholder: "5432" },
      { name: "user", label: "User", default: "deploy", placeholder: "user" },
      { name: "host", label: "Remote Host", default: "bastion.example.com", placeholder: "host" }
    ]
  },
  {
    id: "ssh-keygen-ed25519",
    title: "Generate Modern Ed25519 SSH Key",
    description: "Generate high-security Ed25519 SSH keypair with 100 KDF rounds.",
    command: "ssh-keygen -t ed25519 -a 100 -C \"{{email}}\" -f {{keyPath}}",
    platforms: ["all"],
    category: "network-security",
    tags: ["ssh", "keygen", "ed25519", "crypto", "auth"],
    dangerLevel: "safe",
    params: [
      { name: "email", label: "Comment / Email", default: "dev@example.com", placeholder: "email" },
      { name: "keyPath", label: "Output Path", default: "~/.ssh/id_ed25519", placeholder: "path" }
    ]
  },
  {
    id: "openssl-inspect-cert",
    title: "Inspect SSL Certificate Dates & Domains",
    description: "Decode X.509 certificate file to verify validity dates and SAN domains.",
    command: "openssl x509 -in {{certPath}} -noout -dates -subject -issuer",
    platforms: ["all"],
    category: "network-security",
    tags: ["openssl", "ssl", "tls", "cert", "x509", "expiry"],
    dangerLevel: "safe",
    params: [
      { name: "certPath", label: "Certificate File", default: "/etc/ssl/cert.pem", placeholder: "cert.pem" }
    ],
    outputExample: "notBefore=Sep 10 00:00:00 2026 GMT\nnotAfter=Dec 09 23:59:59 2026 GMT\nsubject=CN = example.com\nissuer=C = US, O = Let's Encrypt, CN = R3"
  },
  {
    id: "openssl-test-handshake",
    title: "Test Live SSL Handshake & SNI",
    description: "Establish live TLS connection to verify server certificate chain and ciphers.",
    command: "openssl s_client -connect {{host}}:443 -servername {{host}} -brief",
    platforms: ["all"],
    category: "network-security",
    tags: ["openssl", "ssl", "tls", "handshake", "sni", "debug"],
    dangerLevel: "safe",
    params: [
      { name: "host", label: "Domain / Host", default: "example.com", placeholder: "domain.com" }
    ],
    outputExample: "CONNECTION ESTABLISHED\nProtocol version: TLSv1.3\nCiphersuite: TLS_AES_256_GCM_SHA384\nPeer certificate: CN = example.com\nVerification: OK"
  },
  {
    id: "curl-headers-only",
    title: "Follow Redirects & Print Headers Only",
    description: "Follow HTTP 301/302 redirects and output response headers.",
    command: "curl -ILs {{url}} | grep -E \"HTTP|location|content-type\"",
    platforms: ["all"],
    category: "network-security",
    tags: ["curl", "http", "headers", "redirect", "debug"],
    dangerLevel: "safe",
    params: [
      { name: "url", label: "URL", default: "https://example.com", placeholder: "https://..." }
    ],
    outputExample: "HTTP/2 301 \nlocation: https://www.example.com/\nHTTP/2 200 \ncontent-type: text/html; charset=UTF-8"
  },
  {
    id: "list-listening-ports",
    title: "Show Listening Ports & PIDs (ss)",
    description: "List all TCP/UDP ports in LISTEN state with process PIDs.",
    command: "sudo ss -tulpn",
    platforms: ["linux"],
    category: "network-security",
    tags: ["ports", "listen", "sockets", "ss", "network", "pid"],
    dangerLevel: "safe",
    outputExample: "Netid State  Local Address:Port   Peer Address:Port  Process\ntcp   LISTEN 0.0.0.0:80           0.0.0.0:*          users:((\"nginx\",pid=1142,fd=6))"
  },
  {
    id: "test-port-connectivity",
    title: "Test TCP Port Reachability (nc)",
    description: "Check if remote port is reachable without establishing a full connection.",
    command: "nc -zv -w3 {{host}} {{port}}",
    platforms: ["linux", "macos"],
    category: "network-security",
    tags: ["netcat", "nc", "port", "firewall", "tcp"],
    dangerLevel: "safe",
    params: [
      { name: "host", label: "Host/Domain", default: "github.com", placeholder: "example.com" },
      { name: "port", label: "Port", default: "443", placeholder: "443" }
    ],
    outputExample: "Connection to github.com port 443 [tcp/https] succeeded!"
  },
  {
    id: "dns-trace-propagation",
    title: "Trace DNS from Root Servers (dig)",
    description: "Walk hierarchical DNS resolution path from root to authoritative nameserver.",
    command: "dig +trace +nodnssec {{domain}} {{recordType}}",
    platforms: ["linux", "macos"],
    category: "network-security",
    tags: ["dns", "dig", "lookup", "trace", "domain"],
    dangerLevel: "safe",
    params: [
      { name: "domain", label: "Domain", default: "example.com", placeholder: "domain.com" },
      { name: "recordType", label: "Record Type", default: "A", placeholder: "A, CNAME" }
    ]
  },
  {
    id: "curl-timing-breakdown",
    title: "HTTP Latency & TTFB Breakdown",
    description: "Measure DNS lookup, TCP handshake, TLS negotiation, and TTFB in seconds.",
    command: "curl -w \"@-\" -o /dev/null -s {{url}} << 'EOF'\n  DNS:        %{time_namelookup}s\\n  TCP:        %{time_connect}s\\n  TLS:        %{time_appconnect}s\\n  StartXfer:  %{time_starttransfer}s\\n  Total:      %{time_total}s\\n  HTTP Code:  %{http_code}\\nEOF",
    platforms: ["linux", "macos"],
    category: "network-security",
    tags: ["curl", "http", "timing", "latency", "ttfb", "performance"],
    dangerLevel: "safe",
    params: [
      { name: "url", label: "Target URL", default: "https://example.com", placeholder: "https://..." }
    ],
    outputExample: "  DNS:        0.012s\n  TCP:        0.034s\n  TLS:        0.071s\n  StartXfer:  0.118s\n  Total:      0.142s\n  HTTP Code:  200"
  },
  {
    id: "trace-route-mtr",
    title: "Live Path & Packet Loss (MTR)",
    description: "Interactive real-time traceroute and packet loss probe.",
    command: "sudo mtr --report-cycles 10 --report {{host}}",
    platforms: ["linux", "macos"],
    category: "network-security",
    tags: ["mtr", "traceroute", "ping", "network", "loss"],
    dangerLevel: "safe",
    params: [
      { name: "host", label: "Target Host", default: "1.1.1.1", placeholder: "1.1.1.1" }
    ]
  },
  {
    id: "ufw-status-numbered",
    title: "View Firewall Rules with Numbers",
    description: "Display numbered list of active UFW firewall rules for easy reference and deletion.",
    command: "sudo ufw status numbered",
    platforms: ["linux"],
    category: "network-security",
    tags: ["ufw", "firewall", "security", "status", "rules", "numbered"],
    dangerLevel: "safe",
    outputExample: "Status: active\n\n     To                         Action      From\n     --                         ------      ----\n[ 1] 22/tcp                     LIMIT IN    Anywhere\n[ 2] 80/tcp                     ALLOW IN    Anywhere\n[ 3] 443/tcp                    ALLOW IN    Anywhere"
  },
  {
    id: "ufw-enable-force",
    title: "Enable UFW Firewall Non-Interactively",
    description: "Start and enable UFW firewall service automatically without interactive confirmation prompt.",
    command: "sudo ufw --force enable",
    platforms: ["linux"],
    category: "network-security",
    tags: ["ufw", "firewall", "enable", "security", "activate"],
    dangerLevel: "safe",
    proTip: "Always make sure SSH (port 22) is allowed before enabling UFW to prevent getting locked out!",
    outputExample: "Firewall is active and enabled on system startup"
  },
  {
    id: "ufw-allow-port-proto",
    title: "Allow Inbound Port by Protocol",
    description: "Open specific inbound port for specified transport protocol (tcp/udp).",
    command: "sudo ufw allow {{port}}/{{proto}}",
    platforms: ["linux"],
    category: "network-security",
    tags: ["ufw", "firewall", "allow", "port", "tcp", "udp"],
    dangerLevel: "safe",
    params: [
      { name: "port", label: "Port Number", default: "443", placeholder: "80, 443, 3000" },
      { name: "proto", label: "Protocol", default: "tcp", placeholder: "tcp or udp" }
    ]
  },
  {
    id: "ufw-allow-from-ip",
    title: "Allow Specific Inbound IP Address",
    description: "Grant firewall access exclusively to a trusted IP address on a given port.",
    command: "sudo ufw allow from {{ip}} to any port {{port}} proto {{proto}}",
    platforms: ["linux"],
    category: "network-security",
    tags: ["ufw", "firewall", "ip", "whitelist", "security"],
    dangerLevel: "safe",
    params: [
      { name: "ip", label: "Trusted IP", default: "198.51.100.42", placeholder: "1.2.3.4" },
      { name: "port", label: "Target Port", default: "22", placeholder: "22" },
      { name: "proto", label: "Protocol", default: "tcp", placeholder: "tcp" }
    ]
  },
  {
    id: "ufw-rate-limit-ssh",
    title: "Rate Limit SSH Connections (Anti-Bruteforce)",
    description: "Deny connections from an IP that attempts 6 or more connections within 30 seconds.",
    command: "sudo ufw limit {{port}}/tcp",
    platforms: ["linux"],
    category: "network-security",
    tags: ["ufw", "firewall", "ssh", "ratelimit", "bruteforce", "security"],
    dangerLevel: "safe",
    params: [
      { name: "port", label: "SSH Port", default: "22", placeholder: "22" }
    ]
  },
  {
    id: "ufw-delete-rule-number",
    title: "Delete Firewall Rule by Number",
    description: "Remove specific rule from UFW table using its rule index.",
    command: "sudo ufw delete {{ruleNumber}}",
    platforms: ["linux"],
    category: "network-security",
    tags: ["ufw", "firewall", "delete", "remove"],
    dangerLevel: "safe",
    params: [
      { name: "ruleNumber", label: "Rule Index", default: "1", placeholder: "1" }
    ]
  },
  {
    id: "ufw-disable",
    title: "Disable UFW Firewall",
    description: "Completely turn off UFW firewall and reset packet filtering rules to accept all.",
    command: "sudo ufw disable",
    platforms: ["linux"],
    category: "network-security",
    tags: ["ufw", "firewall", "disable", "stop"],
    dangerLevel: "caution",
    proTip: "Only use for temporary debugging; leaves the host completely exposed to incoming network traffic.",
    outputExample: "Firewall stopped and disabled on system startup"
  },
  {
    id: "iptables-list-line-numbers",
    title: "List iptables Rules with Line Numbers & Packet Counts",
    description: "Display detailed packet and byte counters alongside rule line numbers across all chains.",
    command: "sudo iptables -L -n -v --line-numbers",
    platforms: ["linux"],
    category: "network-security",
    tags: ["iptables", "firewall", "packets", "stats", "rules"],
    dangerLevel: "safe",
    outputExample: "Chain INPUT (policy DROP 412 packets, 18K bytes)\nnum   pkts bytes target     prot opt in     out     source               destination\n1     124K   82M ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0\n2     810K  412M ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED\n3      12K  640K ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:22 ctstate NEW"
  },
  {
    id: "iptables-drop-bad-ip",
    title: "Instantly Drop Malicious IP with iptables",
    description: "Append rule to INPUT chain to immediately discard all packets from an attacker IP.",
    command: "sudo iptables -A INPUT -s {{badIp}} -j DROP",
    platforms: ["linux"],
    category: "network-security",
    tags: ["iptables", "firewall", "drop", "block", "attack", "ddos"],
    dangerLevel: "safe",
    params: [
      { name: "badIp", label: "Malicious IP", default: "203.0.113.50", placeholder: "ip" }
    ]
  },
  {
    id: "iptables-allow-port",
    title: "Allow Inbound Port with Connection Tracking",
    description: "Allow incoming TCP connection to port only if it is a valid stateful handshake.",
    command: "sudo iptables -A INPUT -p {{proto}} --dport {{port}} -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT",
    platforms: ["linux"],
    category: "network-security",
    tags: ["iptables", "firewall", "allow", "port", "stateful"],
    dangerLevel: "safe",
    params: [
      { name: "proto", label: "Protocol", default: "tcp", placeholder: "tcp" },
      { name: "port", label: "Port", default: "443", placeholder: "443" }
    ]
  },
  {
    id: "iptables-flush-all-safe",
    title: "Safely Flush iptables Rules (Prevent SSH Lockout)",
    description: "Reset default chain policies to ACCEPT before flushing all chains to prevent instant SSH lockouts.",
    command: "sudo iptables -P INPUT ACCEPT && sudo iptables -P FORWARD ACCEPT && sudo iptables -P OUTPUT ACCEPT && sudo iptables -t nat -F && sudo iptables -t mangle -F && sudo iptables -F && sudo iptables -X",
    platforms: ["linux"],
    category: "network-security",
    tags: ["iptables", "firewall", "flush", "reset", "danger"],
    dangerLevel: "dangerous",
    proTip: "CRITICAL: Never run \"iptables -F\" while default policy is DROP! This command safely sets policies to ACCEPT first.",
    outputExample: "[✓] Filter, NAT, and mangle tables flushed.\n[✓] Default policies safely reset to ACCEPT."
  },
  {
    id: "trivy-fs-vuln",
    title: "Scan Codebase for High/Critical CVEs",
    description: "Scan directory for CVEs, leaked secrets, and misconfigurations.",
    command: "trivy fs --severity HIGH,CRITICAL {{targetDir}}",
    platforms: ["linux", "macos"],
    category: "network-security",
    tags: ["trivy", "cve", "vulnerability", "sast", "security"],
    dangerLevel: "safe",
    params: [
      { name: "targetDir", label: "Directory", default: ".", placeholder: "." }
    ]
  },
  {
    id: "gitleaks-detect-secrets",
    title: "Detect Secrets in Git History",
    description: "Scan git commits and staged files for exposed API keys and credentials.",
    command: "gitleaks detect --source {{repoPath}} -v --redact",
    platforms: ["all"],
    category: "network-security",
    tags: ["gitleaks", "secrets", "leak", "git", "api-key"],
    dangerLevel: "safe",
    params: [
      { name: "repoPath", label: "Repository Path", default: ".", placeholder: "." }
    ]
  }
];
