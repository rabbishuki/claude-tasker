# Claude Development Guidelines

This project uses Claude Code with the Tasker workflow system for structured feature development.

## Core Development Philosophy

**TEST-DRIVEN DEVELOPMENT IS NON-NEGOTIABLE.** Every single line of production code must be written in response to a failing test. No exceptions.

## Quick Reference

**Key Principles:**
- Write tests first (TDD) - Red-Green-Refactor cycle
- Test behavior, not implementation  
- No `any` types or type assertions in TypeScript
- Immutable data only - no mutation
- Small, pure functions with single responsibility
- TypeScript strict mode always enabled
- Use real schemas/types in tests, never redefine them

**Preferred Technology Stack:**
- **Frontend**: React with TypeScript (strict mode)
- **Backend**: Node.js with Express and TypeScript
- **Testing**: Jest/Vitest + React Testing Library
- **Database**: PostgreSQL with proper migrations
- **State Management**: React Context + custom hooks (prefer immutable patterns)
- **Development**: Full-stack developer handles frontend OR backend per task

## Tasker Workflow System

This project uses the Tasker system for **micro-task development** with specialized AI sub-agents. Optimized for startup velocity with focused, single-task iterations.

### Available Commands

#### Core Workflow Commands
- `/tasker-start [feature-name]` - Create new feature with business analysis
- `/tasker-continue [feature-name]` - Resume workflow with intelligent next-step detection
- `/tasker-status [feature-name]` - Show current progress and backlog management  
- `/tasker-implement [feature-name]` - Execute development task with strict TDD
- `/tasker-close [feature-name]` - Mark feature complete, migrate backlog items, cleanup files

### Micro-Task Workflow (Startup Optimized)

**Philosophy**: Each agent focuses on ONE task only, everything else goes to backlog for later prioritization.

**Process Flow:**
1. **Business Analyst** - Creates focused business need (2-3 lines) + adds ideas to global backlog
2. **Product Manager** - Adds UX details (2-3 lines) + feature ideas to backlog  
3. **Solution Architect** - Risk assessment (can REJECT and redirect to safer alternatives)
4. **Tech Lead** - Single implementation task (1-2 days max) + specifies Frontend/Backend focus
5. **Developer** - Full-stack developer implements with strict TDD (one side per task)
6. **QA Engineer** - Quick validation with standardized approval markers
7. **Security Analyst** - Fast security check with standardized approval markers

### Intelligent Agent Skipping

**Smart Workflow Optimization**: Agents automatically detect when they're not needed and skip themselves.

**Skip Conditions:**
- **Business Analyst**: Skips technical fixes, refactoring, internal tooling
- **Product Manager**: Skips pure backend work, technical changes with no UX impact  
- **Solution Architect**: Skips simple bug fixes, low-risk changes, styling/config
- **QA Engineer**: Skips refactoring, docs, config changes with no user-facing impact
- **Security Analyst**: Skips styling, docs, changes with no data/auth/external interactions

**Manual Override**: Add skip flags to work.md when needed:
```markdown
SKIP_BUSINESS: true
SKIP_PRODUCT: true  
SKIP_ARCHITECT: true
SKIP_QA: true
SKIP_SECURITY: true
```

### File Structure

Date-prefixed features with clear active/done distinction:
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

### Append-Only Workflow

**All agents append to single `work.md`** (no separate documents):
```markdown
**Business Need**: [2-3 sentences about problem and solution]
**Current Task**: [The one thing we'll build]  
**Success Metric**: [How we know this task worked]

**User Experience**: [How users will interact with this task]
**Priority Rationale**: [Why this task first vs alternatives]
**Edge Cases**: [Main user confusion points to handle]

**✅ TECHNICAL APPROVED**
**Implementation Notes**: [Key technical approach or constraints]

**Development Task**: [Single focused implementation story]
**Focus**: [Frontend | Backend] - which side to implement
**Files to Change**: 
- Create: [specific-file-path]
- Modify: [specific-file-path:line-numbers]
**Acceptance Criteria**:
- [ ] [Testable outcome 1]
- [ ] [Testable outcome 2]

**✅ QA APPROVED**
**Acceptance Criteria Verified:**
- [✓] [Criteria 1] - Works as expected

**✅ SECURITY APPROVED**  
**Security Check:**
- [✓] Input validation present
- [✓] No obvious injection vulnerabilities
```

### Two-Tier Backlog System

**Global Backlog (`docs/backlog.md`)**:
```markdown
# Global Business Ideas
- [Cross-feature concepts - one-liners]
- [New feature ideas]
```

**Feature Backlog (`backlog.md`)**:
```markdown
## Product Features
- [UX improvements]
- [Alternative user flows]

## Technical Concerns  
- [Architecture issues flagged by architect]
- [Performance considerations]

## Development Tasks
- [Implementation tasks from tech lead]
- [Technical debt items]
```

### Decision Gates and User Control

- **Solution Architect** can REJECT tasks → redirects to Product Manager for safer alternatives
- **QA Engineer** can REJECT implementation → back to Developer for fixes
- **Security Analyst** can BLOCK deployment → back to Developer for security fixes
- **User chooses next direction** after each task completion (current feature backlog, different feature, or new business idea)

## Technology-Specific Guidelines

### TypeScript Standards
- **Strict mode required** - `"strict": true` in tsconfig.json
- **No `any` types** - use `unknown` if type is truly unknown
- **No type assertions** (`as Type`) unless absolutely necessary with justification
- **Prefer `type` over `interface`** for consistency
- **Schema-first development** - use Zod to create schemas, derive types from them

### React Development
- **Functional components with hooks** - no class components
- **Custom hooks for reusable logic** - extract stateful logic
- **React Testing Library** - test user behavior, not implementation details
- **Accessibility first** - proper ARIA labels, keyboard navigation, screen reader support
- **Mobile-first responsive design** - start with mobile, enhance for desktop

### Backend Development  
- **Express.js with TypeScript** - proper middleware order and error handling
- **RESTful API design** - consistent endpoints, proper HTTP status codes
- **Database migrations** - version-controlled schema changes
- **Input validation** - validate and sanitize all user inputs
- **Proper error handling** - centralized error middleware, meaningful error messages

### Testing Approach

#### TDD Process (NON-NEGOTIABLE)
1. **Red**: Write failing test that describes desired behavior
2. **Green**: Write minimal code to make test pass
3. **Refactor**: Improve code structure while keeping tests green

#### Testing Standards
- **100% test coverage expected** - but based on business behavior, not code coverage
- **Test behavior through public APIs** - treat implementation as black box
- **Use factory functions** for test data with optional overrides
- **Real schemas in tests** - import from shared schema definitions, never redefine

#### Example Test Pattern
```typescript
// Good - tests behavior
describe('PaymentForm', () => {
  it('should show error when amount is invalid', async () => {
    render(<PaymentForm />);
    
    const amountInput = screen.getByLabelText('Amount');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    await userEvent.type(amountInput, '-100');
    await userEvent.click(submitButton);
    
    expect(screen.getByText('Amount must be positive')).toBeInTheDocument();
  });
});

// Good - test data factory
const getMockPaymentRequest = (overrides?: Partial<PaymentRequest>): PaymentRequest => {
  return {
    amount: 100,
    currency: 'USD',
    cardToken: 'tok_123',
    ...overrides,
  };
};
```

### Code Style Guidelines

#### Functional Programming Approach
- **No data mutation** - use immutable update patterns
- **Pure functions** - predictable inputs and outputs
- **Composition over inheritance** - build complexity through function composition
- **Early returns** - avoid nested if/else statements

#### Code Organization
- **Small, focused functions** - single responsibility principle
- **Options objects for parameters** - avoid multiple positional parameters
- **Self-documenting code** - no comments needed if code is clear
- **Meaningful names** - functions and variables should explain their purpose

#### Example Patterns
```typescript
// Good - immutable update
const updateUserProfile = (user: User, updates: Partial<UserProfile>): User => {
  return {
    ...user,
    profile: {
      ...user.profile,
      ...updates,
    },
  };
};

// Good - options object
type CreatePaymentOptions = {
  amount: number;
  currency: string;
  cardToken: string;
  description?: string;
};

const createPayment = (options: CreatePaymentOptions): Payment => {
  const { amount, currency, cardToken, description } = options;
  // implementation
};
```

## Project-Specific Conventions

### API Patterns
- **RESTful endpoints** - `/api/[resource]` structure
- **Consistent error responses** - standard error format across all endpoints
- **Request validation** - validate inputs with Zod schemas
- **Authentication middleware** - JWT-based authentication for protected routes

### Database Conventions
- **Migration-based schema changes** - all schema changes through versioned migrations
- **Proper indexing** - index frequently queried columns
- **Foreign key constraints** - maintain referential integrity
- **Soft deletes** - use `deleted_at` timestamp instead of hard deletes

### Frontend Conventions
- **Component organization** - atoms/molecules/organisms structure
- **Custom hooks** - extract stateful logic into reusable hooks
- **Context for global state** - avoid prop drilling with React Context
- **Error boundaries** - graceful error handling in React components

## Development Workflow

### Micro-Task Development Process
1. **Run `/tasker-start [feature-name]`** - Creates folder structure and launches business analyst
2. **Run `/tasker-continue [feature-name]`** - Intelligent next-step detection and agent launching
3. **Agents append to work.md** - Each agent adds 2-3 lines focused on current task only
4. **Quality gates** - QA and Security use standardized approval markers
5. **User chooses next** - System presents backlog options, user decides direction

### Decision Points (You Control Priority)
- **After each task completion**: Choose from Development Tasks, Product Features, Global Ideas, or different feature
- **When architect rejects**: Choose safer alternative from product backlog or modify current task
- **At any time**: Use `/tasker-status` to see all backlogs and make priority decisions

### Quality Gates
- **Solution Architect** - Can reject risky tasks before implementation
- **All tests must pass** - TDD enforced at implementation
- **TypeScript compilation clean** - no errors or warnings
- **QA approval** - Fast validation of acceptance criteria
- **Security approval** - Quick security check before deploy

### Git Workflow
- **Feature branches** - `feature/YY-MM-DD-[feature-name]` 
- **Conventional commits** - `feat:`, `fix:`, `refactor:`, `test:` prefixes
- **Small, atomic commits** - each task is 1-2 days max
- **Include tests with features** - TDD ensures test coverage

## Troubleshooting

### Common Issues
- **Task too complex**: Solution architect should reject and redirect to simpler backlog item
- **TDD cycle stuck**: Verify all existing tests are green before writing new code
- **Integration issues**: Use `/tasker-continue` to pick next task or different feature
- **Backlog getting too big**: Focus on current task, resist urge to over-plan

### Getting Help
- **View current status**: `/tasker-status [feature-name]`
- **Resume workflow**: `/tasker-continue [feature-name]`  
- **See all features**: Check `docs/features/` directory (sorted by date)
- **Check backlogs**: Global `docs/backlog.md` or feature-specific `backlog.md`

## Success Metrics

### Code Quality
- **Test coverage**: Maintain 100% coverage of business behavior
- **TypeScript compliance**: Zero type errors or `any` types
- **Performance**: API responses under 200ms, UI interactions under 100ms
- **Accessibility**: WCAG 2.1 AA compliance for all user interfaces

### Development Velocity
- **Task completion**: Each task implementable in 1-2 days max
- **Decision speed**: Quick approval/rejection at each gate
- **Iteration rate**: Multiple task completions per week
- **Deployment frequency**: Ship working features quickly and often

### Backlog Health
- **Global backlog**: Concise business ideas for new features
- **Feature backlogs**: Sectioned by role, no duplicate tracking
- **Priority clarity**: Always know what to work on next

Remember: The Tasker system optimizes for startup velocity. Focus on current task, defer complexity to backlog, and ship working software quickly.