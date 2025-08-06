---
description: Show current status and progress of a feature with actionable next steps
---

# Tasker Status

Display comprehensive status information for a feature's development workflow.

## Process

When user runs `/tasker-status [feature-name]`:

### 1. Validate Feature Exists
- Check if `docs/features/[feature-name]/` directory exists
- Verify `status.json` file is present and valid
- If not found, suggest available features or initialization

### 2. Parse Current State
Read and analyze:
- Current phase from status.json
- Completed phases array
- Available draft and approved documents
- Implementation task status (if in implementation phase)

### 3. Display Comprehensive Status

## Status Display Format

```
📊 Feature Status: [Feature Name]

Current Phase: 🚧 [Current Phase Name] ([X] of 7 phases)
Progress: ▓▓▓░░░░ [XX]%

┌─ Phase Status ─────────────────────────────────────────┐
│ ✅ Business Requirements    - Completed                 │
│ ✅ Product Specification    - Completed                 │  
│ 🚧 Technical Architecture   - In Progress               │
│ ⏳ Development Tasks        - Not Started               │
│ ⏳ Implementation          - Not Started               │
│ ⏳ QA Testing             - Not Started               │
│ ⏳ Security Review        - Not Started               │
└────────────────────────────────────────────────────────┘

Current Action Needed:
📄 Review: docs/features/[feature]/drafts/technical-architecture.draft.md
🎯 Next: Run `/tasker-approve [feature] technical-architecture` when ready

Documents:
✅ business-requirements.md
✅ product-specification.md  
🚧 technical-architecture.draft.md (pending approval)
⏳ development-tasks.draft.md (not created)
⏳ qa-test-plan.draft.md (not created)
⏳ security-review.draft.md (not created)
```

### 4. Phase-Specific Information

**Implementation Phase Status:**
When current phase is "implementation", show additional details:

```
🔨 Implementation Status:

Task Progress:
┌─ Development Tasks ────────────────────────────────────┐
│ ✅ TASK-001: User Authentication Setup                 │
│ 🚧 TASK-002: Payment Form Component (In Progress)      │
│ ⏳ TASK-003: API Integration                          │
│ ⏳ TASK-004: Database Schema Updates                  │
└────────────────────────────────────────────────────────┘

Current Implementation:
🔴 TDD Phase: Writing failing test for payment validation
👨‍💻 Developer: frontend-developer
📝 Next: User approval needed for test approach

Available Commands:
- `/tasker-implement [feature] TASK-003` - Start next task
- `/tasker-implement [feature] TASK-002` - Continue current task
```

**Completed Feature Status:**
When all phases are complete:

```
🎉 Feature Complete!

All 7 phases finished:
✅ Business Requirements    - [completion-date]
✅ Product Specification    - [completion-date]
✅ Technical Architecture   - [completion-date]
✅ Development Tasks        - [completion-date]
✅ Implementation          - [completion-date]
✅ QA Testing             - [completion-date]
✅ Security Review        - [completion-date]

🚀 Ready for Production Deployment!

Final Deliverables:
📁 All approved documents in: docs/features/[feature]/approved/
💻 Implemented code with 100% test coverage
🔒 Security review passed
✅ QA testing complete

Deployment checklist:
- [ ] Final code review
- [ ] Production environment setup
- [ ] Deployment pipeline ready
- [ ] Monitoring and alerts configured
```

### 5. Error Handling and Recovery

**Feature Not Found:**
```
❌ Feature '[feature-name]' not found

Available features:
📁 docs/features/
├── user-authentication/     (Phase: implementation)
├── payment-processing/      (Phase: qa-testing)  
└── notification-system/     (Phase: product-specification)

Commands:
- `/tasker-start [feature-name]` - Create new feature
- `/tasker-status [existing-feature]` - Check existing feature
```

**Corrupted Status:**
```
⚠️ Status file corrupted or missing

Detected state from file system:
✅ business-requirements.md (approved)
✅ product-specification.md (approved)
🚧 technical-architecture.draft.md (draft exists)

Suggested recovery:
1. Review current draft file
2. Run `/tasker-approve [feature] technical-architecture` if ready
3. Or run `/tasker-continue [feature]` to resume workflow

Would you like me to reinitialize the status file?
```

### 6. Helpful Information

**Workflow Guidance:**
```
💡 Next Steps Guide:

Current Phase: [phase-name]
What to do:
1. [Specific action needed]
2. [Next command to run]
3. [Expected outcome]

Need Help?
- `/tasker-continue [feature]` - Resume from current point
- `/tasker-start --help` - See all available commands
- Review draft files directly in your editor

Estimated Time Remaining: [estimate based on phase]
```

**Progress Metrics:**
```
📈 Progress Metrics:

Timeline:
🗓️ Started: [creation-date]
⏱️ Current Phase Duration: [time-in-current-phase]
📅 Last Activity: [last-approved-date]

Completion:
📊 Phases: [X]/7 complete ([XX]%)
📝 Documents: [X]/7 approved
⚡ Velocity: [phases-per-week] phases/week (if historical data available)
```

### 7. Integration Status

Show integration with other systems:
```
🔗 Integration Status:

Git Repository:
📊 Commits: [number] commits for this feature
🌿 Branch: feature/[feature-name] 
📋 Status: [X] files changed, [Y] tests added

Development Environment:
✅ Tests: All passing ([X] tests)
🏗️ Build: Successful
🔍 Linting: Clean
📦 Dependencies: Up to date
```

## Communication Style
- **Clear visual hierarchy** - use symbols and formatting effectively
- **Actionable information** - always tell user what to do next
- **Progress indicators** - show both current state and overall progress
- **Error guidance** - provide specific recovery steps
- **Helpful context** - include relevant file paths and commands

## Current Task
Display comprehensive status:
1. Validate feature exists and parse current state
2. Show visual progress indicators and phase status
3. Provide specific next actions and commands
4. Include helpful context and troubleshooting info
5. Handle errors gracefully with recovery suggestions