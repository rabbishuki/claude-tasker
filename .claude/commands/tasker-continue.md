---
description: Continue feature workflow with fresh state detection
---

# Tasker Continue

**Always re-read files fresh - never assume cached state**

1. **Read current state** from `docs/features/*-[feature-name]/work.md` (folders only)
2. **Detect manual changes** - acknowledge if user edited since last run
3. **Launch next agent** based on current reality:
   - No Business Need → `business-analyst`
   - No User Experience → `product-manager`  
   - No Technical Approval → `solution-architect`
   - Architecture Rejected → Guide to product manager
   - No Development Task → `tech-lead`
   - No Implementation → `/tasker-implement`
   - No "✅ QA APPROVED" → `qa-engineer`
   - No "✅ SECURITY APPROVED" → `security-analyst`
   - Complete → Show backlog options

**User can interrupt anytime, edit work.md, then resume**