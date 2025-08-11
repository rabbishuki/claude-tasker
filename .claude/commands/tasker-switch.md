---
description: Switch active business context
---

# Tasker Switch

**Usage**: `/tasker-switch`

## Process

1. **List available businesses** in `docs/business/`:
   ```
   Available businesses:
   1. user-management (3 features: 2 active, 1 completed)
   2. payment-processing (1 feature: 1 active) 
   3. notification-system (2 features: all completed)
   
   Current active: user-management
   
   Which business to switch to? (number or name):
   ```
2. **User selects** by number or name
3. **Update active business** in `.claude/active-business.txt`
4. **Confirm switch**:
   ```
   Switched to: payment-processing
   Available features:
   - checkout/ (5 tasks: 3 done, 2 pending)
   ```

## Success Criteria
- Active business switched
- Future commands will use new business context