import type { TerminalCommand } from "../types";

/**
 * AI & Agent CLI (🤖)
 * Ollama local models, uv Python tooling, huggingface-cli, vector stores, and streaming curl pipes.
 */
export const aiToolingCommands: TerminalCommand[] = [
  {
    id: "ollama-run-local",
    title: "Run Local LLM with Ollama",
    description: "Run quantized language model with local GPU acceleration in interactive REPL.",
    command: "ollama run {{model}}",
    platforms: ["linux", "macos", "windows"],
    category: "ai-tooling",
    tags: ["ollama", "llm", "ai", "local-ai", "agent", "model"],
    dangerLevel: "safe",
    proTip: "Add \"OLLAMA_NUM_PARALLEL=4\" when starting the Ollama server to handle concurrent agent tool calls.",
    params: [
      { name: "model", label: "Model Tag", default: "llama3.2:3b", placeholder: "llama3.2:3b" }
    ],
    outputExample: "pulling manifest\nverifying sha256 digest\nwriting manifest\nsuccess\n>>> Send a message (/? for help)"
  },
  {
    id: "ollama-ps-vram",
    title: "List Active Models & VRAM Usage",
    description: "Display language models loaded in memory, context sizes, and VRAM footprint.",
    command: "ollama ps",
    platforms: ["linux", "macos", "windows"],
    category: "ai-tooling",
    tags: ["ollama", "vram", "gpu", "memory", "ai", "metrics"],
    dangerLevel: "safe",
    proTip: "Models remain loaded for 5 minutes of idle time by default before memory is reclaimed.",
    outputExample: "NAME            ID              SIZE      PROCESSOR    UNTIL\nllama3.2:3b     a80c4f172edd    2.0 GB    100% GPU     4 minutes from now\nqwen2.5-coder   2b05b4883138    4.7 GB    100% GPU     2 minutes from now"
  },
  {
    id: "uv-pip-compile",
    title: "Compile Locked Requirements with uv",
    description: "Resolve Python dependencies and emit deterministic lockfile 10-100x faster.",
    command: "uv pip compile {{requirementsIn}} -o {{requirementsTxt}}",
    platforms: ["all"],
    category: "ai-tooling",
    tags: ["uv", "python", "pip", "lockfile", "dependencies", "agent"],
    dangerLevel: "safe",
    proTip: "Pass \"--generate-hashes\" for strict supply-chain tamper verification in production containers.",
    params: [
      {
        name: "requirementsIn",
        label: "Input Manifest",
        default: "pyproject.toml",
        placeholder: "pyproject.toml"
      },
      {
        name: "requirementsTxt",
        label: "Output Lockfile",
        default: "requirements.txt",
        placeholder: "requirements.txt"
      }
    ],
    outputExample: "Resolved 42 packages in 38ms\nPrepared 42 packages in 84ms\nInstalled 42 packages in 12ms\nWritten requirements.txt with 42 pinned packages."
  },
  {
    id: "uv-run-ephemeral",
    title: "Run Script with Ephemeral Dependencies",
    description: "Execute Python code in on-the-fly virtual environment with requested packages.",
    command: "uv run --with {{packages}} {{script}}",
    platforms: ["all"],
    category: "ai-tooling",
    tags: ["uv", "python", "ephemeral", "script", "agent", "automation"],
    dangerLevel: "safe",
    proTip: "Combine with \"--python 3.12\" to test against specific interpreter versions instantly.",
    params: [
      {
        name: "packages",
        label: "Pip Packages",
        default: "httpx,pydantic",
        placeholder: "package1,package2"
      },
      { name: "script", label: "Script Path", default: "main.py", placeholder: "script.py" }
    ],
    outputExample: "Creating virtualenv at: /root/.cache/uv/environments-ephemeral/9fa2...\nInstalled 2 packages in 24ms\n✓ Script execution completed in 0.32s"
  },
  {
    id: "huggingface-download",
    title: "Download Model Weights via CLI",
    description: "Download model checkpoints, tokenizers, or GGUFs from Hugging Face Hub.",
    command: "huggingface-cli download {{repoId}} {{filename}} --local-dir {{localDir}}",
    platforms: ["all"],
    category: "ai-tooling",
    tags: ["huggingface", "model", "gguf", "download", "ai", "llm"],
    dangerLevel: "safe",
    proTip: "Set HF_HUB_ENABLE_HF_TRANSFER=1 for multi-gigabit saturating download speeds.",
    params: [
      {
        name: "repoId",
        label: "Repository ID",
        default: "bartowski/Llama-3.2-3B-Instruct-GGUF",
        placeholder: "org/model"
      },
      {
        name: "filename",
        label: "File Name",
        default: "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
        placeholder: "model.gguf"
      },
      {
        name: "localDir",
        label: "Local Directory",
        default: "./models",
        placeholder: "./models"
      }
    ],
    outputExample: "Downloading Llama-3.2-3B-Instruct-Q4_K_M.gguf: 100%|██████████| 2.02G/2.02G [00:12<00:00, 168MB/s]\nSuccessfully downloaded file to ./models/Llama-3.2-3B-Instruct-Q4_K_M.gguf"
  },
  {
    id: "curl-llm-stream",
    title: "Stream LLM Chat Tokens via curl",
    description: "Stream tokens from OpenAI-compatible API endpoint via Server-Sent Events.",
    command: "curl -s -N {{endpoint}}/v1/chat/completions -H \"Authorization: Bearer {{apiKey}}\" -H \"Content-Type: application/json\" -d '{\"model\":\"{{model}}\",\"messages\":[{\"role\":\"user\",\"content\":\"{{prompt}}\"}],\"stream\":true}'",
    platforms: ["all"],
    category: "ai-tooling",
    tags: ["curl", "llm", "stream", "openai", "api", "sse", "ai-agent"],
    dangerLevel: "safe",
    proTip: "Use with jq or awk to strip the SSE \"data: \" prefix and format live token output in real-time.",
    params: [
      {
        name: "endpoint",
        label: "API Endpoint",
        default: "http://localhost:11434",
        placeholder: "http://localhost:11434"
      },
      { name: "apiKey", label: "API Key", default: "ollama", placeholder: "sk-..." },
      { name: "model", label: "Model Name", default: "llama3.2", placeholder: "llama3.2" },
      {
        name: "prompt",
        label: "User Prompt",
        default: "Explain zero-downtime deployments in 2 sentences",
        placeholder: "Hello..."
      }
    ],
    outputExample: "data: {\"choices\":[{\"delta\":{\"content\":\"Zero\"}}]}\ndata: {\"choices\":[{\"delta\":{\"content\":\"-downtime\"}}]}\ndata: {\"choices\":[{\"delta\":{\"content\":\" deployments\"}}]}\ndata: [DONE]"
  }
];
