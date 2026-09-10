import type { TerminalCommand } from "../types";

/**
 * Docker & Containers (🐳)
 * Prune dangling resources, container inspect, live stats stream, builder cache, and compose profiles.
 */
export const dockerCommands: TerminalCommand[] = [
  {
    id: "docker-clean-all",
    title: "Nuke All Unused Docker Objects",
    description: "Reclaims massive disk space by removing all stopped containers, unused networks, dangling images, and build cache.",
    command: "docker system prune -af --volumes",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "clean", "prune", "disk", "cache", "containers"],
    dangerLevel: "dangerous",
    proTip: "WARNING: The --volumes flag wipes persistent volumes not attached to running containers! Drop --volumes to keep database data safe.",
    outputExample: "Total reclaimed space: 18.42GB"
  },
  {
    id: "docker-stats-live",
    title: "Live Container Resource Consumption Table",
    description: "Formatted real-time monitor showing CPU, Memory usage, Net I/O, and limits per running container.",
    command: "docker stats --format \"table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}\"",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "stats", "monitor", "cpu", "memory"],
    dangerLevel: "safe",
    proTip: "Add \"--no-stream\" if you want a single snapshot instead of continuous live updating.",
    outputExample: "NAME          CPU %     MEM USAGE / LIMIT     NET I/O\napi-gateway   0.45%     142MiB / 7.68GiB      12.4MB / 8.2MB\npostgres-db   1.12%     580MiB / 7.68GiB      45.1MB / 92.4MB"
  },
  {
    id: "docker-exec-interactive",
    title: "Jump into Running Container Shell",
    description: "Spawns an interactive bash or sh shell inside any running Docker container.",
    command: "docker exec -it {{container}} /bin/sh",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "exec", "shell", "bash", "debug"],
    dangerLevel: "safe",
    proTip: "If /bin/sh is too minimal and bash is installed in the image, change /bin/sh to /bin/bash.",
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
    id: "docker-container-ip",
    title: "Extract Container Internal IP Address",
    description: "Inspects bridge network configuration and prints the container IP without parsing json manually.",
    command: "docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' {{container}}",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "ip", "network", "inspect"],
    dangerLevel: "safe",
    params: [
      {
        name: "container",
        label: "Container ID/Name",
        default: "my-app",
        placeholder: "container_name"
      }
    ],
    outputExample: "172.18.0.4"
  },
  {
    id: "docker-compose-stream-logs",
    title: "Stream Tail Compose Logs with Timestamps",
    description: "Follows real-time logs of a specific Docker Compose service with high-resolution ISO timestamps.",
    command: "docker compose logs -f --tail=100 -t {{service}}",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "compose", "logs", "tail", "stream"],
    dangerLevel: "safe",
    proTip: "Omit {{service}} to stream merged logs from all containers in the compose file.",
    params: [
      { name: "service", label: "Service Name", default: "web", placeholder: "api or db" }
    ]
  },
  {
    id: "docker-compose-rebuild-force",
    title: "Force Rebuild and Restart Compose Stack",
    description: "Rebuilds Docker images without cache and re-spawns container stack in detached mode.",
    command: "docker compose down && docker compose build --no-cache && docker compose up -d",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "compose", "rebuild", "cache", "deploy"],
    dangerLevel: "caution",
    proTip: "Guarantees that new package dependencies and environmental Dockerfile changes are cleanly compiled."
  },
  {
    id: "docker-run-detached-port",
    title: "Spin Up Detached Container with Port Mapping",
    description: "Launches a Docker container in the background with exposed host port and restart policy.",
    command: "docker run -d --name {{name}} -p {{hostPort}}:{{containerPort}} --restart unless-stopped {{image}}",
    platforms: ["all"],
    category: "docker",
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
    id: "docker-buildx-multiarch",
    title: "Build Multi-Arch Docker Image (AMD64 & ARM64)",
    description: "Builds and pushes images natively compatible with both Intel/AMD servers and Apple Silicon / AWS Graviton.",
    command: "docker buildx build --platform linux/amd64,linux/arm64 -t {{tag}} --push .",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "buildx", "multiarch", "arm64", "amd64"],
    dangerLevel: "safe",
    params: [
      {
        name: "tag",
        label: "Image Tag",
        default: "registry.hub.docker.com/user/app:v1",
        placeholder: "repo/app:latest"
      }
    ]
  },
  {
    id: "docker-compose-profile",
    title: "Run Docker Compose Stack with Specific Service Profiles",
    description: "Selectively starts services associated with a specific operational profile (e.g. monitoring, test, staging).",
    command: "docker compose --profile {{profile}} up -d --build",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "compose", "profile", "microservices", "build"],
    dangerLevel: "safe",
    proTip: "Use \"--profile *\" to activate all defined profiles at once.",
    params: [
      {
        name: "profile",
        label: "Profile Name",
        default: "monitoring",
        placeholder: "monitoring"
      }
    ],
    outputExample: "[+] Building 0.0s (0/0)\n[+] Running 3/3\n ✔ Container prometheus  Started\n ✔ Container grafana     Started\n ✔ Container jaeger      Started"
  },
  {
    id: "docker-dive-image",
    title: "Explore Docker Image Layers & Waste with Dive",
    description: "Interactive TUI analysis of Docker images showing wasted file space, layer efficiency, and duplicate files.",
    command: "dive {{image}}",
    platforms: ["linux", "macos"],
    category: "docker",
    tags: ["dive", "docker", "image", "layers", "optimize", "efficiency", "size"],
    dangerLevel: "safe",
    proTip: "Add \"CI=true dive {{image}}\" to automate layer efficiency scoring inside CI/CD test gates.",
    params: [
      {
        name: "image",
        label: "Image Name",
        default: "my-app:latest",
        placeholder: "my-app:latest"
      }
    ],
    outputExample: "Analyzing Image: my-app:latest\nEfficiency: 98 %\nWasted Bytes: 4.8 MB\nTotal Image size: 142 MB\n[Layer Details]\n- sha256:1a2b... 45 MB  RUN apt-get update && apt-get install -y --no-install-recommends ...\n- sha256:3c4d... 82 MB  COPY . .\n- sha256:5e6f... 15 MB  RUN npm run build && npm prune --production"
  },
  {
    id: "docker-buildx-cache",
    title: "Multi-Platform Build with Remote Inline Registry Cache",
    description: "Builds images for amd64 and arm64 in parallel, caching intermediate layers directly in the remote container registry.",
    command: "docker buildx build --platform linux/amd64,linux/arm64 --cache-to type=inline --cache-from type=registry,ref={{image}}:cache -t {{image}}:{{tag}} --push .",
    platforms: ["linux", "macos"],
    category: "docker",
    tags: ["docker", "buildx", "multiarch", "arm64", "amd64", "cache", "ci-cd"],
    dangerLevel: "safe",
    proTip: "Ensure you have initialized a docker-container builder driver with \"docker buildx create --use\".",
    params: [
      {
        name: "image",
        label: "Image Repository",
        default: "ghcr.io/org/backend",
        placeholder: "ghcr.io/org/backend"
      },
      { name: "tag", label: "Image Tag", default: "v1.4.0", placeholder: "v1.4.0" }
    ],
    outputExample: "[+] Building 14.8s (24/24) FINISHED\n => [linux/amd64 internal] load build definition from Dockerfile\n => [linux/arm64 internal] load build definition from Dockerfile\n => importing cache result from ghcr.io/org/backend:cache\n => pushing layers to ghcr.io/org/backend:v1.4.0\n => DONE"
  },
  {
    id: "docker-cp-container",
    title: "Copy Files In/Out of Running Container Without SSH",
    description: "Transfers configuration files, database dumps, or diagnostic logs directly between host and container filesystem.",
    command: "docker cp {{containerId}}:{{sourcePath}} {{destPath}}",
    platforms: ["all"],
    category: "docker",
    tags: ["docker", "cp", "transfer", "container", "files", "backup"],
    dangerLevel: "safe",
    proTip: "Works in both directions: swap sourcePath and destPath to copy local files into a running container.",
    params: [
      {
        name: "containerId",
        label: "Container ID / Name",
        default: "redis-prod",
        placeholder: "container-name"
      },
      {
        name: "sourcePath",
        label: "Container Path",
        default: "/data/dump.rdb",
        placeholder: "/path/in/container"
      },
      {
        name: "destPath",
        label: "Host Destination",
        default: "./redis-backup.rdb",
        placeholder: "./local-file"
      }
    ],
    outputExample: "Successfully copied 14.2MB to ./redis-backup.rdb"
  }
];
