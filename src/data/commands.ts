import type { TerminalCommand } from './types';

export const COMMANDS: TerminalCommand[] = [
  // ==========================================
  // QUICK WINS & LIFE SAVERS
  // ==========================================
  {
    id: 'kill-port',
    title: 'Kill Process by Port Number',
    description: 'Finds and forcefully terminates whichever process is holding a specific TCP port hostage.',
    command: 'kill -9 $(lsof -t -i:{{port}})',
    platforms: ['linux', 'macos'],
    category: 'quick-wins',
    tags: ['port', 'kill', 'lsof', 'free', 'tcp', 'server'],
    dangerLevel: 'caution',
    proTip: 'For Linux systems without lsof installed, use "fuser -k {{port}}/tcp".',
    params: [
      { name: 'port', label: 'Port', default: '3000', placeholder: '3000' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'Stop-Process -Id (Get-NetTCPConnection -LocalPort {{port}}).OwningProcess -Force',
        note: 'PowerShell 5.1 / 7+'
      },
      {
        platform: 'linux',
        command: 'fuser -k {{port}}/tcp',
        note: 'Requires psmisc package'
      }
    ],
    outputExample: '[1]  + 42819 killed    node server.js'
  },
  {
    id: 'find-large-files',
    title: 'Find Largest Files on Disk',
    description: 'Quickly locates the top 10 heaviest files or directories in the current folder, human-readable.',
    command: 'du -ah {{path}} | sort -rh | head -n 10',
    platforms: ['linux', 'macos'],
    category: 'quick-wins',
    tags: ['disk', 'storage', 'size', 'du', 'heavy', 'clean'],
    dangerLevel: 'safe',
    proTip: 'Use ncdu for an interactive cursor-based visual disk usage explorer if installed.',
    params: [
      { name: 'path', label: 'Directory', default: '.', placeholder: '.' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'Get-ChildItem -Path {{path}} -Recurse -File | Sort-Object Length -Descending | Select-Object -First 10 -Property FullName, @{Name="MB";Expression={"{0:N2}" -f ($_.Length / 1MB)}}',
        note: 'PowerShell native'
      }
    ],
    outputExample: '4.2G    ./node_modules\n1.8G    ./dist\n750M    ./videos/demo.mp4'
  },
  {
    id: 'download-resume',
    title: 'Download File with Auto-Resume',
    description: 'Downloads a file from a URL and automatically resumes from where it left off if interrupted.',
    command: 'curl -C - -O -L {{url}}',
    platforms: ['linux', 'macos', 'windows'],
    category: 'quick-wins',
    tags: ['curl', 'download', 'resume', 'http', 'network'],
    dangerLevel: 'safe',
    proTip: 'The -L flag follows 301/302 redirects, -O saves with remote file name, -C - enables automatic resume.',
    params: [
      { name: 'url', label: 'File URL', default: 'https://example.com/huge-file.iso', placeholder: 'https://...' }
    ],
    alternatives: [
      {
        platform: 'linux',
        command: 'wget -c {{url}}',
        note: 'Wget continuation'
      }
    ]
  },
  {
    id: 'quick-http-server',
    title: 'Instant Local HTTP Static Server',
    description: 'Serves current directory over HTTP without installing any npm or third-party web server.',
    command: 'python3 -m http.server {{port}}',
    platforms: ['linux', 'macos', 'windows'],
    category: 'quick-wins',
    tags: ['http', 'server', 'python', 'static', 'preview', 'web'],
    dangerLevel: 'safe',
    proTip: 'Append --bind 127.0.0.1 if you only want localhost access and not your entire LAN.',
    params: [
      { name: 'port', label: 'Port', default: '8080', placeholder: '8080' }
    ],
    alternatives: [
      {
        platform: 'all',
        command: 'npx serve -l {{port}}',
        note: 'Using Node.js npx'
      }
    ],
    outputExample: 'Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...'
  },
  {
    id: 'public-ip',
    title: 'Get Public IP Address Instantly',
    description: 'Retrieves your external WAN IP directly from the terminal without opening a browser.',
    command: 'curl -s https://ifconfig.me',
    platforms: ['linux', 'macos', 'windows'],
    category: 'quick-wins',
    tags: ['ip', 'network', 'wan', 'curl', 'public'],
    dangerLevel: 'safe',
    proTip: 'Alternatively use "curl -s https://icanhazip.com" or "dig -4 TXT +short o-o.myaddr.l.google.com @ns1.google.com".',
    outputExample: '198.51.100.42'
  },
  {
    id: 'format-json-cli',
    title: 'Prettify & Colorize JSON Stream',
    description: 'Streams raw minified JSON into readable, syntax-highlighted indentation.',
    command: 'cat {{file}} | jq .',
    platforms: ['linux', 'macos', 'windows'],
    category: 'quick-wins',
    tags: ['json', 'jq', 'format', 'pretty', 'text'],
    dangerLevel: 'safe',
    proTip: 'If jq is not installed, use: python3 -m json.tool {{file}}',
    params: [
      { name: 'file', label: 'File Path', default: 'data.json', placeholder: 'data.json' }
    ]
  },
  {
    id: 'measure-command-time',
    title: 'Benchmark Command Execution Speed',
    description: 'Measures precise wall-clock, user, and kernel CPU time spent running any command.',
    command: 'time {{command}}',
    platforms: ['linux', 'macos'],
    category: 'quick-wins',
    tags: ['perf', 'benchmark', 'time', 'speed', 'profile'],
    dangerLevel: 'safe',
    proTip: 'For statistical multi-run benchmarks with warm-ups, install and use "hyperfine \'{{command}}\'".',
    params: [
      { name: 'command', label: 'Command', default: 'npm run build', placeholder: 'command to test' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'Measure-Command { {{command}} }',
        note: 'PowerShell native timer'
      }
    ],
    outputExample: 'real    0m1.428s\nuser    0m2.110s\nsys     0m0.312s'
  },
  {
    id: 'mkdir-cd-single',
    title: 'Create Nested Directory and Enter It',
    description: 'Creates multi-tier directories recursively and changes into the leaf folder in one step.',
    command: 'mkdir -p {{folder}} && cd $_',
    platforms: ['linux', 'macos'],
    category: 'quick-wins',
    tags: ['mkdir', 'cd', 'navigation', 'bash', 'zsh'],
    dangerLevel: 'safe',
    proTip: '$_ represents the last argument of the previous command in Bash and Zsh.',
    params: [
      { name: 'folder', label: 'Folder Path', default: 'src/components/ui', placeholder: 'nested/path' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'New-Item -ItemType Directory -Path {{folder}} -Force; Set-Location {{folder}}',
        note: 'PowerShell'
      }
    ]
  },

  // ==========================================
  // NETWORKING & DNS
  // ==========================================
  {
    id: 'list-listening-ports',
    title: 'Show All Open Listening Ports & PIDs',
    description: 'Displays all TCP/UDP ports actively in LISTEN state with process IDs and application names.',
    command: 'sudo ss -tulpn',
    platforms: ['linux'],
    category: 'networking',
    tags: ['ports', 'listen', 'sockets', 'ss', 'network', 'pid'],
    dangerLevel: 'safe',
    proTip: '"ss" is the modern, fast replacement for "netstat" on modern Linux kernels.',
    alternatives: [
      {
        platform: 'macos',
        command: 'sudo lsof -iTCP -sTCP:LISTEN -P -n',
        note: 'macOS native listing'
      },
      {
        platform: 'windows',
        command: 'Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess',
        note: 'PowerShell'
      }
    ],
    outputExample: 'Netid State  Local Address:Port   Peer Address:Port  Process\ntcp   LISTEN 0.0.0.0:80           0.0.0.0:*          users:(("nginx",pid=1142,fd=6))'
  },
  {
    id: 'test-port-connectivity',
    title: 'Test Remote TCP Port Connectivity',
    description: 'Checks whether a remote server has a specific TCP port open without needing telnet.',
    command: 'nc -zv -w3 {{host}} {{port}}',
    platforms: ['linux', 'macos'],
    category: 'networking',
    tags: ['netcat', 'nc', 'port', 'ping', 'firewall', 'tcp'],
    dangerLevel: 'safe',
    proTip: 'The -z flag scans without sending data, -v is verbose, and -w3 sets a 3-second timeout.',
    params: [
      { name: 'host', label: 'Host/Domain', default: 'github.com', placeholder: 'example.com' },
      { name: 'port', label: 'Port', default: '443', placeholder: '443' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'Test-NetConnection -ComputerName {{host}} -Port {{port}}',
        note: 'PowerShell built-in cmdlet'
      },
      {
        platform: 'all',
        command: 'curl -v telnet://{{host}}:{{port}}',
        note: 'Portable curl socket test'
      }
    ],
    outputExample: 'Connection to github.com port 443 [tcp/https] succeeded!'
  },
  {
    id: 'dns-trace-propagation',
    title: 'Trace DNS Resolution from Root Servers',
    description: 'Walks down the full hierarchical DNS chain from root servers to authoritative nameservers.',
    command: 'dig +trace +nodnssec {{domain}} {{recordType}}',
    platforms: ['linux', 'macos'],
    category: 'networking',
    tags: ['dns', 'dig', 'lookup', 'trace', 'domain', 'propagation'],
    dangerLevel: 'safe',
    proTip: 'Add "+stats" to see query round-trip time in milliseconds for troubleshooting slow DNS.',
    params: [
      { name: 'domain', label: 'Domain', default: 'loop.brain.fr', placeholder: 'domain.com' },
      { name: 'recordType', label: 'Record Type', default: 'A', placeholder: 'A, CNAME, MX, TXT' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'Resolve-DnsName -Name {{domain}} -Type {{recordType}} -Server 1.1.1.1',
        note: 'PowerShell DNS resolver'
      }
    ]
  },
  {
    id: 'curl-timing-breakdown',
    title: 'Inspect HTTP Latency & Connection Phases',
    description: 'Outputs a detailed millisecond breakdown of DNS, TCP handshake, TLS negotiation, TTFB, and transfer.',
    command: `curl -w "@-" -o /dev/null -s {{url}} << 'EOF'\n  DNS:        %{time_namelookup}s\\n  TCP:        %{time_connect}s\\n  TLS:        %{time_appconnect}s\\n  StartXfer:  %{time_starttransfer}s\\n  Total:      %{time_total}s\\n  HTTP Code:  %{http_code}\\nEOF`,
    platforms: ['linux', 'macos'],
    category: 'networking',
    tags: ['curl', 'http', 'timing', 'latency', 'ttfb', 'performance'],
    dangerLevel: 'safe',
    proTip: 'Essential for debugging whether high response latency is caused by DNS resolution, SSL handshake, or slow backend code.',
    params: [
      { name: 'url', label: 'Target URL', default: 'https://loop.brain.fr', placeholder: 'https://...' }
    ],
    outputExample: '  DNS:        0.012s\n  TCP:        0.034s\n  TLS:        0.071s\n  StartXfer:  0.118s\n  Total:      0.142s\n  HTTP Code:  200'
  },
  {
    id: 'trace-route-mtr',
    title: 'Interactive Network Path & Packet Loss (MTR)',
    description: 'Combines traceroute and ping into an interactive real-time packet loss diagnosis tool.',
    command: 'sudo mtr --report-cycles 10 --report {{host}}',
    platforms: ['linux', 'macos'],
    category: 'networking',
    tags: ['mtr', 'traceroute', 'ping', 'network', 'loss', 'hop'],
    dangerLevel: 'safe',
    proTip: 'Run without "--report" for full terminal ncurses interactive mode.',
    params: [
      { name: 'host', label: 'Target Host', default: '1.1.1.1', placeholder: '1.1.1.1 or domain' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'tracert {{host}}',
        note: 'Windows Command Prompt'
      }
    ]
  },
  {
    id: 'ssh-reverse-tunnel',
    title: 'Expose Local Port via Remote SSH Tunnel',
    description: 'Allows remote machines on the internet to reach your local dev server through a reverse SSH tunnel.',
    command: 'ssh -N -R {{remotePort}}:localhost:{{localPort}} {{remoteUser}}@{{remoteHost}}',
    platforms: ['linux', 'macos', 'windows'],
    category: 'networking',
    tags: ['ssh', 'tunnel', 'forward', 'remote', 'ngrok-alternative'],
    dangerLevel: 'caution',
    proTip: 'Ensure "GatewayPorts clientspecified" or "yes" is enabled in /etc/ssh/sshd_config on the remote server.',
    params: [
      { name: 'remotePort', label: 'Remote Port', default: '8080', placeholder: '8080' },
      { name: 'localPort', label: 'Local Port', default: '3000', placeholder: '3000' },
      { name: 'remoteUser', label: 'User', default: 'deploy', placeholder: 'root' },
      { name: 'remoteHost', label: 'Server IP/Host', default: 'vps.example.com', placeholder: 'ip.or.domain' }
    ]
  },
  {
    id: 'sniff-http-traffic',
    title: 'Live Sniff Plaintext HTTP Traffic',
    description: 'Captures and prints raw HTTP GET/POST headers and request bodies passing through a network interface.',
    command: "sudo tcpdump -i {{interface}} -A -s 0 'tcp port {{port}} and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:2]&0xf0)>>2)) != 0)'",
    platforms: ['linux', 'macos'],
    category: 'networking',
    tags: ['tcpdump', 'sniff', 'packet', 'http', 'traffic', 'debug'],
    dangerLevel: 'caution',
    proTip: 'Use "ip link" or "ifconfig" to list interface names (e.g. eth0, wlan0, en0).',
    params: [
      { name: 'interface', label: 'Interface', default: 'any', placeholder: 'eth0, any' },
      { name: 'port', label: 'Port', default: '80', placeholder: '80' }
    ]
  },

  // ==========================================
  // SYSTEM & PROCESS MANAGEMENT
  // ==========================================
  {
    id: 'top-memory-processes',
    title: 'List Top 10 RAM Consuming Processes',
    description: 'Sorts active processes by memory consumption percentage in descending order with PID and user.',
    command: 'ps aux --sort=-%mem | head -n 11',
    platforms: ['linux'],
    category: 'system',
    tags: ['memory', 'ram', 'ps', 'oom', 'leak', 'monitor'],
    dangerLevel: 'safe',
    proTip: 'On macOS, BSD ps uses "ps -arcwwwxo pid,%mem,command | head -n 11".',
    alternatives: [
      {
        platform: 'macos',
        command: 'ps -arcwwwxo pid,%mem,command | head -n 11',
        note: 'macOS BSD ps'
      },
      {
        platform: 'windows',
        command: 'Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 10 -Property Id, ProcessName, @{Name="MB";Expression={"{0:N1}" -f ($_.WorkingSet / 1MB)}}',
        note: 'PowerShell'
      }
    ]
  },
  {
    id: 'pkill-regex',
    title: 'Kill All Processes Matching Name / Pattern',
    description: 'Terminates all running processes whose command line matches a specific string or regular expression.',
    command: 'pkill -9 -f {{processName}}',
    platforms: ['linux', 'macos'],
    category: 'process',
    tags: ['kill', 'pkill', 'terminate', 'pattern', 'regex'],
    dangerLevel: 'dangerous',
    proTip: 'Run "pgrep -fl {{processName}}" first to verify which processes will be hit before killing.',
    params: [
      { name: 'processName', label: 'Process Name/Regex', default: 'chrome', placeholder: 'node' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'Stop-Process -Name {{processName}} -Force',
        note: 'PowerShell'
      }
    ]
  },
  {
    id: 'run-detached-nohup',
    title: 'Run Process Detached from Terminal (Immune to SIGHUP)',
    description: 'Launches a long-running command that persists even after closing your terminal or SSH session.',
    command: 'nohup {{command}} > {{logFile}} 2>&1 &',
    platforms: ['linux', 'macos'],
    category: 'process',
    tags: ['nohup', 'background', 'daemon', 'ssh', 'persistent'],
    dangerLevel: 'safe',
    proTip: 'To check running jobs in current bash session, run "jobs" or "disown -h %1".',
    params: [
      { name: 'command', label: 'Command', default: 'node app.js', placeholder: 'python worker.py' },
      { name: 'logFile', label: 'Log File', default: 'app.log', placeholder: 'output.log' }
    ]
  },
  {
    id: 'limit-cpu-process',
    title: 'Throttle CPU Usage of a Process',
    description: 'Caps the maximum CPU percentage a specific process can consume to keep the machine responsive.',
    command: 'cpulimit -l {{maxPercent}} -p {{pid}}',
    platforms: ['linux'],
    category: 'process',
    tags: ['cpulimit', 'cpu', 'throttle', 'limit', 'performance'],
    dangerLevel: 'safe',
    proTip: 'Percentage is calculated per core (e.g., 200% on a 4-core machine means 2 full cores).',
    params: [
      { name: 'maxPercent', label: 'Max CPU %', default: '50', placeholder: '50' },
      { name: 'pid', label: 'Process PID', default: '1234', placeholder: '1234' }
    ]
  },
  {
    id: 'kernel-dmesg-errors',
    title: 'Inspect Hardware & Kernel Error Logs',
    description: 'Dumps kernel ring buffer messages filtered for errors, hardware warnings, or OOM crashes.',
    command: 'dmesg -T --level=err,crit,alert,emerg',
    platforms: ['linux'],
    category: 'system',
    tags: ['dmesg', 'kernel', 'hardware', 'oom', 'crash', 'logs'],
    dangerLevel: 'safe',
    proTip: 'The -T flag renders human-readable timestamps instead of seconds since boot.',
    outputExample: '[Thu Sep 10 20:12:01 2026] Out of memory: Kill process 28149 (java) score 852 or sacrifice child'
  },
  {
    id: 'open-files-by-pid',
    title: 'List All Open Files & Sockets for a PID',
    description: 'Shows every file, network connection, unix domain socket, and library mapped by a process.',
    command: 'lsof -p {{pid}}',
    platforms: ['linux', 'macos'],
    category: 'process',
    tags: ['lsof', 'descriptors', 'files', 'sockets', 'inspect'],
    dangerLevel: 'safe',
    proTip: 'Add "-n -P" to avoid slow DNS and port resolution for fast output.',
    params: [
      { name: 'pid', label: 'Process ID', default: '1234', placeholder: '1234' }
    ]
  },

  // ==========================================
  // FILESYSTEM & STORAGE
  // ==========================================
  {
    id: 'find-modified-recently',
    title: 'Find Files Modified in Last 24 Hours',
    description: 'Scans directory tree for files created or modified within the last N days or minutes.',
    command: 'find {{directory}} -type f -mtime -{{days}}',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['find', 'mtime', 'modified', 'recent', 'files'],
    dangerLevel: 'safe',
    proTip: 'Use "-mmin -60" instead of "-mtime" to search for changes within the last 60 minutes.',
    params: [
      { name: 'directory', label: 'Directory', default: '.', placeholder: '.' },
      { name: 'days', label: 'Days', default: '1', placeholder: '1' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'Get-ChildItem -Path {{directory}} -Recurse -File | Where-Object { $_.LastWriteTime -ge (Get-Date).AddDays(-{{days}}) }',
        note: 'PowerShell'
      }
    ]
  },
  {
    id: 'purge-node-modules',
    title: 'Recursively Delete All node_modules / Temp Dirs',
    description: 'Reclaims tens of gigabytes by safely finding and deleting build or dependency folders across your projects.',
    command: 'find {{directory}} -name "node_modules" -type d -prune -exec rm -rf \'{}\' +',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['node_modules', 'clean', 'rm', 'disk', 'purge'],
    dangerLevel: 'caution',
    proTip: 'Using -prune prevents find from descending into the node_modules folder itself, speeding it up 10x.',
    params: [
      { name: 'directory', label: 'Directory', default: '.', placeholder: '~/code' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'Get-ChildItem -Path {{directory}} -Recurse -Directory -Filter "node_modules" | Remove-Item -Recurse -Force',
        note: 'PowerShell'
      }
    ]
  },
  {
    id: 'rsync-backup-sync',
    title: 'Sync Directories with Resume & Progress',
    description: 'The golden standard for file mirroring with delta transfer, permissions preservation, and resume capability.',
    command: 'rsync -avzP --delete {{source}}/ {{destination}}/',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['rsync', 'backup', 'mirror', 'sync', 'transfer'],
    dangerLevel: 'caution',
    proTip: 'Trailing slashes matter: "source/" copies folder contents, while "source" copies the folder itself.',
    params: [
      { name: 'source', label: 'Source Path', default: './project', placeholder: '/path/to/src' },
      { name: 'destination', label: 'Destination Path', default: '/mnt/backup/project', placeholder: '/path/to/dest' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'robocopy {{source}} {{destination}} /MIR /MT:16 /Z /R:2 /W:5',
        note: 'High speed multi-threaded Windows robocopy'
      }
    ]
  },
  {
    id: 'compress-zstd-tar',
    title: 'Ultra-Fast Compression with Zstandard / Gzip',
    description: 'Creates a modern, multi-threaded high compression archive faster than standard zip.',
    command: 'tar --zstd -cvf {{archiveName}}.tar.zst {{sourceDir}}',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['tar', 'zstd', 'compress', 'archive', 'fast'],
    dangerLevel: 'safe',
    proTip: 'Zstandard compresses 5x faster than gzip with higher compression ratios. Fallback to "tar -czvf {{archiveName}}.tar.gz {{sourceDir}}".',
    params: [
      { name: 'archiveName', label: 'Archive Base Name', default: 'backup_2026', placeholder: 'backup' },
      { name: 'sourceDir', label: 'Folder to Compress', default: './data', placeholder: 'folder' }
    ]
  },
  {
    id: 'extract-any-archive',
    title: 'Universal Tar Extraction',
    description: 'Auto-detects compression algorithm (gz, bz2, xz, zst) and extracts archive into destination folder.',
    command: 'tar -xvf {{archiveFile}} -C {{destDir}}',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['tar', 'extract', 'unzip', 'unpack', 'archive'],
    dangerLevel: 'safe',
    proTip: 'Modern GNU/BSD tar automatically identifies decompression format from magic bytes without needing -z or -j.',
    params: [
      { name: 'archiveFile', label: 'Archive File', default: 'bundle.tar.gz', placeholder: 'archive.tar.gz' },
      { name: 'destDir', label: 'Target Directory', default: '.', placeholder: './extracted' }
    ]
  },
  {
    id: 'shred-secure-delete',
    title: 'Securely Overwrite and Erase Sensitive File',
    description: 'Overwrites file contents multiple times with random data and zeros before unlinking to prevent data recovery.',
    command: 'shred -u -z -n 3 {{filePath}}',
    platforms: ['linux'],
    category: 'filesystem',
    tags: ['shred', 'secure', 'delete', 'privacy', 'wipe'],
    dangerLevel: 'dangerous',
    proTip: '-u removes the file after overwriting, -z hides shredding by zero-filling, and -n 3 performs 3 passes.',
    params: [
      { name: 'filePath', label: 'File to Shred', default: 'secret.key', placeholder: 'secret.key' }
    ],
    alternatives: [
      {
        platform: 'macos',
        command: 'rm -P {{filePath}}',
        note: 'macOS BSD rm 3-pass overwrite'
      },
      {
        platform: 'windows',
        command: 'cipher /w:{{filePath}}',
        note: 'Windows native secure wiper'
      }
    ]
  },

  // ==========================================
  // DOCKER & CONTAINERS
  // ==========================================
  {
    id: 'docker-clean-all',
    title: 'Nuke All Unused Docker Objects',
    description: 'Reclaims massive disk space by removing all stopped containers, unused networks, dangling images, and build cache.',
    command: 'docker system prune -af --volumes',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'clean', 'prune', 'disk', 'cache', 'containers'],
    dangerLevel: 'dangerous',
    proTip: 'WARNING: The --volumes flag wipes persistent volumes not attached to running containers! Drop --volumes to keep database data safe.',
    outputExample: 'Total reclaimed space: 18.42GB'
  },
  {
    id: 'docker-stats-live',
    title: 'Live Container Resource Consumption Table',
    description: 'Formatted real-time monitor showing CPU, Memory usage, Net I/O, and limits per running container.',
    command: 'docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'stats', 'monitor', 'cpu', 'memory'],
    dangerLevel: 'safe',
    proTip: 'Add "--no-stream" if you want a single snapshot instead of continuous live updating.',
    outputExample: 'NAME          CPU %     MEM USAGE / LIMIT     NET I/O\napi-gateway   0.45%     142MiB / 7.68GiB      12.4MB / 8.2MB\npostgres-db   1.12%     580MiB / 7.68GiB      45.1MB / 92.4MB'
  },
  {
    id: 'docker-exec-interactive',
    title: 'Jump into Running Container Shell',
    description: 'Spawns an interactive bash or sh shell inside any running Docker container.',
    command: 'docker exec -it {{container}} /bin/sh',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'exec', 'shell', 'bash', 'debug'],
    dangerLevel: 'safe',
    proTip: 'If /bin/sh is too minimal and bash is installed in the image, change /bin/sh to /bin/bash.',
    params: [
      { name: 'container', label: 'Container ID/Name', default: 'my-app', placeholder: 'container_name' }
    ]
  },
  {
    id: 'docker-container-ip',
    title: 'Extract Container Internal IP Address',
    description: 'Inspects bridge network configuration and prints the container IP without parsing json manually.',
    command: "docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' {{container}}",
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'ip', 'network', 'inspect'],
    dangerLevel: 'safe',
    params: [
      { name: 'container', label: 'Container ID/Name', default: 'my-app', placeholder: 'container_name' }
    ],
    outputExample: '172.18.0.4'
  },
  {
    id: 'docker-compose-stream-logs',
    title: 'Stream Tail Compose Logs with Timestamps',
    description: 'Follows real-time logs of a specific Docker Compose service with high-resolution ISO timestamps.',
    command: 'docker compose logs -f --tail=100 -t {{service}}',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'compose', 'logs', 'tail', 'stream'],
    dangerLevel: 'safe',
    proTip: 'Omit {{service}} to stream merged logs from all containers in the compose file.',
    params: [
      { name: 'service', label: 'Service Name', default: 'web', placeholder: 'api or db' }
    ]
  },

  // ==========================================
  // GIT SUPERPOWERS
  // ==========================================
  {
    id: 'git-undo-last-commit',
    title: 'Undo Last Commit but Keep Staged Changes',
    description: 'Moves HEAD back by one commit while leaving all your modified files in the staging index ready for re-committing.',
    command: 'git reset --soft HEAD~1',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'undo', 'reset', 'commit', 'staging'],
    dangerLevel: 'safe',
    proTip: 'To discard both commit AND changes completely, use "git reset --hard HEAD~1" (destructive!).'
  },
  {
    id: 'git-search-commit-history',
    title: 'Search Entire Git Commit History for a Code String',
    description: 'The "pickaxe" search: finds every commit in the entire repository history that added or deleted a specific string.',
    command: 'git log -S "{{searchString}}" --source --all -p',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'log', 'search', 'pickaxe', 'history', 'find'],
    dangerLevel: 'safe',
    proTip: 'Add "-p" to see the actual diff inline that introduced or removed the code string.',
    params: [
      { name: 'searchString', label: 'Code or Function Name', default: 'API_SECRET_KEY', placeholder: 'pattern' }
    ]
  },
  {
    id: 'git-stash-untracked',
    title: 'Stash Work Including Untracked & New Files',
    description: 'Stashes all changes including new files with a clean descriptive note so you can switch branches cleanly.',
    command: 'git stash push -u -m "{{message}}"',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'stash', 'wip', 'save'],
    dangerLevel: 'safe',
    proTip: 'Restore later using "git stash pop" or list all saved stashes with "git stash list".',
    params: [
      { name: 'message', label: 'Stash Note', default: 'wip: auth refactor', placeholder: 'description' }
    ]
  },
  {
    id: 'git-clean-untracked-force',
    title: 'Delete All Untracked Files and Folders',
    description: 'Completely cleans the working tree by forcefully deleting all files not tracked by git, including new folders.',
    command: 'git clean -fd',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'clean', 'delete', 'untracked', 'prune'],
    dangerLevel: 'caution',
    proTip: 'Always run "git clean -nd" (dry-run) first to review exactly what will be removed!',
    outputExample: 'Removing build/temp/\nRemoving src/test-scratch.ts'
  },
  {
    id: 'git-reflog-rescue',
    title: 'Recover Lost Commits or Deleted Branches (Reflog)',
    description: 'Inspects your local reflog history to find and revive lost commits, aborted rebases, or deleted branches.',
    command: 'git reflog --date=relative',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'reflog', 'recover', 'rescue', 'emergency'],
    dangerLevel: 'safe',
    proTip: 'Once you find the commit hash in the reflog, revive it with: git checkout -b recovered-branch <hash>',
    outputExample: '7b2a9e1 HEAD@{2 minutes ago}: commit: feat: complete oauth integration\n3f4c110 HEAD@{15 minutes ago}: checkout: moving from main to feat-oauth'
  },
  {
    id: 'git-pretty-graph',
    title: 'Compact Graphical Branch History',
    description: 'Draws a colorized ASCII tree diagram of all branch merges, tags, and commits across the repo.',
    command: "git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all",
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'log', 'graph', 'tree', 'history', 'visual'],
    dangerLevel: 'safe',
    proTip: 'Save this as a permanent alias: git config --global alias.lg "log --graph --oneline --all --decorate"'
  },
  {
    id: 'git-blame-ignore-whitespace',
    title: 'Git Blame Ignoring Formatting & Whitespace',
    description: 'Traces line authors accurately without getting fooled by linter formatting commits or re-indentation.',
    command: 'git blame -w -C -C -L {{startLine}},{{endLine}} {{file}}',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'blame', 'author', 'history', 'ignore-space'],
    dangerLevel: 'safe',
    proTip: '-w ignores whitespace, while -C detects code copied or moved from other files.',
    params: [
      { name: 'startLine', label: 'Start Line', default: '1', placeholder: '1' },
      { name: 'endLine', label: 'End Line', default: '30', placeholder: '30' },
      { name: 'file', label: 'File Path', default: 'src/index.ts', placeholder: 'path/to/file' }
    ]
  },

  // ==========================================
  // TEXT & CLI WRANGLING
  // ==========================================
  {
    id: 'ripgrep-code-search',
    title: 'Blazing Fast Regex Code Search (ripgrep)',
    description: 'Searches codebase recursively respecting .gitignore, highlighting matches with line numbers.',
    command: 'rg -n --hidden -g "!{.git,node_modules,dist}" "{{pattern}}" {{searchPath}}',
    platforms: ['linux', 'macos', 'windows'],
    category: 'text',
    tags: ['ripgrep', 'rg', 'grep', 'search', 'regex', 'fast'],
    dangerLevel: 'safe',
    proTip: 'Add "-C 2" to view 2 lines of surrounding code context for each match.',
    params: [
      { name: 'pattern', label: 'Search Query', default: 'handleWebhook', placeholder: 'regex query' },
      { name: 'searchPath', label: 'Directory', default: '.', placeholder: '.' }
    ],
    outputExample: 'src/routes/api.ts:42:export async function handleWebhook(req: Request) {\nsrc/routes/api.ts:89:  logger.info("handleWebhook completed");'
  },
  {
    id: 'sed-replace-all',
    title: 'Batch Replace String in Files in Place',
    description: 'Replaces all occurrences of a string across files directly on disk.',
    command: 'sed -i "s/{{search}}/{{replace}}/g" {{files}}',
    platforms: ['linux'],
    category: 'text',
    tags: ['sed', 'replace', 'regex', 'batch', 'substitute'],
    dangerLevel: 'caution',
    proTip: 'On macOS (BSD sed), use "sed -i \'\' \'s/find/replace/g\' file" because BSD requires an empty string for the backup extension.',
    params: [
      { name: 'search', label: 'Find', default: 'oldApiEndpoint', placeholder: 'old_val' },
      { name: 'replace', label: 'Replace', default: 'newApiEndpoint', placeholder: 'new_val' },
      { name: 'files', label: 'Target Files', default: '*.config.json', placeholder: '*.ts' }
    ],
    alternatives: [
      {
        platform: 'macos',
        command: "sed -i '' \"s/{{search}}/{{replace}}/g\" {{files}}",
        note: 'macOS BSD syntax'
      }
    ]
  },
  {
    id: 'awk-column-sum',
    title: 'Sum Numbers in a Specific Column with awk',
    description: 'Calculates the sum of numbers in column N of a text or log stream.',
    command: "awk '{sum += ${{column}}} END {print \"Total: \" sum}' {{file}}",
    platforms: ['linux', 'macos'],
    category: 'text',
    tags: ['awk', 'sum', 'math', 'calc', 'column', 'csv'],
    dangerLevel: 'safe',
    proTip: 'Add -F"," to handle standard comma-separated CSV files.',
    params: [
      { name: 'column', label: 'Column Number', default: '2', placeholder: '2' },
      { name: 'file', label: 'Data File', default: 'metrics.txt', placeholder: 'data.txt' }
    ],
    outputExample: 'Total: 48921.50'
  },
  {
    id: 'extract-unique-ips',
    title: 'Extract & Rank Top Unique Visitors from Log',
    description: 'Parses web server access log, counts frequency per IP, and displays top 10 visitors.',
    command: "awk '{print $1}' {{logFile}} | sort | uniq -c | sort -nr | head -n 10",
    platforms: ['linux', 'macos'],
    category: 'text',
    tags: ['awk', 'sort', 'uniq', 'logs', 'ip', 'ddos', 'analytics'],
    dangerLevel: 'safe',
    proTip: 'Great for identifying scraping bots or DDoS IP addresses during an incident.',
    params: [
      { name: 'logFile', label: 'Access Log', default: '/var/log/nginx/access.log', placeholder: 'access.log' }
    ],
    outputExample: '  1420 192.168.1.50\n   890 10.0.0.12\n   412 172.16.0.4'
  },
  {
    id: 'xargs-parallel-execution',
    title: 'Run Commands in Parallel with xargs',
    description: 'Reads lines from stdin and executes tasks concurrently utilizing multiple CPU cores.',
    command: 'cat {{inputList}} | xargs -n 1 -P {{cores}} -I {} {{command}}',
    platforms: ['linux', 'macos'],
    category: 'text',
    tags: ['xargs', 'parallel', 'multithread', 'batch', 'speed'],
    dangerLevel: 'caution',
    proTip: '-P controls parallel worker processes (e.g. -P 8 for 8 simultaneous tasks).',
    params: [
      { name: 'inputList', label: 'Input List', default: 'urls.txt', placeholder: 'urls.txt' },
      { name: 'cores', label: 'Workers', default: '8', placeholder: '4' },
      { name: 'command', label: 'Command template', default: 'curl -O {}', placeholder: 'curl -O {}' }
    ]
  },

  // ==========================================
  // MEDIA & FFMPEG
  // ==========================================
  {
    id: 'ffmpeg-compress-mp4',
    title: 'High-Quality Video Compression (H.264/AAC)',
    description: 'Compresses massive video files into web-friendly MP4s with visually lossless quality using CRF.',
    command: 'ffmpeg -i {{input}} -vcodec libx264 -crf {{crf}} -preset slow -acodec aac -b:a 128k {{output}}',
    platforms: ['all'],
    category: 'media',
    tags: ['ffmpeg', 'video', 'compress', 'mp4', 'h264'],
    dangerLevel: 'safe',
    proTip: 'CRF scale is 0–51. 18 is visually lossless, 23 is default, and 28 yields small file sizes.',
    params: [
      { name: 'input', label: 'Input Video', default: 'raw_recording.mov', placeholder: 'input.mov' },
      { name: 'crf', label: 'CRF (18-28)', default: '23', placeholder: '23' },
      { name: 'output', label: 'Output File', default: 'compressed.mp4', placeholder: 'output.mp4' }
    ]
  },
  {
    id: 'ffmpeg-video-to-gif',
    title: 'Convert Video to Crisp High-Res GIF',
    description: 'Generates an optimal color palette on the fly to render smooth, unpixelated GIFs for READMEs or Slack.',
    command: 'ffmpeg -i {{input}} -vf "fps={{fps}},scale={{width}}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" {{output}}',
    platforms: ['all'],
    category: 'media',
    tags: ['ffmpeg', 'gif', 'convert', 'palette', 'readme'],
    dangerLevel: 'safe',
    proTip: 'Two-pass palette generation eliminates color banding and produces pristine 256-color palettes.',
    params: [
      { name: 'input', label: 'Input Video', default: 'demo.mp4', placeholder: 'input.mp4' },
      { name: 'fps', label: 'Framerate', default: '15', placeholder: '15' },
      { name: 'width', label: 'Width (px)', default: '800', placeholder: '800' },
      { name: 'output', label: 'Output GIF', default: 'demo.gif', placeholder: 'output.gif' }
    ]
  },
  {
    id: 'ffmpeg-extract-audio',
    title: 'Extract Lossless or MP3 Audio from Video',
    description: 'Strips the video stream and outputs pure audio without needing to re-encode the entire video.',
    command: 'ffmpeg -i {{input}} -vn -acodec libmp3lame -q:a 2 {{output}}',
    platforms: ['all'],
    category: 'media',
    tags: ['ffmpeg', 'audio', 'mp3', 'extract', 'sound'],
    dangerLevel: 'safe',
    proTip: 'To copy the audio stream losslessly without re-encoding at all, use "-vn -c:a copy audio.m4a".',
    params: [
      { name: 'input', label: 'Input Video', default: 'podcast.mp4', placeholder: 'video.mp4' },
      { name: 'output', label: 'Output Audio', default: 'audio.mp3', placeholder: 'audio.mp3' }
    ]
  },
  {
    id: 'ffmpeg-lossless-cut',
    title: 'Trim Video Losslessly in 0.1 Seconds',
    description: 'Cuts a segment from a video file without re-encoding, preserving exact original visual quality.',
    command: 'ffmpeg -ss {{startTime}} -to {{endTime}} -i {{input}} -c copy {{output}}',
    platforms: ['all'],
    category: 'media',
    tags: ['ffmpeg', 'cut', 'trim', 'lossless', 'fast'],
    dangerLevel: 'safe',
    proTip: 'Placing -ss before -i uses fast keyframe seeking, enabling instantaneous cut times.',
    params: [
      { name: 'startTime', label: 'Start (HH:MM:SS)', default: '00:01:15', placeholder: '00:00:30' },
      { name: 'endTime', label: 'End (HH:MM:SS)', default: '00:02:40', placeholder: '00:01:30' },
      { name: 'input', label: 'Input File', default: 'movie.mp4', placeholder: 'input.mp4' },
      { name: 'output', label: 'Output File', default: 'clip.mp4', placeholder: 'clip.mp4' }
    ]
  },

  // ==========================================
  // SECURITY, SSH & CERTS
  // ==========================================
  {
    id: 'ssh-keygen-ed25519',
    title: 'Generate Modern High-Security Ed25519 SSH Key',
    description: 'Generates an elliptic-curve Ed25519 key pair with 100 key-derivation rounds (much stronger than RSA).',
    command: 'ssh-keygen -t ed25519 -a 100 -C "{{comment}}" -f ~/.ssh/{{keyName}}',
    platforms: ['all'],
    category: 'security',
    tags: ['ssh', 'keygen', 'ed25519', 'security', 'keys'],
    dangerLevel: 'safe',
    proTip: 'The -a 100 flag forces 100 rounds of bcrypt KDF, making brute-force decryption virtually impossible.',
    params: [
      { name: 'comment', label: 'Email / Comment', default: 'user@machine', placeholder: 'name@email.com' },
      { name: 'keyName', label: 'Key Filename', default: 'id_ed25519', placeholder: 'id_ed25519' }
    ]
  },
  {
    id: 'check-ssl-cert-expiry',
    title: 'Check Remote SSL/TLS Certificate Expiry Date',
    description: 'Connects directly to an HTTPS domain and extracts validity dates from the X.509 certificate.',
    command: 'echo | openssl s_client -servername {{domain}} -connect {{domain}}:443 2>/dev/null | openssl x509 -noout -dates -issuer',
    platforms: ['linux', 'macos'],
    category: 'security',
    tags: ['ssl', 'tls', 'certificate', 'openssl', 'expiry', 'https'],
    dangerLevel: 'safe',
    proTip: 'The -servername parameter is critical to trigger SNI on modern multi-tenant servers.',
    params: [
      { name: 'domain', label: 'Domain Name', default: 'loop.brain.fr', placeholder: 'example.com' }
    ],
    outputExample: 'notBefore=Aug 15 00:00:00 2026 GMT\nnotAfter=Nov 13 23:59:59 2026 GMT\nissuer=C = US, O = Let\'s Encrypt, CN = R11'
  },
  {
    id: 'ssh-socks5-proxy',
    title: 'Create Instant Encrypted SOCKS5 Proxy via SSH',
    description: 'Routes all browser or app traffic through a remote SSH server as a private encrypted VPN tunnel.',
    command: 'ssh -D {{localPort}} -C -q -N {{user}}@{{remoteHost}}',
    platforms: ['all'],
    category: 'security',
    tags: ['ssh', 'socks5', 'proxy', 'vpn', 'tunnel'],
    dangerLevel: 'safe',
    proTip: 'Configure your browser SOCKS host to 127.0.0.1:{{localPort}} to surf securely on untrusted Wi-Fi.',
    params: [
      { name: 'localPort', label: 'Local Port', default: '1080', placeholder: '1080' },
      { name: 'user', label: 'User', default: 'ubuntu', placeholder: 'root' },
      { name: 'remoteHost', label: 'Remote Server', default: 'bastion.server.com', placeholder: 'remote.ip' }
    ]
  },
  {
    id: 'generate-random-password',
    title: 'Generate Secure High-Entropy Password / Secret',
    description: 'Produces cryptographically secure base64 strings suitable for API keys, tokens, and database passwords.',
    command: 'openssl rand -base64 {{length}}',
    platforms: ['all'],
    category: 'security',
    tags: ['openssl', 'password', 'secret', 'random', 'token'],
    dangerLevel: 'safe',
    proTip: 'To generate URL-safe alphanumeric strings only: tr -dc A-Za-z0-9 </dev/urandom | head -c {{length}}',
    params: [
      { name: 'length', label: 'Byte Length', default: '32', placeholder: '32' }
    ],
    outputExample: '4QZzG7o8fX9bW1+KjL0mNpQrStUvWxYzAbCdEfGhIjK='
  },

  // ==========================================
  // WINDOWS & POWERSHELL
  // ==========================================
  {
    id: 'win-upgrade-all-apps',
    title: 'Upgrade All Installed Windows Apps (winget)',
    description: 'Scans all installed software against official repositories and upgrades everything automatically.',
    command: 'winget upgrade --all --include-unknown',
    platforms: ['windows'],
    category: 'windows',
    tags: ['winget', 'windows', 'upgrade', 'apps', 'update'],
    dangerLevel: 'caution',
    proTip: 'Run Windows Terminal as Administrator for apps requiring elevation.',
    outputExample: 'Upgrading Google Chrome, VS Code, Git, Docker Desktop...'
  },
  {
    id: 'win-robocopy-multithread',
    title: 'Blazing Fast Multi-Threaded File Mirror (robocopy)',
    description: 'Copies millions of files with multi-threading, restartable mode, and mirror sync.',
    command: 'robocopy {{source}} {{dest}} /E /MT:{{threads}} /Z /R:2 /W:5',
    platforms: ['windows'],
    category: 'windows',
    tags: ['robocopy', 'copy', 'windows', 'backup', 'fast'],
    dangerLevel: 'safe',
    proTip: '/MT:16 specifies 16 threads (default is 8, max is 128). /Z allows resuming interrupted files.',
    params: [
      { name: 'source', label: 'Source Path', default: 'C:\\Projects', placeholder: 'C:\\source' },
      { name: 'dest', label: 'Destination Path', default: 'D:\\Backup\\Projects', placeholder: 'D:\\dest' },
      { name: 'threads', label: 'Threads (1-128)', default: '16', placeholder: '16' }
    ]
  },
  {
    id: 'win-find-service-status',
    title: 'Filter Windows Services by Name',
    description: 'Lists Windows background services, their current status (Running/Stopped), and startup type.',
    command: 'Get-Service | Where-Object {$_.DisplayName -like "*{{pattern}}*"} | Format-Table -AutoSize',
    platforms: ['windows'],
    category: 'windows',
    tags: ['windows', 'service', 'powershell', 'status'],
    dangerLevel: 'safe',
    params: [
      { name: 'pattern', label: 'Service Pattern', default: 'Docker', placeholder: 'SQL' }
    ]
  },
  {
    id: 'win-wsl-shutdown',
    title: 'Restart / Reset WSL2 Virtual Machine Instance',
    description: 'Gracefully shuts down all active WSL2 Linux distros to free allocated RAM back to Windows.',
    command: 'wsl --shutdown',
    platforms: ['windows'],
    category: 'windows',
    tags: ['wsl', 'wsl2', 'shutdown', 'reset', 'ram'],
    dangerLevel: 'safe',
    proTip: 'Relaunch any WSL distro after running this command and it will cold-boot with clean memory.'
  },
  {
    id: 'win-port-process-kill',
    title: 'Kill Process Holding Port (PowerShell)',
    description: 'Finds the owner of a TCP port and forcefully terminates it in one PowerShell pipeline.',
    command: 'Stop-Process -Id (Get-NetTCPConnection -LocalPort {{port}}).OwningProcess -Force',
    platforms: ['windows'],
    category: 'windows',
    tags: ['windows', 'port', 'kill', 'powershell', 'tcp'],
    dangerLevel: 'caution',
    params: [
      { name: 'port', label: 'Port', default: '3000', placeholder: '3000' }
    ]
  },

  // ==========================================
  // MACOS NATIVE
  // ==========================================
  {
    id: 'mac-caffeinate-timer',
    title: 'Keep Mac Awake During Long Tasks',
    description: 'Prevents display sleep, system sleep, and disk idle timeout while a build or download runs.',
    command: 'caffeinate -dims -t {{seconds}}',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'caffeinate', 'sleep', 'display', 'awake'],
    dangerLevel: 'safe',
    proTip: 'You can also wrap a command: "caffeinate -i npm run build" keeps the Mac awake only while npm runs!',
    params: [
      { name: 'seconds', label: 'Seconds (3600 = 1 hr)', default: '3600', placeholder: '3600' }
    ]
  },
  {
    id: 'mac-flush-dns-cache',
    title: 'Flush macOS DNS Cache Completely',
    description: 'Clears the mDNSResponder and local resolver cache after changing DNS records or hosts file.',
    command: 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'dns', 'flush', 'network', 'mdns'],
    dangerLevel: 'safe',
    proTip: 'Works on macOS Monterey, Ventura, Sonoma, and Sequoia.'
  },
  {
    id: 'mac-show-hidden-files',
    title: 'Toggle Hidden Files in Finder',
    description: 'Reveals all hidden dotfiles (e.g. .env, .git) in macOS Finder windows.',
    command: 'defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'finder', 'hidden', 'dotfiles', 'defaults'],
    dangerLevel: 'safe',
    proTip: 'Keyboard shortcut in Finder: Press "Cmd + Shift + ." to toggle hidden files instantly.'
  },
  {
    id: 'mac-toggle-desktop-icons',
    title: 'Hide / Show Desktop Icons for Screen Sharing',
    description: 'Hides all desktop icons for pristine presentations or video recording without moving files.',
    command: 'defaults write com.apple.finder CreateDesktop -bool false && killall Finder',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'desktop', 'clean', 'presentation', 'finder'],
    dangerLevel: 'safe',
    proTip: 'To restore desktop icons, change "false" to "true" and run again.'
  },
  {
    id: 'mac-purge-inactive-ram',
    title: 'Purge Inactive Memory & Clear Disk Caches',
    description: 'Forces the macOS kernel to flush disk and file system caches to free real physical RAM.',
    command: 'sudo purge',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'ram', 'memory', 'purge', 'speed'],
    dangerLevel: 'safe'
  },
  {
    id: 'mac-clipboard-pipe',
    title: 'Pipe Command Output Directly to Clipboard',
    description: 'Copies any terminal output straight into macOS clipboard with pbcopy, and pastes with pbpaste.',
    command: 'cat {{file}} | pbcopy',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'pbcopy', 'pbpaste', 'clipboard'],
    dangerLevel: 'safe',
    params: [
      { name: 'file', label: 'File to copy', default: '~/.ssh/id_ed25519.pub', placeholder: 'path' }
    ]
  },

  // ==========================================
  // PACKAGE MANAGERS
  // ==========================================
  {
    id: 'brew-update-cleanup',
    title: 'Update All Homebrew Packages & Purge Cache',
    description: 'Fetches latest formula updates, upgrades installed packages, and cleans old cached tarballs.',
    command: 'brew update && brew upgrade && brew cleanup -s',
    platforms: ['macos', 'linux'],
    category: 'package-managers',
    tags: ['brew', 'homebrew', 'update', 'cleanup', 'upgrade'],
    dangerLevel: 'safe',
    proTip: 'Use "brew doctor" if you encounter dependency or link warnings.'
  },
  {
    id: 'brew-export-bundle',
    title: 'Export Installed Homebrew Packages to Brewfile',
    description: 'Generates a reproducible declarative Brewfile listing all CLI tools, casks, and App Store apps.',
    command: 'brew bundle dump --force --describe --file={{brewfilePath}}',
    platforms: ['macos'],
    category: 'package-managers',
    tags: ['brew', 'brewfile', 'bundle', 'backup', 'dotfiles'],
    dangerLevel: 'safe',
    proTip: 'On a new Mac, simply run "brew bundle install" to restore all your software automatically.',
    params: [
      { name: 'brewfilePath', label: 'Target Brewfile', default: '~/Brewfile', placeholder: '~/Brewfile' }
    ]
  },
  {
    id: 'apt-full-clean-update',
    title: 'Ubuntu/Debian Full System Update & Autoremove',
    description: 'Refreshes apt indices, performs intelligent full upgrades, and purges orphaned dependencies.',
    command: 'sudo apt update && sudo apt full-upgrade -y && sudo apt autoremove --purge -y && sudo apt clean',
    platforms: ['linux'],
    category: 'package-managers',
    tags: ['apt', 'ubuntu', 'debian', 'update', 'upgrade', 'clean'],
    dangerLevel: 'caution',
    proTip: '"full-upgrade" will handle dependencies with new packages, unlike standard "upgrade".'
  },
  {
    id: 'pacman-arch-sync',
    title: 'Arch Linux Complete System Sync & Cache Clean',
    description: 'Synchronizes repositories, updates system packages, and removes unneeded orphaned packages.',
    command: 'sudo pacman -Syu && sudo pacman -Rns $(pacman -Qtdq 2>/dev/null || true)',
    platforms: ['linux'],
    category: 'package-managers',
    tags: ['pacman', 'arch', 'update', 'sync', 'clean'],
    dangerLevel: 'caution',
    proTip: 'To clean old package cache files in /var/cache/pacman/pkg, run: sudo paccache -r'
  }
];

export const EXTRA_COMMANDS: TerminalCommand[] = [
  {
    id: 'git-amend-last-message',
    title: 'Edit Last Commit Message without Changing Code',
    description: 'Fixes a typo or updates the commit message of your most recent unpushed commit.',
    command: 'git commit --amend -m "{{newMessage}}"',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'amend', 'commit', 'fix', 'typo'],
    dangerLevel: 'safe',
    params: [
      { name: 'newMessage', label: 'New Commit Message', default: 'fix(core): update connection timeout handling', placeholder: 'message' }
    ]
  },
  {
    id: 'git-bisect-debug',
    title: 'Automated Binary Search for Buggy Commit',
    description: 'Pinpoints the exact commit that broke the build using binary search across git history.',
    command: 'git bisect start && git bisect bad HEAD && git bisect good {{goodCommit}}',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'bisect', 'debug', 'find', 'bug'],
    dangerLevel: 'safe',
    proTip: 'You can automate the whole search with "git bisect run npm test"!',
    params: [
      { name: 'goodCommit', label: 'Known Good Commit', default: 'v1.2.0', placeholder: 'tag or commit hash' }
    ]
  },
  {
    id: 'git-delete-merged-branches',
    title: 'Purge All Locally Merged Branches',
    description: 'Cleans up local repository by deleting all branches that have already been merged into main.',
    command: 'git branch --merged | grep -v "\*" | grep -v "main" | grep -v "master" | xargs -n 1 git branch -d',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'branch', 'clean', 'delete', 'merged'],
    dangerLevel: 'caution',
    proTip: 'Run "git fetch -p" first to prune dead remote-tracking branches.'
  },
  {
    id: 'git-show-root-dir',
    title: 'Find Top-Level Git Root Directory Path',
    description: 'Prints the absolute path to the root of the current Git repository.',
    command: 'git rev-parse --show-toplevel',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'root', 'path', 'scripting'],
    dangerLevel: 'safe',
    outputExample: '/home/user/workspace/cmds'
  },
  {
    id: 'system-disk-free-human',
    title: 'Inspect Disk Filesystem Capacity & Free Space',
    description: 'Displays all mounted partitions, filesystem types, and percentage used in human-readable sizes (GB/TB).',
    command: 'df -h -T -x tmpfs -x devtmpfs',
    platforms: ['linux'],
    category: 'system',
    tags: ['df', 'disk', 'storage', 'partition', 'space'],
    dangerLevel: 'safe',
    proTip: 'Excluding tmpfs removes noisy memory-backed virtual filesystems.',
    alternatives: [
      {
        platform: 'macos',
        command: 'df -h',
        note: 'macOS BSD df'
      },
      {
        platform: 'windows',
        command: 'Get-PSDrive -PSProvider FileSystem | Select-Object Name, @{Name="FreeGB";Expression={"{0:N1}" -f ($_.Free / 1GB)}}, @{Name="UsedGB";Expression={"{0:N1}" -f ($_.Used / 1GB)}}',
        note: 'PowerShell'
      }
    ]
  },
  {
    id: 'system-live-io-stats',
    title: 'Real-Time Disk Read/Write IOPS & Throughput',
    description: 'Reports device input/output metrics to find which disk or NVMe drive is saturated.',
    command: 'iostat -xz 1 10',
    platforms: ['linux'],
    category: 'system',
    tags: ['iostat', 'disk', 'iops', 'performance', 'nvme'],
    dangerLevel: 'safe',
    proTip: 'Look at the %util column: if near 100%, your disk is a major bottleneck.',
    outputExample: 'Device   r/s     w/s     rMB/s   wMB/s   %util\nnvme0n1  124.0   312.0   12.4    48.2    34.2%'
  },
  {
    id: 'system-ram-usage-free',
    title: 'Check Physical & Swap Memory Consumption',
    description: 'Prints total, used, free, shared, and available memory in gigabytes.',
    command: 'free -h --giga',
    platforms: ['linux'],
    category: 'system',
    tags: ['free', 'ram', 'memory', 'swap', 'linux'],
    dangerLevel: 'safe',
    proTip: 'Focus on "available" rather than "free", since modern OSes utilize unused RAM for buffer cache.',
    outputExample: '               total        used        free      shared  buff/cache   available\nMem:            32Gi        12Gi       8.2Gi       410Mi        11Gi        19Gi'
  },
  {
    id: 'system-hardware-cpu-info',
    title: 'Detailed CPU Architecture & Core Details',
    description: 'Displays processor model, socket count, hardware virtualization flags, and clock speeds.',
    command: 'lscpu',
    platforms: ['linux'],
    category: 'system',
    tags: ['cpu', 'hardware', 'lscpu', 'architecture', 'cores'],
    dangerLevel: 'safe',
    alternatives: [
      {
        platform: 'macos',
        command: 'sysctl -n machdep.cpu.brand_string; sysctl -n hw.ncpu',
        note: 'macOS CPU architecture'
      },
      {
        platform: 'windows',
        command: 'Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors',
        note: 'PowerShell'
      }
    ]
  },
  {
    id: 'network-ping-interval-sweep',
    title: 'Fast Ping Test with Custom Interval',
    description: 'Sends ping probes with a custom sub-second interval to identify transient network jitter.',
    command: 'ping -i {{interval}} -c {{count}} {{host}}',
    platforms: ['linux', 'macos'],
    category: 'networking',
    tags: ['ping', 'latency', 'jitter', 'icmp', 'network'],
    dangerLevel: 'safe',
    params: [
      { name: 'interval', label: 'Interval (seconds)', default: '0.2', placeholder: '0.2' },
      { name: 'count', label: 'Packet Count', default: '20', placeholder: '10' },
      { name: 'host', label: 'Target Host', default: '1.1.1.1', placeholder: '8.8.8.8' }
    ]
  },
  {
    id: 'network-ip-route-default',
    title: 'Show Default Gateway & Routing Table',
    description: 'Identifies the outbound default gateway router interface and metric.',
    command: 'ip route show default',
    platforms: ['linux'],
    category: 'networking',
    tags: ['ip', 'route', 'gateway', 'network', 'interface'],
    dangerLevel: 'safe',
    alternatives: [
      {
        platform: 'macos',
        command: 'netstat -nr | grep default',
        note: 'macOS route table'
      },
      {
        platform: 'windows',
        command: 'Get-NetRoute -DestinationPrefix "0.0.0.0/0" | Select-Object NextHop, InterfaceAlias',
        note: 'PowerShell'
      }
    ],
    outputExample: 'default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.42 metric 100'
  },
  {
    id: 'file-chmod-recursive-dirs-files',
    title: 'Fix File & Directory Permissions Separately',
    description: 'Applies 755 to directories and 644 to files recursively without breaking execute bit on directories.',
    command: 'find {{directory}} -type d -exec chmod 755 {} + && find {{directory}} -type f -exec chmod 644 {} +',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['chmod', 'permissions', '755', '644', 'fix'],
    dangerLevel: 'caution',
    proTip: 'Never run "chmod -R 777"! Use this standard split for web servers and project repos.',
    params: [
      { name: 'directory', label: 'Target Directory', default: './public', placeholder: '/var/www' }
    ]
  },
  {
    id: 'file-checksum-verify',
    title: 'Generate and Verify SHA-256 Checksum',
    description: 'Computes cryptographic SHA-256 hash of a file to verify integrity against corruption or tampering.',
    command: 'sha256sum {{filePath}}',
    platforms: ['linux'],
    category: 'security',
    tags: ['sha256', 'hash', 'checksum', 'verify', 'security'],
    dangerLevel: 'safe',
    params: [
      { name: 'filePath', label: 'File Path', default: 'ubuntu.iso', placeholder: 'file.tar.gz' }
    ],
    alternatives: [
      {
        platform: 'macos',
        command: 'shasum -a 256 {{filePath}}',
        note: 'macOS BSD shasum'
      },
      {
        platform: 'windows',
        command: 'Get-FileHash -Algorithm SHA256 {{filePath}}',
        note: 'PowerShell'
      }
    ],
    outputExample: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  ubuntu.iso'
  },
  {
    id: 'media-screen-record-cli',
    title: 'Record Desktop Screen to MP4 (ffmpeg)',
    description: 'Records desktop screen capture with high framerate directly via CLI without heavyweight GUI screen recorders.',
    command: 'ffmpeg -f x11grab -video_size {{resolution}} -framerate {{fps}} -i :0.0 -c:v libx264 -preset ultrafast {{output}}',
    platforms: ['linux'],
    category: 'media',
    tags: ['ffmpeg', 'record', 'screen', 'screencast', 'video'],
    dangerLevel: 'safe',
    proTip: 'Press "q" in the terminal window to cleanly stop recording.',
    params: [
      { name: 'resolution', label: 'Resolution', default: '1920x1080', placeholder: '1920x1080' },
      { name: 'fps', label: 'Framerate', default: '30', placeholder: '30' },
      { name: 'output', label: 'Output File', default: 'recording.mp4', placeholder: 'screencast.mp4' }
    ],
    alternatives: [
      {
        platform: 'macos',
        command: 'ffmpeg -f avfoundation -i "1:0" -r {{fps}} {{output}}',
        note: 'macOS AVFoundation'
      }
    ]
  },
  {
    id: 'docker-compose-rebuild-force',
    title: 'Force Rebuild and Restart Compose Stack',
    description: 'Rebuilds Docker images without cache and re-spawns container stack in detached mode.',
    command: 'docker compose down && docker compose build --no-cache && docker compose up -d',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'compose', 'rebuild', 'cache', 'deploy'],
    dangerLevel: 'caution',
    proTip: 'Guarantees that new package dependencies and environmental Dockerfile changes are cleanly compiled.'
  },
  {
    id: 'win-clear-recycle-bin',
    title: 'Empty Recycle Bin Across All Drives (PowerShell)',
    description: 'Instantly purges the Windows Recycle Bin on all drives without showing confirmation dialogs.',
    command: 'Clear-RecycleBin -Force',
    platforms: ['windows'],
    category: 'windows',
    tags: ['windows', 'recycle-bin', 'clean', 'trash', 'powershell'],
    dangerLevel: 'dangerous'
  },
  {
    id: 'win-find-ip-adapters',
    title: 'List All Network Adapters and IPv4 Addresses',
    description: 'Filters network adapter configurations to display clean active IPv4 addresses and link speeds.',
    command: 'Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*"} | Select-Object IPAddress, InterfaceAlias',
    platforms: ['windows'],
    category: 'windows',
    tags: ['windows', 'ip', 'network', 'adapters', 'powershell'],
    dangerLevel: 'safe'
  },
  {
    id: 'mac-listen-bonjour-services',
    title: 'Discover Local Bonjour / mDNS Services on Network',
    description: 'Browses local LAN for advertised services like AirPlay, SSH, HTTP, and printer endpoints.',
    command: 'dns-sd -B _http._tcp local.',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'bonjour', 'mdns', 'lan', 'discovery'],
    dangerLevel: 'safe'
  }
];

COMMANDS.push(...EXTRA_COMMANDS);

export const MORE_COMMANDS: TerminalCommand[] = [
  {
    id: 'journalctl-follow-service',
    title: 'Stream Systemd Service Logs in Real Time',
    description: 'Tails the live log output of a specific systemd unit service with full formatting.',
    command: 'journalctl -u {{service}} -f -n 100 --no-pager',
    platforms: ['linux'],
    category: 'system',
    tags: ['journalctl', 'systemd', 'logs', 'tail', 'stream', 'service'],
    dangerLevel: 'safe',
    proTip: 'Add "-b" to limit output to the current boot only.',
    params: [
      { name: 'service', label: 'Service Name', default: 'nginx', placeholder: 'docker' }
    ],
    outputExample: 'Sep 10 21:50:12 server nginx[1204]: [notice] start worker processes'
  },
  {
    id: 'systemctl-status-nonblock',
    title: 'Check Systemd Service Status Cleanly',
    description: 'Inspects whether a service is active and running without spawning a pager.',
    command: 'systemctl status {{service}} --no-pager -l',
    platforms: ['linux'],
    category: 'system',
    tags: ['systemctl', 'systemd', 'service', 'status'],
    dangerLevel: 'safe',
    params: [
      { name: 'service', label: 'Service Unit', default: 'nginx', placeholder: 'service' }
    ]
  },
  {
    id: 'ssh-copy-id-key',
    title: 'Install Public Key onto Remote Server (Passwordless SSH)',
    description: 'Appends your public SSH key to the remote server ~/.ssh/authorized_keys file securely.',
    command: 'ssh-copy-id -i ~/.ssh/{{keyName}}.pub {{user}}@{{host}}',
    platforms: ['linux', 'macos'],
    category: 'security',
    tags: ['ssh', 'ssh-copy-id', 'auth', 'keys', 'remote'],
    dangerLevel: 'safe',
    params: [
      { name: 'keyName', label: 'Public Key File', default: 'id_ed25519', placeholder: 'id_rsa' },
      { name: 'user', label: 'Remote User', default: 'root', placeholder: 'ubuntu' },
      { name: 'host', label: 'Remote Host', default: '198.51.100.1', placeholder: 'server.com' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'type $env:USERPROFILE\\.ssh\\{{keyName}}.pub | ssh {{user}}@{{host}} "cat >> ~/.ssh/authorized_keys"',
        note: 'PowerShell key copy'
      }
    ]
  },
  {
    id: 'tmux-new-session',
    title: 'Start Persistent Named Tmux Terminal Session',
    description: 'Launches a detachable terminal session that survives SSH disconnects and network drops.',
    command: 'tmux new-session -s {{sessionName}}',
    platforms: ['linux', 'macos'],
    category: 'process',
    tags: ['tmux', 'session', 'terminal', 'multiplexer', 'detach'],
    dangerLevel: 'safe',
    proTip: 'Detach using "Ctrl+b d". Re-attach later using: tmux attach -t {{sessionName}}',
    params: [
      { name: 'sessionName', label: 'Session Name', default: 'dev', placeholder: 'workspace' }
    ]
  },
  {
    id: 'fzf-history-search',
    title: 'Interactive Fuzzy Reverse Search Terminal History',
    description: 'Fuzzy finds previous commands in your shell history and runs or copies the match.',
    command: 'cat ~/.bash_history | fzf --tac',
    platforms: ['linux', 'macos'],
    category: 'quick-wins',
    tags: ['fzf', 'history', 'fuzzy', 'search', 'fast'],
    dangerLevel: 'safe',
    proTip: 'In Zsh use: cat ~/.zsh_history | fzf'
  },
  {
    id: 'git-cherry-pick-commit',
    title: 'Apply Specific Commit from Another Branch',
    description: 'Copies and applies an exact commit patch onto your current checked-out branch.',
    command: 'git cherry-pick {{commitHash}}',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'cherry-pick', 'patch', 'commit'],
    dangerLevel: 'safe',
    params: [
      { name: 'commitHash', label: 'Commit Hash', default: 'a1b2c3d', placeholder: 'hash' }
    ]
  },
  {
    id: 'git-interactive-rebase',
    title: 'Interactive Rebase & Squash Commits',
    description: 'Reorders, edits, combines (squashes), or drops the last N commits before submitting a PR.',
    command: 'git rebase -i HEAD~{{count}}',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'rebase', 'squash', 'history', 'clean'],
    dangerLevel: 'caution',
    proTip: 'Never rebase commits that have already been pushed to shared public branches!',
    params: [
      { name: 'count', label: 'Number of Commits', default: '3', placeholder: '3' }
    ]
  },
  {
    id: 'docker-run-detached-port',
    title: 'Spin Up Detached Container with Port Mapping',
    description: 'Launches a Docker container in the background with exposed host port and restart policy.',
    command: 'docker run -d --name {{name}} -p {{hostPort}}:{{containerPort}} --restart unless-stopped {{image}}',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'run', 'port', 'spawn', 'container'],
    dangerLevel: 'safe',
    params: [
      { name: 'name', label: 'Container Name', default: 'redis-cache', placeholder: 'name' },
      { name: 'hostPort', label: 'Host Port', default: '6379', placeholder: '6379' },
      { name: 'containerPort', label: 'Container Port', default: '6379', placeholder: '6379' },
      { name: 'image', label: 'Docker Image', default: 'redis:alpine', placeholder: 'image:tag' }
    ]
  },
  {
    id: 'docker-buildx-multiarch',
    title: 'Build Multi-Arch Docker Image (AMD64 & ARM64)',
    description: 'Builds and pushes images natively compatible with both Intel/AMD servers and Apple Silicon / AWS Graviton.',
    command: 'docker buildx build --platform linux/amd64,linux/arm64 -t {{tag}} --push .',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'buildx', 'multiarch', 'arm64', 'amd64'],
    dangerLevel: 'safe',
    params: [
      { name: 'tag', label: 'Image Tag', default: 'registry.hub.docker.com/user/app:v1', placeholder: 'repo/app:latest' }
    ]
  },
  {
    id: 'dd-create-dummy-file',
    title: 'Generate Exact Size Test File Instantly',
    description: 'Creates a dummy file filled with zero bytes of precise size for testing uploads or disk quotas.',
    command: 'dd if=/dev/zero of={{filename}} bs=1M count={{sizeMB}} status=progress',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['dd', 'dummy', 'file', 'size', 'test'],
    dangerLevel: 'safe',
    params: [
      { name: 'filename', label: 'Target Filename', default: 'dummy_100MB.dat', placeholder: 'test.dat' },
      { name: 'sizeMB', label: 'Size (Megabytes)', default: '100', placeholder: '500' }
    ],
    alternatives: [
      {
        platform: 'windows',
        command: 'fsutil file createnew {{filename}} {{sizeMB}}000000',
        note: 'Windows fsutil'
      }
    ]
  },
  {
    id: 'chown-user-recursive',
    title: 'Take Recursive Ownership of Directory',
    description: 'Transfers ownership of all files and subdirectories to the currently logged in user.',
    command: 'sudo chown -R $USER:$USER {{directory}}',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['chown', 'permissions', 'owner', 'sudo'],
    dangerLevel: 'caution',
    params: [
      { name: 'directory', label: 'Target Directory', default: './project', placeholder: '/path' }
    ]
  },
  {
    id: 'win-create-symlink',
    title: 'Create Filesystem Symbolic Link (PowerShell)',
    description: 'Creates a soft symbolic link pointing a folder or file path to another location.',
    command: 'New-Item -ItemType SymbolicLink -Path "{{linkPath}}" -Target "{{targetPath}}"',
    platforms: ['windows'],
    category: 'windows',
    tags: ['windows', 'symlink', 'powershell', 'link'],
    dangerLevel: 'safe',
    params: [
      { name: 'linkPath', label: 'Symlink Name', default: 'C:\\current_build', placeholder: 'C:\\link' },
      { name: 'targetPath', label: 'Target Path', default: 'C:\\builds\\v2.4', placeholder: 'C:\\target' }
    ],
    alternatives: [
      {
        platform: 'linux',
        command: 'ln -s {{targetPath}} {{linkPath}}',
        note: 'POSIX symlink'
      }
    ]
  },
  {
    id: 'mac-diskutil-apfs',
    title: 'Inspect macOS APFS Volumes and Physical Disks',
    description: 'Lists all physical SSDs, synthesised APFS containers, EFI partitions, and recovery volumes.',
    command: 'diskutil list',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'diskutil', 'apfs', 'ssd', 'partitions'],
    dangerLevel: 'safe'
  },
  {
    id: 'mac-softwareupdate-cli',
    title: 'Check & Install macOS System Updates via CLI',
    description: 'Downloads and applies pending macOS software and security updates directly from Apple CDN.',
    command: 'softwareupdate -ia --verbose',
    platforms: ['macos'],
    category: 'macos',
    tags: ['macos', 'softwareupdate', 'apple', 'security', 'upgrade'],
    dangerLevel: 'caution',
    proTip: 'Use "softwareupdate -l" to list available updates first without installing.'
  },
  {
    id: 'curl-stream-json-api',
    title: 'Send JSON POST Request with Authorization Header',
    description: 'Performs an authenticated JSON POST request formatted and piped to jq.',
    command: 'curl -s -X POST {{url}} -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -d \'{{payload}}\' | jq .',
    platforms: ['all'],
    category: 'networking',
    tags: ['curl', 'api', 'post', 'json', 'auth', 'bearer'],
    dangerLevel: 'safe',
    params: [
      { name: 'url', label: 'API Endpoint', default: 'https://api.example.com/v1/data', placeholder: 'https://...' },
      { name: 'token', label: 'Bearer Token', default: 'xyz123abc', placeholder: 'token' },
      { name: 'payload', label: 'JSON Body', default: '{"active": true}', placeholder: '{"key":"val"}' }
    ]
  }
];

COMMANDS.push(...MORE_COMMANDS);

export const FINAL_BATCH: TerminalCommand[] = [
  {
    id: 'btop-system-monitor',
    title: 'Launch Modern GPU/CPU/Disk/Process Monitor (btop)',
    description: 'An ultra-responsive, beautiful terminal activity monitor with mouse support and graphs.',
    command: 'btop --utf-force',
    platforms: ['linux', 'macos'],
    category: 'system',
    tags: ['btop', 'htop', 'monitor', 'cpu', 'gpu', 'process'],
    dangerLevel: 'safe'
  },
  {
    id: 'git-count-lines-of-code',
    title: 'Count Total Lines of Code in Repository',
    description: 'Calculates the line count across all committed files tracked in the repository.',
    command: 'git ls-files | xargs wc -l | sort -nr | head -n 25',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'loc', 'code', 'metrics', 'stats'],
    dangerLevel: 'safe',
    outputExample: '  1420 src/data/commands.ts\n   890 src/pages/index.astro\n   450 src/styles/global.css'
  },
  {
    id: 'tail-multiple-logs-wildcard',
    title: 'Stream Follow Multiple Log Files Simultaneously',
    description: 'Follows multiple active log files in parallel, prepending the file name to every incoming line.',
    command: 'tail -f -n 50 {{logPattern}}',
    platforms: ['linux', 'macos'],
    category: 'system',
    tags: ['tail', 'logs', 'stream', 'wildcard', 'follow'],
    dangerLevel: 'safe',
    params: [
      { name: 'logPattern', label: 'Log Files Glob', default: '/var/log/nginx/*.log', placeholder: '/var/log/*.log' }
    ]
  },
  {
    id: 'sed-delete-empty-lines',
    title: 'Strip All Empty Blank Lines from File',
    description: 'Removes all blank or whitespace-only lines from a document in place.',
    command: "sed -i '/^[[:space:]]*$/d' {{file}}",
    platforms: ['linux'],
    category: 'text',
    tags: ['sed', 'cleanup', 'clean', 'lines', 'format'],
    dangerLevel: 'safe',
    params: [
      { name: 'file', label: 'Target File', default: 'config.env', placeholder: 'file.txt' }
    ]
  },
  {
    id: 'wipe-bash-history',
    title: 'Completely Wipe Terminal History from Memory & Disk',
    description: 'Clears the in-memory shell history and immediately overwrites ~/.bash_history.',
    command: 'cat /dev/null > ~/.bash_history && history -c && history -w',
    platforms: ['linux', 'macos'],
    category: 'security',
    tags: ['history', 'wipe', 'privacy', 'bash', 'clean'],
    dangerLevel: 'caution',
    proTip: 'In Zsh, clear with: cat /dev/null > ~/.zsh_history'
  }
];

COMMANDS.push(...FINAL_BATCH);

export const DEVOPS_EXPANSION_COMMANDS: TerminalCommand[] = [
  // ==========================================
  // DEVSECOPS & HARDENING
  // ==========================================
  {
    id: 'trivy-fs-vuln',
    title: 'Audit Filesystem & Codebase for High/Critical CVEs',
    description: 'Performs deep vulnerability, hardcoded secrets, and IaC misconfiguration scanning across local project files.',
    command: 'trivy fs --severity HIGH,CRITICAL --scanners vuln,secret,misconfig {{targetDir}}',
    platforms: ['linux', 'macos'],
    category: 'devsecops',
    tags: ['trivy', 'cve', 'vulnerability', 'sast', 'security', 'audit', 'secret', 'misconfig'],
    dangerLevel: 'safe',
    proTip: 'Run in CI/CD pipeline with "--exit-code 1" to fail the build if unpatched vulnerabilities exist.',
    params: [
      { name: 'targetDir', label: 'Directory', default: '.', placeholder: '.' }
    ],
    outputExample: '2026-09-10T22:30:15Z INFO Vulnerability scanning is enabled\n2026-09-10T22:30:15Z INFO Secret scanning is enabled\n2026-09-10T22:30:16Z INFO Number of language-specific files: 3\npackage-lock.json (npm)\n=======================\nTotal: 0 (HIGH: 0, CRITICAL: 0)\n✓ No high or critical vulnerabilities found.'
  },
  {
    id: 'trivy-image-scan',
    title: 'Scan Container Image for High & Critical CVEs',
    description: 'Audits container image packages and OS libraries against the National Vulnerability Database (NVD), ignoring unfixed flaws.',
    command: 'trivy image --severity HIGH,CRITICAL --ignore-unfixed {{image}}',
    platforms: ['linux', 'macos'],
    category: 'devsecops',
    tags: ['trivy', 'docker', 'container', 'image', 'cve', 'security', 'devsecops'],
    dangerLevel: 'safe',
    proTip: 'Export to SARIF format using "-f sarif -o results.sarif" to upload directly to GitHub Code Scanning.',
    params: [
      { name: 'image', label: 'Image Tag', default: 'nginx:alpine', placeholder: 'nginx:alpine' }
    ],
    outputExample: 'nginx:alpine (alpine 3.20.1)\n===========================\nTotal: 0 (HIGH: 0, CRITICAL: 0)\n✓ Clean container base: 0 unpatched vulnerabilities.'
  },
  {
    id: 'gitleaks-detect-secrets',
    title: 'Detect Leaked Secrets and API Keys in Git History',
    description: 'Scans commits, branches, and staged files for leaked AWS tokens, private keys, and authorization secrets with redaction.',
    command: 'gitleaks detect --source {{repoPath}} -v --redact',
    platforms: ['linux', 'macos', 'windows'],
    category: 'devsecops',
    tags: ['gitleaks', 'secrets', 'leak', 'git', 'api-key', 'token', 'security'],
    dangerLevel: 'safe',
    proTip: 'Use as a pre-commit hook via "gitleaks protect --staged" to block developer secret leakage before git push.',
    params: [
      { name: 'repoPath', label: 'Repository Path', default: '.', placeholder: '.' }
    ],
    outputExample: '    ○\n    │╲\n    │ ○\n    ○ \nScan summary: 148 commits scanned across 4 branches.\n[✓] No leaks detected.'
  },
  {
    id: 'semgrep-sast-scan',
    title: 'Static Application Security Testing (SAST) with Semgrep',
    description: 'High-speed multi-language static analysis auditing code for OWASP Top 10 vulnerabilities, injection flaws, and anti-patterns.',
    command: 'semgrep scan --config auto --error {{path}}',
    platforms: ['linux', 'macos'],
    category: 'devsecops',
    tags: ['semgrep', 'sast', 'security', 'owasp', 'audit', 'code-quality', 'ci-cd'],
    dangerLevel: 'safe',
    proTip: 'Combine with custom .semgrep.yml rules to enforce organization-wide architectural and security conventions.',
    params: [
      { name: 'path', label: 'Source Path', default: '.', placeholder: '.' }
    ],
    outputExample: '┌─────────────┐\n│ Scan Status │\n└─────────────┘\n  Scanning 142 files with 86 rules across 4 languages.\n  [+] Done: 142/142 files in 1.4s.\n\nRan 86 rules on 142 files: 0 findings.\n✓ Codebase passes all security policies.'
  },
  {
    id: 'cosign-verify-image',
    title: 'Verify Cryptographic Container Signature with Cosign',
    description: 'Validates container image provenance and signature against public cosign keys or Sigstore keyless transparency logs.',
    command: 'cosign verify --key {{publicKey}} {{image}}',
    platforms: ['linux', 'macos'],
    category: 'devsecops',
    tags: ['cosign', 'sigstore', 'supply-chain', 'container', 'docker', 'security', 'crypto'],
    dangerLevel: 'safe',
    proTip: 'For keyless verification with GitHub OIDC, use "cosign verify --certificate-identity-regexp ... --certificate-oidc-issuer ...".',
    params: [
      { name: 'publicKey', label: 'Public Key File', default: 'cosign.pub', placeholder: 'cosign.pub' },
      { name: 'image', label: 'Container Image', default: 'ghcr.io/org/app:latest', placeholder: 'ghcr.io/org/app:latest' }
    ],
    outputExample: 'Verification for ghcr.io/org/app:latest --\nThe following checks were performed on each of these signatures:\n  - The cosign claims were validated\n  - Existence of the claims in the transparency log was verified offline\n  - The signatures were verified against the specified public key\n[{"critical":{"identity":{"docker-reference":"ghcr.io/org/app"},"image":{"docker-manifest-digest":"sha256:4a8b..."},"type":"cosign container image signature"}}]'
  },
  {
    id: 'trufflehog-git-verify',
    title: 'Deep Scan Git History with Live Credential Verification',
    description: 'Audits commit log for high-entropy secrets and actively verifies if detected tokens are live against provider endpoints.',
    command: 'trufflehog git file://{{repoDir}} --only-verified',
    platforms: ['linux', 'macos'],
    category: 'devsecops',
    tags: ['trufflehog', 'secret', 'git', 'token', 'entropy', 'credential', 'security'],
    dangerLevel: 'safe',
    proTip: 'Adding --only-verified eliminates false positives by pinging APIs (Slack, AWS, GitHub) to confirm active validity.',
    params: [
      { name: 'repoDir', label: 'Git Repo Directory', default: '.', placeholder: '.' }
    ],
    outputExample: '🐷🔑 TruffleHog Engine v3.82.0\nExamining 482 commits across all branches...\nCompleted in 2.1s.\n[✓] 0 active verified leaks detected.'
  },
  {
    id: 'lynis-security-audit',
    title: 'Run Comprehensive Linux System & CIS Hardening Audit',
    description: 'Performs in-depth system audit of authentication, kernel parameters, firewall rules, and CIS compliance benchmarks.',
    command: 'lynis audit system --quick',
    platforms: ['linux'],
    category: 'devsecops',
    tags: ['lynis', 'cis', 'audit', 'hardening', 'linux', 'compliance', 'security'],
    dangerLevel: 'safe',
    proTip: 'Check the generated report at /var/log/lynis-report.dat to automate scoring in monitoring agents.',
    outputExample: '[+] Hardening index : 82 [#################   ]\n[+] Tests performed : 284\n[+] Plugins enabled : 0\n[+] Suggestions (6) : Set umask to 027 in /etc/login.defs, Enable auditd\n[+] Warnings (0)    : None\n✓ System hardening check complete.'
  },
  {
    id: 'fail2ban-unban-ip',
    title: 'Inspect Jail Status and Unban Blocked IP Address',
    description: 'Queries active bans across SSH/HTTP fail2ban jails and immediately removes an administrative IP ban.',
    command: 'fail2ban-client status {{jail}} && fail2ban-client set {{jail}} unbanip {{ip}}',
    platforms: ['linux'],
    category: 'devsecops',
    tags: ['fail2ban', 'firewall', 'ip', 'ban', 'sshd', 'security', 'unban'],
    dangerLevel: 'caution',
    proTip: 'List all active jails with "fail2ban-client status".',
    params: [
      { name: 'jail', label: 'Jail Name', default: 'sshd', placeholder: 'sshd' },
      { name: 'ip', label: 'IP Address', default: '198.51.100.25', placeholder: '198.51.100.25' }
    ],
    outputExample: 'Status for the jail: sshd\n|- Filter: Currently failed: 1, Total failed: 124\n`- Actions: Currently banned: 2, Total banned: 45\n198.51.100.25 has been unbanned.'
  },
  {
    id: 'find-suid-privilege-esc',
    title: 'Audit SUID/SGID Executables for Privilege Escalation',
    description: 'Discovers all binaries on the system possessing the setuid permission bit that execute with root privileges.',
    command: 'find / -perm -4000 -type f -exec ls -ld {} + 2>/dev/null',
    platforms: ['linux'],
    category: 'devsecops',
    tags: ['suid', 'privilege', 'escalation', 'audit', 'find', 'permissions', 'hardening'],
    dangerLevel: 'safe',
    proTip: 'Cross-reference results with GTFOBins (gtfobins.github.io) to identify dangerous bypasses.',
    outputExample: '-rwsr-xr-x 1 root root  88304 Feb 22 14:10 /usr/bin/gpasswd\n-rwsr-xr-x 1 root root  59976 Feb 22 14:10 /usr/bin/passwd\n-rwsr-xr-x 1 root root 232416 Feb 22 14:10 /usr/bin/sudo\n-rwsr-xr-x 1 root root  44784 Feb 22 14:10 /usr/bin/newgrp'
  },
  {
    id: 'check-listening-sockets',
    title: 'Audit All Listening TCP/UDP Ports and Owning Processes',
    description: 'Lists all open listening network sockets, associated PIDs, process names, and interfaces using modern socket statistics.',
    command: 'ss -tulpn',
    platforms: ['linux'],
    category: 'devsecops',
    tags: ['ss', 'ports', 'listening', 'sockets', 'audit', 'network', 'security'],
    dangerLevel: 'safe',
    proTip: 'Use "-H" to suppress table headers when parsing with awk or scripts.',
    outputExample: 'Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process\ntcp    LISTEN  0       128            0.0.0.0:22          0.0.0.0:*      users:(("sshd",pid=842,fd=3))\ntcp    LISTEN  0       511            0.0.0.0:80          0.0.0.0:*      users:(("nginx",pid=1120,fd=6))\ntcp    LISTEN  0       511            0.0.0.0:443         0.0.0.0:*      users:(("nginx",pid=1120,fd=7))\ntcp    LISTEN  0       128          127.0.0.1:5432        0.0.0.0:*      users:(("postgres",pid=931,fd=4))'
  },

  // ==========================================
  // KUBERNETES & K8S
  // ==========================================
  {
    id: 'k8s-pod-previous-logs',
    title: 'Inspect Logs of Terminated Pod Container (CrashLoopBackOff)',
    description: 'Retrieves stdout/stderr log output of the previous crashed instance of a Kubernetes container.',
    command: 'kubectl logs {{pod}} -n {{namespace}} --previous --tail={{lines}}',
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'crashloop', 'logs', 'debug', 'pod', 'troubleshooting'],
    dangerLevel: 'safe',
    proTip: 'If multiple containers exist in the pod, append "-c {{containerName}}".',
    params: [
      { name: 'pod', label: 'Pod Name', default: 'api-service-674bb8c5f-k9l2m', placeholder: 'pod-name' },
      { name: 'namespace', label: 'Namespace', default: 'production', placeholder: 'default' },
      { name: 'lines', label: 'Tail Lines', default: '50', placeholder: '50' }
    ],
    outputExample: '2026-09-10T22:28:10.142Z [FATAL] uncaughtException: connect ECONNREFUSED 10.96.14.88:5432\n    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16)\n2026-09-10T22:28:10.145Z [INFO] Process terminating with exit status 1.'
  },
  {
    id: 'k8s-rollout-restart',
    title: 'Zero-Downtime Rolling Restart of Deployment',
    description: 'Performs graceful rolling update of all pods in a deployment without updating images or configmaps.',
    command: 'kubectl rollout restart deployment/{{deployment}} -n {{namespace}}',
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'rollout', 'restart', 'deployment', 'zero-downtime'],
    dangerLevel: 'safe',
    proTip: 'Follow progress live with "kubectl rollout status deployment/{{deployment}} -n {{namespace}}".',
    params: [
      { name: 'deployment', label: 'Deployment', default: 'api-service', placeholder: 'deployment-name' },
      { name: 'namespace', label: 'Namespace', default: 'production', placeholder: 'production' }
    ],
    outputExample: 'deployment.apps/api-service restarted\nWaiting for rollout to finish: 1 out of 3 new replicas have been updated...\nWaiting for rollout to finish: 2 out of 3 new replicas have been updated...\ndeployment "api-service" successfully rolled out.'
  },
  {
    id: 'k8s-debug-ephemeral-netshoot',
    title: 'Attach Ephemeral Netshoot Container to Live Pod',
    description: 'Injects a temporary diagnostic container with curl, tcpdump, drill, and iproute2 into a running pod.',
    command: 'kubectl debug -it {{pod}} -n {{namespace}} --image=nicolaka/netshoot --target={{container}}',
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'debug', 'netshoot', 'ephemeral', 'networking', 'troubleshoot'],
    dangerLevel: 'safe',
    proTip: 'Using --target shares process and network namespaces with the application container.',
    params: [
      { name: 'pod', label: 'Pod Name', default: 'frontend-7db78c4cf9-9w8xz', placeholder: 'pod-name' },
      { name: 'namespace', label: 'Namespace', default: 'default', placeholder: 'default' },
      { name: 'container', label: 'Target Container', default: 'web', placeholder: 'web' }
    ],
    outputExample: 'Targeting container "web".\nDefaulting debug container name to debugger-8472m.\nbash-5.2# curl -I http://127.0.0.1:8080/health\nHTTP/1.1 200 OK\nContent-Type: application/json'
  },
  {
    id: 'k8s-decode-secret',
    title: 'Extract & Base64 Decode Kubernetes Secret Key',
    description: 'Fetches raw secret payload from cluster, filters key with jsonpath, and decodes directly to plaintext stdout.',
    command: "kubectl get secret {{secretName}} -n {{namespace}} -o jsonpath='{.data.{{key}}}' | base64 --decode",
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'secret', 'base64', 'decode', 'jsonpath'],
    dangerLevel: 'caution',
    proTip: 'Use echo "" after base64 to ensure terminal prompt starts on a clean newline.',
    params: [
      { name: 'secretName', label: 'Secret Name', default: 'database-credentials', placeholder: 'secret-name' },
      { name: 'namespace', label: 'Namespace', default: 'production', placeholder: 'production' },
      { name: 'key', label: 'Secret Key', default: 'password', placeholder: 'password' }
    ],
    outputExample: 'Sup3rS3cr3t_PgPass_2026!'
  },
  {
    id: 'k8s-top-pods-sorted',
    title: 'Display Pod CPU & Memory Usage Sorted Across Cluster',
    description: 'Queries Kubernetes metrics-server and sorts running pods by real-time CPU or memory consumption.',
    command: 'kubectl top pods -A --sort-by={{metric}}',
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'top', 'metrics', 'cpu', 'memory', 'performance', 'sre'],
    dangerLevel: 'safe',
    proTip: 'Use --sort-by=memory to quickly detect memory leaks and pods near OOMKilled limits.',
    params: [
      { name: 'metric', label: 'Sort By', default: 'cpu', placeholder: 'cpu or memory' }
    ],
    outputExample: 'NAMESPACE     NAME                             CPU(cores)   MEMORY(bytes)\nproduction    api-service-674bb8c5f-k9l2m      480m         1420Mi\nmonitoring    prometheus-k8s-0                 310m         4200Mi\nkube-system   cilium-operator-6bfd7557d-9pxw2  45m          110Mi\nproduction    redis-master-0                   18m          512Mi'
  },
  {
    id: 'k8s-cluster-events-sorted',
    title: 'Stream Warning & Error Cluster Events Chronologically',
    description: 'Filters cluster events across all namespaces for warnings, failed scheduling, image pull errors, and evictions.',
    command: "kubectl get events -A --sort-by='.lastTimestamp' --field-selector type!=Normal",
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'events', 'warnings', 'errors', 'debug', 'cluster'],
    dangerLevel: 'safe',
    proTip: 'Append -w to watch new warning events appear in real-time.',
    outputExample: 'NAMESPACE   LAST SEEN   TYPE      REASON      OBJECT               MESSAGE\nproduction  42s         Warning   BackOff     pod/worker-79c       Back-off restarting failed container\nstaging     2m          Warning   FailedMount pod/redis-cache-0    MountVolume.SetUp failed for volume "data": timeout\nkube-system 5m          Warning   Unhealthy   pod/kube-dns-587     Liveness probe failed: HTTP probe failed with status 503'
  },
  {
    id: 'k8s-port-forward-bg',
    title: 'Forward Remote Kubernetes Service Port to Localhost',
    description: 'Creates local network tunnel to a service inside the cluster without configuring ingresses or load balancers.',
    command: 'kubectl port-forward svc/{{service}} {{localPort}}:{{remotePort}} -n {{namespace}}',
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'port-forward', 'service', 'tunnel', 'network'],
    dangerLevel: 'safe',
    proTip: 'Use localPort 0 (e.g. 0:80) to let kubectl assign an unused ephemeral random port automatically.',
    params: [
      { name: 'service', label: 'Service Name', default: 'grafana', placeholder: 'service-name' },
      { name: 'localPort', label: 'Local Port', default: '3000', placeholder: '3000' },
      { name: 'remotePort', label: 'Remote Port', default: '80', placeholder: '80' },
      { name: 'namespace', label: 'Namespace', default: 'monitoring', placeholder: 'monitoring' }
    ],
    outputExample: 'Forwarding from 127.0.0.1:3000 -> 80\nForwarding from [::1]:3000 -> 80\nHandling connection for 3000'
  },
  {
    id: 'k8s-dry-run-yaml',
    title: 'Generate Production Manifest YAML via Client Dry-Run',
    description: 'Synthesizes clean, syntactically correct Kubernetes Deployment YAML specifications without cluster API calls.',
    command: 'kubectl create deployment {{name}} --image={{image}} --replicas={{replicas}} --dry-run=client -o yaml',
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'dry-run', 'yaml', 'manifest', 'deployment', 'iac'],
    dangerLevel: 'safe',
    proTip: 'Pipe into "kubectl apply -f -" or save to a file with "> deployment.yaml".',
    params: [
      { name: 'name', label: 'Deployment Name', default: 'microservice-api', placeholder: 'microservice-api' },
      { name: 'image', label: 'Container Image', default: 'ghcr.io/org/api:v1.2.0', placeholder: 'image:tag' },
      { name: 'replicas', label: 'Replicas', default: '3', placeholder: '3' }
    ],
    outputExample: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  creationTimestamp: null\n  labels:\n    app: microservice-api\n  name: microservice-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: microservice-api\n  template:\n    metadata:\n      creationTimestamp: null\n      labels:\n        app: microservice-api\n    spec:\n      containers:\n      - image: ghcr.io/org/api:v1.2.0\n        name: api'
  },
  {
    id: 'k8s-drain-node',
    title: 'Safely Cordon & Drain Worker Node for Upgrades',
    description: 'Marks node unschedulable and evicts all pods with graceful termination while respecting PodDisruptionBudgets.',
    command: 'kubectl drain {{nodeName}} --ignore-daemonsets --delete-emptydir-data --force',
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['kubectl', 'k8s', 'drain', 'cordon', 'node', 'maintenance', 'sre'],
    dangerLevel: 'caution',
    proTip: 'When maintenance completes, re-enable scheduling with "kubectl uncordon {{nodeName}}".',
    params: [
      { name: 'nodeName', label: 'Node Name', default: 'k8s-worker-pool-03', placeholder: 'node-name' }
    ],
    outputExample: 'node/k8s-worker-pool-03 cordoned\nevicting pod production/api-service-674bb8c5f-k9l2m\nevicting pod staging/frontend-8bc7d66d9-x5l8w\npod/api-service-674bb8c5f-k9l2m evicted\npod/frontend-8bc7d66d9-x5l8w evicted\nnode/k8s-worker-pool-03 drained successfully'
  },
  {
    id: 'helm-diff-upgrade',
    title: 'Preview Helm Upgrade Changes with Colored Diff',
    description: 'Computes and displays exact declarative resource differences before applying changes to the cluster.',
    command: 'helm diff upgrade {{release}} {{chart}} -n {{namespace}} -f {{valuesFile}}',
    platforms: ['all'],
    category: 'kubernetes',
    tags: ['helm', 'helm-diff', 'k8s', 'diff', 'upgrade', 'preview', 'cd'],
    dangerLevel: 'safe',
    proTip: 'Install the helm plugin first with "helm plugin install https://github.com/databus23/helm-diff".',
    params: [
      { name: 'release', label: 'Release Name', default: 'ingress-nginx', placeholder: 'release' },
      { name: 'chart', label: 'Chart Reference', default: 'ingress-nginx/ingress-nginx', placeholder: 'repo/chart' },
      { name: 'namespace', label: 'Namespace', default: 'ingress', placeholder: 'ingress' },
      { name: 'valuesFile', label: 'Values YAML', default: 'values.yaml', placeholder: 'values.yaml' }
    ],
    outputExample: 'default, ingress-nginx-controller, Deployment (apps) has changed:\n  # Source: ingress-nginx/templates/controller-deployment.yaml\n  spec:\n    replicas: 2\n-   image: registry.k8s.io/ingress-nginx/controller:v1.9.4\n+   image: registry.k8s.io/ingress-nginx/controller:v1.10.0\n    resources:\n      limits:\n-       memory: 512Mi\n+       memory: 1024Mi'
  },

  // ==========================================
  // DOCKER & CONTAINER OPS
  // ==========================================
  {
    id: 'docker-compose-profile',
    title: 'Run Docker Compose Stack with Specific Service Profiles',
    description: 'Selectively starts services associated with a specific operational profile (e.g. monitoring, test, staging).',
    command: 'docker compose --profile {{profile}} up -d --build',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'compose', 'profile', 'microservices', 'build'],
    dangerLevel: 'safe',
    proTip: 'Use "--profile *" to activate all defined profiles at once.',
    params: [
      { name: 'profile', label: 'Profile Name', default: 'monitoring', placeholder: 'monitoring' }
    ],
    outputExample: '[+] Building 0.0s (0/0)\n[+] Running 3/3\n ✔ Container prometheus  Started\n ✔ Container grafana     Started\n ✔ Container jaeger      Started'
  },
  {
    id: 'docker-dive-image',
    title: 'Explore Docker Image Layers & Waste with Dive',
    description: 'Interactive TUI analysis of Docker images showing wasted file space, layer efficiency, and duplicate files.',
    command: 'dive {{image}}',
    platforms: ['linux', 'macos'],
    category: 'docker',
    tags: ['dive', 'docker', 'image', 'layers', 'optimize', 'efficiency', 'size'],
    dangerLevel: 'safe',
    proTip: 'Add "CI=true dive {{image}}" to automate layer efficiency scoring inside CI/CD test gates.',
    params: [
      { name: 'image', label: 'Image Name', default: 'my-app:latest', placeholder: 'my-app:latest' }
    ],
    outputExample: 'Analyzing Image: my-app:latest\nEfficiency: 98 %\nWasted Bytes: 4.8 MB\nTotal Image size: 142 MB\n[Layer Details]\n- sha256:1a2b... 45 MB  RUN apt-get update && apt-get install -y --no-install-recommends ...\n- sha256:3c4d... 82 MB  COPY . .\n- sha256:5e6f... 15 MB  RUN npm run build && npm prune --production'
  },
  {
    id: 'docker-buildx-cache',
    title: 'Multi-Platform Build with Remote Inline Registry Cache',
    description: 'Builds images for amd64 and arm64 in parallel, caching intermediate layers directly in the remote container registry.',
    command: 'docker buildx build --platform linux/amd64,linux/arm64 --cache-to type=inline --cache-from type=registry,ref={{image}}:cache -t {{image}}:{{tag}} --push .',
    platforms: ['linux', 'macos'],
    category: 'docker',
    tags: ['docker', 'buildx', 'multiarch', 'arm64', 'amd64', 'cache', 'ci-cd'],
    dangerLevel: 'safe',
    proTip: 'Ensure you have initialized a docker-container builder driver with "docker buildx create --use".',
    params: [
      { name: 'image', label: 'Image Repository', default: 'ghcr.io/org/backend', placeholder: 'ghcr.io/org/backend' },
      { name: 'tag', label: 'Image Tag', default: 'v1.4.0', placeholder: 'v1.4.0' }
    ],
    outputExample: '[+] Building 14.8s (24/24) FINISHED\n => [linux/amd64 internal] load build definition from Dockerfile\n => [linux/arm64 internal] load build definition from Dockerfile\n => importing cache result from ghcr.io/org/backend:cache\n => pushing layers to ghcr.io/org/backend:v1.4.0\n => DONE'
  },
  {
    id: 'docker-cp-container',
    title: 'Copy Files In/Out of Running Container Without SSH',
    description: 'Transfers configuration files, database dumps, or diagnostic logs directly between host and container filesystem.',
    command: 'docker cp {{containerId}}:{{sourcePath}} {{destPath}}',
    platforms: ['all'],
    category: 'docker',
    tags: ['docker', 'cp', 'transfer', 'container', 'files', 'backup'],
    dangerLevel: 'safe',
    proTip: 'Works in both directions: swap sourcePath and destPath to copy local files into a running container.',
    params: [
      { name: 'containerId', label: 'Container ID / Name', default: 'redis-prod', placeholder: 'container-name' },
      { name: 'sourcePath', label: 'Container Path', default: '/data/dump.rdb', placeholder: '/path/in/container' },
      { name: 'destPath', label: 'Host Destination', default: './redis-backup.rdb', placeholder: './local-file' }
    ],
    outputExample: 'Successfully copied 14.2MB to ./redis-backup.rdb'
  },

  // ==========================================
  // OBSERVABILITY & SRE
  // ==========================================
  {
    id: 'strace-attach-pid',
    title: 'Trace Live System Calls & Network I/O of Process (strace)',
    description: 'Attaches to an active process ID and outputs all file descriptor operations, syscalls, and network sockets.',
    command: 'strace -p {{pid}} -f -e trace=network,file -s 256',
    platforms: ['linux'],
    category: 'observability',
    tags: ['strace', 'syscall', 'pid', 'debug', 'sre', 'kernel', 'trace'],
    dangerLevel: 'caution',
    proTip: 'Attach with "-t" or "-tt" to include microsecond-precision timestamps on each syscall.',
    params: [
      { name: 'pid', label: 'Target PID', default: '1428', placeholder: '1428' }
    ],
    outputExample: '[pid  1428] openat(AT_FDCWD, "/etc/resolv.conf", O_RDONLY|O_CLOEXEC) = 4\n[pid  1428] connect(4, {sa_family=AF_INET, sin_port=htons(53), sin_addr=inet_addr("127.0.0.53")}, 16) = 0\n[pid  1428] sendto(4, "\\322\\10\\1\\0\\0\\1\\0\\0\\0\\0\\0\\0\\4loop\\5brain\\2fr\\0\\0\\1\\0\\1", 31, MSG_NOSIGNAL, NULL, 0) = 31\n[pid  1428] recvfrom(4, "\\322\\10\\201\\200\\0\\1\\0\\1\\0\\0\\0\\0\\4loop\\5brain\\2fr\\0\\0\\1\\0\\1\\300\\f\\0\\1\\0\\1\\0\\0\\1,", 47, 0, NULL, NULL) = 47'
  },
  {
    id: 'strace-summary-profile',
    title: 'Profile System Call Execution Time and Frequency (strace -c)',
    description: 'Runs target command and displays tabular summary ranking syscalls by cumulative runtime, calls, and errors.',
    command: 'strace -c {{command}}',
    platforms: ['linux'],
    category: 'observability',
    tags: ['strace', 'profile', 'benchmark', 'syscall', 'sre', 'performance'],
    dangerLevel: 'safe',
    proTip: 'Add "-S time" to sort the summary table by total CPU time.',
    params: [
      { name: 'command', label: 'Command', default: 'curl -s https://loop.brain.fr', placeholder: 'curl -s ...' }
    ],
    outputExample: '% time     seconds  usecs/call     calls    errors syscall\n------ ----------- ----------- --------- --------- ----------------\n 42.10    0.012400         124       100           poll\n 28.50    0.008400          84       100           read\n 15.20    0.004480          32       140           write\n  8.10    0.002380         238        10         2 openat\n------ ----------- ----------- --------- --------- ----------------\n100.00    0.029460                   350         2 total'
  },
  {
    id: 'bpftrace-opensnoop',
    title: 'Trace Real-Time Kernel File Opens with eBPF bpftrace',
    description: 'Instruments the sys_enter_openat tracepoint via eBPF to monitor which files every process is opening system-wide.',
    command: 'bpftrace -e \'tracepoint:syscalls:sys_enter_openat { printf("%-6d %-16s %s\\n", pid, comm, str(args->filename)); }\'',
    platforms: ['linux'],
    category: 'observability',
    tags: ['bpftrace', 'ebpf', 'kernel', 'tracepoint', 'sre', 'observability', 'files'],
    dangerLevel: 'caution',
    proTip: 'Requires root or CAP_BPF capabilities. Generates near-zero overhead compared to traditional auditd.',
    outputExample: 'Attaching 1 probe...\nPID    COMM             FILENAME\n1240   systemd-resolved /etc/hosts\n1892   node             /app/dist/index.html\n1892   node             /app/node_modules/astro/package.json\n2410   sshd             /home/user/.ssh/authorized_keys'
  },
  {
    id: 'journalctl-failed-units',
    title: 'Inspect High-Priority Systemd Unit Failures Since Boot',
    description: 'Queries journald for emergency, alert, and error level logs across all system services for the current boot.',
    command: 'journalctl -p 3 -xb --no-pager',
    platforms: ['linux'],
    category: 'observability',
    tags: ['journalctl', 'systemd', 'errors', 'sre', 'troubleshooting', 'boot'],
    dangerLevel: 'safe',
    proTip: 'Priority level 3 filters for ERR, 2 for CRIT, 1 for ALERT, and 0 for EMERG.',
    outputExample: '-- Boot 5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d --\nSep 10 22:15:02 node-01 kernel: nvme0n1: Read(0x2) [0x00004a20] retry attempt 1\nSep 10 22:15:10 node-01 systemd[1]: Failed to start PostgreSQL Cluster 16-main.\nSep 10 22:15:10 node-01 postgresql@16-main[984]: 2026-09-10 22:15:10 UTC [984] FATAL: lock file "postmaster.pid" already exists'
  },
  {
    id: 'journalctl-json-tail',
    title: 'Stream Systemd Service Logs in Structured JSON',
    description: 'Follows active daemon logs formatted as structured JSON records, ideal for piping into jq or logging forwarders.',
    command: 'journalctl -u {{service}} -f -o json-pretty',
    platforms: ['linux'],
    category: 'observability',
    tags: ['journalctl', 'json', 'logs', 'systemd', 'stream', 'tail', 'sre'],
    dangerLevel: 'safe',
    proTip: 'Combine with "| jq \'.MESSAGE\'" to parse specific keys in real time.',
    params: [
      { name: 'service', label: 'Unit Name', default: 'docker', placeholder: 'docker' }
    ],
    outputExample: '{\n  "__CURSOR" : "s=39b8...;i=2c8;b=5a6b...",\n  "_SYSTEMD_UNIT" : "docker.service",\n  "MESSAGE" : "Loading containers: done.",\n  "PRIORITY" : "6",\n  "_PID" : "1104",\n  "_HOSTNAME" : "prod-srv-01",\n  "__REALTIME_TIMESTAMP" : "1789079410123456"\n}'
  },
  {
    id: 'perf-top-cpu',
    title: 'Sample CPU Cycles by Function with Hardware Counters (perf)',
    description: 'Real-time dynamic profiling of kernel and userspace functions consuming the highest proportion of CPU execution cycles.',
    command: 'perf top -F {{frequency}}',
    platforms: ['linux'],
    category: 'observability',
    tags: ['perf', 'cpu', 'profiling', 'sre', 'flamegraph', 'kernel', 'performance'],
    dangerLevel: 'caution',
    proTip: 'Use "-p {{pid}}" to profile an isolated misbehaving process rather than the whole system.',
    params: [
      { name: 'frequency', label: 'Sample Frequency (Hz)', default: '99', placeholder: '99' }
    ],
    outputExample: 'Samples: 14K of event \'cycles\', 4000 Hz, Event count (approx.): 298104820\nOverhead  Shared Object       Symbol\n  18.42%  vmlinux             [k] clear_page_erms\n   8.15%  node                [.] v8::internal::Scavenger::Process\n   5.20%  libc.so.6           [.] __memmove_avx_unaligned_erms\n   3.14%  vmlinux             [k] native_queued_spin_lock_slowpath'
  },
  {
    id: 'pidstat-io-metrics',
    title: 'Track Real-Time Disk Read/Write Bandwidth Per Process',
    description: 'Samples input/output rate (kB/s read, kB/s written) for each active thread, isolating I/O bottleneck processes.',
    command: 'pidstat -d {{interval}} {{count}}',
    platforms: ['linux'],
    category: 'observability',
    tags: ['pidstat', 'disk', 'io', 'iops', 'bandwidth', 'sre', 'metrics'],
    dangerLevel: 'safe',
    proTip: 'Combine with "iotop -o" for an interactive ncurses process disk activity monitor.',
    params: [
      { name: 'interval', label: 'Interval (seconds)', default: '2', placeholder: '2' },
      { name: 'count', label: 'Sample Count', default: '3', placeholder: '3' }
    ],
    outputExample: 'Linux 6.8.0 (node-01)   09/10/2026      _x86_64_        (8 CPU)\n\n22:30:10 UID       PID   kB_rd/s   kB_wr/s kB_ccwr/s iodelay  Command\n22:30:12 999       842      0.00   8420.00      0.00       2  postgres\n22:30:12 1000     1410   1240.00    210.00      0.00       0  node\n22:30:12 0        2109      0.00    512.00      0.00       1  kworker/u16:2'
  },
  {
    id: 'lsof-unlinked-deleted-files',
    title: 'Find Open Deleted Files Holding Disk Space Hostage',
    description: 'Identifies unlinked files whose link count is zero but whose disk blocks cannot be freed because a process keeps them open.',
    command: 'lsof +L1',
    platforms: ['linux', 'macos'],
    category: 'observability',
    tags: ['lsof', 'disk', 'storage', 'deleted', 'unlinked', 'fd', 'sre'],
    dangerLevel: 'safe',
    proTip: 'Restart the holding process (or truncate with : > /proc/<PID>/fd/<FD>) to instantly release storage.',
    outputExample: 'COMMAND   PID USER   FD   TYPE DEVICE   SIZE/OFF NLINK NODE NAME\nnginx    1420 root    4w   REG  259,2 1482019482     0 8421 /var/log/nginx/access.log (deleted)\njava     2811 app     7u   REG  259,2  524288000     0 9942 /tmp/hsperfdata_app/buffer.dat (deleted)'
  },
  {
    id: 'tcpdump-http-sniff',
    title: 'Sniff Plaintext HTTP GET/POST Request Headers and URIs',
    description: 'Captures live TCP port traffic and decodes packet payloads as readable ASCII to inspect HTTP headers and endpoints.',
    command: "tcpdump -A -s 0 'tcp port {{port}} and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:2]&0xf0)>>2)) != 0)' -i {{interface}}",
    platforms: ['linux'],
    category: 'observability',
    tags: ['tcpdump', 'http', 'packet', 'sniff', 'network', 'debug', 'sre'],
    dangerLevel: 'caution',
    proTip: 'Use "-w capture.pcap" instead of "-A" to save raw binary captures for analysis in Wireshark.',
    params: [
      { name: 'port', label: 'Port', default: '80', placeholder: '80' },
      { name: 'interface', label: 'Interface', default: 'eth0', placeholder: 'eth0' }
    ],
    outputExample: '22:31:04.120482 IP 192.168.1.50.48291 > 192.168.1.10.80: Flags [P.], seq 1:348, ack 1\n.GET /api/v1/health HTTP/1.1\nHost: api.internal\nUser-Agent: curl/8.5.0\nAccept: */*'
  },
  {
    id: 'curl-latency-breakdown',
    title: 'Sub-Millisecond HTTP Latency Breakdown (DNS, TLS, TTFB)',
    description: 'Queries a URL and outputs high-precision timing variables dissecting DNS lookup, TCP connect, SSL handshake, and TTFB.',
    command: 'curl -w "DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s | TTFB: %{time_starttransfer}s | Total: %{time_total}s\\n" -o /dev/null -s {{url}}',
    platforms: ['all'],
    category: 'observability',
    tags: ['curl', 'latency', 'ttfb', 'dns', 'tls', 'benchmark', 'sre', 'networking'],
    dangerLevel: 'safe',
    proTip: 'Add "-H \'Accept-Encoding: gzip\'" to verify compression latency impact.',
    params: [
      { name: 'url', label: 'Target URL', default: 'https://brain.fr', placeholder: 'https://...' }
    ],
    outputExample: 'DNS: 0.008124s | Connect: 0.024510s | TLS: 0.048912s | TTFB: 0.071204s | Total: 0.078410s'
  },

  // ==========================================
  // IAC & CLOUD CLI
  // ==========================================
  {
    id: 'tofu-plan-out',
    title: 'Generate & Save Immutable OpenTofu / Terraform Plan',
    description: 'Computes infrastructure delta against state and writes an immutable plan file artifact for automated CI apply.',
    command: 'tofu plan -out={{planFile}} -detailed-exitcode',
    platforms: ['all'],
    category: 'iac',
    tags: ['opentofu', 'terraform', 'iac', 'plan', 'cloud', 'devops'],
    dangerLevel: 'safe',
    proTip: 'Exit code 2 means diffs exist; exit code 0 means clean/no changes; exit code 1 means execution error.',
    params: [
      { name: 'planFile', label: 'Plan Artifact', default: 'tfplan.binary', placeholder: 'tfplan.binary' }
    ],
    outputExample: 'OpenTofu used the selected providers to generate the following execution plan:\n  + aws_security_group_rule.allow_https\n\nPlan: 1 to add, 0 to change, 0 to destroy.\nSaved plan to: tfplan.binary'
  },
  {
    id: 'terraform-state-list',
    title: 'List All Tracked Resources in Remote State Backend',
    description: 'Enumerates addresses of every managed infrastructure resource without making slow API calls to cloud providers.',
    command: 'terraform state list',
    platforms: ['all'],
    category: 'iac',
    tags: ['terraform', 'opentofu', 'state', 'iac', 'cloud', 'aws'],
    dangerLevel: 'safe',
    proTip: 'Follow up with "terraform state show <address>" to view exact attributes of any individual resource.',
    outputExample: 'aws_iam_role.ecs_execution_role\naws_route53_record.app_domain\naws_s3_bucket.static_assets\nmodule.vpc.aws_subnet.private[0]\nmodule.vpc.aws_subnet.private[1]\nmodule.vpc.aws_vpc.main'
  },
  {
    id: 'terraform-target-apply',
    title: 'Targeted Terraform Apply for Single Isolated Resource',
    description: 'Executes planned modifications exclusively against a specific cloud resource or submodule, bypassing the full dependency tree.',
    command: 'terraform apply -target={{resource}} -auto-approve',
    platforms: ['all'],
    category: 'iac',
    tags: ['terraform', 'target', 'apply', 'iac', 'cloud'],
    dangerLevel: 'caution',
    proTip: 'Use sparingly during emergencies; targeting can cause configuration drift if dependencies are skipped.',
    params: [
      { name: 'resource', label: 'Resource Address', default: 'module.database.aws_db_instance.primary', placeholder: 'aws_instance.web' }
    ],
    outputExample: 'module.database.aws_db_instance.primary: Modifying... [id=db-prod-primary]\nmodule.database.aws_db_instance.primary: Still modifying... [10s elapsed]\nmodule.database.aws_db_instance.primary: Modifications complete after 18s\n\nApply complete! Resources: 0 added, 1 changed, 0 destroyed.'
  },
  {
    id: 'ansible-dryrun-diff',
    title: 'Dry-Run Ansible Playbook with Unified Configuration Diffs',
    description: 'Executes tasks in check mode without mutating remote hosts, outputting colored diffs of pending template and config changes.',
    command: 'ansible-playbook {{playbook}} -i {{inventory}} --check --diff',
    platforms: ['linux', 'macos'],
    category: 'iac',
    tags: ['ansible', 'playbook', 'diff', 'dry-run', 'automation', 'devops'],
    dangerLevel: 'safe',
    proTip: 'Add "--limit {{host}}" to restrict testing to a single canary node in your inventory.',
    params: [
      { name: 'playbook', label: 'Playbook', default: 'site.yml', placeholder: 'site.yml' },
      { name: 'inventory', label: 'Inventory File', default: 'production.ini', placeholder: 'hosts.ini' }
    ],
    outputExample: 'TASK [nginx : update server configuration] *************************************\n--- before: /etc/nginx/nginx.conf\n+++ after: /root/.ansible/tmp/nginx.conf\n@@ -14,3 +14,3 @@\n-    worker_connections 768;\n+    worker_connections 4096;\n\nchanged: [web-srv-01]\n\nPLAY RECAP *********************************************************************\nweb-srv-01                 : ok=12   changed=1    unreachable=0    failed=0'
  },
  {
    id: 'aws-sts-identity',
    title: 'Verify Active AWS IAM Role, Account ID, and Identity',
    description: 'Validates exported AWS credentials and confirms active Account ID, IAM ARN, and assumed session role.',
    command: 'aws sts get-caller-identity --output table',
    platforms: ['all'],
    category: 'iac',
    tags: ['aws', 'iam', 'sts', 'cloud', 'security', 'identity'],
    dangerLevel: 'safe',
    proTip: 'In shell scripts, extract just the 12-digit Account ID with "--query Account --output text".',
    outputExample: '-------------------------------------------------------------------------------------------------------------------------\n|                                                   GetCallerIdentity                                                   |\n+--------------+-------------------------------------------------------------+------------------------------------------+\n|   Account    |                            Arn                              |                  UserId                  |\n+--------------+-------------------------------------------------------------+------------------------------------------+\n| 123456789012 | arn:aws:sts::123456789012:assumed-role/DevOpsAdmin/session  | AROAEXAMPLE123456789:session             |\n+--------------+-------------------------------------------------------------+------------------------------------------+'
  },
  {
    id: 'aws-ssm-session',
    title: 'Open Secure Shell into Private EC2 via AWS Systems Manager',
    description: 'Establishes encrypted interactive bash terminal into private EC2 instance without open ingress ports or SSH keys.',
    command: 'aws ssm start-session --target {{instanceId}}',
    platforms: ['all'],
    category: 'iac',
    tags: ['aws', 'ssm', 'ec2', 'ssh', 'terminal', 'session-manager', 'cloud'],
    dangerLevel: 'safe',
    proTip: 'Requires the AWS Session Manager Plugin and SSM agent installed on the target AMI.',
    params: [
      { name: 'instanceId', label: 'Instance ID', default: 'i-0a1b2c3d4e5f67890', placeholder: 'i-0123456789abcdef0' }
    ],
    outputExample: 'Starting session with SessionId: bot-user-0f81d4e2194\nsh-5.2$ id\nuid=1001(ssm-user) gid=1001(ssm-user) groups=1001(ssm-user),27(sudo)\nsh-5.2$ hostname\nip-10-0-4-82.eu-west-3.compute.internal'
  },
  {
    id: 'aws-ecr-login',
    title: 'Authenticate Docker Daemon Against AWS ECR Registry',
    description: 'Generates ephemeral OAuth token and authenticates local Docker daemon to push/pull from private Elastic Container Registry.',
    command: 'aws ecr get-login-password --region {{region}} | docker login --username AWS --password-stdin {{accountId}}.dkr.ecr.{{region}}.amazonaws.com',
    platforms: ['all'],
    category: 'iac',
    tags: ['aws', 'ecr', 'docker', 'registry', 'auth', 'devops'],
    dangerLevel: 'safe',
    proTip: 'The generated ECR token is valid for 12 hours before re-authentication is required.',
    params: [
      { name: 'region', label: 'AWS Region', default: 'eu-west-3', placeholder: 'eu-west-3' },
      { name: 'accountId', label: 'Account ID', default: '123456789012', placeholder: '123456789012' }
    ],
    outputExample: 'Login Succeeded'
  },
  {
    id: 'gh-run-watch',
    title: 'Watch Live GitHub Actions Workflow Run in Terminal',
    description: 'Tails active CI/CD workflow run in real-time, reporting job steps, failures, and execution duration.',
    command: 'gh run watch {{runId}}',
    platforms: ['all'],
    category: 'iac',
    tags: ['gh', 'github-actions', 'ci-cd', 'watch', 'devops', 'automation'],
    dangerLevel: 'safe',
    proTip: 'Run "gh run list" to pick the latest run ID interactively.',
    params: [
      { name: 'runId', label: 'Workflow Run ID', default: '984128912', placeholder: 'run-id' }
    ],
    outputExample: '✓ lint in 18s\n✓ test (nodejs 20) in 42s\n- build and push docker image\n  * checkout repository ... done (2s)\n  * buildx setup ... done (4s)\n  * docker build & push ... running (32s)'
  },
  {
    id: 'gh-pr-checkout',
    title: 'Check Out Pull Request Locally with GitHub CLI',
    description: 'Fetches PR branch, switches working directory, and sets upstream tracking automatically.',
    command: 'gh pr checkout {{prNumber}}',
    platforms: ['all'],
    category: 'iac',
    tags: ['gh', 'github', 'git', 'pr', 'review', 'collaboration'],
    dangerLevel: 'safe',
    proTip: 'Works with PR URL or branch name as well as integer PR numbers.',
    params: [
      { name: 'prNumber', label: 'Pull Request Number', default: '42', placeholder: '42' }
    ],
    outputExample: 'Switched to branch \'feature/devsecops-catalog\'\nYour branch is up to date with \'origin/feature/devsecops-catalog\'.'
  },

  // ==========================================
  // AI & AGENT CLI
  // ==========================================
  {
    id: 'ollama-run-local',
    title: 'Launch Local Open-Weights LLM in Terminal',
    description: 'Runs quantized language model with local GPU or Apple Metal hardware acceleration in an interactive REPL.',
    command: 'ollama run {{model}}',
    platforms: ['linux', 'macos', 'windows'],
    category: 'ai-tooling',
    tags: ['ollama', 'llm', 'ai', 'local-ai', 'agent', 'model'],
    dangerLevel: 'safe',
    proTip: 'Add "OLLAMA_NUM_PARALLEL=4" when starting the Ollama server to handle concurrent agent tool calls.',
    params: [
      { name: 'model', label: 'Model Tag', default: 'llama3.2:3b', placeholder: 'llama3.2:3b' }
    ],
    outputExample: 'pulling manifest\nverifying sha256 digest\nwriting manifest\nsuccess\n>>> Send a message (/? for help)'
  },
  {
    id: 'ollama-ps-vram',
    title: 'List Active Models and GPU VRAM Allocation (ollama ps)',
    description: 'Displays all currently resident language models loaded in memory, context sizes, and VRAM utilization.',
    command: 'ollama ps',
    platforms: ['linux', 'macos', 'windows'],
    category: 'ai-tooling',
    tags: ['ollama', 'vram', 'gpu', 'memory', 'ai', 'metrics'],
    dangerLevel: 'safe',
    proTip: 'Models remain loaded for 5 minutes of idle time by default before memory is reclaimed.',
    outputExample: 'NAME            ID              SIZE      PROCESSOR    UNTIL\nllama3.2:3b     a80c4f172edd    2.0 GB    100% GPU     4 minutes from now\nqwen2.5-coder   2b05b4883138    4.7 GB    100% GPU     2 minutes from now'
  },
  {
    id: 'uv-pip-compile',
    title: 'Compile Fast Deterministic Python Lockfile with uv',
    description: 'Resolves Python dependency graph and emits strict cryptographically hashed requirements file 10-100x faster than pip-compile.',
    command: 'uv pip compile {{requirementsIn}} -o {{requirementsTxt}}',
    platforms: ['all'],
    category: 'ai-tooling',
    tags: ['uv', 'python', 'pip', 'lockfile', 'dependencies', 'agent'],
    dangerLevel: 'safe',
    proTip: 'Pass "--generate-hashes" for strict supply-chain tamper verification in production containers.',
    params: [
      { name: 'requirementsIn', label: 'Input Manifest', default: 'pyproject.toml', placeholder: 'pyproject.toml' },
      { name: 'requirementsTxt', label: 'Output Lockfile', default: 'requirements.txt', placeholder: 'requirements.txt' }
    ],
    outputExample: 'Resolved 42 packages in 38ms\nPrepared 42 packages in 84ms\nInstalled 42 packages in 12ms\nWritten requirements.txt with 42 pinned packages.'
  },
  {
    id: 'uv-run-ephemeral',
    title: 'Run Python Script with Ephemeral Isolated Dependencies',
    description: 'Executes Python code in an isolated on-the-fly virtualenv with requested packages without installing globally.',
    command: 'uv run --with {{packages}} {{script}}',
    platforms: ['all'],
    category: 'ai-tooling',
    tags: ['uv', 'python', 'ephemeral', 'script', 'agent', 'automation'],
    dangerLevel: 'safe',
    proTip: 'Combine with "--python 3.12" to test against specific interpreter versions instantly.',
    params: [
      { name: 'packages', label: 'Pip Packages', default: 'httpx,pydantic', placeholder: 'package1,package2' },
      { name: 'script', label: 'Script Path', default: 'main.py', placeholder: 'script.py' }
    ],
    outputExample: 'Creating virtualenv at: /root/.cache/uv/environments-ephemeral/9fa2...\nInstalled 2 packages in 24ms\n✓ Script execution completed in 0.32s'
  },
  {
    id: 'huggingface-download',
    title: 'Download Model Weights or GGUF Quantization via CLI',
    description: 'Downloads model checkpoints, tokenizer definitions, or quantized GGUFs directly from Hugging Face Hub with resumable chunks.',
    command: 'huggingface-cli download {{repoId}} {{filename}} --local-dir {{localDir}}',
    platforms: ['all'],
    category: 'ai-tooling',
    tags: ['huggingface', 'model', 'gguf', 'download', 'ai', 'llm'],
    dangerLevel: 'safe',
    proTip: 'Set HF_HUB_ENABLE_HF_TRANSFER=1 for multi-gigabit saturating download speeds.',
    params: [
      { name: 'repoId', label: 'Repository ID', default: 'bartowski/Llama-3.2-3B-Instruct-GGUF', placeholder: 'org/model' },
      { name: 'filename', label: 'File Name', default: 'Llama-3.2-3B-Instruct-Q4_K_M.gguf', placeholder: 'model.gguf' },
      { name: 'localDir', label: 'Local Directory', default: './models', placeholder: './models' }
    ],
    outputExample: 'Downloading Llama-3.2-3B-Instruct-Q4_K_M.gguf: 100%|██████████| 2.02G/2.02G [00:12<00:00, 168MB/s]\nSuccessfully downloaded file to ./models/Llama-3.2-3B-Instruct-Q4_K_M.gguf'
  },
  {
    id: 'curl-llm-stream',
    title: 'Stream Chat Completion API Tokens via curl',
    description: 'Streams tokens directly from any OpenAI-compatible API endpoint (Ollama, vLLM, DeepSeek, OpenAI) via SSE in terminal.',
    command: 'curl -s -N {{endpoint}}/v1/chat/completions -H "Authorization: Bearer {{apiKey}}" -H "Content-Type: application/json" -d \'{"model":"{{model}}","messages":[{"role":"user","content":"{{prompt}}"}],"stream":true}\'',
    platforms: ['all'],
    category: 'ai-tooling',
    tags: ['curl', 'llm', 'stream', 'openai', 'api', 'sse', 'ai-agent'],
    dangerLevel: 'safe',
    proTip: 'Use with jq or awk to strip the SSE "data: " prefix and format live token output in real-time.',
    params: [
      { name: 'endpoint', label: 'API Endpoint', default: 'http://localhost:11434', placeholder: 'http://localhost:11434' },
      { name: 'apiKey', label: 'API Key', default: 'ollama', placeholder: 'sk-...' },
      { name: 'model', label: 'Model Name', default: 'llama3.2', placeholder: 'llama3.2' },
      { name: 'prompt', label: 'User Prompt', default: 'Explain zero-downtime deployments in 2 sentences', placeholder: 'Hello...' }
    ],
    outputExample: 'data: {"choices":[{"delta":{"content":"Zero"}}]}\ndata: {"choices":[{"delta":{"content":"-downtime"}}]}\ndata: {"choices":[{"delta":{"content":" deployments"}}]}\ndata: [DONE]'
  },

  // ==========================================
  // GIT SUPERPOWERS
  // ==========================================
  {
    id: 'git-worktree-add',
    title: 'Create Independent Worktree for Parallel Feature Branch',
    description: 'Checks out a branch into a separate filesystem directory without disturbing your current working copy.',
    command: 'git worktree add ../{{dirName}} {{branch}}',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'worktree', 'branch', 'parallel', 'multitask'],
    dangerLevel: 'safe',
    proTip: 'Remove an abandoned worktree cleanly with "git worktree remove ../{{dirName}}".',
    params: [
      { name: 'dirName', label: 'New Folder', default: 'cmds-hotfix', placeholder: 'folder-name' },
      { name: 'branch', label: 'Branch Name', default: 'hotfix/v1.0.1', placeholder: 'branch-name' }
    ],
    outputExample: 'Preparing worktree (checking out \'hotfix/v1.0.1\')\nHEAD is now at 867a140 fix: stabilize terminal preview height'
  },
  {
    id: 'git-worktree-list',
    title: 'List All Active Linked Git Worktrees',
    description: 'Lists all directory paths, commit hashes, and checked out branch names attached to the repository.',
    command: 'git worktree list',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'worktree', 'list', 'status'],
    dangerLevel: 'safe',
    outputExample: '/workspace/cmds         867a140 [main]\n/workspace/cmds-hotfix  867a140 [hotfix/v1.0.1]'
  },
  {
    id: 'git-bisect-run',
    title: 'Automate Binary Bug Search via Test Script (git bisect)',
    description: 'Performs automated binary search across git commits, running a test command on each commit until the regression is isolated.',
    command: 'git bisect start {{badCommit}} {{goodCommit}} && git bisect run {{testCommand}}',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'bisect', 'debug', 'regression', 'automation', 'test'],
    dangerLevel: 'caution',
    proTip: 'When finished, return HEAD to the original branch with "git bisect reset".',
    params: [
      { name: 'badCommit', label: 'Bad Commit', default: 'HEAD', placeholder: 'HEAD' },
      { name: 'goodCommit', label: 'Known Good Commit', default: 'v1.0.0', placeholder: 'v1.0.0' },
      { name: 'testCommand', label: 'Test Command', default: 'npm test', placeholder: 'npm test' }
    ],
    outputExample: 'Bisecting: 6 revisions left to test after this (roughly 3 steps)\nrunning \'npm test\'\n...\nc4d12ef is the first bad commit\ncommit c4d12ef38914bca99281a052b801\nAuthor: Dev <dev@brain.fr>\nDate:   Wed Sep 9 14:20:00 2026 +0200'
  },
  {
    id: 'git-cherry-pick-range',
    title: 'Cherry-Pick Range of Consecutive Commits Onto Branch',
    description: 'Applies an ordered sequential commit range from an upstream branch onto current HEAD.',
    command: 'git cherry-pick {{startCommit}}^..{{endCommit}}',
    platforms: ['all'],
    category: 'git',
    tags: ['git', 'cherry-pick', 'range', 'commits', 'rebase'],
    dangerLevel: 'caution',
    proTip: 'The "^" on startCommit ensures the starting commit itself is included in the applied range.',
    params: [
      { name: 'startCommit', label: 'Start Commit SHA', default: 'a1b2c3d', placeholder: 'a1b2c3d' },
      { name: 'endCommit', label: 'End Commit SHA', default: 'e5f6a7b', placeholder: 'e5f6a7b' }
    ],
    outputExample: '[main 7f81a2b] feat: add observability SRE commands\n Author: Team Brain <team@brain.fr>\n 2 files changed, 140 insertions(+)\n[main 9c04d11] feat: add IaC cloud automation recipes\n Author: Team Brain <team@brain.fr>\n 2 files changed, 210 insertions(+)'
  },

  // ==========================================
  // SYSTEM & NETWORK HARDENING
  // ==========================================
  {
    id: 'openssl-verify-cert-chain',
    title: 'Inspect Remote SSL/TLS Certificate Expiration & SANs',
    description: 'Connects directly to remote endpoint via TLS, parsing the x509 certificate chain, expiry timestamp, and issuer CN.',
    command: 'openssl s_client -connect {{host}}:443 -servername {{host}} -showcerts </dev/null 2>/dev/null | openssl x509 -noout -dates -subject -issuer',
    platforms: ['all'],
    category: 'security',
    tags: ['openssl', 'ssl', 'tls', 'certificate', 'expiration', 'x509', 'security'],
    dangerLevel: 'safe',
    proTip: 'Add "-ext subjectAltName" to view all configured wildcard and multi-domain SANs.',
    params: [
      { name: 'host', label: 'Hostname', default: 'loop.brain.fr', placeholder: 'example.com' }
    ],
    outputExample: 'notBefore=Aug 15 00:00:00 2026 GMT\nnotAfter=Nov 13 23:59:59 2026 GMT\nsubject=CN = loop.brain.fr\nissuer=C = US, O = Let\'s Encrypt, CN = R10'
  },
  {
    id: 'ssh-socks5-proxy',
    title: 'Spawn Dynamic Encrypted SOCKS5 Proxy via SSH',
    description: 'Establishes local SOCKS5 proxy port routing outbound agent or browser traffic through remote jump host.',
    command: 'ssh -D {{localPort}} -q -C -N {{user}}@{{host}}',
    platforms: ['linux', 'macos'],
    category: 'security',
    tags: ['ssh', 'socks5', 'proxy', 'tunnel', 'network', 'vpn'],
    dangerLevel: 'safe',
    proTip: 'Combine with curl using "--socks5-hostname 127.0.0.1:{{localPort}}" to proxy outbound HTTP requests.',
    params: [
      { name: 'localPort', label: 'Local Port', default: '1080', placeholder: '1080' },
      { name: 'user', label: 'SSH User', default: 'deploy', placeholder: 'deploy' },
      { name: 'host', label: 'Remote Bastion', default: 'bastion.brain.fr', placeholder: 'bastion.domain' }
    ],
    outputExample: '[SOCKS5 tunnel active on 127.0.0.1:1080]'
  },
  {
    id: 'rsync-checksum-throttle',
    title: 'Bandwidth-Throttled Sync with Real MD5/SHA Checksums',
    description: 'Transfers directories over network with cryptographic content comparison, partial resume, and bandwidth cap.',
    command: 'rsync -avzhP --checksum --bwlimit={{kbps}} {{source}} {{destination}}',
    platforms: ['linux', 'macos'],
    category: 'filesystem',
    tags: ['rsync', 'checksum', 'throttle', 'sync', 'backup', 'files'],
    dangerLevel: 'safe',
    proTip: 'Use "--dry-run" first to verify exact file list before writing changes.',
    params: [
      { name: 'kbps', label: 'Bandwidth Limit (KB/s)', default: '5000', placeholder: '5000' },
      { name: 'source', label: 'Source Directory', default: './backups/', placeholder: './source/' },
      { name: 'destination', label: 'Destination', default: 'backup-user@srv-backup:/storage/backups/', placeholder: 'user@host:/dest/' }
    ],
    outputExample: 'sending incremental file list\ndatabase_dump.sql.gz\n     48.21M 100%    4.88MB/s    0:00:09 (xfr#1, to-chk=0/1)\n\nsent 48.23M bytes  received 35 bytes  4.59M bytes/sec\ntotal size is 48.21M  speedup is 1.00'
  },
  {
    id: 'systemd-analyze-blame',
    title: 'Profile Boot Performance & Slowest Systemd Services',
    description: 'Ranks initializing systemd services by startup duration to identify OS boot bottlenecks and delayed daemons.',
    command: 'systemd-analyze blame | head -n 15',
    platforms: ['linux'],
    category: 'system',
    tags: ['systemd', 'boot', 'performance', 'blame', 'profile', 'sre'],
    dangerLevel: 'safe',
    outputExample: '9.421s docker.service\n4.120s containerd.service\n2.810s cloud-init.service\n1.420s systemd-udev-settle.service\n0.980s networking.service'
  }
];

COMMANDS.push(...DEVOPS_EXPANSION_COMMANDS);

