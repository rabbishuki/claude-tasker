---
description: Continue working on an existing feature from where you left off with intelligent resumption
---

# Tasker Continue

Resume work on an existing feature from the current phase with intelligent state detection and recovery.

## Process

When user runs `/tasker-continue [feature-name]`:

### 1. Analyze Current State
- Read `docs/features/[feature-name]/status.json`
- Scan for existing draft and approved documents
- Detect any incomplete or corrupted states
- Determine the most logical resumption point

### 2. State Detection Logic

**Perfect State - Ready to Resume:**
- Status.json exists and is valid
- Current phase is clear
- No draft exists for current phase (need to create new work)

**Draft Awaiting Approval:**
- Draft file exists for current phase
- User needs to review and approve it

**Completed Phase Not Approved:**
- Phase work is done but not moved to approved folder
- Guide user through approval process

**Implementation Phase - Special Handling:**
- Multiple tasks in various states of completion
- Detect which tasks are complete vs in-progress
- Resume from appropriate task

**Corrupted State:**
- Status.json missing or invalid
- Conflicting file states
- Attempt intelligent recovery

### 3. Resumption Strategies

#### Strategy A: Resume Draft Review
```
📄 Found existing draft awaiting your review

Current Phase: [phase-name]
Draft Location: docs/features/[feature]/drafts/[document].draft.md

Actions:
1. Review and edit the draft file above
2. Run `/tasker-approve [feature] [document]` when ready to proceed

The [role] previously created this document. You can modify it directly or approve as-is.
```

#### Strategy B: Create Missing Work
```
🚀 Resuming [feature] at [phase-name] phase

No draft exists for current phase. Launching [sub-agent] to create [document-type]...

Context provided to [sub-agent]:
- Feature: [feature-name]  
- Approved documents: [list-of-approved-docs]
- Current task: Create [document-type]

[Sub-agent] will create: docs/features/[feature]/drafts/[document].draft.md
```

#### Strategy C: Implementation Resumption
```
🔨 Resuming Implementation Phase

Task Status Analysis:
✅ TASK-001: User Authentication Setup (Complete)
🚧 TASK-002: Payment Form Component (50% - tests written, implementation pending)
⏳ TASK-003: API Integration (Not started)
⏳ TASK-004: Database Schema Updates (Not started)

Resumption Options:
1. Continue TASK-002: `/tasker-implement [feature] TASK-002` 
2. Start TASK-003: `/tasker-implement [feature] TASK-003`

Recommendation: Continue TASK-002 (has failing tests waiting for implementation)
```

#### Strategy D: Intelligent Recovery
```
🔧 Attempting intelligent recovery...

Detected State:
✅ business-requirements.md (approved - [date])
✅ product-specification.md (approved - [date])  
🚧 technical-architecture.draft.md (draft exists)
❌ status.json (missing or corrupted)

Recovery Actions:
1. Reconstructing status.json from file system
2. Setting current phase to: technical-architecture
3. Resuming normal workflow

Status file recreated. You can now review the technical architecture draft.
```

### 4. Implementation Phase Special Logic

**Task State Detection:**
For each task in development-tasks.md, detect:
- **Not Started**: No test files or implementation files exist
- **Tests Written**: Test files exist but are failing (Red phase)
- **Implementation Started**: Some implementation exists, tests might be passing
- **Complete**: All acceptance criteria met, tests passing, task marked done

**Intelligent Task Resumption:**
```
🔍 Analyzing Task: TASK-002 (Payment Form Component)

State Detection:
📁 Files Found:
  - src/components/PaymentForm.test.tsx (exists, 3 tests)
  - src/components/PaymentForm.tsx (exists, partial implementation)

🧪 Test Status:
  - ✅ "should render payment form" (passing)
  - ❌ "should validate amount input" (failing)  
  - ❌ "should handle submission" (failing)

📋 Task Status: 🚧 In Progress (TDD Red phase)

Resumption Point:
The frontend-developer was in the middle of TDD cycle:
- 2 tests are failing (Red phase)
- Ready for implementation (Green phase)

Resume with: `/tasker-implement [feature] TASK-002`
```

### 5. Error Recovery Mechanisms

**Missing Status File:**
```python
def recover_status_from_filesystem(feature_name):
    """Reconstruct status.json from existing files"""
    approved_docs = scan_approved_folder()
    draft_docs = scan_drafts_folder() 
    
    # Determine current phase from highest completed phase
    phase_map = {
        'business-requirements': 1,
        'product-specification': 2,
        'technical-architecture': 3,
        'development-tasks': 4,
        'implementation': 5,
        'qa-test-plan': 6,
        'security-review': 7
    }
    
    current_phase = determine_current_phase(approved_docs, draft_docs, phase_map)
    return create_status_json(current_phase, approved_docs)
```

**Conflicting File States:**
```
⚠️ Conflicting file states detected

Issues Found:
- technical-architecture.md exists in both drafts/ and approved/
- status.json says current phase is 'product-specification' but technical-architecture is approved
- Multiple draft files exist for same phase

Resolution Options:
1. Use approved version and advance to next phase
2. Use draft version and mark previous phase incomplete  
3. Manual resolution required

Recommendation: [intelligent-suggestion-based-on-timestamps]
```

### 6. User Communication Patterns

**Successful Resumption:**
```
✅ Successfully resumed [feature-name]

Current Status: [phase-name] ([X]/7 phases complete)
Last Activity: [last-activity-date]
Next Action: [specific-action-needed]

Ready to continue where you left off!
```

**Multiple Options Available:**
```
🤔 Multiple resumption options available

Current Phase: implementation
Options:
1. Continue TASK-002 (Payment Form - in TDD Red phase)
2. Start TASK-003 (API Integration - ready to begin)
3. Review completed tasks and plan next steps

Which would you like to do?
- `/tasker-implement [feature] TASK-002` - Continue current task
- `/tasker-implement [feature] TASK-003` - Start fresh task  
- `/tasker-status [feature]` - See detailed status first
```

**Recovery Required:**
```
🔧 Recovery completed for [feature-name]

Issues Fixed:
✅ Recreated missing status.json
✅ Resolved conflicting file states  
✅ Synchronized phase tracking

Current State: Ready to resume at [phase-name]
Next Step: [specific-action]

The workflow can now continue normally.
```

### 7. Integration with Other Commands

**Seamless Handoffs:**
- If resumption determines a draft needs approval → guide to `/tasker-approve`
- If implementation tasks are ready → guide to `/tasker-implement`  
- If status is unclear → automatically show `/tasker-status` output
- If feature is complete → show completion summary

**Context Preservation:**
- Maintain all previous decisions and context
- Don't re-ask questions that were already answered
- Preserve task assignments and progress
- Keep implementation approaches consistent

## Current Task
Execute intelligent resumption:
1. Analyze current state comprehensively (files, status, tasks)
2. Detect the most logical resumption point
3. Handle any recovery needed for corrupted states
4. Resume workflow at appropriate point with proper context
5. Guide user clearly on next actions

Ensure the resumption feels seamless and intelligent, not like starting over.