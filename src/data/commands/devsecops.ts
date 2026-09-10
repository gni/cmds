import type { TerminalCommand } from "../types";

/**
 * DevSecOps & Hardening (🛡️)
 * Trivy image scan, Gitleaks secret audits, Cosign signatures, Semgrep SAST, Lynis, and Fail2ban.
 */
export const devsecopsCommands: TerminalCommand[] = [
  {
    id: "trivy-fs-vuln",
    title: "Scan Codebase for High/Critical CVEs",
    description: "Scan directory for CVEs, leaked secrets, and config flaws.",
    command: "trivy fs --severity HIGH,CRITICAL --scanners vuln,secret,misconfig {{targetDir}}",
    platforms: ["linux", "macos"],
    category: "devsecops",
    tags: ["trivy", "cve", "vulnerability", "sast", "security", "audit", "secret", "misconfig"],
    dangerLevel: "safe",
    proTip: "Run in CI/CD pipeline with \"--exit-code 1\" to fail the build if unpatched vulnerabilities exist.",
    params: [
      { name: "targetDir", label: "Directory", default: ".", placeholder: "." }
    ],
    outputExample: "2026-09-10T22:30:15Z INFO Vulnerability scanning is enabled\n2026-09-10T22:30:15Z INFO Secret scanning is enabled\n2026-09-10T22:30:16Z INFO Number of language-specific files: 3\npackage-lock.json (npm)\n=======================\nTotal: 0 (HIGH: 0, CRITICAL: 0)\n✓ No high or critical vulnerabilities found."
  },
  {
    id: "trivy-image-scan",
    title: "Scan Container Image for CVEs",
    description: "Audit container image for CVEs, ignoring unfixed issues.",
    command: "trivy image --severity HIGH,CRITICAL --ignore-unfixed {{image}}",
    platforms: ["linux", "macos"],
    category: "devsecops",
    tags: ["trivy", "docker", "container", "image", "cve", "security", "devsecops"],
    dangerLevel: "safe",
    proTip: "Export to SARIF format using \"-f sarif -o results.sarif\" to upload directly to GitHub Code Scanning.",
    params: [
      {
        name: "image",
        label: "Image Tag",
        default: "nginx:alpine",
        placeholder: "nginx:alpine"
      }
    ],
    outputExample: "nginx:alpine (alpine 3.20.1)\n===========================\nTotal: 0 (HIGH: 0, CRITICAL: 0)\n✓ Clean container base: 0 unpatched vulnerabilities."
  },
  {
    id: "gitleaks-detect-secrets",
    title: "Detect Secrets in Git History",
    description: "Scan git commits and staged files for exposed secrets.",
    command: "gitleaks detect --source {{repoPath}} -v --redact",
    platforms: ["linux", "macos", "windows"],
    category: "devsecops",
    tags: ["gitleaks", "secrets", "leak", "git", "api-key", "token", "security"],
    dangerLevel: "safe",
    proTip: "Use as a pre-commit hook via \"gitleaks protect --staged\" to block developer secret leakage before git push.",
    params: [
      { name: "repoPath", label: "Repository Path", default: ".", placeholder: "." }
    ],
    outputExample: "    ○\n    │╲\n    │ ○\n    ○ \nScan summary: 148 commits scanned across 4 branches.\n[✓] No leaks detected."
  },
  {
    id: "semgrep-sast-scan",
    title: "Run SAST Scan with Semgrep",
    description: "Static analysis across multiple languages for OWASP Top 10 flaws.",
    command: "semgrep scan --config auto --error {{path}}",
    platforms: ["linux", "macos"],
    category: "devsecops",
    tags: ["semgrep", "sast", "security", "owasp", "audit", "code-quality", "ci-cd"],
    dangerLevel: "safe",
    proTip: "Combine with custom .semgrep.yml rules to enforce organization-wide architectural and security conventions.",
    params: [
      { name: "path", label: "Source Path", default: ".", placeholder: "." }
    ],
    outputExample: "┌─────────────┐\n│ Scan Status │\n└─────────────┘\n  Scanning 142 files with 86 rules across 4 languages.\n  [+] Done: 142/142 files in 1.4s.\n\nRan 86 rules on 142 files: 0 findings.\n✓ Codebase passes all security policies."
  },
  {
    id: "cosign-verify-image",
    title: "Verify Container Signature (Cosign)",
    description: "Verify container signature against public key or Sigstore.",
    command: "cosign verify --key {{publicKey}} {{image}}",
    platforms: ["linux", "macos"],
    category: "devsecops",
    tags: ["cosign", "sigstore", "supply-chain", "container", "docker", "security", "crypto"],
    dangerLevel: "safe",
    proTip: "For keyless verification with GitHub OIDC, use \"cosign verify --certificate-identity-regexp ... --certificate-oidc-issuer ...\".",
    params: [
      {
        name: "publicKey",
        label: "Public Key File",
        default: "cosign.pub",
        placeholder: "cosign.pub"
      },
      {
        name: "image",
        label: "Container Image",
        default: "ghcr.io/org/app:latest",
        placeholder: "ghcr.io/org/app:latest"
      }
    ],
    outputExample: "Verification for ghcr.io/org/app:latest --\nThe following checks were performed on each of these signatures:\n  - The cosign claims were validated\n  - Existence of the claims in the transparency log was verified offline\n  - The signatures were verified against the specified public key\n[{\"critical\":{\"identity\":{\"docker-reference\":\"ghcr.io/org/app\"},\"image\":{\"docker-manifest-digest\":\"sha256:4a8b...\"},\"type\":\"cosign container image signature\"}}]"
  },
  {
    id: "trufflehog-git-verify",
    title: "Audit Git History for Verified Secrets",
    description: "Scan commit history and verify secret validity live.",
    command: "trufflehog git file://{{repoDir}} --only-verified",
    platforms: ["linux", "macos"],
    category: "devsecops",
    tags: ["trufflehog", "secret", "git", "token", "entropy", "credential", "security"],
    dangerLevel: "safe",
    proTip: "Adding --only-verified eliminates false positives by pinging APIs (Slack, AWS, GitHub) to confirm active validity.",
    params: [
      { name: "repoDir", label: "Git Repo Directory", default: ".", placeholder: "." }
    ],
    outputExample: "🐷🔑 TruffleHog Engine v3.82.0\nExamining 482 commits across all branches...\nCompleted in 2.1s.\n[✓] 0 active verified leaks detected."
  },
  {
    id: "lynis-security-audit",
    title: "Run Linux CIS Hardening Audit",
    description: "Audit OS hardening, kernel params, and CIS benchmarks.",
    command: "lynis audit system --quick",
    platforms: ["linux"],
    category: "devsecops",
    tags: ["lynis", "cis", "audit", "hardening", "linux", "compliance", "security"],
    dangerLevel: "safe",
    proTip: "Check the generated report at /var/log/lynis-report.dat to automate scoring in monitoring agents.",
    outputExample: "[+] Hardening index : 82 [#################   ]\n[+] Tests performed : 284\n[+] Plugins enabled : 0\n[+] Suggestions (6) : Set umask to 027 in /etc/login.defs, Enable auditd\n[+] Warnings (0)    : None\n✓ System hardening check complete."
  },
  {
    id: "fail2ban-unban-ip",
    title: "Inspect Jail Status & Unban IP",
    description: "Inspect fail2ban status and remove an administrative IP ban.",
    command: "fail2ban-client status {{jail}} && fail2ban-client set {{jail}} unbanip {{ip}}",
    platforms: ["linux"],
    category: "devsecops",
    tags: ["fail2ban", "firewall", "ip", "ban", "sshd", "security", "unban"],
    dangerLevel: "caution",
    proTip: "List all active jails with \"fail2ban-client status\".",
    params: [
      { name: "jail", label: "Jail Name", default: "sshd", placeholder: "sshd" },
      {
        name: "ip",
        label: "IP Address",
        default: "198.51.100.25",
        placeholder: "198.51.100.25"
      }
    ],
    outputExample: "Status for the jail: sshd\n|- Filter: Currently failed: 1, Total failed: 124\n`- Actions: Currently banned: 2, Total banned: 45\n198.51.100.25 has been unbanned."
  },
  {
    id: "find-suid-privilege-esc",
    title: "Audit SUID Binaries",
    description: "Find setuid executables running with root privileges.",
    command: "find / -perm -4000 -type f -exec ls -ld {} + 2>/dev/null",
    platforms: ["linux"],
    category: "devsecops",
    tags: ["suid", "privilege", "escalation", "audit", "find", "permissions", "hardening"],
    dangerLevel: "safe",
    proTip: "Cross-reference results with GTFOBins (gtfobins.github.io) to identify dangerous bypasses.",
    outputExample: "-rwsr-xr-x 1 root root  88304 Feb 22 14:10 /usr/bin/gpasswd\n-rwsr-xr-x 1 root root  59976 Feb 22 14:10 /usr/bin/passwd\n-rwsr-xr-x 1 root root 232416 Feb 22 14:10 /usr/bin/sudo\n-rwsr-xr-x 1 root root  44784 Feb 22 14:10 /usr/bin/newgrp"
  },
  {
    id: "check-listening-sockets",
    title: "Audit Listening Sockets & Ports",
    description: "List listening TCP/UDP sockets with PIDs and process names.",
    command: "ss -tulpn",
    platforms: ["linux"],
    category: "devsecops",
    tags: ["ss", "ports", "listening", "sockets", "audit", "network", "security"],
    dangerLevel: "safe",
    proTip: "Use \"-H\" to suppress table headers when parsing with awk or scripts.",
    outputExample: "Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process\ntcp    LISTEN  0       128            0.0.0.0:22          0.0.0.0:*      users:((\"sshd\",pid=842,fd=3))\ntcp    LISTEN  0       511            0.0.0.0:80          0.0.0.0:*      users:((\"nginx\",pid=1120,fd=6))\ntcp    LISTEN  0       511            0.0.0.0:443         0.0.0.0:*      users:((\"nginx\",pid=1120,fd=7))\ntcp    LISTEN  0       128          127.0.0.1:5432        0.0.0.0:*      users:((\"postgres\",pid=931,fd=4))"
  }
];
