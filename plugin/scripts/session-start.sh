#!/usr/bin/env bash
# Prints a few lines that Claude Code adds to session context. Keep it short:
# this runs on every session for every PM.
PROFILE="$HOME/.pm-os/profile.json"
if [[ ! -f "$PROFILE" ]]; then
  echo "PM OS is installed but not set up for this PM. Suggest running /pm-os:setup before any PM OS skill."
  exit 0
fi
REPO=$(node -e 'try{process.stdout.write(require(process.argv[1]).repo_path||"")}catch{}' "$PROFILE")
if [[ -z "$REPO" || ! -d "$REPO/.git" ]]; then
  echo "PM OS profile has no valid repo_path. Suggest re-running /pm-os:setup."
  exit 0
fi
# Fast-forward only; never touch a PM's local edits. Quiet on failure (offline, dirty tree).
( cd "$REPO" && GIT_TERMINAL_PROMPT=0 GIT_SSH_COMMAND="ssh -o ConnectTimeout=5 -o BatchMode=yes" \
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=5 pull --ff-only --quiet >/dev/null 2>&1 ) || true
QUEUED=$(ls "$REPO/queue"/*.md 2>/dev/null | wc -l | tr -d ' ')
echo "PM OS shared context: $REPO/context/INDEX.md (read the index, load only the files you need). Candidates awaiting review: $QUEUED."
