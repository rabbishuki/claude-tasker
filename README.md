# Tasker System

Micro-task development workflow for Claude Code with specialized AI agents. Optimized for startup velocity with focused, single-task iterations.

## Installation

### Option 1: NPX
```bash
npx claude-tasker init
```

### Option 2: Manual Setup (Current)
1. Navigate to your project directory and copy the required files:
   ```bash
   # Copy configuration files from claude-tasker repository
   cp /path/to/claude-tasker/.claude .
   cp /path/to/claude-tasker/.claude-settings.json .
   cp /path/to/claude-tasker/CLAUDE.md .
   ```

2. Initialize the docs structure:
   ```bash
   mkdir -p docs/features
   echo "# Global Business Ideas" > docs/backlog.md
   ```

3. Verify setup by checking files are in place:
   ```bash
   ls -la .claude* CLAUDE.md docs/
   ```

## Quick Start

Once installed, use these commands in Claude Code:

```bash
/tasker-start [feature-name]    # Create new feature with business analysis
/tasker-continue [feature-name] # Resume workflow with intelligent next-step detection
/tasker-status [feature-name]   # Show current progress and backlog management
/tasker-implement [feature-name] # Execute development task with strict TDD
/tasker-close [feature-name]    # Mark feature complete, cleanup files
```

## Required Files

The Tasker system requires these files in your project root:

- **`.claude`** - Claude Code hooks and workflow commands
- **`.claude-settings.json`** - Tool configuration and TDD enforcement hooks
- **`CLAUDE.md`** - Complete development guidelines and workflow documentation
- **`docs/backlog.md`** - Global business ideas backlog
- **`docs/features/`** - Feature-specific workflows and backlogs

## Intelligent Workflow

**Philosophy**: Each agent focuses on ONE task only, everything else goes to backlog for later prioritization.

**Smart Agent Skipping**: Agents automatically detect when they're not needed and skip themselves:
- **Business Analyst**: Skips technical fixes, refactoring, internal tooling
- **Product Manager**: Skips pure backend work, technical changes with no UX impact  
- **Solution Architect**: Skips simple bug fixes, low-risk changes, styling/config
- **QA Engineer**: Skips refactoring, docs, config changes with no user-facing impact
- **Security Analyst**: Skips styling, docs, changes with no data/auth/external interactions

**Agents Process:**
1. **Business Analyst** → Business need (2-3 lines) + ideas to global backlog
2. **Product Manager** → UX details (2-3 lines) + feature ideas to backlog  
3. **Solution Architect** → Risk assessment (can REJECT and redirect to safer alternatives)
4. **Tech Lead** → Single implementation task (1-2 days max) + Frontend/Backend focus
5. **Full-Stack Developer** → TDD implementation (one side per task)
6. **QA Engineer** → Quick validation with **✅ QA APPROVED** marker
7. **Security Analyst** → Fast security check with **✅ SECURITY APPROVED** marker

## File Structure

```
docs/
├── backlog.md                           # Global business ideas across features
└── features/
    ├── YY-MM-DD-[feature-name]/         # Active features (folders)
    │   ├── work.md                      # Current single task (all agents append)
    │   └── backlog.md                   # Feature-specific backlog by section
    └── YY-MM-DD-[completed].md          # Done features (files)
```

**Status Logic**: Folders = active work, Files = completed features

## Append-Only Workflow

All agents append to single `work.md` with standardized approval markers:

```markdown
**Business Need**: [2-3 sentences about problem and solution]
**Current Task**: [The one thing we'll build]  
**Success Metric**: [How we know this task worked]

**User Experience**: [How users will interact with this task]
**Priority Rationale**: [Why this task first vs alternatives]

**✅ TECHNICAL APPROVED**
**Implementation Notes**: [Key technical approach or constraints]

**Development Task**: [Single focused implementation story]
**Focus**: [Frontend | Backend] - which side to implement
**Files to Change**: 
- Create: [specific-file-path]
- Modify: [specific-file-path:line-numbers]

**✅ QA APPROVED**
**Acceptance Criteria Verified:**
- [✓] [Criteria 1] - Works as expected

**✅ SECURITY APPROVED**  
**Security Check:**
- [✓] Input validation present
- [✓] No obvious injection vulnerabilities
```

## Two-Tier Backlog System

**Global Backlog** (`docs/backlog.md`): Cross-feature concepts and new feature ideas

**Feature Backlog** (`backlog.md`): Sectioned by role (Product Features, Technical Concerns, Development Tasks)

## Decision Gates and User Control

- **Solution Architect** can REJECT tasks → redirects to safer alternatives
- **QA Engineer** can REJECT implementation → back to Developer for fixes
- **Security Analyst** can BLOCK deployment → back to Developer for security fixes
- **User chooses next direction** after each task completion

## TDD Enforcement

**TEST-DRIVEN DEVELOPMENT IS NON-NEGOTIABLE**
- **Red→Green→Refactor** cycle enforced
- Every single line of production code written in response to failing test
- No exceptions, no shortcuts

## Key Features

- **Micro-tasks**: 1-2 day implementation cycles maximum
- **Single focus**: One agent, one task at a time
- **Quality gates**: Standardized approval markers for QA and Security
- **Two-tier backlog**: Global ideas + feature-specific backlogs
- **Strict TDD**: Non-negotiable test-first development
- **Intelligent skipping**: Agents skip themselves when not needed

See `CLAUDE.md` for comprehensive development guidelines and technology stack details.