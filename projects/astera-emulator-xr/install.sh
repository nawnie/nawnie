#!/usr/bin/env bash
set -euo pipefail

DESTINATION="${1:-./astera-emulator-xr}"
REPO="https://github.com/nawnie/nawnie.git"
SUBDIR="projects/astera-emulator-xr"
TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

if command -v git >/dev/null 2>&1; then
  git clone --depth 1 --filter=blob:none --sparse "$REPO" "$TMP_DIR/repo"
  git -C "$TMP_DIR/repo" sparse-checkout set "$SUBDIR"
  SOURCE="$TMP_DIR/repo/$SUBDIR"
elif command -v curl >/dev/null 2>&1 && command -v unzip >/dev/null 2>&1; then
  curl -L "https://github.com/nawnie/nawnie/archive/refs/heads/main.zip" -o "$TMP_DIR/main.zip"
  unzip -q "$TMP_DIR/main.zip" -d "$TMP_DIR/extract"
  SOURCE="$TMP_DIR/extract/nawnie-main/$SUBDIR"
else
  echo "Need either git, or curl + unzip." >&2
  exit 1
fi

rm -rf "$DESTINATION"
mkdir -p "$(dirname "$DESTINATION")"
cp -R "$SOURCE" "$DESTINATION"

echo "Astera Emulator XR downloaded to: $DESTINATION"
