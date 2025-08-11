---
description: Close feature and create consolidated documentation
---

# Tasker Close

**Usage**: `/tasker-close [feature-name]` or `/tasker-close [business-name] [feature-name]`

## Process

1. **Determine context** using active business or specified business-name
2. **Verify completion**: All tasks in `tasks.md` marked `[x]`
3. **Check for remaining features**: If this is the last feature in the business, trigger security review
4. **Show consolidation options**:
   ```
   Consolidate [feature-name] tasks:
   
   1. Add login button - task-1.md
   2. Add logout feature - task-2.md  
   3. Password reset flow - task-3.md
   
   Which tasks to include in [feature-name].md?
   - Enter numbers (1,3) 
   - 'all' for everything
   - 'none' for just feature summary
   ```
4. **Create consolidated file** `docs/business/*/features/[feature-name].md`:
   ```markdown
   # Feature: [feature-name]
   
   **Business Context**: [from business.md]
   **Completed Tasks**: [selected task details]
   **Status**: Completed [date]
   ```
5. **Delete feature folder** `docs/business/*/features/[feature-name]/`
6. **If last feature**: Launch security-analyst for final business review

## Success Criteria
- Feature folder removed, consolidated file created
- If last feature: Security review initiated or business marked complete
- Ready for future iterations on same feature