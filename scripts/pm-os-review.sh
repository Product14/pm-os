#!/usr/bin/env bash
# The one entry point a scheduler runs. Repairs fixable rejects, reviews the
# context queue, then reviews skill proposals. Each step commits its own result.
#   bash scripts/pm-os-review.sh [--push]
set -euo pipefail
cd "$(dirname "$0")/.."
PUSH="${1:-}"
git pull --ff-only -q 2>/dev/null || true
node scripts/repair.mjs
node scripts/review-context.mjs --commit $PUSH
node scripts/review-skills.mjs --commit $PUSH
