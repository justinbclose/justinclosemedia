#!/bin/bash
# Prepare one video clip for the website.
# Usage: tools/optimize-video.sh "<source video>" <lowercase-name> [seconds to keep, default 6]
# Set PRESET=Preset1280x720 for sharper clips (e.g. drone). Creates site/video/<name>.mp4 (540p, H.264) and site/video/<name>.jpg (poster frame).
set -e
src="$1"; name="$2"; secs="${3:-6}"
[ -z "$src" ] || [ -z "$name" ] && { echo "Usage: tools/optimize-video.sh \"<source video>\" <lowercase-name>"; exit 1; }
root="$(cd "$(dirname "$0")/.." && pwd)"; out="$root/site/video"; mkdir -p "$out"
tmp="$(mktemp -d)"
avconvert --source "$src" --preset "${PRESET:-Preset960x540}" --duration "$secs" --output "$tmp/clip.mp4" --replace >/dev/null 2>&1
# Remove location tags (Apple stores them as ©xyz / ISO6709 text in the file header)
python3 -I "$root/tools/strip-video-location.py" "$tmp/clip.mp4"
mv "$tmp/clip.mp4" "$out/$name.mp4"
qlmanage -t -s 900 -o "$tmp" "$src" >/dev/null 2>&1
sips -s format jpeg -s formatOptions 75 "$tmp/$(basename "$src").png" --out "$out/$name.jpg" >/dev/null
rm -rf "$tmp"
echo "$name.mp4  $(du -h "$out/$name.mp4" | cut -f1)"
