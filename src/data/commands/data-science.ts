import type { TerminalCommand } from "../types";

/**
 * Data Science & ML (📊)
 * Daily essentials for data scientists and ML engineers:
 * Jupyter & ipykernel, bash value_counts & CSV profiling, GPU VRAM triage,
 * DuckDB on Parquet, Streamlit dashboards, S3 sync, Git LFS, and Conda.
 */
export const dataScienceCommands: TerminalCommand[] = [
  {
    id: "jupyter-register-kernel",
    title: "Register Virtualenv/Conda as Jupyter Kernel",
    description: "Make your current active Python virtualenv or Conda environment appear in Jupyter's kernel dropdown menu.",
    command: "python -m ipykernel install --user --name={{envName}} --display-name=\"{{displayName}}\"",
    platforms: ["all"],
    category: "data-science",
    tags: ["jupyter", "ipykernel", "kernel", "notebook", "venv", "conda", "python"],
    dangerLevel: "safe",
    proTip: "Fixes the infamous issue where Jupyter Notebook doesn't see your newly installed packages. Run 'jupyter kernelspec list' to verify installed kernels.",
    params: [
      { name: "envName", label: "Kernel ID", default: "myenv", placeholder: "myenv" },
      { name: "displayName", label: "Display Name in Jupyter", default: "Python (myenv)", placeholder: "Python 3.11 (NLP)" }
    ],
    outputExample: "Installed kernelspec myenv in /home/user/.local/share/jupyter/kernels/myenv"
  },
  {
    id: "csv-bash-value-counts",
    title: "Calculate Value Counts on Huge CSV (Bash)",
    description: "Compute the equivalent of pandas 'df[col].value_counts().head(10)' directly in the terminal without loading multi-gigabyte files into RAM.",
    command: "tail -n +2 {{csvFile}} | cut -d'{{delimiter}}' -f{{col}} | sort | uniq -c | sort -nr | head -n {{top}}",
    platforms: ["linux", "macos"],
    category: "data-science",
    tags: ["csv", "value-counts", "frequency", "eda", "coreutils", "cut", "uniq", "sort"],
    dangerLevel: "safe",
    proTip: "'tail -n +2' skips the CSV header line so column titles are excluded from frequency counts.",
    params: [
      { name: "csvFile", label: "CSV File Path", default: "data/transactions.csv", placeholder: "data/file.csv" },
      { name: "delimiter", label: "Delimiter", default: ",", placeholder: "," },
      { name: "col", label: "Column Number (1-indexed)", default: "2", placeholder: "2" },
      { name: "top", label: "Top N Results", default: "10", placeholder: "10" }
    ],
    outputExample: "  142091 completed\n   48201 pending\n   12402 failed\n    3192 refunded"
  },
  {
    id: "csv-numbered-columns",
    title: "Print CSV Columns with Index Numbers",
    description: "Print each column name on its own numbered line (1 to N) to immediately identify column indices for awk, cut, or Pandas usecols.",
    command: "head -n 1 {{csvFile}} | tr '{{delimiter}}' '\\n' | nl",
    platforms: ["linux", "macos"],
    category: "data-science",
    tags: ["csv", "columns", "headers", "index", "nl", "inspect", "eda"],
    dangerLevel: "safe",
    proTip: "Indispensable when dealing with wide tables containing 50+ columns where finding column indices by eye is tedious.",
    params: [
      { name: "csvFile", label: "CSV File Path", default: "data/dataset.csv", placeholder: "data/dataset.csv" },
      { name: "delimiter", label: "Delimiter", default: ",", placeholder: "," }
    ],
    outputExample: "     1  id\n     2  user_id\n     3  event_type\n     4  created_at\n     5  revenue_usd"
  },
  {
    id: "dataset-row-count",
    title: "Count Records in Massive Dataset (wc -l)",
    description: "Check exactly how many lines and rows exist in a huge CSV, TSV, or JSONL file in seconds before reading it into memory.",
    command: "wc -l {{datasetPath}}",
    platforms: ["linux", "macos"],
    category: "data-science",
    tags: ["wc", "rows", "count", "dataset", "lines", "benchmark", "csv"],
    dangerLevel: "safe",
    params: [
      { name: "datasetPath", label: "Dataset Path", default: "data/large_dataset.csv", placeholder: "data/dataset.csv" }
    ],
    outputExample: "24819204 data/large_dataset.csv"
  },
  {
    id: "split-large-dataset",
    title: "Split Gigantic Dataset into Numbered Chunks",
    description: "Divide an unmanageable 50GB+ dataset into smaller chunks with a fixed row count for distributed or batch out-of-memory processing.",
    command: "split -l {{rowsPerChunk}} -d --additional-suffix=.csv {{inputFile}} {{chunkPrefix}}",
    platforms: ["linux", "macos"],
    category: "data-science",
    tags: ["split", "chunk", "batch", "dataset", "csv", "big-data", "memory"],
    dangerLevel: "safe",
    proTip: "The '-d' flag uses numeric suffixes (e.g. chunk_00, chunk_01) and '--additional-suffix' preserves the file extension.",
    params: [
      { name: "rowsPerChunk", label: "Rows Per Chunk", default: "100000", placeholder: "100000" },
      { name: "inputFile", label: "Source Dataset", default: "data/massive.csv", placeholder: "data/massive.csv" },
      { name: "chunkPrefix", label: "Output Prefix", default: "data/chunk_", placeholder: "data/chunk_" }
    ]
  },
  {
    id: "kill-zombie-gpu-vram",
    title: "Kill Zombie Processes Hogging GPU VRAM",
    description: "Find and terminate lingering Python/PyTorch processes holding onto CUDA memory after a notebook kernel or training script crashed.",
    command: "fuser -v /dev/nvidia* 2>/dev/null | awk '{for(i=1;i<=NF;i++) if($i ~ /^[0-9]+$/) print $i}' | xargs -r kill -9",
    platforms: ["linux"],
    category: "data-science",
    tags: ["gpu", "vram", "cuda", "kill", "oom", "fuser", "zombie", "nvidia", "cleanup"],
    dangerLevel: "caution",
    proTip: "The quickest fix for 'CUDA out of memory' errors when nvidia-smi shows VRAM occupied but no active user processes listed.",
    outputExample: "Killed 2 lingering processes (PID 4192, 4205) freeing 22.4 GB VRAM."
  },
  {
    id: "nvidia-smi-watch-vram",
    title: "Monitor Live GPU & VRAM Consumption",
    description: "Continuously refresh GPU compute utilization, core temperature, and allocated VRAM in real-time during model training or inference.",
    command: "watch -n 1 nvidia-smi",
    platforms: ["linux", "windows"],
    category: "data-science",
    tags: ["nvidia-smi", "gpu", "vram", "cuda", "memory", "training", "monitor"],
    dangerLevel: "safe",
    outputExample: "+-----------------------------------------------------------------------------------------+\n| NVIDIA-SMI 550.54.14              Driver Version: 550.54.14      CUDA Version: 12.4     |\n|-----------------------------------------+------------------------+----------------------+\n| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |\n| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |\n|=========================================+========================+======================|\n|   0  NVIDIA A100-SXM4-80GB          On  |   00000000:00:04.0 Off |                    0 |\n| N/A   52C    P0            284W / 400W  |   68412MiB / 81920MiB  |     94%      Default |"
  },
  {
    id: "jupyter-ssh-tunnel",
    title: "Tunnel Remote Cloud GPU Jupyter to Local Browser",
    description: "Open a background SSH tunnel forwarding a remote headless JupyterLab instance directly to your local workstation on localhost:8888.",
    command: "ssh -N -f -L {{localPort}}:localhost:{{remotePort}} {{user}}@{{host}}",
    platforms: ["all"],
    category: "data-science",
    tags: ["ssh", "tunnel", "jupyter", "remote", "gpu", "forward", "port", "aws", "gcp"],
    dangerLevel: "safe",
    proTip: "'-N' skips remote command execution and '-f' forks ssh into the background so your terminal remains free.",
    params: [
      { name: "localPort", label: "Local Port", default: "8888", placeholder: "8888" },
      { name: "remotePort", label: "Remote Port", default: "8888", placeholder: "8888" },
      { name: "user", label: "SSH User", default: "ubuntu", placeholder: "ubuntu" },
      { name: "host", label: "Remote Host", default: "gpu-instance.ec2.internal", placeholder: "hostname" }
    ]
  },
  {
    id: "jupyter-lab-remote",
    title: "Start Remote Headless JupyterLab Server",
    description: "Launch JupyterLab on a remote GPU compute instance listening on all network interfaces without spawning a local browser.",
    command: "jupyter lab --no-browser --port={{port}} --ip=0.0.0.0",
    platforms: ["all"],
    category: "data-science",
    tags: ["jupyter", "jupyterlab", "notebook", "remote", "gpu", "server", "python"],
    dangerLevel: "safe",
    params: [
      { name: "port", label: "Port", default: "8888", placeholder: "8888" }
    ],
    outputExample: "[I 2026-09-18 14:22:01.120 ServerApp] Jupyter Server 2.14.0 is running at:\n[I 2026-09-18 14:22:01.121 ServerApp] http://localhost:8888/lab?token=4a87b1c3e..."
  },
  {
    id: "jupyter-nbconvert-clear-output",
    title: "Strip Cell Outputs Before Git Commit",
    description: "Remove bulky binary chart images, cached dataframes, and widget state in-place to prevent Git repository bloat and merge conflicts.",
    command: "jupyter nbconvert --clear-output --inplace {{notebook}}",
    platforms: ["all"],
    category: "data-science",
    tags: ["jupyter", "git", "clean", "clean-output", "nbconvert", "diff", "bloat", "ipynb"],
    dangerLevel: "safe",
    proTip: "Install 'nbstripout' ('nbstripout --install') once in your repository to configure an automatic git pre-commit filter that strips outputs automatically.",
    params: [
      { name: "notebook", label: "Notebook Path", default: "model_training.ipynb", placeholder: "notebook.ipynb" }
    ]
  },
  {
    id: "jupyter-nbconvert-execute",
    title: "Execute Notebook Headless & Export to HTML Report",
    description: "Run all cells of a Jupyter notebook programmatically from CLI and export a self-contained HTML report with all charts and tables.",
    command: "jupyter nbconvert --to html --execute {{notebook}} --output={{outputHtml}}",
    platforms: ["all"],
    category: "data-science",
    tags: ["jupyter", "nbconvert", "batch", "headless", "report", "html", "pipeline", "automation"],
    dangerLevel: "safe",
    proTip: "Add '--ExecutePreprocessor.timeout=600' if notebook cells involve heavy model training or long database queries.",
    params: [
      { name: "notebook", label: "Notebook Path", default: "analysis.ipynb", placeholder: "analysis.ipynb" },
      { name: "outputHtml", label: "Output HTML", default: "report.html", placeholder: "report.html" }
    ]
  },
  {
    id: "streamlit-run-dashboard",
    title: "Launch Interactive Streamlit Web App / Dashboard",
    description: "Run a Streamlit Python dashboard listening on all network interfaces for sharing prototypes and interactive analytics with teams.",
    command: "streamlit run {{appFile}} --server.port={{port}} --server.address=0.0.0.0",
    platforms: ["all"],
    category: "data-science",
    tags: ["streamlit", "dashboard", "app", "python", "ui", "prototype", "data-app"],
    dangerLevel: "safe",
    params: [
      { name: "appFile", label: "Python App Script", default: "app.py", placeholder: "app.py" },
      { name: "port", label: "Port", default: "8501", placeholder: "8501" }
    ]
  },
  {
    id: "aws-s3-sync-dataset",
    title: "Sync Dataset Directory with AWS S3 Bucket",
    description: "Recursively download training datasets or upload model checkpoint directories to AWS S3 with automatic checksum delta comparison.",
    command: "aws s3 sync {{source}} {{destination}} --exclude \"{{excludePattern}}\"",
    platforms: ["all"],
    category: "data-science",
    tags: ["aws", "s3", "sync", "dataset", "cloud", "storage", "checkpoint"],
    dangerLevel: "safe",
    params: [
      { name: "source", label: "Source (S3 URI or local path)", default: "s3://my-ml-bucket/datasets/images_v2/", placeholder: "s3://bucket/path/" },
      { name: "destination", label: "Destination (local path or S3 URI)", default: "./data/images/", placeholder: "./data/" },
      { name: "excludePattern", label: "Exclude Pattern", default: "*.tmp", placeholder: "*.tmp" }
    ]
  },
  {
    id: "git-lfs-track-artifacts",
    title: "Track Large Datasets & Model Weights with Git LFS",
    description: "Configure Git Large File Storage (LFS) to track binary models, weights, and parquet datasets, keeping git commit history lightweight.",
    command: "git lfs track \"{{pattern}}\" && git add .gitattributes",
    platforms: ["all"],
    category: "data-science",
    tags: ["git", "lfs", "weights", "parquet", "models", "artifacts", "storage"],
    dangerLevel: "safe",
    proTip: "Run 'git lfs pull' on a fresh clone to download the actual binary files referenced by pointers.",
    params: [
      { name: "pattern", label: "File Glob Pattern", default: "*.parquet", placeholder: "*.parquet" }
    ]
  },
  {
    id: "duckdb-query-parquet",
    title: "Query Multi-Gigabyte Parquet Directly with DuckDB",
    description: "Run blazing-fast, vector-accelerated SQL queries directly against Parquet or Arrow datasets without loading into Pandas or a database.",
    command: "duckdb -c \"SELECT {{columns}} FROM read_parquet('{{parquetPath}}') LIMIT {{limit}};\"",
    platforms: ["all"],
    category: "data-science",
    tags: ["duckdb", "parquet", "sql", "analytics", "fast", "arrow", "query", "pandas"],
    dangerLevel: "safe",
    proTip: "DuckDB executes queries out-of-core, allowing you to filter and aggregate 100GB+ Parquet files on a standard 16GB RAM laptop.",
    params: [
      { name: "columns", label: "SQL Columns", default: "*", placeholder: "*" },
      { name: "parquetPath", label: "Parquet Path / Glob", default: "data/*.parquet", placeholder: "data/features.parquet" },
      { name: "limit", label: "Row Limit", default: "10", placeholder: "10" }
    ],
    outputExample: "┌─────────┬──────────────┬───────────────┬────────────┐\n│ user_id │ event_type   │ amount_usd    │ timestamp  │\n├─────────┼──────────────┼───────────────┼────────────┤\n│ 1048291 │ checkout     │ 142.50        │ 2026-09-18 │\n│ 2094182 │ add_to_cart  │  29.99        │ 2026-09-18 │\n└─────────┴──────────────┴───────────────┴────────────┘"
  },
  {
    id: "duckdb-summarize-dataset",
    title: "Profile Dataset Distributions & Nulls with DuckDB",
    description: "Instantly profile an entire Parquet or CSV file, generating column statistics including null percentage, min, max, mean, and quantiles.",
    command: "duckdb -c \"SUMMARIZE SELECT * FROM read_parquet('{{parquetPath}}');\"",
    platforms: ["all"],
    category: "data-science",
    tags: ["duckdb", "profile", "summary", "stats", "parquet", "nulls", "eda", "data-quality"],
    dangerLevel: "safe",
    params: [
      { name: "parquetPath", label: "Parquet Path", default: "data/features.parquet", placeholder: "data/features.parquet" }
    ]
  },
  {
    id: "shuf-sample-dataset",
    title: "Random Reservoir Sampling on Large Text/CSV Datasets",
    description: "Extract a random sample of N rows from a multi-gigabyte CSV while preserving the header row on line 1 without loading the dataset into RAM.",
    command: "head -n 1 {{inputFile}} > {{outputFile}} && tail -n +2 {{inputFile}} | shuf -n {{samples}} >> {{outputFile}}",
    platforms: ["linux", "macos"],
    category: "data-science",
    tags: ["shuf", "sample", "dataset", "csv", "jsonl", "reservoir", "prototype", "fast"],
    dangerLevel: "safe",
    params: [
      { name: "inputFile", label: "Source Dataset", default: "large_dataset.csv", placeholder: "source.csv" },
      { name: "outputFile", label: "Sampled Output", default: "sample_10k.csv", placeholder: "sample.csv" },
      { name: "samples", label: "Row Sample Count", default: "10000", placeholder: "10000" }
    ]
  },
  {
    id: "conda-export-no-builds",
    title: "Export Clean Platform-Agnostic Conda Environment",
    description: "Export an environment.yml file omitting OS-specific build hash suffixes so the environment can be recreated across Linux, macOS, and Windows.",
    command: "conda env export --no-builds | grep -v \"prefix:\" > {{outputYml}}",
    platforms: ["all"],
    category: "data-science",
    tags: ["conda", "environment", "export", "reproducibility", "python", "yml"],
    dangerLevel: "safe",
    proTip: "Omitting the local install prefix and platform build hashes allows teammates on Apple Silicon (arm64) and Linux (x86_64) to resolve dependencies successfully.",
    params: [
      { name: "outputYml", label: "Output YAML", default: "environment.yml", placeholder: "environment.yml" }
    ]
  },
  {
    id: "conda-create-env",
    title: "Create Clean Conda Environment with Python Version",
    description: "Initialize an isolated Conda or Mamba virtual environment pinned to a specific Python interpreter version.",
    command: "conda create -n {{envName}} python={{pyVersion}} -y",
    platforms: ["all"],
    category: "data-science",
    tags: ["conda", "create", "env", "python", "virtualenv"],
    dangerLevel: "safe",
    params: [
      { name: "envName", label: "Environment Name", default: "ds-py311", placeholder: "env-name" },
      { name: "pyVersion", label: "Python Version", default: "3.11", placeholder: "3.11" }
    ]
  },
  {
    id: "huggingface-download-model",
    title: "Download Model Weights from Hugging Face Hub",
    description: "Parallel-download full transformer weights, tokenizer configs, and safetensors directly to a local directory with automatic chunk resuming.",
    command: "huggingface-cli download {{modelId}} --local-dir {{localDir}} --local-dir-use-symlinks False",
    platforms: ["all"],
    category: "data-science",
    tags: ["huggingface", "hf", "download", "weights", "safetensors", "transformers", "llm"],
    dangerLevel: "safe",
    proTip: "For gated model weights (e.g. Llama 3, Gemma), run 'huggingface-cli login' first to cache your user access token.",
    params: [
      { name: "modelId", label: "Hugging Face Model ID", default: "mistralai/Mistral-7B-v0.1", placeholder: "org/model" },
      { name: "localDir", label: "Target Directory", default: "./models/mistral-7b", placeholder: "./models/model-name" }
    ]
  },
  {
    id: "tensorboard-launch",
    title: "Launch TensorBoard Visualization Dashboard",
    description: "Start TensorBoard to inspect PyTorch and TensorFlow loss curves, weight histograms, and model computation graphs in real-time.",
    command: "tensorboard --logdir={{logdir}} --port={{port}} --bind_all",
    platforms: ["all"],
    category: "data-science",
    tags: ["tensorboard", "pytorch", "tensorflow", "loss", "visualization", "deep-learning", "metrics"],
    dangerLevel: "safe",
    params: [
      { name: "logdir", label: "Log Directory", default: "./runs", placeholder: "./runs" },
      { name: "port", label: "Port", default: "6006", placeholder: "6006" }
    ]
  },
  {
    id: "mlflow-ui-start",
    title: "Launch MLflow Experiment Tracking Dashboard",
    description: "Start the MLflow tracking server locally to visualize model training loss curves, compare hyperparameter runs, and log model artifacts.",
    command: "mlflow ui --host 0.0.0.0 --port={{port}} --backend-store-uri {{storeUri}}",
    platforms: ["all"],
    category: "data-science",
    tags: ["mlflow", "tracking", "experiments", "hyperparameters", "ui", "metrics", "mlops"],
    dangerLevel: "safe",
    proTip: "Navigate to http://localhost:5000 to interactively compare runs, plot ROC curves, and download serialized model checkpoints.",
    params: [
      { name: "port", label: "Port", default: "5000", placeholder: "5000" },
      { name: "storeUri", label: "Backend Store URI", default: "./mlruns", placeholder: "./mlruns" }
    ]
  }
];
