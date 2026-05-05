#!/usr/bin/env bash
# Download copyright-free priority card images from Unsplash (free for commercial use).
# Run from the repo root: bash scripts/download-priority-images.sh
# Requires: curl, ffmpeg
# All photos are Unsplash license — free to use commercially, no attribution required.
# Photo credit added to apps/frontend/public/images/CREDITS.md after download.

set -euo pipefail

DEST="apps/frontend/public/images/priorities"
mkdir -p "$DEST"

declare -A PHOTOS=(
  # Topic → Unsplash photo ID
  ["lobbyists"]="photo-1554232456-8727aae0cfa4"        # US Capitol / government building
  ["second-amendment"]="photo-1595590424283-b8f17842773f"  # Shooting range / firearm safety
  ["property-taxes"]="photo-1570129477492-45c003edd2be"    # Suburban home exterior
  ["faith-family"]="photo-1438232992991-995b671e4468"      # White church / faith community
  ["classroom"]="photo-1580582932707-520aed937b7b"         # Children in classroom
  ["law-enforcement"]="photo-1589652717521-10c0d092dea9"   # Police officer on duty
  ["protect-children"]="photo-1503676260728-1c00da094a0b"  # Child reading with books
)

for NAME in "${!PHOTOS[@]}"; do
  ID="${PHOTOS[$NAME]}"
  TMP="/tmp/${NAME}-raw.jpg"
  OUT="${DEST}/${NAME}.jpg"

  echo "Downloading ${NAME}..."
  curl -sL \
    -H "Accept: image/jpeg,image/*" \
    -H "User-Agent: Mozilla/5.0 (campaign-site-setup/1.0)" \
    "https://images.unsplash.com/${ID}?w=2400&h=1350&fit=crop&auto=format&q=85" \
    -o "$TMP"

  # Verify it's actually an image
  if ! file "$TMP" | grep -qi "image\|jpeg\|png"; then
    echo "  ⚠ Download failed for ${NAME} — check Unsplash ID or try manually:"
    echo "    https://unsplash.com/${ID}"
    rm -f "$TMP"
    continue
  fi

  # Resize to 1200×675 (16:9) and optimise
  ffmpeg -y -i "$TMP" \
    -vf "scale=1200:675:force_original_aspect_ratio=increase,crop=1200:675" \
    -q:v 3 "$OUT" 2>/dev/null

  SIZE=$(du -sh "$OUT" | cut -f1)
  echo "  ✓ Saved ${OUT} (${SIZE})"
  rm -f "$TMP"
done

echo ""
echo "Done. Commit the new images:"
echo "  git add apps/frontend/public/images/priorities/"
echo "  git commit -m 'chore: replace priority images with Unsplash free-license photos'"
