#!/usr/bin/env bash
# Creates a private secrets file with empty keys (if missing) and opens it in
# TextEdit so the PM can paste values without a terminal or the chat.
# Never prints values.
#   bash secret-file.sh <file-name> KEY1 KEY2 ...
set -euo pipefail
dir="$HOME/.pm-os"; file="$dir/$1"; shift
mkdir -p "$dir"; chmod 700 "$dir"
touch "$file"; chmod 600 "$file"
for key in "$@"; do
  grep -q "^$key=" "$file" || printf '%s=\n' "$key" >> "$file"
done
open -e "$file" 2>/dev/null || echo "Open $file in any text editor."
echo "opened $file"
