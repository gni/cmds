import type { TerminalCommand } from "../types";

/**
 * Kubernetes & K8s (☸️)
 * Pod crashloop logs, rollout restarts, ephemeral debug containers, secret decoding, and helm diff.
 */
export const kubernetesCommands: TerminalCommand[] = [
  {
    id: "k8s-pod-previous-logs",
    title: "Inspect Logs of Terminated Pod Container (CrashLoopBackOff)",
    description: "Retrieves stdout/stderr log output of the previous crashed instance of a Kubernetes container.",
    command: "kubectl logs {{pod}} -n {{namespace}} --previous --tail={{lines}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "crashloop", "logs", "debug", "pod", "troubleshooting"],
    dangerLevel: "safe",
    proTip: "If multiple containers exist in the pod, append \"-c {{containerName}}\".",
    params: [
      {
        name: "pod",
        label: "Pod Name",
        default: "api-service-674bb8c5f-k9l2m",
        placeholder: "pod-name"
      },
      { name: "namespace", label: "Namespace", default: "production", placeholder: "default" },
      { name: "lines", label: "Tail Lines", default: "50", placeholder: "50" }
    ],
    outputExample: "2026-09-10T22:28:10.142Z [FATAL] uncaughtException: connect ECONNREFUSED 10.96.14.88:5432\n    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16)\n2026-09-10T22:28:10.145Z [INFO] Process terminating with exit status 1."
  },
  {
    id: "k8s-rollout-restart",
    title: "Zero-Downtime Rolling Restart of Deployment",
    description: "Performs graceful rolling update of all pods in a deployment without updating images or configmaps.",
    command: "kubectl rollout restart deployment/{{deployment}} -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "rollout", "restart", "deployment", "zero-downtime"],
    dangerLevel: "safe",
    proTip: "Follow progress live with \"kubectl rollout status deployment/{{deployment}} -n {{namespace}}\".",
    params: [
      {
        name: "deployment",
        label: "Deployment",
        default: "api-service",
        placeholder: "deployment-name"
      },
      {
        name: "namespace",
        label: "Namespace",
        default: "production",
        placeholder: "production"
      }
    ],
    outputExample: "deployment.apps/api-service restarted\nWaiting for rollout to finish: 1 out of 3 new replicas have been updated...\nWaiting for rollout to finish: 2 out of 3 new replicas have been updated...\ndeployment \"api-service\" successfully rolled out."
  },
  {
    id: "k8s-debug-ephemeral-netshoot",
    title: "Attach Ephemeral Netshoot Container to Live Pod",
    description: "Injects a temporary diagnostic container with curl, tcpdump, drill, and iproute2 into a running pod.",
    command: "kubectl debug -it {{pod}} -n {{namespace}} --image=nicolaka/netshoot --target={{container}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "debug", "netshoot", "ephemeral", "networking", "troubleshoot"],
    dangerLevel: "safe",
    proTip: "Using --target shares process and network namespaces with the application container.",
    params: [
      {
        name: "pod",
        label: "Pod Name",
        default: "frontend-7db78c4cf9-9w8xz",
        placeholder: "pod-name"
      },
      { name: "namespace", label: "Namespace", default: "default", placeholder: "default" },
      { name: "container", label: "Target Container", default: "web", placeholder: "web" }
    ],
    outputExample: "Targeting container \"web\".\nDefaulting debug container name to debugger-8472m.\nbash-5.2# curl -I http://127.0.0.1:8080/health\nHTTP/1.1 200 OK\nContent-Type: application/json"
  },
  {
    id: "k8s-decode-secret",
    title: "Extract & Base64 Decode Kubernetes Secret Key",
    description: "Fetches raw secret payload from cluster, filters key with jsonpath, and decodes directly to plaintext stdout.",
    command: "kubectl get secret {{secretName}} -n {{namespace}} -o jsonpath='{.data.{{key}}}' | base64 --decode",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "secret", "base64", "decode", "jsonpath"],
    dangerLevel: "caution",
    proTip: "Use echo \"\" after base64 to ensure terminal prompt starts on a clean newline.",
    params: [
      {
        name: "secretName",
        label: "Secret Name",
        default: "database-credentials",
        placeholder: "secret-name"
      },
      {
        name: "namespace",
        label: "Namespace",
        default: "production",
        placeholder: "production"
      },
      { name: "key", label: "Secret Key", default: "password", placeholder: "password" }
    ],
    outputExample: "Sup3rS3cr3t_PgPass_2026!"
  },
  {
    id: "k8s-top-pods-sorted",
    title: "Display Pod CPU & Memory Usage Sorted Across Cluster",
    description: "Queries Kubernetes metrics-server and sorts running pods by real-time CPU or memory consumption.",
    command: "kubectl top pods -A --sort-by={{metric}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "top", "metrics", "cpu", "memory", "performance", "sre"],
    dangerLevel: "safe",
    proTip: "Use --sort-by=memory to quickly detect memory leaks and pods near OOMKilled limits.",
    params: [
      { name: "metric", label: "Sort By", default: "cpu", placeholder: "cpu or memory" }
    ],
    outputExample: "NAMESPACE     NAME                             CPU(cores)   MEMORY(bytes)\nproduction    api-service-674bb8c5f-k9l2m      480m         1420Mi\nmonitoring    prometheus-k8s-0                 310m         4200Mi\nkube-system   cilium-operator-6bfd7557d-9pxw2  45m          110Mi\nproduction    redis-master-0                   18m          512Mi"
  },
  {
    id: "k8s-cluster-events-sorted",
    title: "Stream Warning & Error Cluster Events Chronologically",
    description: "Filters cluster events across all namespaces for warnings, failed scheduling, image pull errors, and evictions.",
    command: "kubectl get events -A --sort-by='.lastTimestamp' --field-selector type!=Normal",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "events", "warnings", "errors", "debug", "cluster"],
    dangerLevel: "safe",
    proTip: "Append -w to watch new warning events appear in real-time.",
    outputExample: "NAMESPACE   LAST SEEN   TYPE      REASON      OBJECT               MESSAGE\nproduction  42s         Warning   BackOff     pod/worker-79c       Back-off restarting failed container\nstaging     2m          Warning   FailedMount pod/redis-cache-0    MountVolume.SetUp failed for volume \"data\": timeout\nkube-system 5m          Warning   Unhealthy   pod/kube-dns-587     Liveness probe failed: HTTP probe failed with status 503"
  },
  {
    id: "k8s-port-forward-bg",
    title: "Forward Remote Kubernetes Service Port to Localhost",
    description: "Creates local network tunnel to a service inside the cluster without configuring ingresses or load balancers.",
    command: "kubectl port-forward svc/{{service}} {{localPort}}:{{remotePort}} -n {{namespace}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "port-forward", "service", "tunnel", "network"],
    dangerLevel: "safe",
    proTip: "Use localPort 0 (e.g. 0:80) to let kubectl assign an unused ephemeral random port automatically.",
    params: [
      {
        name: "service",
        label: "Service Name",
        default: "grafana",
        placeholder: "service-name"
      },
      { name: "localPort", label: "Local Port", default: "3000", placeholder: "3000" },
      { name: "remotePort", label: "Remote Port", default: "80", placeholder: "80" },
      {
        name: "namespace",
        label: "Namespace",
        default: "monitoring",
        placeholder: "monitoring"
      }
    ],
    outputExample: "Forwarding from 127.0.0.1:3000 -> 80\nForwarding from [::1]:3000 -> 80\nHandling connection for 3000"
  },
  {
    id: "k8s-dry-run-yaml",
    title: "Generate Production Manifest YAML via Client Dry-Run",
    description: "Synthesizes clean, syntactically correct Kubernetes Deployment YAML specifications without cluster API calls.",
    command: "kubectl create deployment {{name}} --image={{image}} --replicas={{replicas}} --dry-run=client -o yaml",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "dry-run", "yaml", "manifest", "deployment", "iac"],
    dangerLevel: "safe",
    proTip: "Pipe into \"kubectl apply -f -\" or save to a file with \"> deployment.yaml\".",
    params: [
      {
        name: "name",
        label: "Deployment Name",
        default: "microservice-api",
        placeholder: "microservice-api"
      },
      {
        name: "image",
        label: "Container Image",
        default: "ghcr.io/org/api:v1.2.0",
        placeholder: "image:tag"
      },
      { name: "replicas", label: "Replicas", default: "3", placeholder: "3" }
    ],
    outputExample: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  creationTimestamp: null\n  labels:\n    app: microservice-api\n  name: microservice-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: microservice-api\n  template:\n    metadata:\n      creationTimestamp: null\n      labels:\n        app: microservice-api\n    spec:\n      containers:\n      - image: ghcr.io/org/api:v1.2.0\n        name: api"
  },
  {
    id: "k8s-drain-node",
    title: "Safely Cordon & Drain Worker Node for Upgrades",
    description: "Marks node unschedulable and evicts all pods with graceful termination while respecting PodDisruptionBudgets.",
    command: "kubectl drain {{nodeName}} --ignore-daemonsets --delete-emptydir-data --force",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["kubectl", "k8s", "drain", "cordon", "node", "maintenance", "sre"],
    dangerLevel: "caution",
    proTip: "When maintenance completes, re-enable scheduling with \"kubectl uncordon {{nodeName}}\".",
    params: [
      {
        name: "nodeName",
        label: "Node Name",
        default: "k8s-worker-pool-03",
        placeholder: "node-name"
      }
    ],
    outputExample: "node/k8s-worker-pool-03 cordoned\nevicting pod production/api-service-674bb8c5f-k9l2m\nevicting pod staging/frontend-8bc7d66d9-x5l8w\npod/api-service-674bb8c5f-k9l2m evicted\npod/frontend-8bc7d66d9-x5l8w evicted\nnode/k8s-worker-pool-03 drained successfully"
  },
  {
    id: "helm-diff-upgrade",
    title: "Preview Helm Upgrade Changes with Colored Diff",
    description: "Computes and displays exact declarative resource differences before applying changes to the cluster.",
    command: "helm diff upgrade {{release}} {{chart}} -n {{namespace}} -f {{valuesFile}}",
    platforms: ["all"],
    category: "kubernetes",
    tags: ["helm", "helm-diff", "k8s", "diff", "upgrade", "preview", "cd"],
    dangerLevel: "safe",
    proTip: "Install the helm plugin first with \"helm plugin install https://github.com/databus23/helm-diff\".",
    params: [
      {
        name: "release",
        label: "Release Name",
        default: "ingress-nginx",
        placeholder: "release"
      },
      {
        name: "chart",
        label: "Chart Reference",
        default: "ingress-nginx/ingress-nginx",
        placeholder: "repo/chart"
      },
      { name: "namespace", label: "Namespace", default: "ingress", placeholder: "ingress" },
      {
        name: "valuesFile",
        label: "Values YAML",
        default: "values.yaml",
        placeholder: "values.yaml"
      }
    ],
    outputExample: "default, ingress-nginx-controller, Deployment (apps) has changed:\n  # Source: ingress-nginx/templates/controller-deployment.yaml\n  spec:\n    replicas: 2\n-   image: registry.k8s.io/ingress-nginx/controller:v1.9.4\n+   image: registry.k8s.io/ingress-nginx/controller:v1.10.0\n    resources:\n      limits:\n-       memory: 512Mi\n+       memory: 1024Mi"
  }
];
