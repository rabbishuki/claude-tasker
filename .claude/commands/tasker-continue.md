---
description: Continue feature workflow with smart next-step detection
---

# Tasker Continue

**Usage**: `/tasker-continue [feature-name]` or `/tasker-continue [business-name] [feature-name]`

## Process

1. **Determine context**:
   - Use active business from `.claude/active-business.txt`
   - If specified: use `[business-name]` parameter
2. **Read current state** from `docs/business/*/features/[feature-name]/`
3. **Detect manual changes** - acknowledge if user edited since last run
4. **Launch next agent** based on current reality:
   - No `business.md` → `business-analyst`
   - Empty `tasks.md` → `product-manager`
   - No task marked `[~]` → Ask user which task to start (mark as `[~]`)
   - Task marked `[~]` but no `task-#.md` → `tech-lead`
   - Task marked `[~]` with `task-#.md` → `fullstack-developer`
   - All tasks `[x]` → Ready for `/tasker-close`

**User can edit any file anytime, then resume with /tasker-continue**