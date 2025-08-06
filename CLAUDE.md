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

## Tasker Workflow System

This project uses the Tasker system for structured feature development with specialized AI sub-agents.

### Available Commands

#### Core Workflow Commands
- `/tasker-start [feature-name]` - Begin complete feature workflow from business requirements
- `/tasker-continue [feature-name]` - Resume workflow from current phase  
- `/tasker-status [feature-name]` - Show current progress and next actions
- `/tasker-approve [feature-name] [document-type]` - Approve draft documents and progress phases

#### Implementation Commands  
- `/tasker-implement [feature-name] [task-id]` - Execute coding tasks with strict TDD
- Use for frontend tasks: React components, state management, user interactions
- Use for backend tasks: APIs, services, database operations, integrations

### Workflow Phases (7 Total)

1. **Business Requirements** - Business analyst gathers comprehensive requirements
2. **Product Specification** - Product manager creates user-centered specifications  
3. **Technical Architecture** - Solution architect explores codebase and creates epic-level breakdown
4. **Development Tasks** - Tech lead creates detailed implementation tasks with file paths
5. **Implementation** - Frontend/backend developers build with strict TDD
6. **QA Testing** - QA engineer creates comprehensive test plans
7. **Security Review** - Security analyst performs vulnerability assessment

### File Structure

Each feature creates this structure:
```
docs/features/[feature-name]/
├── drafts/                    # Sub-agent outputs awaiting approval
│   ├── business-requirements.draft.md
│   ├── product-specification.draft.md
│   ├── technical-architecture.draft.md
│   ├── development-tasks.draft.md
│   ├── qa-test-plan.draft.md
│   └── security-review.draft.md
├── approved/                  # User-approved final documents
│   ├── business-requirements.md
│   ├── product-specification.md
│   ├── technical-architecture.md
│   └── development-tasks.md
└── status.json              # Current phase and progress tracking
```

### Draft/Approval Process

1. Sub-agents create documents in `drafts/` folder
2. **You review and edit draft files directly** in your editor
3. Run `/tasker-approve [feature-name] [document-type]` when ready
4. Approved documents move to `approved/` folder  
5. Next phase begins automatically

### Issue Handling

Sub-agents may flag concerns:
```
⚠️ I noticed [specific issue]

Should I:
[ ] Continue anyway and work around this
[ ] Go back to fix [previous phase] first
```

**Your choice** - you can skip issues and continue, or go back and address them.

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

### Feature Development Process
1. **Run `/tasker-start [feature-name]`** to begin structured workflow
2. **Review and edit each draft document** as sub-agents create them
3. **Approve documents** with `/tasker-approve` when ready to proceed
4. **Implement with TDD** using `/tasker-implement` for coding tasks
5. **Test thoroughly** with comprehensive QA and security review

### Quality Gates
- **All tests must pass** before any code merge
- **TypeScript compilation clean** - no errors or warnings
- **Linting rules satisfied** - consistent code style
- **Security review passed** - no critical vulnerabilities
- **Performance benchmarks met** - response times within limits

### Git Workflow
- **Feature branches** - `feature/[feature-name]` for all new features
- **Conventional commits** - `feat:`, `fix:`, `refactor:`, `test:` prefixes
- **Small, atomic commits** - each commit represents complete, working change
- **Include tests with features** - test changes in same commit as feature changes

## Troubleshooting

### Common Issues
- **Draft file not found**: Ensure you've saved the draft file after editing
- **Phase progression blocked**: Check for missing prerequisites with `/tasker-status`
- **TDD cycle stuck**: Verify all existing tests are green before writing new code
- **Integration issues**: Use `/tasker-continue` to resume from any point

### Getting Help
- **View current status**: `/tasker-status [feature-name]`
- **Resume workflow**: `/tasker-continue [feature-name]`  
- **See all features**: Check `docs/features/` directory
- **Reset corrupted state**: Delete `status.json` and use `/tasker-continue`

## Success Metrics

### Code Quality
- **Test coverage**: Maintain 100% coverage of business behavior
- **TypeScript compliance**: Zero type errors or `any` types
- **Performance**: API responses under 200ms, UI interactions under 100ms
- **Accessibility**: WCAG 2.1 AA compliance for all user interfaces

### Development Velocity  
- **Feature completion**: Complete 7-phase workflow for each feature
- **Documentation quality**: Comprehensive docs for all business and technical decisions
- **Security compliance**: Zero critical or high-severity security findings
- **Deployment readiness**: Features deployable immediately after security review

Remember: The Tasker system guides you through proven development practices. Trust the process, follow TDD religiously, and create features that are well-documented, thoroughly tested, and ready for production deployment.