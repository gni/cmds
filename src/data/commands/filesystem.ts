import type { TerminalCommand } from "../types";

/**
 * Files & Storage (📁)
 * Search, disk cleanup, batch rename, archiving, rsync checksums, and permissions.
 */
export const filesystemCommands: TerminalCommand[] = [
  {
    id: "find-modified-recently",
    title: "Find Files Modified in Last 24 Hours",
    description: "Scans directory tree for files created or modified within the last N days or minutes.",
    command: "find {{directory}} -type f -mtime -{{days}}",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["find", "mtime", "modified", "recent", "files"],
    dangerLevel: "safe",
    proTip: "Use \"-mmin -60\" instead of \"-mtime\" to search for changes within the last 60 minutes.",
    params: [
      { name: "directory", label: "Directory", default: ".", placeholder: "." },
      { name: "days", label: "Days", default: "1", placeholder: "1" }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "Get-ChildItem -Path {{directory}} -Recurse -File | Where-Object { $_.LastWriteTime -ge (Get-Date).AddDays(-{{days}}) }",
        note: "PowerShell"
      }
    ]
  },
  {
    id: "purge-node-modules",
    title: "Recursively Delete All node_modules / Temp Dirs",
    description: "Reclaims tens of gigabytes by safely finding and deleting build or dependency folders across your projects.",
    command: "find {{directory}} -name \"node_modules\" -type d -prune -exec rm -rf '{}' +",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["node_modules", "clean", "rm", "disk", "purge"],
    dangerLevel: "caution",
    proTip: "Using -prune prevents find from descending into the node_modules folder itself, speeding it up 10x.",
    params: [
      { name: "directory", label: "Directory", default: ".", placeholder: "~/code" }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "Get-ChildItem -Path {{directory}} -Recurse -Directory -Filter \"node_modules\" | Remove-Item -Recurse -Force",
        note: "PowerShell"
      }
    ]
  },
  {
    id: "rsync-backup-sync",
    title: "Sync Directories with Resume & Progress",
    description: "The golden standard for file mirroring with delta transfer, permissions preservation, and resume capability.",
    command: "rsync -avzP --delete {{source}}/ {{destination}}/",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["rsync", "backup", "mirror", "sync", "transfer"],
    dangerLevel: "caution",
    proTip: "Trailing slashes matter: \"source/\" copies folder contents, while \"source\" copies the folder itself.",
    params: [
      {
        name: "source",
        label: "Source Path",
        default: "./project",
        placeholder: "/path/to/src"
      },
      {
        name: "destination",
        label: "Destination Path",
        default: "/mnt/backup/project",
        placeholder: "/path/to/dest"
      }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "robocopy {{source}} {{destination}} /MIR /MT:16 /Z /R:2 /W:5",
        note: "High speed multi-threaded Windows robocopy"
      }
    ]
  },
  {
    id: "compress-zstd-tar",
    title: "Ultra-Fast Compression with Zstandard / Gzip",
    description: "Creates a modern, multi-threaded high compression archive faster than standard zip.",
    command: "tar --zstd -cvf {{archiveName}}.tar.zst {{sourceDir}}",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["tar", "zstd", "compress", "archive", "fast"],
    dangerLevel: "safe",
    proTip: "Zstandard compresses 5x faster than gzip with higher compression ratios. Fallback to \"tar -czvf {{archiveName}}.tar.gz {{sourceDir}}\".",
    params: [
      {
        name: "archiveName",
        label: "Archive Base Name",
        default: "backup_2026",
        placeholder: "backup"
      },
      {
        name: "sourceDir",
        label: "Folder to Compress",
        default: "./data",
        placeholder: "folder"
      }
    ]
  },
  {
    id: "extract-any-archive",
    title: "Universal Tar Extraction",
    description: "Auto-detects compression algorithm (gz, bz2, xz, zst) and extracts archive into destination folder.",
    command: "tar -xvf {{archiveFile}} -C {{destDir}}",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["tar", "extract", "unzip", "unpack", "archive"],
    dangerLevel: "safe",
    proTip: "Modern GNU/BSD tar automatically identifies decompression format from magic bytes without needing -z or -j.",
    params: [
      {
        name: "archiveFile",
        label: "Archive File",
        default: "bundle.tar.gz",
        placeholder: "archive.tar.gz"
      },
      { name: "destDir", label: "Target Directory", default: ".", placeholder: "./extracted" }
    ]
  },
  {
    id: "shred-secure-delete",
    title: "Securely Overwrite and Erase Sensitive File",
    description: "Overwrites file contents multiple times with random data and zeros before unlinking to prevent data recovery.",
    command: "shred -u -z -n 3 {{filePath}}",
    platforms: ["linux"],
    category: "filesystem",
    tags: ["shred", "secure", "delete", "privacy", "wipe"],
    dangerLevel: "dangerous",
    proTip: "-u removes the file after overwriting, -z hides shredding by zero-filling, and -n 3 performs 3 passes.",
    params: [
      {
        name: "filePath",
        label: "File to Shred",
        default: "secret.key",
        placeholder: "secret.key"
      }
    ],
    alternatives: [
      {
        platform: "macos",
        command: "rm -P {{filePath}}",
        note: "macOS BSD rm 3-pass overwrite"
      },
      {
        platform: "windows",
        command: "cipher /w:{{filePath}}",
        note: "Windows native secure wiper"
      }
    ]
  },
  {
    id: "file-chmod-recursive-dirs-files",
    title: "Fix File & Directory Permissions Separately",
    description: "Applies 755 to directories and 644 to files recursively without breaking execute bit on directories.",
    command: "find {{directory}} -type d -exec chmod 755 {} + && find {{directory}} -type f -exec chmod 644 {} +",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["chmod", "permissions", "755", "644", "fix"],
    dangerLevel: "caution",
    proTip: "Never run \"chmod -R 777\"! Use this standard split for web servers and project repos.",
    params: [
      {
        name: "directory",
        label: "Target Directory",
        default: "./public",
        placeholder: "/var/www"
      }
    ]
  },
  {
    id: "dd-create-dummy-file",
    title: "Generate Exact Size Test File Instantly",
    description: "Creates a dummy file filled with zero bytes of precise size for testing uploads or disk quotas.",
    command: "dd if=/dev/zero of={{filename}} bs=1M count={{sizeMB}} status=progress",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["dd", "dummy", "file", "size", "test"],
    dangerLevel: "safe",
    params: [
      {
        name: "filename",
        label: "Target Filename",
        default: "dummy_100MB.dat",
        placeholder: "test.dat"
      },
      { name: "sizeMB", label: "Size (Megabytes)", default: "100", placeholder: "500" }
    ],
    alternatives: [
      {
        platform: "windows",
        command: "fsutil file createnew {{filename}} {{sizeMB}}000000",
        note: "Windows fsutil"
      }
    ]
  },
  {
    id: "chown-user-recursive",
    title: "Take Recursive Ownership of Directory",
    description: "Transfers ownership of all files and subdirectories to the currently logged in user.",
    command: "sudo chown -R $USER:$USER {{directory}}",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["chown", "permissions", "owner", "sudo"],
    dangerLevel: "caution",
    params: [
      {
        name: "directory",
        label: "Target Directory",
        default: "./project",
        placeholder: "/path"
      }
    ]
  },
  {
    id: "rsync-checksum-throttle",
    title: "Bandwidth-Throttled Sync with Real MD5/SHA Checksums",
    description: "Transfers directories over network with cryptographic content comparison, partial resume, and bandwidth cap.",
    command: "rsync -avzhP --checksum --bwlimit={{kbps}} {{source}} {{destination}}",
    platforms: ["linux", "macos"],
    category: "filesystem",
    tags: ["rsync", "checksum", "throttle", "sync", "backup", "files"],
    dangerLevel: "safe",
    proTip: "Use \"--dry-run\" first to verify exact file list before writing changes.",
    params: [
      { name: "kbps", label: "Bandwidth Limit (KB/s)", default: "5000", placeholder: "5000" },
      {
        name: "source",
        label: "Source Directory",
        default: "./backups/",
        placeholder: "./source/"
      },
      {
        name: "destination",
        label: "Destination",
        default: "backup-user@srv-backup:/storage/backups/",
        placeholder: "user@host:/dest/"
      }
    ],
    outputExample: "sending incremental file list\ndatabase_dump.sql.gz\n     48.21M 100%    4.88MB/s    0:00:09 (xfr#1, to-chk=0/1)\n\nsent 48.23M bytes  received 35 bytes  4.59M bytes/sec\ntotal size is 48.21M  speedup is 1.00"
  }
];
