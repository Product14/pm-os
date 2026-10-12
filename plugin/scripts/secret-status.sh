#!/usr/bin/env bash
# Reports which keys in a secrets file are filled, without printing values.
#   bash secret-status.sh <file-name> KEY1 KEY2 ...
file="$HOME/.pm-os/$1"; shift
for key in "$@"; do
  v=$(grep -E "^$key=" "$file" 2>/dev/null | head -1 | cut -d= -f2-)
  if [ -n "$v" ]; then echo "$key: filled"; else echo "$key: empty"; fi
done
