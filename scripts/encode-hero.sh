#!/usr/bin/env bash
# Re-encode the hero video from the source .mov to web-optimised .mp4 and .webm.
# Run from the repo root: bash scripts/encode-hero.sh
set -euo pipefail

INPUT="apps/frontend/public/video/primary-commercial.mov"
OUT_MP4="apps/frontend/public/video/hero.mp4"
OUT_WEBM="apps/frontend/public/video/hero.webm"

if ! command -v ffmpeg &>/dev/null; then
  echo "Error: ffmpeg not found. Install it first:" >&2
  echo "  macOS:  brew install ffmpeg" >&2
  echo "  Ubuntu: sudo apt install ffmpeg" >&2
  exit 1
fi

echo "Encoding MP4 (H.264, AAC)..."
ffmpeg -i "$INPUT" \
  -c:v libx264 -crf 23 -preset slow -movflags +faststart \
  -c:a aac -b:a 128k \
  -y "$OUT_MP4"

echo "Encoding WebM (VP9, Opus)..."
ffmpeg -i "$INPUT" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 -deadline good -cpu-used 2 \
  -c:a libopus -b:a 128k \
  -y "$OUT_WEBM"

echo ""
echo "Done."
echo "  MP4:  $OUT_MP4  ($(du -sh "$OUT_MP4"  | cut -f1))"
echo "  WebM: $OUT_WEBM ($(du -sh "$OUT_WEBM" | cut -f1))"
