#!/bin/bash
# Resize one photo for the website.
# Usage: tools/optimize-photo.sh "<source file>" <lowercase-name>
# Creates site/images/portfolio/<name>.jpg (2400px) and <name>-sm.jpg (1000px).

set -e
src="$1"
name="$2"
if [ -z "$src" ] || [ -z "$name" ]; then
  echo "Usage: tools/optimize-photo.sh \"<source file>\" <lowercase-name>"
  exit 1
fi

out="$(cd "$(dirname "$0")/.." && pwd)/site/images/portfolio"
mkdir -p "$out"

# Never enlarge: cap each size at the photo's own long edge.
long=$(sips -g pixelWidth -g pixelHeight "$src" | awk '/pixel/{if($2>m)m=$2}END{print m}')
lg=$(( long < 2400 ? long : 2400 ))
sm=$(( long < 1000 ? long : 1000 ))

sips -s format jpeg -s formatOptions 82 -Z "$lg" "$src" --out "$out/$name.jpg" >/dev/null
sips -s format jpeg -s formatOptions 78 -Z "$sm" "$src" --out "$out/$name-sm.jpg" >/dev/null

size=$(sips -g pixelWidth -g pixelHeight "$out/$name.jpg" | awk '/pixel/{printf $2" "}')
echo "$name.jpg  ($size)"
