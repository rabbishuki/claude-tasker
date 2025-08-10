# Tasker System

Micro-task development workflow for Claude Code with specialized AI agents.

## Quick Start

```bash
/tasker-start [feature-name]    # Create new feature
/tasker-continue [feature-name] # Resume workflow  
/tasker-status [feature-name]   # Show progress
/tasker-implement [feature-name] # Execute development
```

## Workflow

**Agents Process:**
1. **Business Analyst** → Business need analysis
2. **Product Manager** → UX details  
3. **Solution Architect** → Risk assessment (can reject)
4. **Tech Lead** → Implementation task + Frontend/Backend focus
5. **Full-Stack Developer** → TDD implementation (one side only)
6. **QA Engineer** → Task validation
7. **Security Analyst** → Security check

## File Structure

```
docs/
├── backlog.md                     # Global business ideas
└── features/
    └── YY-MM-DD-[feature-name]/
        ├── work.md                # Current task (agents append)
        └── backlog.md             # Feature backlog
```

## TDD Enforcement

- **TDD Guard Hook**: Prevents production code without tests
- **Red→Green→Refactor** cycle enforced
- Developer must ask permission each step

## Key Features

- **Micro-tasks**: 1-2 day implementation cycles
- **Single focus**: One agent, one task at a time
- **Quality gates**: QA and Security approval required
- **Backlog system**: Ideas deferred for later prioritization
- **Strict TDD**: Non-negotiable test-first development

See `CLAUDE.md` for detailed development guidelines.