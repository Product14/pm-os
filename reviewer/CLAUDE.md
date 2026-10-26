# reviewer/: the automatic context reviewer (owner only)

`RUBRIC.md` is version-locked. Change it only in its own PR: bump `rubric_version`, then run `node scripts/eval-reviewer.mjs`; every case must pass with 0 false merges before the reviewer can merge anything again. `vetoes.md` is written by `scripts/apply-vetoes.mjs`.
