import type { TerminalCommand } from "../types";

/**
 * AI & Media (🤖)
 * Local LLMs, embeddings, and media engineering:
 * Ollama, vLLM, Whisper, Aider, ffmpeg recipes, and ffprobe analysis.
 */
export const aiMediaCommands: TerminalCommand[] = [
{
    id: "ollama-run-local",
    title: "Run Local LLM with Ollama",
    description: "Run quantized model with local GPU acceleration in REPL.",
    command: "ollama run {{model}}",
    platforms: ["linux", "macos", "windows"],
    category: "ai-media",
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
    description: "Display loaded models, context sizes, and VRAM footprint.",
    command: "ollama ps",
    platforms: ["linux", "macos", "windows"],
    category: "ai-media",
    tags: ["ollama", "vram", "gpu", "memory", "ai", "metrics"],
    dangerLevel: "safe",
    proTip: "Models remain loaded for 5 minutes of idle time by default before memory is reclaimed.",
    outputExample: "NAME            ID              SIZE      PROCESSOR    UNTIL\nllama3.2:3b     a80c4f172edd    2.0 GB    100% GPU     4 minutes from now\nqwen2.5-coder   2b05b4883138    4.7 GB    100% GPU     2 minutes from now"
  },
  {
    id: "uv-pip-compile",
    title: "Compile Locked Requirements with uv",
    description: "Resolve Python dependencies and emit deterministic lockfile.",
    command: "uv pip compile {{requirementsIn}} -o {{requirementsTxt}}",
    platforms: ["all"],
    category: "ai-media",
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
    title: "Run Script in Ephemeral venv",
    description: "Run Python script in ephemeral venv with specified packages.",
    command: "uv run --with {{packages}} {{script}}",
    platforms: ["all"],
    category: "ai-media",
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
    description: "Download model checkpoints or GGUF files from Hugging Face.",
    command: "huggingface-cli download {{repoId}} {{filename}} --local-dir {{localDir}}",
    platforms: ["all"],
    category: "ai-media",
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
    description: "Stream tokens from OpenAI-compatible API via SSE.",
    command: "curl -s -N {{endpoint}}/v1/chat/completions -H \"Authorization: Bearer {{apiKey}}\" -H \"Content-Type: application/json\" -d '{\"model\":\"{{model}}\",\"messages\":[{\"role\":\"user\",\"content\":\"{{prompt}}\"}],\"stream\":true}'",
    platforms: ["all"],
    category: "ai-media",
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
  },
  {
    id: "ollama-pull-model",
    title: "Pull Model Weights with Ollama",
    description: "Download or update a local model checkpoint without starting an interactive session.",
    command: "ollama pull {{model}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ollama", "pull", "download", "llm", "ai", "models"],
    dangerLevel: "safe",
    proTip: "Pulls the latest quantization layer tags. Run periodically to get updated model revisions.",
    params: [
      { name: "model", label: "Model Tag", default: "qwen2.5-coder:7b", placeholder: "deepseek-r1:8b" }
    ],
    outputExample: "pulling manifest\npulling 8934d96d3f08... 100% ▕████████████████▏ 4.7 GB\npulling 8c023a23cb56... 100% ▕████████████████▏ 1.5 KB\nverifying sha256 digest\nwriting manifest\nsuccess"
  },
  {
    id: "ollama-list-models",
    title: "List Downloaded Ollama Models",
    description: "Inspect local model catalog, sizes, IDs, and modification timestamps.",
    command: "ollama list",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ollama", "list", "models", "storage", "ai", "disk"],
    dangerLevel: "safe",
    proTip: "Shows exact disk footprint per model to audit available storage before loading new weights.",
    outputExample: "NAME                    ID              SIZE      MODIFIED\nqwen2.5-coder:7b        2b05b4883138    4.7 GB    2 hours ago\ndeepseek-r1:8b          0aee6db4204c    4.9 GB    1 day ago\nllama3.2:3b             a80c4f172edd    2.0 GB    3 days ago\nnomic-embed-text:latest 0a109f422b47    274 MB    1 week ago"
  },
  {
    id: "ollama-create-modelfile",
    title: "Build Custom Model from Modelfile",
    description: "Package custom system prompts, temperature, and context length into a named model.",
    command: "ollama create {{customName}} -f {{modelfile}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ollama", "modelfile", "create", "prompt", "custom", "agent"],
    dangerLevel: "safe",
    proTip: "Use \"PARAMETER num_ctx 32768\" in your Modelfile to expand context window size for code repos.",
    params: [
      { name: "customName", label: "Target Name", default: "devops-assistant", placeholder: "code-agent" },
      { name: "modelfile", label: "Modelfile Path", default: "./Modelfile", placeholder: "./Modelfile" }
    ],
    outputExample: "transferring model data\nusing existing layer sha256:2b05b4883138\ncreating new layer sha256:d82fa189c42b\nwriting manifest\nsuccess"
  },
  {
    id: "ollama-rm-model",
    title: "Delete Local Model to Reclaim Disk",
    description: "Remove cached model weights and manifest from local Ollama storage.",
    command: "ollama rm {{model}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ollama", "delete", "rm", "disk", "clean", "ai"],
    dangerLevel: "caution",
    proTip: "Safely frees gigabytes of SSD space without interrupting active background processes.",
    params: [
      { name: "model", label: "Model Tag", default: "llama3.2:3b", placeholder: "model:tag" }
    ],
    outputExample: "deleted 'llama3.2:3b'"
  },
  {
    id: "vllm-serve-model",
    title: "Serve High-Throughput Model with vLLM",
    description: "Launch production OpenAI-compatible inference server with PagedAttention engine.",
    command: "vllm serve {{model}} --port {{port}} --tensor-parallel-size {{gpuCount}} --max-model-len {{maxModelLen}}",
    platforms: ["linux"],
    category: "ai-media",
    tags: ["vllm", "serve", "inference", "pagedattention", "gpu", "production", "openai"],
    dangerLevel: "safe",
    proTip: "Set --tensor-parallel-size to match your exact GPU count to shard model weights across cards.",
    params: [
      { name: "model", label: "Model ID", default: "Qwen/Qwen2.5-Coder-7B-Instruct", placeholder: "org/model" },
      { name: "port", label: "Port", default: "8000", placeholder: "8000" },
      { name: "gpuCount", label: "GPU Count", default: "1", placeholder: "1" },
      { name: "maxModelLen", label: "Max Context", default: "32768", placeholder: "32768" }
    ],
    outputExample: "INFO 09-12 11:10:00 [engine.py:312] Initializing an LLM engine with config: model='Qwen/Qwen2.5-Coder-7B-Instruct'\nINFO 09-12 11:10:04 [gpu_executor.py:94] # GPU blocks: 4210, # CPU blocks: 512\nINFO 09-12 11:10:05 [api_server.py:180] Route: /v1/chat/completions, Methods: POST\nINFO 09-12 11:10:05 [launcher.py:28] Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)"
  },
  {
    id: "llama-cpp-server",
    title: "Serve GGUF Model with llama-server",
    description: "Lightweight OpenAI-compatible C/C++ HTTP server with GPU layer offloading.",
    command: "llama-server -m {{modelPath}} -c {{ctxSize}} --port {{port}} -ngl {{gpuLayers}}",
    platforms: ["linux", "macos", "windows"],
    category: "ai-media",
    tags: ["llama-cpp", "gguf", "server", "metal", "cuda", "vram", "c++"],
    dangerLevel: "safe",
    proTip: "Use -ngl 99 to offload all transformer layers into GPU VRAM (Metal on macOS or CUDA on Linux/Windows).",
    params: [
      { name: "modelPath", label: "GGUF File", default: "./models/qwen2.5-coder.gguf", placeholder: "./model.gguf" },
      { name: "ctxSize", label: "Context Window", default: "8192", placeholder: "8192" },
      { name: "port", label: "Port", default: "8080", placeholder: "8080" },
      { name: "gpuLayers", label: "GPU Layers", default: "99", placeholder: "99" }
    ],
    outputExample: "llama_model_load: offloaded 33/33 layers to Metal GPU\nllama_server: HTTP server listening at http://127.0.0.1:8080\nllama_server: OpenAI compatible API available at /v1"
  },
  {
    id: "llama-cpp-cli",
    title: "CLI Prompt Inference with llama-cli",
    description: "Run one-shot GGUF inference directly from terminal with no daemon required.",
    command: "llama-cli -m {{modelPath}} -p \"{{prompt}}\" -n {{maxTokens}} -ngl {{gpuLayers}} --temp {{temp}}",
    platforms: ["linux", "macos", "windows"],
    category: "ai-media",
    tags: ["llama-cpp", "cli", "gguf", "inference", "one-shot", "terminal"],
    dangerLevel: "safe",
    proTip: "Perfect for lightweight terminal automation without keeping a background server running.",
    params: [
      { name: "modelPath", label: "GGUF File", default: "./models/llama3.2-3b.gguf", placeholder: "./model.gguf" },
      { name: "prompt", label: "Prompt", default: "List 3 Linux commands to debug memory leaks:", placeholder: "Prompt..." },
      { name: "maxTokens", label: "Max Tokens", default: "256", placeholder: "256" },
      { name: "gpuLayers", label: "GPU Layers", default: "99", placeholder: "99" },
      { name: "temp", label: "Temperature", default: "0.2", placeholder: "0.7" }
    ],
    outputExample: "1. valgrind --leak-check=full <binary>\n2. pmap -x <pid>\n3. smem -t -k -p\n\n[tokens: 62, eval time: 412ms, 150.48 tok/s]"
  },
  {
    id: "curl-ollama-embeddings",
    title: "Generate Vector Embeddings via curl",
    description: "Generate dense float vector embeddings for semantic search and RAG indexing.",
    command: "curl -s {{endpoint}}/api/embeddings -d '{\"model\":\"{{model}}\",\"prompt\":\"{{text}}\"}' | jq '.embedding[:5]'",
    platforms: ["all"],
    category: "ai-media",
    tags: ["embeddings", "vector", "rag", "ollama", "curl", "semantic-search"],
    dangerLevel: "safe",
    proTip: "Pipe output into vector databases like Qdrant, ChromaDB, or pgvector for fast cosine similarity lookups.",
    params: [
      { name: "endpoint", label: "Ollama URL", default: "http://localhost:11434", placeholder: "http://localhost:11434" },
      { name: "model", label: "Embedding Model", default: "nomic-embed-text", placeholder: "bge-m3" },
      { name: "text", label: "Input Text", default: "Microservices container orchestration", placeholder: "Query..." }
    ],
    outputExample: "[\n  -0.018240217,\n   0.049102431,\n  -0.081249112,\n   0.003912048,\n  -0.027189402\n]"
  },
  {
    id: "nvidia-smi-ai-monitor",
    title: "Monitor GPU Utilization & VRAM for AI",
    description: "Live poll GPU compute, allocated VRAM, and operating temperature in CSV loop.",
    command: "nvidia-smi --query-gpu=timestamp,name,utilization.gpu,utilization.memory,memory.used,memory.total,temperature.gpu --format=csv -l {{interval}}",
    platforms: ["linux", "windows"],
    category: "ai-media",
    tags: ["nvidia", "gpu", "vram", "cuda", "monitoring", "ai", "llm"],
    dangerLevel: "safe",
    proTip: "Add \"fuser -v /dev/nvidia*\" to identify lingering orphan Python processes locking VRAM.",
    params: [
      { name: "interval", label: "Interval Seconds", default: "1", placeholder: "1" }
    ],
    outputExample: "timestamp, name, utilization.gpu [%], utilization.memory [%], memory.used [MiB], memory.total [MiB], temperature.gpu\n2026/09/12 11:12:00.120, NVIDIA RTX 4090, 88 %, 74 %, 18420 MiB, 24564 MiB, 64\n2026/09/12 11:12:01.121, NVIDIA RTX 4090, 94 %, 82 %, 18420 MiB, 24564 MiB, 66"
  },
  {
    id: "hf-cli-scan-cache",
    title: "Audit Hugging Face Disk Cache",
    description: "Scan local HF cache to locate orphaned revisions and huge model checkpoints.",
    command: "huggingface-cli scan-cache",
    platforms: ["all"],
    category: "ai-media",
    tags: ["huggingface", "cache", "disk", "storage", "clean", "ai"],
    dangerLevel: "safe",
    proTip: "Use \"huggingface-cli delete-cache\" for an interactive terminal UI to cleanly free disk space.",
    outputExample: "REPO ID                              REPO TYPE SIZE ON DISK NB FILES LAST_ACCESSED LAST_MODIFIED\nbartowski/Llama-3.2-3B-Instruct-GGUF model        2.0G        1 2 hours ago   2 hours ago\nQwen/Qwen2.5-Coder-7B-Instruct       model       15.2G       12 1 day ago     1 day ago\nDone in 0.04s. Total disk usage: 17.2G."
  },
  {
    id: "hf-cli-login",
    title: "Authenticate Hugging Face Hub CLI",
    description: "Store API user access token to download gated foundation models.",
    command: "huggingface-cli login --token {{hfToken}} --add-to-git-credential",
    platforms: ["all"],
    category: "ai-media",
    tags: ["huggingface", "auth", "login", "token", "git", "ai"],
    dangerLevel: "safe",
    proTip: "Enabling --add-to-git-credential allows git cloning of private and gated model repositories without repeated password prompts.",
    params: [
      { name: "hfToken", label: "HF Token", default: "hf_xxxxxxxxxxxxxxxxxxxx", placeholder: "hf_..." }
    ],
    outputExample: "Token is valid (permission: read).\nYour token has been saved in /root/.cache/huggingface/token\nLogin successful."
  },
  {
    id: "whisper-transcribe-audio",
    title: "Transcribe Audio Locally with Whisper",
    description: "Convert audio file to timestamped text or subtitles using local OpenAI Whisper model.",
    command: "whisper {{audioFile}} --model {{modelSize}} --device {{device}} --output_format {{format}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["whisper", "audio", "transcribe", "stt", "speech-to-text", "ai"],
    dangerLevel: "safe",
    proTip: "Use format \"srt\" or \"vtt\" to immediately generate ready-to-use video subtitle tracks.",
    params: [
      { name: "audioFile", label: "Audio File", default: "meeting.mp3", placeholder: "audio.wav" },
      { name: "modelSize", label: "Model Size", default: "base", placeholder: "tiny, base, small, medium, turbo" },
      { name: "device", label: "Compute Device", default: "cuda", placeholder: "cuda or cpu" },
      { name: "format", label: "Output Format", default: "srt", placeholder: "txt, srt, vtt, json" }
    ],
    outputExample: "[00:00.000 --> 00:04.200] Welcome to our sprint review on architectural resilience.\n[00:04.200 --> 00:08.500] Today we are deploying zero-downtime database migrations.\nSaved ./meeting.srt"
  },
  {
    id: "aider-code-agent",
    title: "Launch Aider AI Pair Programming Agent",
    description: "Start interactive terminal coding agent with automatic git commits and file editing.",
    command: "aider --model {{model}} --auto-commits",
    platforms: ["all"],
    category: "ai-media",
    tags: ["aider", "agent", "coding", "git", "pair-programming", "ai-agent"],
    dangerLevel: "safe",
    proTip: "Add \"--architect\" mode to have a reasoning model plan changes before an editing model writes code.",
    params: [
      { name: "model", label: "Model", default: "ollama/qwen2.5-coder:7b", placeholder: "claude-3-5-sonnet-20241022" }
    ],
    outputExample: "Aider v0.70.0\nModel: ollama/qwen2.5-coder:7b\nGit repo: .git with 48 files\nRepo-map: using 1024 tokens\nUse /help to see commands, run /add <file> to add files to the chat.\n\n> "
  },
  {
    id: "qdrant-health-check",
    title: "Inspect Qdrant Vector Collection",
    description: "Query vector database HTTP API for collection status, vector count, and segments.",
    command: "curl -s {{endpoint}}/collections/{{collection}} | jq '.result | {status, vectors_count, segments_count}'",
    platforms: ["all"],
    category: "ai-media",
    tags: ["qdrant", "vector", "database", "rag", "search", "ai"],
    dangerLevel: "safe",
    proTip: "Check vectors_count and status to confirm background indexing has finished before serving queries.",
    params: [
      { name: "endpoint", label: "Qdrant URL", default: "http://localhost:6333", placeholder: "http://localhost:6333" },
      { name: "collection", label: "Collection Name", default: "knowledge_base", placeholder: "docs" }
    ],
    outputExample: "{\n  \"status\": \"green\",\n  \"vectors_count\": 124500,\n  \"segments_count\": 8\n}"
  },
{
    id: "ffmpeg-compress-mp4",
    title: "Compress Video to Web MP4",
    description: "Compress video using H.264 and CRF for web delivery.",
    command: "ffmpeg -i {{input}} -vcodec libx264 -crf {{crf}} -preset slow -acodec aac -b:a 128k {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "video", "compress", "mp4", "h264"],
    dangerLevel: "safe",
    proTip: "CRF scale is 0–51. 18 is visually lossless, 23 is default, and 28 yields small file sizes.",
    params: [
      {
        name: "input",
        label: "Input Video",
        default: "raw_recording.mov",
        placeholder: "input.mov"
      },
      { name: "crf", label: "CRF (18-28)", default: "23", placeholder: "23" },
      {
        name: "output",
        label: "Output File",
        default: "compressed.mp4",
        placeholder: "output.mp4"
      }
    ]
  },
  {
    id: "ffmpeg-video-to-gif",
    title: "Convert Video to High-Res GIF",
    description: "Generate optimal palette for smooth, unpixelated GIF.",
    command: "ffmpeg -i {{input}} -vf \"fps={{fps}},scale={{width}}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse\" {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "gif", "convert", "palette", "readme"],
    dangerLevel: "safe",
    proTip: "Two-pass palette generation eliminates color banding and produces pristine 256-color palettes.",
    params: [
      { name: "input", label: "Input Video", default: "demo.mp4", placeholder: "input.mp4" },
      { name: "fps", label: "Framerate", default: "15", placeholder: "15" },
      { name: "width", label: "Width (px)", default: "800", placeholder: "800" },
      { name: "output", label: "Output GIF", default: "demo.gif", placeholder: "output.gif" }
    ]
  },
  {
    id: "ffmpeg-extract-audio",
    title: "Extract Audio from Video",
    description: "Strip video track and export audio without re-encoding.",
    command: "ffmpeg -i {{input}} -vn -acodec libmp3lame -q:a 2 {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "audio", "mp3", "extract", "sound"],
    dangerLevel: "safe",
    proTip: "To copy the audio stream losslessly without re-encoding at all, use \"-vn -c:a copy audio.m4a\".",
    params: [
      { name: "input", label: "Input Video", default: "podcast.mp4", placeholder: "video.mp4" },
      { name: "output", label: "Output Audio", default: "audio.mp3", placeholder: "audio.mp3" }
    ]
  },
  {
    id: "ffmpeg-lossless-cut",
    title: "Trim Video Without Re-Encoding",
    description: "Cut video segment losslessly using stream copy.",
    command: "ffmpeg -ss {{startTime}} -to {{endTime}} -i {{input}} -c copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "cut", "trim", "lossless", "fast"],
    dangerLevel: "safe",
    proTip: "Placing -ss before -i uses fast keyframe seeking, enabling instantaneous cut times.",
    params: [
      {
        name: "startTime",
        label: "Start (HH:MM:SS)",
        default: "00:01:15",
        placeholder: "00:00:30"
      },
      {
        name: "endTime",
        label: "End (HH:MM:SS)",
        default: "00:02:40",
        placeholder: "00:01:30"
      },
      { name: "input", label: "Input File", default: "movie.mp4", placeholder: "input.mp4" },
      { name: "output", label: "Output File", default: "clip.mp4", placeholder: "clip.mp4" }
    ]
  },
  {
    id: "media-screen-record-cli",
    title: "Record Screen to MP4 (ffmpeg)",
    description: "Capture desktop screen directly to MP4 via CLI.",
    command: "ffmpeg -f x11grab -video_size {{resolution}} -framerate {{fps}} -i :0.0 -c:v libx264 -preset ultrafast {{output}}",
    platforms: ["linux"],
    category: "ai-media",
    tags: ["ffmpeg", "record", "screen", "screencast", "video"],
    dangerLevel: "safe",
    proTip: "Press \"q\" in the terminal window to cleanly stop recording.",
    params: [
      {
        name: "resolution",
        label: "Resolution",
        default: "1920x1080",
        placeholder: "1920x1080"
      },
      { name: "fps", label: "Framerate", default: "30", placeholder: "30" },
      {
        name: "output",
        label: "Output File",
        default: "recording.mp4",
        placeholder: "screencast.mp4"
      }
    ],
    alternatives: [
      {
        platform: "macos",
        command: "ffmpeg -f avfoundation -i \"1:0\" -r {{fps}} {{output}}",
        note: "macOS AVFoundation"
      }
    ]
  },
  {
    id: "ffmpeg-convert-h265",
    title: "Encode Video with H.265 / HEVC",
    description: "Compress video using libx265 for roughly 50% bandwidth reduction over H.264.",
    command: "ffmpeg -i {{input}} -c:v libx265 -crf {{crf}} -preset medium -c:a aac -b:a 128k {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "h265", "hevc", "compress", "video", "codec"],
    dangerLevel: "safe",
    proTip: "A CRF of 28 in H.265 provides comparable visual quality to a CRF of 23 in H.264 at half the file size.",
    params: [
      { name: "input", label: "Input Video", default: "raw_footage.mp4", placeholder: "input.mp4" },
      { name: "crf", label: "CRF (20-30)", default: "28", placeholder: "28" },
      { name: "output", label: "Output File", default: "output_hevc.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "frame= 1840 fps= 48 q=28.0 size=   18420kB time=00:01:14.20 bitrate=2034.1kbits/s speed=1.92x\nvideo:17210kB audio:1180kB subtitle:0kB other streams:0kB global headers:2kB muxing overhead: 0.16%"
  },
  {
    id: "ffmpeg-convert-av1",
    title: "Encode Next-Gen AV1 Video",
    description: "Encode video using modern royalty-free AV1 codec via SVT-AV1.",
    command: "ffmpeg -i {{input}} -c:v libsvtav1 -crf {{crf}} -preset 5 -c:a libopus -b:a 96k {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "av1", "svt-av1", "codec", "video", "modern"],
    dangerLevel: "safe",
    proTip: "Preset 5 or 6 offers the best sweet spot between compression efficiency and CPU encoding speed.",
    params: [
      { name: "input", label: "Input Video", default: "source.mov", placeholder: "input.mov" },
      { name: "crf", label: "CRF (24-35)", default: "30", placeholder: "30" },
      { name: "output", label: "Output File", default: "video.av1.mp4", placeholder: "video.av1.mp4" }
    ],
    outputExample: "Svt[info]: SVT-AV1 Encoder Lib v2.1.0\nframe= 2400 fps= 34 q=30.0 size=   12400kB time=00:01:40.00 bitrate=1016.0kbits/s speed=1.42x"
  },
  {
    id: "ffmpeg-remux-stream-copy",
    title: "Remux MKV or AVI to MP4 (Instant)",
    description: "Change container format losslessly with zero re-encoding in under 2 seconds.",
    command: "ffmpeg -i {{input}} -c copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "remux", "mkv", "mp4", "lossless", "container"],
    dangerLevel: "safe",
    proTip: "Because this copies raw compressed packets without decoding frames, CPU usage is near 0% and conversion speed exceeds 200x.",
    params: [
      { name: "input", label: "Input MKV/AVI", default: "recording.mkv", placeholder: "input.mkv" },
      { name: "output", label: "Output MP4", default: "recording.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "frame= 3600 fps=0.0 q=-1.0 size=  142800kB time=00:02:00.00 bitrate=9748.2kbits/s speed= 214x\nvideo:138200kB audio:4500kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.07%"
  },
  {
    id: "ffmpeg-web-faststart",
    title: "Optimize MP4 for Web Streaming (Faststart)",
    description: "Move MP4 moov atom index to the beginning of the file for instant web playback.",
    command: "ffmpeg -i {{input}} -c copy -movflags +faststart {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "faststart", "moov", "web", "streaming", "html5"],
    dangerLevel: "safe",
    proTip: "Critical for web delivery. Without faststart, browsers must buffer the entire video before beginning playback.",
    params: [
      { name: "input", label: "Input Video", default: "rendered.mp4", placeholder: "input.mp4" },
      { name: "output", label: "Output File", default: "web_optimized.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f81] Starting second pass: moving the moov atom to the beginning of the file"
  },
  {
    id: "ffmpeg-scale-resize",
    title: "Scale Video Resolution",
    description: "Resize video to target width while preserving aspect ratio and macroblock parity.",
    command: "ffmpeg -i {{input}} -vf \"scale={{width}}:-2\" -c:a copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "scale", "resize", "resolution", "720p", "1080p"],
    dangerLevel: "safe",
    proTip: "Using -2 instead of -1 guarantees the calculated height is always an even number, satisfying H.264 macroblock constraints.",
    params: [
      { name: "input", label: "Input Video", default: "4k_raw.mp4", placeholder: "input.mp4" },
      { name: "width", label: "Width (px)", default: "1280", placeholder: "1280" },
      { name: "output", label: "Output Video", default: "720p_scaled.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Stream #0:0: Video: h264, yuv420p(progressive), 1280x720 [SAR 1:1 DAR 16:9], 60 fps"
  },
  {
    id: "ffmpeg-crop-video",
    title: "Crop Video Dimensions (e.g. 16:9 to 9:16)",
    description: "Crop specific rectangle out of video coordinates for vertical social formats.",
    command: "ffmpeg -i {{input}} -vf \"crop={{width}}:{{height}}:{{x}}:{{y}}\" -c:a copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "crop", "dimensions", "vertical", "shorts", "reels"],
    dangerLevel: "safe",
    proTip: "Using \"(in_w-out_w)/2\" for x automatically centers the horizontal crop window on 16:9 videos.",
    params: [
      { name: "input", label: "Input Video", default: "landscape_1080p.mp4", placeholder: "input.mp4" },
      { name: "width", label: "Crop Width", default: "1080", placeholder: "1080" },
      { name: "height", label: "Crop Height", default: "1920", placeholder: "1920" },
      { name: "x", label: "X Offset", default: "(in_w-out_w)/2", placeholder: "0" },
      { name: "y", label: "Y Offset", default: "0", placeholder: "0" },
      { name: "output", label: "Output Video", default: "vertical_shorts.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Stream #0:0 -> #0:0 (h264 (native) -> h264 (libx264))\n1080x1920 [SAR 1:1 DAR 9:16]"
  },
  {
    id: "ffmpeg-rotate-video",
    title: "Rotate Video (90° / 180° / 270°)",
    description: "Rotate video orientation using transpose filter without stretching pixels.",
    command: "ffmpeg -i {{input}} -vf \"transpose={{direction}}\" -c:a copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "rotate", "transpose", "orientation", "video"],
    dangerLevel: "safe",
    proTip: "Values: 1 = 90° clockwise, 2 = 90° counter-clockwise. For 180°, use -vf \"transpose=2,transpose=2\".",
    params: [
      { name: "input", label: "Input Video", default: "phone_sideways.mp4", placeholder: "input.mp4" },
      { name: "direction", label: "Direction (1=90CW, 2=90CCW)", default: "1", placeholder: "1" },
      { name: "output", label: "Output Video", default: "rotated_upright.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Stream #0:0: Video: h264, yuv420p(tv, bt709), 1080x1920, 30 fps"
  },
  {
    id: "ffmpeg-video-to-webp",
    title: "Convert Video to Animated WebP",
    description: "Generate lightweight animated WebP stickers with smaller file sizes than GIF.",
    command: "ffmpeg -i {{input}} -vcodec libwebp -filter:v \"fps={{fps}},scale={{width}}:-2\" -lossless 0 -compression_level 4 -q:v {{quality}} -loop 0 {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "webp", "animation", "gif", "sticker", "compress"],
    dangerLevel: "safe",
    proTip: "Animated WebP supports full 24-bit color plus alpha transparency and is typically 50–70% smaller than an equivalent GIF.",
    params: [
      { name: "input", label: "Input Video", default: "demo.mp4", placeholder: "demo.mp4" },
      { name: "fps", label: "Framerate", default: "15", placeholder: "15" },
      { name: "width", label: "Width (px)", default: "640", placeholder: "640" },
      { name: "quality", label: "Quality (1-100)", default: "75", placeholder: "75" },
      { name: "output", label: "Output WebP", default: "animation.webp", placeholder: "animation.webp" }
    ],
    outputExample: "Output #0, webp, to 'animation.webp':\n  Stream #0:0: Video: webp, yuv420p, 640x360, q=75, 15 fps\nvideo:842kB audio:0kB other streams:0kB"
  },
  {
    id: "ffmpeg-normalize-loudness",
    title: "Normalize Audio Loudness (EBU R128)",
    description: "Normalize audio to broadcast standards (-14 to -16 LUFS) for YouTube and podcasting.",
    command: "ffmpeg -i {{input}} -af \"loudnorm=I={{targetLufs}}:TP={{truePeak}}:LRA={{lra}}\" -c:v copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "audio", "loudness", "loudnorm", "ebu", "r128", "podcast"],
    dangerLevel: "safe",
    proTip: "EBU R128 loudness normalization prevents listener volume jumps across different scenes and speech clips.",
    params: [
      { name: "input", label: "Input Media", default: "podcast_raw.mp4", placeholder: "input.mp4" },
      { name: "targetLufs", label: "Target LUFS (-14 to -23)", default: "-16", placeholder: "-16" },
      { name: "truePeak", label: "True Peak (dBTP)", default: "-1.5", placeholder: "-1.5" },
      { name: "lra", label: "LRA Range", default: "11", placeholder: "11" },
      { name: "output", label: "Output File", default: "podcast_normalized.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "[Parsed_loudnorm_0 @ 0x7f92] Input Integrated: -23.4 LUFS\n[Parsed_loudnorm_0 @ 0x7f92] Output Integrated: -16.1 LUFS\n[Parsed_loudnorm_0 @ 0x7f92] Normalization gain applied: +7.3 dB"
  },
  {
    id: "ffmpeg-remove-audio",
    title: "Strip Audio Track (Mute Video)",
    description: "Remove all audio streams from video container losslessly.",
    command: "ffmpeg -i {{input}} -an -c:v copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "audio", "mute", "strip", "silent", "web"],
    dangerLevel: "safe",
    proTip: "The -an flag drops all audio tracks, saving space for background loops or silent autoplay web banners.",
    params: [
      { name: "input", label: "Input Video", default: "clip_with_noise.mp4", placeholder: "input.mp4" },
      { name: "output", label: "Output File", default: "silent_video.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Stream mapping:\n  Stream #0:0 -> #0:0 (copy)\nOutput #0, mp4, to 'silent_video.mp4'"
  },
  {
    id: "ffmpeg-replace-audio",
    title: "Replace Video Audio with New Track",
    description: "Mux new background audio track onto video and trim to shortest stream.",
    command: "ffmpeg -i {{videoInput}} -i {{audioInput}} -c:v copy -c:a aac -b:a 192k -map 0:v:0 -map 1:a:0 -shortest {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "audio", "replace", "mux", "soundtrack", "dub"],
    dangerLevel: "safe",
    proTip: "The -shortest flag terminates the output file as soon as the shortest stream ends.",
    params: [
      { name: "videoInput", label: "Video Source", default: "video.mp4", placeholder: "video.mp4" },
      { name: "audioInput", label: "Audio Source", default: "soundtrack.wav", placeholder: "soundtrack.wav" },
      { name: "output", label: "Output Video", default: "final_mixed.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Stream #0:0: Video (copy)\nStream #1:0: Audio -> aac (192k)\nOutput #0 completed with exit code 0"
  },
  {
    id: "ffmpeg-concat-demuxer",
    title: "Concat Multiple Videos Without Re-Encoding",
    description: "Stitch multiple video segments into single video file using concat demuxer.",
    command: "ffmpeg -f concat -safe 0 -i {{fileList}} -c copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "concat", "merge", "stitch", "combine", "video"],
    dangerLevel: "safe",
    proTip: "Create inputs.txt with format: file 'clip1.mp4' \\n file 'clip2.mp4'. All clips must share identical codecs and resolution.",
    params: [
      { name: "fileList", label: "List File (.txt)", default: "inputs.txt", placeholder: "inputs.txt" },
      { name: "output", label: "Output File", default: "joined.mp4", placeholder: "joined.mp4" }
    ],
    outputExample: "[concat @ 0x7f82] Auto-inserting h264_mp4toannexb bitstream filter\nMerged 4 files into joined.mp4 in 1.2s"
  },
  {
    id: "ffmpeg-burn-subtitles",
    title: "Burn Subtitles Hardcoded into Video",
    description: "Render SRT or ASS subtitles permanently onto video frames.",
    command: "ffmpeg -i {{input}} -vf \"subtitles={{subtitlesFile}}:force_style='FontSize=22,PrimaryColour=&H00FFFFFF&'\" -c:a copy {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "subtitles", "srt", "burn", "hardcode", "captions"],
    dangerLevel: "safe",
    proTip: "Essential for social video platforms (Instagram, LinkedIn, TikTok) where videos autoplay muted.",
    params: [
      { name: "input", label: "Input Video", default: "presentation.mp4", placeholder: "input.mp4" },
      { name: "subtitlesFile", label: "SRT File", default: "subtitles.srt", placeholder: "subtitles.srt" },
      { name: "output", label: "Output Video", default: "subtitled_burn.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Parsed_subtitles_0: Loaded 84 subtitles from subtitles.srt\nRendering hardcoded subtitles at 22pt"
  },
  {
    id: "ffmpeg-add-soft-subtitles",
    title: "Embed Soft Subtitles into MP4/MKV",
    description: "Add selectable subtitle track into video file without re-encoding video frames.",
    command: "ffmpeg -i {{input}} -i {{subtitlesFile}} -c copy -c:s mov_text -metadata:s:s:0 language={{lang}} {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "subtitles", "soft-subtitles", "mux", "language", "cc"],
    dangerLevel: "safe",
    proTip: "For MKV containers, use -c:s srt or -c:s ass. For MP4 containers, use -c:s mov_text.",
    params: [
      { name: "input", label: "Input Video", default: "movie.mp4", placeholder: "movie.mp4" },
      { name: "subtitlesFile", label: "Subtitles (.srt)", default: "english.srt", placeholder: "subs.srt" },
      { name: "lang", label: "Language Code", default: "eng", placeholder: "eng" },
      { name: "output", label: "Output File", default: "movie_with_subs.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Stream #1:0 -> #0:2 (subrip (native) -> mov_text (native))\nLanguage tag: eng (English)"
  },
  {
    id: "ffmpeg-extract-thumbnail",
    title: "Extract High-Resolution Poster Frame",
    description: "Capture a crisp, uncompressed image frame at an exact timestamp.",
    command: "ffmpeg -ss {{timestamp}} -i {{input}} -vframes 1 -q:v 2 {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "thumbnail", "poster", "frame", "screenshot", "image"],
    dangerLevel: "safe",
    proTip: "Placing -ss before -i seeks directly to the nearest keyframe before decoding, taking less than 50ms.",
    params: [
      { name: "timestamp", label: "Timestamp", default: "00:01:24.500", placeholder: "00:00:10" },
      { name: "input", label: "Input Video", default: "video.mp4", placeholder: "video.mp4" },
      { name: "output", label: "Output Image", default: "poster.jpg", placeholder: "thumbnail.jpg" }
    ],
    outputExample: "Output #0, image2, to 'poster.jpg':\n  Stream #0:0: Video: mjpeg, yuvj420p(pc, bt709), 1920x1080, q=2-31, 1 fps\nFrame 1 written to poster.jpg"
  },
  {
    id: "ffmpeg-generate-contact-sheet",
    title: "Generate Video Thumbnail Grid (Contact Sheet)",
    description: "Create tiled storyboard preview of video keyframes across playback.",
    command: "ffmpeg -i {{input}} -vf \"fps=1/{{intervalSeconds}},scale=320:-1,tile={{columns}}x{{rows}}\" {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "contact-sheet", "grid", "storyboard", "thumbnails"],
    dangerLevel: "safe",
    proTip: "Perfect for video indexing, previews, and quality control of long recordings.",
    params: [
      { name: "input", label: "Input Video", default: "webinar.mp4", placeholder: "input.mp4" },
      { name: "intervalSeconds", label: "Capture Interval (s)", default: "30", placeholder: "30" },
      { name: "columns", label: "Columns", default: "4", placeholder: "4" },
      { name: "rows", label: "Rows", default: "4", placeholder: "4" },
      { name: "output", label: "Output Image", default: "contact_sheet.png", placeholder: "sheet.png" }
    ],
    outputExample: "Tile filter initialized: 4x4 grid (16 tiles total)\n1280x720 canvas rendered to contact_sheet.png"
  },
  {
    id: "ffmpeg-change-speed",
    title: "Speed Up or Slow Down Video",
    description: "Change video and audio playback speed smoothly without pitch distortion.",
    command: "ffmpeg -i {{input}} -filter_complex \"[0:v]setpts={{videoPts}}*PTS[v];[0:a]atempo={{audioTempo}}[a]\" -map \"[v]\" -map \"[a]\" {{output}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffmpeg", "speed", "fast-forward", "slow-mo", "tempo", "pts"],
    dangerLevel: "safe",
    proTip: "For 2x speed: videoPts=0.5 and audioTempo=2.0. For 0.5x slow-mo: videoPts=2.0 and audioTempo=0.5.",
    params: [
      { name: "input", label: "Input Video", default: "recording.mp4", placeholder: "input.mp4" },
      { name: "videoPts", label: "Video PTS (0.5=2x, 2.0=0.5x)", default: "0.5", placeholder: "0.5" },
      { name: "audioTempo", label: "Audio Tempo (2.0=2x, 0.5=0.5x)", default: "2.0", placeholder: "2.0" },
      { name: "output", label: "Output Video", default: "2x_speed.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "setpts=0.5*PTS (duration halved)\natempo=2.0 (tempo doubled, pitch preserved)"
  },
  {
    id: "ffprobe-inspect-json",
    title: "Inspect Stream Metadata with ffprobe",
    description: "Parse codec, bitrate, resolution, framerate, and audio layout as JSON.",
    command: "ffprobe -v quiet -print_format json -show_format -show_streams {{input}}",
    platforms: ["all"],
    category: "ai-media",
    tags: ["ffprobe", "metadata", "json", "inspect", "streams", "codecs"],
    dangerLevel: "safe",
    proTip: "Easily parsed in Python, Node.js, or jq scripts for video processing pipelines.",
    params: [
      { name: "input", label: "Media File", default: "video.mp4", placeholder: "video.mp4" }
    ],
    outputExample: "{\n  \"streams\": [\n    {\n      \"codec_name\": \"h264\",\n      \"width\": 1920,\n      \"height\": 1080,\n      \"r_frame_rate\": \"60/1\",\n      \"bit_rate\": \"4821000\"\n    }\n  ],\n  \"format\": {\n    \"duration\": \"124.500000\",\n    \"size\": \"75024180\"\n  }\n}"
  },
  {
    id: "ffmpeg-hardware-accel-nvenc",
    title: "Hardware Accelerated Encoding (NVIDIA NVENC)",
    description: "Offload H.264/HEVC encoding to NVIDIA GPU hardware chip for 10x faster exports.",
    command: "ffmpeg -hwaccel cuda -i {{input}} -c:v h264_nvenc -preset p4 -cq {{cq}} -c:a copy {{output}}",
    platforms: ["linux", "windows"],
    category: "ai-media",
    tags: ["ffmpeg", "nvenc", "nvidia", "gpu", "cuda", "hardware", "speed"],
    dangerLevel: "safe",
    proTip: "Presets range from p1 (fastest) to p7 (highest quality). p4 is the sweet spot for speed and quality.",
    params: [
      { name: "input", label: "Input Video", default: "4k_recording.mov", placeholder: "input.mov" },
      { name: "cq", label: "Constant Quality (19-28)", default: "23", placeholder: "23" },
      { name: "output", label: "Output MP4", default: "fast_export.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Device: CUDA (NVIDIA GeForce RTX 4090)\nframe= 7200 fps= 485 q=23.0 size=  342000kB time=00:02:00.00 speed= 8.1x"
  },
  {
    id: "ffmpeg-hardware-accel-videotoolbox",
    title: "Hardware Accelerated Encoding (Apple Silicon)",
    description: "Use Apple VideoToolbox hardware encoder on macOS for zero CPU fan noise.",
    command: "ffmpeg -i {{input}} -c:v h264_videotoolbox -b:v {{bitrate}} -c:a copy {{output}}",
    platforms: ["macos"],
    category: "ai-media",
    tags: ["ffmpeg", "videotoolbox", "apple", "metal", "m1", "m2", "m3", "hardware"],
    dangerLevel: "safe",
    proTip: "Uses Apple Silicon hardware media engines to render 4K video at 150+ frames per second.",
    params: [
      { name: "input", label: "Input Video", default: "recording.mov", placeholder: "input.mov" },
      { name: "bitrate", label: "Target Bitrate", default: "5M", placeholder: "5M" },
      { name: "output", label: "Output MP4", default: "apple_export.mp4", placeholder: "output.mp4" }
    ],
    outputExample: "Encoder: h264_videotoolbox (Apple Silicon Media Engine)\nframe= 5400 fps= 168 q=-1.0 size=  184000kB time=00:01:30.00 speed= 2.8x"
  }
];
