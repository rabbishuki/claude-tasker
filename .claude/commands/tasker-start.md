---
description: Start new feature within business context
---

# Tasker Start

**Usage**: `/tasker-start [feature-name]` or `/tasker-start [business-name] [feature-name]`

## Process

1. **Determine business context**:
   - Use active business from `.claude/active-business.txt`
   - If specified: use `[business-name]` parameter
   - If multiple businesses exist and no active: ask user
2. **Check feature exists** in `docs/business/*/features/[feature-name]/` → redirect to `/tasker-continue`
3. **Create feature folder** `docs/business/YY-MM-DD-[business]/features/[feature-name]/`
4. **Create files**:
   - `tasks.md` (empty task list)
5. **Launch product-manager** to create initial tasks

## Success Criteria
- Feature folder created within correct business context
- Ready for product task breakdown