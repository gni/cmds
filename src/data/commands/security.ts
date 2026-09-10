import type { TerminalCommand } from "../types";

/**
 * Security & SSH (🔐)
 * Keygen ed25519, SSL cert audits, SOCKS proxies, firewalls, and checksums.
 */
export const securityCommands: TerminalCommand[] = [
  {
    id: "ssh-keygen-ed25519",
    title: "Generate Ed25519 SSH Key",
    description: "Generate elliptic-curve Ed25519 key pair with 100 rounds of bcrypt KDF.",
    command: "ssh-keygen -t ed25519 -a 100 -C \"{{comment}}\" -f ~/.ssh/{{keyName}}",
    platforms: ["all"],
    category: "security",
    tags: ["ssh", "keygen", "ed25519", "security", "keys"],
    dangerLevel: "safe",
    proTip: "The -a 100 flag forces 100 rounds of bcrypt KDF, making brute-force decryption virtually impossible.",
    params: [
      {
        name: "comment",
        label: "Email / Comment",
        default: "user@machine",
        placeholder: "name@email.com"
      },
      {
        name: "keyName",
        label: "Key Filename",
        default: "id_ed25519",
        placeholder: "id_ed25519"
      }
    ]
  },
  {
    id: "check-ssl-cert-expiry",
    title: "Check SSL/TLS Certificate Expiration",
    description: "Connect to HTTPS domain and extract validity dates from X.509 certificate.",
    command: "echo | openssl s_client -servername {{domain}} -connect {{domain}}:443 2>/dev/null | openssl x509 -noout -dates -issuer",
    platforms: ["linux", "macos"],
    category: "security",
    tags: ["ssl", "tls", "certificate", "openssl", "expiry", "https"],
    dangerLevel: "safe",
    proTip: "The -servername parameter is critical to trigger SNI on modern multi-tenant servers.",
    params: [
      {
        name: "domain",
        label: "Domain Name",
        default: "loop.brain.fr",
        placeholder: "example.com"
      }
    ],
    outputExample: "notBefore=Aug 15 00:00:00 2026 GMT\nnotAfter=Nov 13 23:59:59 2026 GMT\nissuer=C = US, O = Let's Encrypt, CN = R11"
  },
  {
    id: "ssh-socks5-proxy",
    title: "Create Encrypted SOCKS5 Proxy via SSH",
    description: "Route application or browser traffic through remote SSH jump host.",
    command: "ssh -D {{localPort}} -C -q -N {{user}}@{{remoteHost}}",
    platforms: ["all"],
    category: "security",
    tags: ["ssh", "socks5", "proxy", "vpn", "tunnel"],
    dangerLevel: "safe",
    proTip: "Configure your browser SOCKS host to 127.0.0.1:{{localPort}} to surf securely on untrusted Wi-Fi.",
    params: [
      { name: "localPort", label: "Local Port", default: "1080", placeholder: "1080" },
      { name: "user", label: "User", default: "ubuntu", placeholder: "root" },
      {
        name: "remoteHost",
        label: "Remote Server",
        default: "bastion.server.com",
        placeholder: "remote.ip"
      }
    ]
  },
  {
    id: "generate-random-password",
    title: "Generate High-Entropy Secret",
    description: "Produce cryptographically secure base64 string for API keys or passwords.",
    command: "openssl rand -base64 {{length}}",
    platforms: ["all"],
    category: "security",
    tags: ["openssl", "password", "secret", "random", "token"],
    dangerLevel: "safe",
    proTip: "To generate URL-safe alphanumeric strings only: tr -dc A-Za-z0-9 </dev/urandom | head -c {{length}}",
    params: [
      { name: "length", label: "Byte Length", default: "32", placeholder: "32" }
    ],
    outputExample: "4QZzG7o8fX9bW1+KjL0mNpQrStUvWxYzAbCdEfGhIjK="
  },
  {
    id: "file-checksum-verify",
    title: "Verify File SHA-256 Checksum",
    description: "Compute cryptographic SHA-256 hash to verify file integrity.",
    command: "sha256sum {{filePath}}",
    platforms: ["linux"],
    category: "security",
    tags: ["sha256", "hash", "checksum", "verify", "security"],
    dangerLevel: "safe",
    params: [
      {
        name: "filePath",
        label: "File Path",
        default: "ubuntu.iso",
        placeholder: "file.tar.gz"
      }
    ],
    alternatives: [
      { platform: "macos", command: "shasum -a 256 {{filePath}}", note: "macOS BSD shasum" },
      {
        platform: "windows",
        command: "Get-FileHash -Algorithm SHA256 {{filePath}}",
        note: "PowerShell"
      }
    ],
    outputExample: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  ubuntu.iso"
  },
  {
    id: "ssh-copy-id-key",
    title: "Install Public Key on Remote Server",
    description: "Append public SSH key to remote server ~/.ssh/authorized_keys file.",
    command: "ssh-copy-id -i ~/.ssh/{{keyName}}.pub {{user}}@{{host}}",
    platforms: ["linux", "macos"],
    category: "security",
    tags: ["ssh", "ssh-copy-id", "auth", "keys", "remote"],
    dangerLevel: "safe",
    params: [
      {
        name: "keyName",
        label: "Public Key File",
        default: "id_ed25519",
        placeholder: "id_rsa"
      },
      { name: "user", label: "Remote User", default: "root", placeholder: "ubuntu" },
      {
        name: "host",
        label: "Remote Host",
        default: "198.51.100.1",
        placeholder: "server.com"
      }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "type $env:USERPROFILE\\.ssh\\{{keyName}}.pub | ssh {{user}}@{{host}} \"cat >> ~/.ssh/authorized_keys\"",
        note: "PowerShell key copy"
      }
    ]
  },
  {
    id: "wipe-bash-history",
    title: "Wipe Shell History from Memory & Disk",
    description: "Clear in-memory shell history and truncate ~/.bash_history.",
    command: "cat /dev/null > ~/.bash_history && history -c && history -w",
    platforms: ["linux", "macos"],
    category: "security",
    tags: ["history", "wipe", "privacy", "bash", "clean"],
    dangerLevel: "caution",
    proTip: "In Zsh, clear with: cat /dev/null > ~/.zsh_history"
  },
  {
    id: "openssl-verify-cert-chain",
    title: "Inspect TLS Certificate Chain & SANs",
    description: "Parse remote certificate chain, expiry timestamp, and issuer CN.",
    command: "openssl s_client -connect {{host}}:443 -servername {{host}} -showcerts </dev/null 2>/dev/null | openssl x509 -noout -dates -subject -issuer",
    platforms: ["all"],
    category: "security",
    tags: ["openssl", "ssl", "tls", "certificate", "expiration", "x509", "security"],
    dangerLevel: "safe",
    proTip: "Add \"-ext subjectAltName\" to view all configured wildcard and multi-domain SANs.",
    params: [
      { name: "host", label: "Hostname", default: "loop.brain.fr", placeholder: "example.com" }
    ],
    outputExample: "notBefore=Aug 15 00:00:00 2026 GMT\nnotAfter=Nov 13 23:59:59 2026 GMT\nsubject=CN = loop.brain.fr\nissuer=C = US, O = Let's Encrypt, CN = R10"
  },
  {
    id: "ssh-local-port-forward",
    title: "Forward Local Port via SSH Tunnel",
    description: "Forward local port to private remote database or internal service over SSH.",
    command: "ssh -L {{localPort}}:{{remoteHost}}:{{remotePort}} -N {{user}}@{{bastion}}",
    platforms: ["linux", "macos"],
    category: "security",
    tags: ["ssh", "tunnel", "port-forward", "database", "security"],
    dangerLevel: "safe",
    proTip: "Add -f to send the SSH process to the background after authentication.",
    params: [
      { name: "localPort", label: "Local Port", default: "5432", placeholder: "5432" },
      {
        name: "remoteHost",
        label: "Remote Host",
        default: "db.internal",
        placeholder: "10.0.0.5"
      },
      { name: "remotePort", label: "Remote Port", default: "5432", placeholder: "5432" },
      { name: "user", label: "SSH User", default: "deploy", placeholder: "ubuntu" },
      {
        name: "bastion",
        label: "Bastion Host",
        default: "bastion.brain.fr",
        placeholder: "bastion.domain"
      }
    ],
    outputExample: "[Port forwarding active: localhost:5432 -> db.internal:5432 via bastion.brain.fr]"
  }
];
