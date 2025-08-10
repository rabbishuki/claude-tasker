---
description: Execute development task with fresh state detection
---

# Tasker Implementation

1. **Re-read work.md fresh** - check for user edits to Development Task, Focus, Files, or Criteria (folders only)
2. **Acknowledge changes** - if user modified implementation details since tech-lead
3. **Verify required sections** exist: Development Task, Focus, Files to Change, Acceptance Criteria  
4. **Launch fullstack-developer** with current reality (not cached state)
5. **TDD enforced** but user controls progression

## Context Template
```
Focus: [Frontend|Backend from work.md]
Task: [Development Task]
Files: [Files to Change]
Criteria: [Acceptance Criteria]
⚠️ TDD Required
```

## Errors
- No Development Task → Run tech-lead
- No Focus specified → Tech-lead must add Frontend|Backend
- Missing sections → Invalid work.md structure