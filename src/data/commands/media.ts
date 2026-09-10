import type { TerminalCommand } from "../types";

/**
 * Media & ffmpeg (🎬)
 * Video compression, audio extraction, lossless cuts, gif conversion, and webp.
 */
export const mediaCommands: TerminalCommand[] = [
  {
    id: "ffmpeg-compress-mp4",
    title: "Compress Video to Web MP4",
    description: "Compress video using H.264 and CRF for web delivery.",
    command: "ffmpeg -i {{input}} -vcodec libx264 -crf {{crf}} -preset slow -acodec aac -b:a 128k {{output}}",
    platforms: ["all"],
    category: "media",
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
    category: "media",
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
    category: "media",
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
    category: "media",
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
    category: "media",
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
  }
];
