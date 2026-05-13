#!/bin/bash
# Downloads iA Writer Mono (open source) from the official iA GitHub release.
# Run once: bash scripts/download-fonts.sh

set -e

FONT_DIR="public/fonts"
mkdir -p "$FONT_DIR"

BASE="https://github.com/iaolo/iA-Fonts/raw/master/iA%20Writer%20Mono/Webfonts"

echo "Downloading iA Writer Mono webfonts..."
curl -L "$BASE/iAWriterMonoS-Regular.woff2"  -o "$FONT_DIR/iAWriterMonoS-Regular.woff2"
curl -L "$BASE/iAWriterMonoS-Italic.woff2"   -o "$FONT_DIR/iAWriterMonoS-Italic.woff2"
curl -L "$BASE/iAWriterMonoS-Bold.woff2"     -o "$FONT_DIR/iAWriterMonoS-Bold.woff2"
echo "Done. Fonts saved to $FONT_DIR/"
