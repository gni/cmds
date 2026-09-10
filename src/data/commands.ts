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
