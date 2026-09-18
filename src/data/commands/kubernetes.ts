import type { TerminalCommand } from "../types";

/**
 * Kubernetes & K8s (☸️)
 * Incident triage, pod crashloop debugging, ephemeral debug containers,
 * log streaming, resource profiling, and cluster operations.
 */
export const kubernetesCommands: TerminalCommand[] = [
  {
    id: "kubectl-debug-pod-ephemeral",
    title: "Attach Ephemeral Debug Container to Running Pod",
    description: "Inject an interactive troubleshooting container into a live pod, sharing the target container's process namespace without restarting it.",
    command: "kubectl debug -it {{pod}} -n {{namespace}} --image={{debugImage}} --target={{targetContainer}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "debug", "ephemeral", "pod", "troubleshoot", "netshoot", "container", "strace"],
    dangerLevel: "safe",
    proTip: "Sharing the process namespace lets you run strace, gdb, ps aux, and tcpdump against the target process even if the base image is distroless or scratch.",
    params: [
      { name: "pod", label: "Pod Name", default: "api-server-7994df568-x49zl", placeholder: "pod-name" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" },
      { name: "debugImage", label: "Diagnostic Image", default: "nicolaka/netshoot", placeholder: "image" },
      { name: "targetContainer", label: "Target Container", default: "api", placeholder: "container" }
    ],
    outputExample: "Targeting container \"api\". If you don't see a command prompt, try pressing enter.\n/ # ps aux\nPID   USER     TIME  COMMAND\n    1 node      0:14 node dist/server.js\n   18 root      0:00 /bin/bash"
  },
  {
    id: "kubectl-logs-previous-crashed",
    title: "Inspect Logs of Previous Crashed Container Instance",
    description: "Retrieve stdout/stderr logs from the previous terminated instance of a container currently stuck in CrashLoopBackOff or OOMKilled.",
    command: "kubectl logs {{pod}} -n {{namespace}} -c {{container}} --previous",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "logs", "crashloop", "previous", "oom", "fatal", "crash", "debug"],
    dangerLevel: "safe",
    proTip: "When a container restarts, normal 'kubectl logs' only shows the fresh instance. '--previous' captures the uncaught exception or fatal stack trace that triggered the restart.",
    params: [
      { name: "pod", label: "Pod Name", default: "worker-processor-67bb6d79d-q8k92", placeholder: "pod-name" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" },
      { name: "container", label: "Container Name", default: "worker", placeholder: "container" }
    ],
    outputExample: "2026-09-18T10:14:22Z [FATAL] uncaughtException: Out of memory (heap allocation failed)\n    at Buffer.allocUnsafe (node:buffer:404:17)\nKilled"
  },
  {
    id: "kubectl-get-pods-failing",
    title: "List Non-Running and Failing Pods Across Cluster",
    description: "Instantly scan all cluster namespaces for pods stuck in CrashLoopBackOff, ImagePullBackOff, Error, Evicted, or Pending states.",
    command: "kubectl get pods -A --field-selector=status.phase!=Running,status.phase!=Succeeded",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "pods", "failing", "error", "crashloop", "pending", "status", "triage", "all-namespaces"],
    dangerLevel: "safe",
    proTip: "Pipe output to 'grep -v Completed' to filter out finished cronjobs and batch tasks.",
    outputExample: "NAMESPACE     NAME                           READY   STATUS             RESTARTS   AGE\nproduction    auth-service-789cf-9z8m2      0/1     CrashLoopBackOff   12         35m\nstaging       payment-queue-64b54-x9q11      0/1     ImagePullBackOff   0          10m\nmonitoring    prometheus-node-exporter-2l    0/1     Evicted            0          4d"
  },
  {
    id: "kubectl-describe-pod-events",
    title: "Describe Pod for Lifecycle Events & Failure Reasons",
    description: "Show detailed status of containers, termination exit codes, liveness/readiness probe failures, volume mounts, and scheduling events.",
    command: "kubectl describe pod {{pod}} -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "describe", "pod", "events", "probe", "readiness", "liveness", "mount", "exit-code"],
    dangerLevel: "safe",
    proTip: "Check 'Last State' -> 'Exit Code' (137 = OOMKilled by kernel; 143 = SIGTERM; 1 = unhandled error).",
    params: [
      { name: "pod", label: "Pod Name", default: "frontend-web-579b9b4f4-jk8s9", placeholder: "pod-name" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ],
    outputExample: "State:          Waiting\n  Reason:       CrashLoopBackOff\nLast State:     Terminated\n  Reason:       OOMKilled\n  Exit Code:    137\nEvents:\n  Type     Reason     Age                From               Message\n  ----     ------     ----               ----               -------\n  Warning  Unhealthy  2m (x5 over 4m)   kubelet            Liveness probe failed: HTTP 500"
  },
  {
    id: "kubectl-events-chronological",
    title: "Stream Cluster Events Chronologically",
    description: "Display warning and lifecycle events in the target namespace sorted by timestamp to pinpoint exactly when an outage started.",
    command: "kubectl get events -n {{namespace}} --sort-by='.metadata.creationTimestamp'",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "events", "audit", "chronological", "sort", "history", "incident", "timeline"],
    dangerLevel: "safe",
    proTip: "Append '-w' (watch mode) during an active deploy or incident triage to see fresh events appear live.",
    params: [
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ],
    outputExample: "LAST SEEN   TYPE      REASON      OBJECT                       MESSAGE\n3m          Warning   Failed      pod/api-7d4-8m9x             Failed to pull image \"repo/api:v2\": unauthorized\n2m          Warning   BackOff     pod/api-7d4-8m9x             Back-off pulling image \"repo/api:v2\"\n45s         Normal    Scheduled   pod/api-worker-6b-j4         Successfully assigned default/api-worker-6b-j4 to node-02"
  },
  {
    id: "kubectl-debug-node-host",
    title: "Spawn Privileged Root Debug Shell on Worker Node",
    description: "Create a privileged container on a node with host IPC, PID, and network access to troubleshoot kubelet, kernel logs, and container runtime.",
    command: "kubectl debug node/{{node}} -it --image={{debugImage}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "debug", "node", "root", "kubelet", "kernel", "host", "chroot", "privileged"],
    dangerLevel: "caution",
    proTip: "Once the prompt opens, run 'chroot /host' to switch to the node's native root filesystem and run systemctl or inspect /var/log/.",
    params: [
      { name: "node", label: "Node Name", default: "k8s-worker-pool-01", placeholder: "node-name" },
      { name: "debugImage", label: "Diagnostic Image", default: "busybox", placeholder: "busybox" }
    ]
  },
  {
    id: "kubectl-run-disposable-curl",
    title: "Run Disposable In-Cluster HTTP & DNS Testing Pod",
    description: "Spin up a temporary interactive pod with curl, test internal Service DNS and HTTP latency, and automatically destroy it on disconnect.",
    command: "kubectl run tmp-net-debug --rm -it --image=curlimages/curl --restart=Never -- sh",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "run", "curl", "dns", "test", "connectivity", "interactive", "disposable", "network"],
    dangerLevel: "safe",
    proTip: "Inside the shell, run 'curl -Iv http://{{service}}.{{namespace}}.svc.cluster.local:8080/healthz' to test cluster-internal DNS and HTTP routing."
  },
  {
    id: "kubectl-logs-label-multicontainer",
    title: "Follow Aggregated Logs by Label Selector",
    description: "Stream live stdout/stderr lines simultaneously across all replica pods matching a label selector and across all their containers.",
    command: "kubectl logs -l {{selector}} -n {{namespace}} --tail={{lines}} -f --all-containers=true --max-log-requests={{maxRequests}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "logs", "stream", "selector", "label", "tail", "all-containers", "multicontainer"],
    dangerLevel: "safe",
    proTip: "The '--max-log-requests' flag overcomes the default 5-pod streaming limit, allowing you to follow large deployment fleets simultaneously.",
    params: [
      { name: "selector", label: "Label Selector", default: "app=backend", placeholder: "app=backend" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" },
      { name: "lines", label: "Tail Lines", default: "100", placeholder: "100" },
      { name: "maxRequests", label: "Max Concurrent Streams", default: "10", placeholder: "10" }
    ]
  },
  {
    id: "kubectl-port-forward-service",
    title: "Port-Forward In-Cluster Service to Localhost",
    description: "Securely forward a remote Kubernetes Service, Deployment, or Pod port directly to your local development workstation.",
    command: "kubectl port-forward svc/{{service}} {{localPort}}:{{remotePort}} -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "port-forward", "tunnel", "service", "ingress", "local", "database", "redis", "postgres"],
    dangerLevel: "safe",
    proTip: "Add '--address 0.0.0.0' if you want other devices on your LAN or Docker containers to access the forwarded port.",
    params: [
      { name: "service", label: "Service Name", default: "postgres-master", placeholder: "service-name" },
      { name: "localPort", label: "Local Port", default: "5432", placeholder: "5432" },
      { name: "remotePort", label: "Remote Port", default: "5432", placeholder: "5432" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ]
  },
  {
    id: "kubectl-top-pods-memory-cpu",
    title: "Rank Pods by Real-Time Memory & CPU Consumption",
    description: "Query metrics-server to display live CPU and RAM consumption across pods, sorted by highest memory usage.",
    command: "kubectl top pods -n {{namespace}} --sort-by={{sortBy}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "top", "metrics", "memory", "cpu", "oom", "resource", "bottleneck", "profiling"],
    dangerLevel: "safe",
    proTip: "Switch sortBy to 'cpu' to identify runaway threads or CPU throttling. Add '-A' to view metrics across all namespaces.",
    params: [
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" },
      { name: "sortBy", label: "Sort By (memory | cpu)", default: "memory", placeholder: "memory" }
    ],
    outputExample: "NAME                             CPU(cores)   MEMORY(bytes)\nredis-cluster-0                  140m         3210Mi\napi-gateway-7489cd644-8hzk1      680m         1420Mi\norder-worker-57fdb4454-9qm2p     45m          890Mi"
  },
  {
    id: "kubectl-top-nodes-capacity",
    title: "Monitor Node Resource Saturation and Pressure",
    description: "Display live CPU and memory allocation percentages across all cluster nodes to spot overloaded worker instances.",
    command: "kubectl top nodes --sort-by=cpu",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "top", "nodes", "capacity", "pressure", "metrics", "cpu", "memory", "cluster"],
    dangerLevel: "safe",
    proTip: "If a node memory percentage exceeds 85-90%, kubelet may trigger eviction thresholds and kill low-priority pods.",
    outputExample: "NAME                      CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%\nk8s-worker-pool-c2-01     2840m        71%    26480Mi         82%\nk8s-worker-pool-c2-02     1950m        48%    19840Mi         62%\nk8s-control-plane-01      650m         16%    4200Mi          26%"
  },
  {
    id: "kubectl-exec-interactive-sh",
    title: "Open Interactive Shell Inside Running Container",
    description: "Drop directly into an interactive bash or sh shell inside a specific pod and container.",
    command: "kubectl exec -it {{pod}} -n {{namespace}} -c {{container}} -- {{shell}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "exec", "shell", "bash", "sh", "container", "interactive", "terminal"],
    dangerLevel: "safe",
    proTip: "If /bin/bash is not installed (e.g. Alpine Linux), fall back to /bin/sh. For distroless images with no shell, use 'kubectl debug' instead.",
    params: [
      { name: "pod", label: "Pod Name", default: "api-backend-7b8f95c4d-6p9rz", placeholder: "pod-name" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" },
      { name: "container", label: "Container Name", default: "app", placeholder: "container-name" },
      { name: "shell", label: "Shell Path", default: "/bin/sh", placeholder: "/bin/sh" }
    ]
  },
  {
    id: "kubectl-rollout-restart",
    title: "Zero-Downtime Rolling Restart of Deployment",
    description: "Safely restart all pods in a deployment one by one according to rolling update strategy without changing image or configuration.",
    command: "kubectl rollout restart deployment/{{deployment}} -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "rollout", "restart", "deployment", "rolling", "zero-downtime", "graceful"],
    dangerLevel: "caution",
    proTip: "Follow the rolling transition immediately by running: kubectl rollout status deployment/{{deployment}} -n {{namespace}}",
    params: [
      { name: "deployment", label: "Deployment Name", default: "api-server", placeholder: "deployment-name" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ]
  },
  {
    id: "kubectl-rollout-undo-rollback",
    title: "Emergency Rollback Deployment to Previous Revision",
    description: "Immediately abort a bad deployment release and roll back the ReplicaSet to the prior healthy revision.",
    command: "kubectl rollout undo deployment/{{deployment}} -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "rollout", "undo", "rollback", "deployment", "incident", "recovery", "emergency"],
    dangerLevel: "caution",
    proTip: "Run 'kubectl rollout history deployment/{{deployment}} -n {{namespace}}' first to inspect revision history, or add '--to-revision=N'.",
    params: [
      { name: "deployment", label: "Deployment Name", default: "api-server", placeholder: "deployment-name" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ]
  },
  {
    id: "kubectl-get-endpoints-slices",
    title: "Verify Service Endpoints & Target Pod Health",
    description: "Confirm whether backend pods have passed readiness probes and are actively registered in the Service endpoint router.",
    command: "kubectl get endpoints {{service}} -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "endpoints", "service", "readiness", "502", "503", "networking", "routing"],
    dangerLevel: "safe",
    proTip: "If curl returns 503 or connection refused, check if ENDPOINTS shows '<none>'. That indicates pods are either failing readiness probes or label selectors mismatch.",
    params: [
      { name: "service", label: "Service Name", default: "web-gateway", placeholder: "service-name" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ],
    outputExample: "NAME          ENDPOINTS                                         AGE\nweb-gateway   10.244.1.42:8080,10.244.2.19:8080,10.244.3.7:8080   14d"
  },
  {
    id: "kubectl-get-secret-decode",
    title: "Decode All Base64 Values in Secret Directly",
    description: "Inspect and decode all sensitive keys in a Kubernetes Secret directly in the terminal without manual base64 pipe steps.",
    command: "kubectl get secret {{secret}} -n {{namespace}} -o json | jq '.data | map_values(@base64d)'",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "secret", "base64", "decode", "jq", "credentials", "config", "debug"],
    dangerLevel: "safe",
    proTip: "To decode just a single key without jq: kubectl get secret {{secret}} -n {{namespace}} -o jsonpath='{.data.password}' | base64 -d",
    params: [
      { name: "secret", label: "Secret Name", default: "db-credentials", placeholder: "secret-name" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ]
  },
  {
    id: "kubectl-diff-manifest",
    title: "Server-Side Diff Manifest Before Applying",
    description: "Run server-side dry-run to preview the exact JSON/YAML line changes that will be applied against live cluster state.",
    command: "kubectl diff -f {{manifest}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "diff", "dry-run", "manifest", "gitops", "validate", "plan"],
    dangerLevel: "safe",
    proTip: "Returns standard unified diff output and exit code 0 if identical, 1 if differences exist, or >1 on error. Essential for CI/CD PR checks.",
    params: [
      { name: "manifest", label: "Manifest Path / Directory", default: "k8s/deployment.yaml", placeholder: "path/to/manifest.yaml" }
    ]
  },
  {
    id: "kubectl-auth-can-i-check",
    title: "Verify RBAC Authorization for ServiceAccount or User",
    description: "Test if a specific user, group, or ServiceAccount is allowed to execute an API action (verb + resource) in the target namespace.",
    command: "kubectl auth can-i {{verb}} {{resource}} -n {{namespace}} --as=system:serviceaccount:{{namespace}}:{{serviceAccount}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "rbac", "auth", "can-i", "serviceaccount", "security", "permissions", "policy"],
    dangerLevel: "safe",
    params: [
      { name: "verb", label: "API Verb (get | list | create | delete)", default: "get", placeholder: "get" },
      { name: "resource", label: "Resource (secrets | pods | deployments)", default: "secrets", placeholder: "secrets" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" },
      { name: "serviceAccount", label: "ServiceAccount Name", default: "app-deployer", placeholder: "serviceaccount" }
    ],
    outputExample: "yes"
  },
  {
    id: "kubectl-cordon-drain-node",
    title: "Safely Drain Workloads and Cordon Node for Maintenance",
    description: "Mark a worker node unschedulable and gracefully evict pods respecting PodDisruptionBudgets prior to host reboot or patching.",
    command: "kubectl cordon {{node}} && kubectl drain {{node}} --ignore-daemonsets --delete-emptydir-data --force",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "drain", "cordon", "node", "maintenance", "evict", "upgrade", "safely"],
    dangerLevel: "dangerous",
    proTip: "Once node maintenance or kernel upgrade is complete, re-enable scheduling with: kubectl uncordon {{node}}",
    params: [
      { name: "node", label: "Node Name", default: "k8s-worker-pool-03", placeholder: "node-name" }
    ]
  },
  {
    id: "kubectl-config-switch-namespace",
    title: "Switch Default Working Namespace for Current Context",
    description: "Permanently change the active namespace in your kubeconfig context so you don't need to specify '-n <namespace>' on every command.",
    command: "kubectl config set-context --current --namespace={{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "config", "namespace", "context", "kubens", "shortcut", "cli"],
    dangerLevel: "safe",
    proTip: "Verify your current active context and namespace anytime with: kubectl config view --minify | grep namespace:",
    params: [
      { name: "namespace", label: "Namespace", default: "production", placeholder: "production" }
    ]
  },
  {
    id: "kubectl-copy-file-pod",
    title: "Copy File Between Local Machine and Container",
    description: "Transfer files or directories bidirectionally between your local workstation and a remote container.",
    command: "kubectl cp {{source}} {{destination}} -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "cp", "copy", "transfer", "heapdump", "file", "download", "upload"],
    dangerLevel: "safe",
    proTip: "Prefix remote container paths with '<pod-name>:' (e.g. 'my-pod:/tmp/dump.hprof ./dump.hprof'). Make sure 'tar' is available in the target container.",
    params: [
      { name: "source", label: "Source Path (local or pod:path)", default: "api-backend-7b8f95c4d-6p9rz:/tmp/heapdump.hprof", placeholder: "source" },
      { name: "destination", label: "Destination Path", default: "./heapdump.hprof", placeholder: "destination" },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ]
  },
  {
    id: "k9s-terminal-ui",
    title: "Launch K9s Interactive Terminal UI Dashboard",
    description: "Open the high-density terminal dashboard to navigate clusters, tail live pod logs, view metrics, and manage resources interactively.",
    command: "k9s -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["k9s", "tui", "dashboard", "monitor", "interactive", "terminal", "logs", "metrics"],
    dangerLevel: "safe",
    proTip: "Inside k9s: ':pod' to browse pods, <l> to view logs, <d> to describe resource, <e> to edit YAML, and <ctrl+d> to delete.",
    params: [
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ]
  },
  {
    id: "kubectl-pod-resource-audit",
    title: "Audit Pod CPU & Memory Requests and Limits",
    description: "Extract CPU and memory resource requests and limits across all pods in a namespace to spot unconstrained workloads.",
    command: "kubectl get pods -n {{namespace}} -o custom-columns='NAME:.metadata.name,CONTAINER:.spec.containers[*].name,REQ_CPU:.spec.containers[*].resources.requests.cpu,LIMIT_CPU:.spec.containers[*].resources.limits.cpu,REQ_MEM:.spec.containers[*].resources.requests.memory,LIMIT_MEM:.spec.containers[*].resources.limits.memory'",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "resources", "requests", "limits", "cpu", "memory", "custom-columns", "audit", "capacity"],
    dangerLevel: "safe",
    proTip: "Containers without memory limits can trigger node-wide OOMKills, while containers with aggressive CPU limits suffer from CFS throttling.",
    params: [
      { name: "namespace", label: "Namespace", default: "default", placeholder: "namespace" }
    ]
  },
  {
    id: "kubectl-node-conditions-check",
    title: "Inspect Node Pressure and Readiness Conditions",
    description: "Quickly check whether nodes are reporting MemoryPressure, DiskPressure, PIDPressure, or NetworkUnavailable.",
    command: "kubectl get nodes -o custom-columns='NAME:.metadata.name,STATUS:.status.conditions[-1].type,REASON:.status.conditions[-1].reason,READY:.status.conditions[?(@.type==\"Ready\")].status'",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "nodes", "conditions", "memorypressure", "diskpressure", "notready", "diagnostics", "health"],
    dangerLevel: "safe",
    outputExample: "NAME                      STATUS   REASON                   READY\nk8s-worker-pool-01        Ready    KubeletReady             True\nk8s-worker-pool-02        Ready    KubeletHasDiskPressure   False"
  }
];
