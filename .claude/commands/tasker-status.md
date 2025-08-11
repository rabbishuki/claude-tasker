---
description: Show business and feature progress
---

# Tasker Status

**Usage**: `/tasker-status` or `/tasker-status [feature-name]`

## Process

1. **Read active business** from `.claude/active-business.txt`
2. **Show business overview**:
   ```
   Active Business: user-management
   
   Features:
   - authentication/ (task 1/42: [~] in progress)
   - profile-settings/ (5 tasks: all [ ] pending)
   - user-roles.md (completed feature)
   
   Security Review: Pending (awaiting all features complete)
   ```
3. **If feature specified**: Show task breakdown from `tasks.md` with current progress
4. **Show next suggested action** based on current state

## Options
- No args: Active business overview with all features
- `[feature-name]`: Detailed task list for specific feature  
- `done`: List all completed features (.md files)
- `all`: Show all businesses (not just active)