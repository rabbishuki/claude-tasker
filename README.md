# Tasker System Setup Guide

This guide shows how to set up and use the Tasker workflow system in your Claude Code projects.

## Quick Start

### 1. Verify Installation
The Tasker system should now be available in Claude Code. Test it:

```bash
# Start a new feature workflow
/tasker-start payment-processing

# Check status of existing features  
/tasker-status payment-processing

# Continue working on a feature
/tasker-continue payment-processing
```

### 2. File Structure
The system will create this structure:

```
your-project/
├── .claude/
│   ├── settings.json          # Hooks configuration
│   ├── commands/              # Tasker slash commands (user-level)
│   └── agents/               # Sub-agent definitions (user-level)
├── docs/features/            # Feature documentation
│   └── [feature-name]/
│       ├── drafts/           # AI-generated drafts
│       ├── approved/         # User-approved documents
│       └── status.json       # Current progress
└── CLAUDE.md                 # Project-specific guidelines
```

## Complete Workflow Example

### Step 1: Start New Feature
```bash
/tasker-start user-authentication
```

This will:
- Create feature directory structure
- Launch business-analyst sub-agent
- Create `docs/features/user-authentication/drafts/business-requirements.draft.md`

### Step 2: Review and Approve Documents
1. **Edit the draft file** directly in your editor
2. **Save your changes**
3. **Approve when ready**:
```bash
/tasker-approve user-authentication business-requirements
```

This automatically launches the next phase (product-manager).

### Step 3: Continue Through All Phases
Repeat the review-edit-approve cycle for:
1. Business Requirements → Product Specification  
2. Product Specification → Technical Architecture
3. Technical Architecture → Development Tasks
4. Development Tasks → Implementation
5. Implementation → QA Testing
6. QA Testing → Security Review

### Step 4: Implementation with TDD
When you reach the implementation phase:

```bash
# Start coding a specific task
/tasker-implement user-authentication TASK-001

# The system will enforce TDD:
# 1. Write failing test first (Red)
# 2. Implement minimal code (Green) 
# 3. Refactor if valuable (Refactor)
```

### Step 5: Track Progress
```bash
/tasker-status user-authentication
```

Shows current phase, completed work, and next actions.

## Available Commands Reference

### Workflow Commands
- `/tasker-start [feature-name]` - Begin new feature workflow
- `/tasker-continue [feature-name]` - Resume from current phase
- `/tasker-status [feature-name]` - Show detailed progress
- `/tasker-approve [feature-name] [document-type]` - Approve drafts

### Implementation Commands
- `/tasker-implement [feature-name] [task-id]` - Code specific tasks with TDD

## Sub-Agent Roles

### Planning Phase
- **business-analyst** - Gathers comprehensive business requirements
- **product-manager** - Creates user-centered specifications
- **solution-architect** - Explores codebase and creates epic-level technical breakdown
- **tech-lead** - Creates detailed implementation tasks with specific file paths

### Implementation Phase  
- **frontend-developer** - React/TypeScript with strict TDD
- **backend-developer** - Node.js/Express with strict TDD

### Quality Phase
- **qa-engineer** - Comprehensive test planning
- **security-analyst** - Security review and vulnerability assessment

## TDD Enforcement

The system includes JavaScript hooks that enforce TDD discipline:

### Before Code Changes (`tdd-guard.js`)
- Prevents production code changes without corresponding tests
- Only active during implementation phase
- Checks for failing tests (Red phase requirement)

### After Code Changes (`auto-test.js`)
- Runs relevant tests after code modifications
- Updates feature status with file changes
- Maintains visibility into test status

### Context Injection (`inject-context.js`)
- Adds current project context to your prompts
- Shows active features and current phases
- Reminds about TDD requirements when coding

## Troubleshooting

### Common Issues

**"Draft file not found"**
- Make sure you saved the draft file after editing
- Check the exact file path in the error message

**"Phase progression blocked"**
- Use `/tasker-status [feature]` to see what's missing
- Ensure previous phases are approved before proceeding

**"TDD Guard blocked code change"**
- Write a failing test first before production code
- Make sure you're in the implementation phase
- Check that test files exist and are properly named

**"Cannot find feature"**
- Use `/tasker-status` without feature name to see all features
- Check that feature directory exists in `docs/features/`

### Recovery Options

**Corrupted state:**
```bash
# Delete status file and resume
rm docs/features/[feature-name]/status.json
/tasker-continue [feature-name]
```

**Reset feature:**
```bash
# Start over (keeps existing documents)
/tasker-start [feature-name]
```

## Advanced Usage

### Customizing for Your Project
Edit `CLAUDE.md` to add:
- Project-specific coding standards
- Technology stack preferences
- Custom testing requirements
- Team conventions

### Hook Configuration
The hooks are configured in `.claude/settings.json`. You can:
- Disable hooks by removing them
- Modify hook behavior by editing the JavaScript files
- Add custom hooks for your specific workflow

### Multiple Features in Parallel
The system supports multiple active features:
```bash
/tasker-start feature-a
/tasker-start feature-b
/tasker-status feature-a
/tasker-status feature-b
```

Each feature maintains independent state and progress.

## Integration with Development Tools

### Git Workflow
- Create feature branches: `git checkout -b feature/[feature-name]`
- Commit frequently during implementation
- Use conventional commits: `feat:`, `fix:`, `test:`, `docs:`

### Testing Integration
- Works with Jest, Vitest, or other npm test scripts
- Assumes `npm test` command is available
- Automatically runs tests after code changes

### IDE Integration
- Edit draft files directly in your IDE
- Files are standard Markdown - any editor works
- Use IDE's markdown preview for formatted viewing

## Best Practices

### For Team Usage
- **Review drafts thoroughly** - AI provides starting point, you refine
- **Customize for your domain** - add industry-specific requirements
- **Maintain coding standards** - enforce through TDD and code review
- **Document decisions** - capture rationale in approved documents

### For Individual Usage
- **Trust the process** - complete each phase before moving forward
- **Edit drafts extensively** - make them match your specific needs
- **Follow TDD religiously** - the hooks help enforce this
- **Keep features small** - easier to complete full workflow

The Tasker system guides you through proven development practices while maintaining flexibility for your specific project needs.