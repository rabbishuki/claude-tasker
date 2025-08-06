---
description: Approve a draft document and move to the next phase
---

# Tasker Approve

You handle the approval of draft documents and progression to the next workflow phase.

## Process

When user runs `/tasker-approve [feature-name] [document-type]`:

### 1. Validate Approval
- Check that the draft file exists in `docs/features/[feature-name]/drafts/`
- Verify the feature is in the correct phase for this document
- Ensure status.json exists and is valid

### 2. Move Document and Update Status
- Move the draft from `drafts/` to `approved/` (remove .draft from filename)
- Update `status.json`:
  - Add current phase to `completed_phases` array
  - Set `current_phase` to the next phase
  - Update `last_approved` timestamp

### 3. Progress to Next Phase
Automatically launch the next sub-agent based on phase progression:

**Phase Progression Map:**
- `business-requirements` → launch `product-manager` sub-agent
- `product-specification` → launch `solution-architect` sub-agent
- `technical-architecture` → launch `tech-lead` sub-agent
- `development-tasks` → ready for implementation phase (inform user to use `/tasker-implement`)
- `implementation` → launch `qa-engineer` sub-agent
- `qa-test-plan` → launch `security-analyst` sub-agent
- `security-review` → feature complete, ready for deployment

### 4. Handle Special Cases

**Implementation Phase Transition:**
When approving `development-tasks`:
- **If document is just an epic summary**: Auto-launch tech-lead again to create detailed tasks
- **If document contains detailed tasks**: Mark as approved and show implementation-ready message:

```
✅ Development tasks approved!

🚀 Ready for Implementation Phase

The tasks are now ready for development. Use:
- `/tasker-implement [feature-name] [task-id]` to start coding specific tasks
- `/tasker-status [feature-name]` to see all available tasks

Implementation will use strict TDD with frontend-developer and backend-developer sub-agents.
```

**Feature Completion:**
When approving `security-review`:
```
🎉 Feature Complete!

All phases finished for [feature-name]:
✅ Business Requirements
✅ Product Specification  
✅ Technical Architecture
✅ Development Tasks
✅ Implementation
✅ QA Testing
✅ Security Review

The feature is ready for deployment!
```

### 5. Error Handling

**Draft Not Found:**
```
❌ Error: Draft file not found

Expected: docs/features/[feature-name]/drafts/[document-type].draft.md

Make sure you've reviewed and saved the draft file first.
```

**Wrong Phase:**
```
❌ Error: Cannot approve [document-type] 

Current phase: [current-phase]
Expected phase: [expected-phase]

Use `/tasker-status [feature-name]` to see current state.
```

**Already Approved:**
```
⚠️ Warning: [document-type] already approved

This document is in the approved folder. Use `/tasker-status [feature-name]` to see current progress.
```

**Missing Prerequisites:**
```
❌ Error: Missing prerequisites

Cannot approve [document-type] because:
- [missing-document] is not approved yet

Complete previous phases first.
```

### 6. Status File Updates

Update `docs/features/[feature-name]/status.json`:

```json
{
  "current_phase": "product-specification",
  "completed_phases": ["business-requirements"],
  "last_approved": "2024-07-28T15:30:00Z",
  "feature_name": "[feature-name]",
  "created": "2024-07-28T10:00:00Z"
}
```

### 7. Sub-Agent Launch Protocol

When launching the next sub-agent, provide this context:
```
CONTEXT FOR [SUB-AGENT-NAME]:
Feature: [feature-name]
Previous Phase: [completed-phase] 
Current Phase: [new-phase]
Approved Documents Available:
- docs/features/[feature-name]/approved/[doc1].md
- docs/features/[feature-name]/approved/[doc2].md

Task: Create [new-document-type] based on approved requirements above.
Output: docs/features/[feature-name]/drafts/[new-document].draft.md
```

### 8. User Communication

**Successful Approval:**
```
✅ [Document-type] approved and moved to approved folder

📁 Moved: docs/features/[feature-name]/approved/[document-type].md
📊 Status: [X] of 7 phases complete
🚀 Next: [next-phase-description]

[Next sub-agent] is creating the [next-document]...
```

**Phase Completion:**
```
📄 The [role] has created [document-type].

Location: docs/features/[feature-name]/drafts/[document-type].draft.md

Please review and edit the draft file, then run:
`/tasker-approve [feature-name] [document-type]` when ready
```

## Current Task
Execute the approval process:
1. Validate the approval request and check prerequisites
2. Move document from drafts to approved folder
3. Update status tracking with new phase information
4. Launch appropriate next sub-agent or inform about next steps
5. Present new draft to user (if applicable)

Ensure the workflow progresses smoothly while maintaining quality gates.