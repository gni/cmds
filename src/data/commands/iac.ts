import type { TerminalCommand } from "../types";

/**
 * IaC & Cloud CLI (☁️)
 * Terraform & OpenTofu plans, Ansible dry-run diffs, AWS STS/SSM sessions, and GitHub CLI automation.
 */
export const iacCommands: TerminalCommand[] = [
  {
    id: "tofu-plan-out",
    title: "Generate & Save Immutable OpenTofu / Terraform Plan",
    description: "Computes infrastructure delta against state and writes an immutable plan file artifact for automated CI apply.",
    command: "tofu plan -out={{planFile}} -detailed-exitcode",
    platforms: ["all"],
    category: "iac",
    tags: ["opentofu", "terraform", "iac", "plan", "cloud", "devops"],
    dangerLevel: "safe",
    proTip: "Exit code 2 means diffs exist; exit code 0 means clean/no changes; exit code 1 means execution error.",
    params: [
      {
        name: "planFile",
        label: "Plan Artifact",
        default: "tfplan.binary",
        placeholder: "tfplan.binary"
      }
    ],
    outputExample: "OpenTofu used the selected providers to generate the following execution plan:\n  + aws_security_group_rule.allow_https\n\nPlan: 1 to add, 0 to change, 0 to destroy.\nSaved plan to: tfplan.binary"
  },
  {
    id: "terraform-state-list",
    title: "List All Tracked Resources in Remote State Backend",
    description: "Enumerates addresses of every managed infrastructure resource without making slow API calls to cloud providers.",
    command: "terraform state list",
    platforms: ["all"],
    category: "iac",
    tags: ["terraform", "opentofu", "state", "iac", "cloud", "aws"],
    dangerLevel: "safe",
    proTip: "Follow up with \"terraform state show <address>\" to view exact attributes of any individual resource.",
    outputExample: "aws_iam_role.ecs_execution_role\naws_route53_record.app_domain\naws_s3_bucket.static_assets\nmodule.vpc.aws_subnet.private[0]\nmodule.vpc.aws_subnet.private[1]\nmodule.vpc.aws_vpc.main"
  },
  {
    id: "terraform-target-apply",
    title: "Targeted Terraform Apply for Single Isolated Resource",
    description: "Executes planned modifications exclusively against a specific cloud resource or submodule, bypassing the full dependency tree.",
    command: "terraform apply -target={{resource}} -auto-approve",
    platforms: ["all"],
    category: "iac",
    tags: ["terraform", "target", "apply", "iac", "cloud"],
    dangerLevel: "caution",
    proTip: "Use sparingly during emergencies; targeting can cause configuration drift if dependencies are skipped.",
    params: [
      {
        name: "resource",
        label: "Resource Address",
        default: "module.database.aws_db_instance.primary",
        placeholder: "aws_instance.web"
      }
    ],
    outputExample: "module.database.aws_db_instance.primary: Modifying... [id=db-prod-primary]\nmodule.database.aws_db_instance.primary: Still modifying... [10s elapsed]\nmodule.database.aws_db_instance.primary: Modifications complete after 18s\n\nApply complete! Resources: 0 added, 1 changed, 0 destroyed."
  },
  {
    id: "ansible-dryrun-diff",
    title: "Dry-Run Ansible Playbook with Unified Configuration Diffs",
    description: "Executes tasks in check mode without mutating remote hosts, outputting colored diffs of pending template and config changes.",
    command: "ansible-playbook {{playbook}} -i {{inventory}} --check --diff",
    platforms: ["linux", "macos"],
    category: "iac",
    tags: ["ansible", "playbook", "diff", "dry-run", "automation", "devops"],
    dangerLevel: "safe",
    proTip: "Add \"--limit {{host}}\" to restrict testing to a single canary node in your inventory.",
    params: [
      { name: "playbook", label: "Playbook", default: "site.yml", placeholder: "site.yml" },
      {
        name: "inventory",
        label: "Inventory File",
        default: "production.ini",
        placeholder: "hosts.ini"
      }
    ],
    outputExample: "TASK [nginx : update server configuration] *************************************\n--- before: /etc/nginx/nginx.conf\n+++ after: /root/.ansible/tmp/nginx.conf\n@@ -14,3 +14,3 @@\n-    worker_connections 768;\n+    worker_connections 4096;\n\nchanged: [web-srv-01]\n\nPLAY RECAP *********************************************************************\nweb-srv-01                 : ok=12   changed=1    unreachable=0    failed=0"
  },
  {
    id: "aws-sts-identity",
    title: "Verify Active AWS IAM Role, Account ID, and Identity",
    description: "Validates exported AWS credentials and confirms active Account ID, IAM ARN, and assumed session role.",
    command: "aws sts get-caller-identity --output table",
    platforms: ["all"],
    category: "iac",
    tags: ["aws", "iam", "sts", "cloud", "security", "identity"],
    dangerLevel: "safe",
    proTip: "In shell scripts, extract just the 12-digit Account ID with \"--query Account --output text\".",
    outputExample: "-------------------------------------------------------------------------------------------------------------------------\n|                                                   GetCallerIdentity                                                   |\n+--------------+-------------------------------------------------------------+------------------------------------------+\n|   Account    |                            Arn                              |                  UserId                  |\n+--------------+-------------------------------------------------------------+------------------------------------------+\n| 123456789012 | arn:aws:sts::123456789012:assumed-role/DevOpsAdmin/session  | AROAEXAMPLE123456789:session             |\n+--------------+-------------------------------------------------------------+------------------------------------------+"
  },
  {
    id: "aws-ssm-session",
    title: "Open Secure Shell into Private EC2 via AWS Systems Manager",
    description: "Establishes encrypted interactive bash terminal into private EC2 instance without open ingress ports or SSH keys.",
    command: "aws ssm start-session --target {{instanceId}}",
    platforms: ["all"],
    category: "iac",
    tags: ["aws", "ssm", "ec2", "ssh", "terminal", "session-manager", "cloud"],
    dangerLevel: "safe",
    proTip: "Requires the AWS Session Manager Plugin and SSM agent installed on the target AMI.",
    params: [
      {
        name: "instanceId",
        label: "Instance ID",
        default: "i-0a1b2c3d4e5f67890",
        placeholder: "i-0123456789abcdef0"
      }
    ],
    outputExample: "Starting session with SessionId: bot-user-0f81d4e2194\nsh-5.2$ id\nuid=1001(ssm-user) gid=1001(ssm-user) groups=1001(ssm-user),27(sudo)\nsh-5.2$ hostname\nip-10-0-4-82.eu-west-3.compute.internal"
  },
  {
    id: "aws-ecr-login",
    title: "Authenticate Docker Daemon Against AWS ECR Registry",
    description: "Generates ephemeral OAuth token and authenticates local Docker daemon to push/pull from private Elastic Container Registry.",
    command: "aws ecr get-login-password --region {{region}} | docker login --username AWS --password-stdin {{accountId}}.dkr.ecr.{{region}}.amazonaws.com",
    platforms: ["all"],
    category: "iac",
    tags: ["aws", "ecr", "docker", "registry", "auth", "devops"],
    dangerLevel: "safe",
    proTip: "The generated ECR token is valid for 12 hours before re-authentication is required.",
    params: [
      { name: "region", label: "AWS Region", default: "eu-west-3", placeholder: "eu-west-3" },
      {
        name: "accountId",
        label: "Account ID",
        default: "123456789012",
        placeholder: "123456789012"
      }
    ],
    outputExample: "Login Succeeded"
  },
  {
    id: "gh-run-watch",
    title: "Watch Live GitHub Actions Workflow Run in Terminal",
    description: "Tails active CI/CD workflow run in real-time, reporting job steps, failures, and execution duration.",
    command: "gh run watch {{runId}}",
    platforms: ["all"],
    category: "iac",
    tags: ["gh", "github-actions", "ci-cd", "watch", "devops", "automation"],
    dangerLevel: "safe",
    proTip: "Run \"gh run list\" to pick the latest run ID interactively.",
    params: [
      { name: "runId", label: "Workflow Run ID", default: "984128912", placeholder: "run-id" }
    ],
    outputExample: "✓ lint in 18s\n✓ test (nodejs 20) in 42s\n- build and push docker image\n  * checkout repository ... done (2s)\n  * buildx setup ... done (4s)\n  * docker build & push ... running (32s)"
  },
  {
    id: "gh-pr-checkout",
    title: "Check Out Pull Request Locally with GitHub CLI",
    description: "Fetches PR branch, switches working directory, and sets upstream tracking automatically.",
    command: "gh pr checkout {{prNumber}}",
    platforms: ["all"],
    category: "iac",
    tags: ["gh", "github", "git", "pr", "review", "collaboration"],
    dangerLevel: "safe",
    proTip: "Works with PR URL or branch name as well as integer PR numbers.",
    params: [
      { name: "prNumber", label: "Pull Request Number", default: "42", placeholder: "42" }
    ],
    outputExample: "Switched to branch 'feature/devsecops-catalog'\nYour branch is up to date with 'origin/feature/devsecops-catalog'."
  }
];
