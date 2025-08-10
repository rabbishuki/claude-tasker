---
description: Close and mark feature as done with backlog cleanup
---

# Tasker Close

**Purpose**: Mark feature as completed, migrate important backlog items, and clean up files.

## Process

1. **Verify feature exists** as folder `docs/features/YY-MM-DD-[feature-name]/`
2. **Read feature backlog** from `backlog.md`
3. **Ask user to select important items**:
   - Show all items from feature backlog grouped by section
   - Ask "Which of these should move to global backlog? (comma-separated numbers or 'none')"
4. **Migrate selected items** to `docs/backlog.md`
5. **Create done file** `docs/features/YY-MM-DD-[feature-name].md` with work.md contents
6. **Delete entire folder** `docs/features/YY-MM-DD-[feature-name]/`
7. **Confirm completion** with summary

## User Interaction
```
Feature backlog items:
## Product Features
1. [UX improvement A]
2. [Alternative flow B]

## Technical Concerns  
3. [Performance issue C]
4. [Architecture concern D]

## Development Tasks
5. [Technical debt E]
6. [Future enhancement F]

Which items should move to global backlog? (numbers: 1,3,6 or 'none'): 
```

## Success Criteria
- Single `.md` file created with completed work
- Folder completely removed
- Selected backlog items moved to global backlog
- Clear distinction: folders = active, files = done