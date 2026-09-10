import type { TerminalCommand } from "../types";

/**
 * Git Superpowers (🐙)
 * Reflog rescues, soft reset, branch visualization, bisect, worktrees, and cherry-pick.
 */
export const gitCommands: TerminalCommand[] = [
  {
    id: "git-undo-last-commit",
    title: "Undo Last Commit (Keep Changes)",
    description: "Reset HEAD by one commit, keeping changes staged.",
    command: "git reset --soft HEAD~1",
    platforms: ["all"],
    category: "git",
    tags: ["git", "undo", "reset", "commit", "staging"],
    dangerLevel: "safe",
    proTip: "To discard both commit AND changes completely, use \"git reset --hard HEAD~1\" (destructive!)."
  },
  {
    id: "git-search-commit-history",
    title: "Search Commits for Code (Pickaxe)",
    description: "Find commits adding or removing a specific code string.",
    command: "git log -S \"{{searchString}}\" --source --all -p",
    platforms: ["all"],
    category: "git",
    tags: ["git", "log", "search", "pickaxe", "history", "find"],
    dangerLevel: "safe",
    proTip: "Add \"-p\" to see the actual diff inline that introduced or removed the code string.",
    params: [
      {
        name: "searchString",
        label: "Code or Function Name",
        default: "API_SECRET_KEY",
        placeholder: "pattern"
      }
    ]
  },
  {
    id: "git-stash-untracked",
    title: "Stash Changes with Untracked",
    description: "Stash tracked and untracked files with custom message.",
    command: "git stash push -u -m \"{{message}}\"",
    platforms: ["all"],
    category: "git",
    tags: ["git", "stash", "wip", "save"],
    dangerLevel: "safe",
    proTip: "Restore later using \"git stash pop\" or list all saved stashes with \"git stash list\".",
    params: [
      {
        name: "message",
        label: "Stash Note",
        default: "wip: auth refactor",
        placeholder: "description"
      }
    ]
  },
  {
    id: "git-clean-untracked-force",
    title: "Force Delete Untracked Files",
    description: "Remove all untracked files and directories from repo.",
    command: "git clean -fd",
    platforms: ["all"],
    category: "git",
    tags: ["git", "clean", "delete", "untracked", "prune"],
    dangerLevel: "caution",
    proTip: "Always run \"git clean -nd\" (dry-run) first to review exactly what will be removed!",
    outputExample: "Removing build/temp/\nRemoving src/test-scratch.ts"
  },
  {
    id: "git-reflog-rescue",
    title: "Recover Lost Commits (Reflog)",
    description: "Find and recover deleted commits or branches via reflog.",
    command: "git reflog --date=relative",
    platforms: ["all"],
    category: "git",
    tags: ["git", "reflog", "recover", "rescue", "emergency"],
    dangerLevel: "safe",
    proTip: "Once you find the commit hash in the reflog, revive it with: git checkout -b recovered-branch <hash>",
    outputExample: "7b2a9e1 HEAD@{2 minutes ago}: commit: feat: complete oauth integration\n3f4c110 HEAD@{15 minutes ago}: checkout: moving from main to feat-oauth"
  },
  {
    id: "git-pretty-graph",
    title: "ASCII Commit Graph History",
    description: "Render colorized tree of branch merges and commit tags.",
    command: "git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all",
    platforms: ["all"],
    category: "git",
    tags: ["git", "log", "graph", "tree", "history", "visual"],
    dangerLevel: "safe",
    proTip: "Save this as a permanent alias: git config --global alias.lg \"log --graph --oneline --all --decorate\""
  },
  {
    id: "git-blame-ignore-whitespace",
    title: "Blame Ignoring Whitespace",
    description: "Trace line authors ignoring formatting and whitespace.",
    command: "git blame -w -C -C -L {{startLine}},{{endLine}} {{file}}",
    platforms: ["all"],
    category: "git",
    tags: ["git", "blame", "author", "history", "ignore-space"],
    dangerLevel: "safe",
    proTip: "-w ignores whitespace, while -C detects code copied or moved from other files.",
    params: [
      { name: "startLine", label: "Start Line", default: "1", placeholder: "1" },
      { name: "endLine", label: "End Line", default: "30", placeholder: "30" },
      {
        name: "file",
        label: "File Path",
        default: "src/index.ts",
        placeholder: "path/to/file"
      }
    ]
  },
  {
    id: "git-amend-last-message",
    title: "Edit Last Commit Message",
    description: "Update commit message of the most recent commit.",
    command: "git commit --amend -m \"{{newMessage}}\"",
    platforms: ["all"],
    category: "git",
    tags: ["git", "amend", "commit", "fix", "typo"],
    dangerLevel: "safe",
    params: [
      {
        name: "newMessage",
        label: "New Commit Message",
        default: "fix(core): update connection timeout handling",
        placeholder: "message"
      }
    ]
  },
  {
    id: "git-bisect-debug",
    title: "Find Buggy Commit with Bisect",
    description: "Binary search git commit history to locate regressions.",
    command: "git bisect start && git bisect bad HEAD && git bisect good {{goodCommit}}",
    platforms: ["all"],
    category: "git",
    tags: ["git", "bisect", "debug", "find", "bug"],
    dangerLevel: "safe",
    proTip: "You can automate the whole search with \"git bisect run npm test\"!",
    params: [
      {
        name: "goodCommit",
        label: "Known Good Commit",
        default: "v1.2.0",
        placeholder: "tag or commit hash"
      }
    ]
  },
  {
    id: "git-delete-merged-branches",
    title: "Delete Merged Local Branches",
    description: "Delete local branches already merged into main branch.",
    command: "git branch --merged | grep -v \"*\" | grep -v \"main\" | grep -v \"master\" | xargs -n 1 git branch -d",
    platforms: ["all"],
    category: "git",
    tags: ["git", "branch", "clean", "delete", "merged"],
    dangerLevel: "caution",
    proTip: "Run \"git fetch -p\" first to prune dead remote-tracking branches."
  },
  {
    id: "git-show-root-dir",
    title: "Find Top-Level Git Root Directory Path",
    description: "Print absolute path to root of current Git repository.",
    command: "git rev-parse --show-toplevel",
    platforms: ["all"],
    category: "git",
    tags: ["git", "root", "path", "scripting"],
    dangerLevel: "safe",
    outputExample: "/home/user/workspace/cmds"
  },
  {
    id: "git-cherry-pick-commit",
    title: "Cherry-Pick Specific Commit",
    description: "Apply a specific commit from another branch onto HEAD.",
    command: "git cherry-pick {{commitHash}}",
    platforms: ["all"],
    category: "git",
    tags: ["git", "cherry-pick", "patch", "commit"],
    dangerLevel: "safe",
    params: [
      { name: "commitHash", label: "Commit Hash", default: "a1b2c3d", placeholder: "hash" }
    ]
  },
  {
    id: "git-interactive-rebase",
    title: "Interactive Rebase Last N Commits",
    description: "Reorder, edit, squash, or drop previous N commits.",
    command: "git rebase -i HEAD~{{count}}",
    platforms: ["all"],
    category: "git",
    tags: ["git", "rebase", "squash", "history", "clean"],
    dangerLevel: "caution",
    proTip: "Never rebase commits that have already been pushed to shared public branches!",
    params: [
      { name: "count", label: "Number of Commits", default: "3", placeholder: "3" }
    ]
  },
  {
    id: "git-count-lines-of-code",
    title: "Count Lines of Code in Repository",
    description: "Count total lines across all tracked repository files.",
    command: "git ls-files | xargs wc -l | sort -nr | head -n 25",
    platforms: ["all"],
    category: "git",
    tags: ["git", "loc", "code", "metrics", "stats"],
    dangerLevel: "safe",
    outputExample: "  1420 src/data/commands.ts\n   890 src/pages/index.astro\n   450 src/styles/global.css"
  },
  {
    id: "git-worktree-add",
    title: "Create Isolated Git Worktree",
    description: "Check out branch into separate directory without switching.",
    command: "git worktree add ../{{dirName}} {{branch}}",
    platforms: ["all"],
    category: "git",
    tags: ["git", "worktree", "branch", "parallel", "multitask"],
    dangerLevel: "safe",
    proTip: "Remove an abandoned worktree cleanly with \"git worktree remove ../{{dirName}}\".",
    params: [
      {
        name: "dirName",
        label: "New Folder",
        default: "cmds-hotfix",
        placeholder: "folder-name"
      },
      {
        name: "branch",
        label: "Branch Name",
        default: "hotfix/v1.0.1",
        placeholder: "branch-name"
      }
    ],
    outputExample: "Preparing worktree (checking out 'hotfix/v1.0.1')\nHEAD is now at 867a140 fix: stabilize terminal preview height"
  },
  {
    id: "git-worktree-list",
    title: "List Active Git Worktrees",
    description: "List linked git worktrees and checked-out branches.",
    command: "git worktree list",
    platforms: ["all"],
    category: "git",
    tags: ["git", "worktree", "list", "status"],
    dangerLevel: "safe",
    outputExample: "/workspace/cmds         867a140 [main]\n/workspace/cmds-hotfix  867a140 [hotfix/v1.0.1]"
  },
  {
    id: "git-bisect-run",
    title: "Automate Bug Search (git bisect)",
    description: "Run automated tests via bisect to isolate regressions.",
    command: "git bisect start {{badCommit}} {{goodCommit}} && git bisect run {{testCommand}}",
    platforms: ["all"],
    category: "git",
    tags: ["git", "bisect", "debug", "regression", "automation", "test"],
    dangerLevel: "caution",
    proTip: "When finished, return HEAD to the original branch with \"git bisect reset\".",
    params: [
      { name: "badCommit", label: "Bad Commit", default: "HEAD", placeholder: "HEAD" },
      {
        name: "goodCommit",
        label: "Known Good Commit",
        default: "v1.0.0",
        placeholder: "v1.0.0"
      },
      {
        name: "testCommand",
        label: "Test Command",
        default: "npm test",
        placeholder: "npm test"
      }
    ],
    outputExample: "Bisecting: 6 revisions left to test after this (roughly 3 steps)\nrunning 'npm test'\n...\nc4d12ef is the first bad commit\ncommit c4d12ef38914bca99281a052b801\nAuthor: Dev <dev@brain.fr>\nDate:   Wed Sep 9 14:20:00 2026 +0200"
  },
  {
    id: "git-cherry-pick-range",
    title: "Cherry-Pick Consecutive Commit Range",
    description: "Apply sequential commit range from another branch.",
    command: "git cherry-pick {{startCommit}}^..{{endCommit}}",
    platforms: ["all"],
    category: "git",
    tags: ["git", "cherry-pick", "range", "commits", "rebase"],
    dangerLevel: "caution",
    proTip: "The \"^\" on startCommit ensures the starting commit itself is included in the applied range.",
    params: [
      {
        name: "startCommit",
        label: "Start Commit SHA",
        default: "a1b2c3d",
        placeholder: "a1b2c3d"
      },
      {
        name: "endCommit",
        label: "End Commit SHA",
        default: "e5f6a7b",
        placeholder: "e5f6a7b"
      }
    ],
    outputExample: "[main 7f81a2b] feat: add observability SRE commands\n Author: Team Brain <team@brain.fr>\n 2 files changed, 140 insertions(+)\n[main 9c04d11] feat: add IaC cloud automation recipes\n Author: Team Brain <team@brain.fr>\n 2 files changed, 210 insertions(+)"
  }
];
