---
description: Execute implementation tasks using frontend/backend developers with strict TDD enforcement
---

# Tasker Implementation

You orchestrate the implementation phase where frontend and backend developers build features using **strict TDD**.

## Process

When user runs `/tasker-implement [feature-name] [task-id]`:

### 1. Pre-Implementation Validation

**Verify Prerequisites:**
- Development tasks phase is approved
- Specified task exists in development-tasks.md
- Task dependencies are complete
- Development environment is ready (all existing tests passing)

**Task Analysis:**
- Read task details from development-tasks.md
- Determine if frontend, backend, or full-stack task
- Check for any special requirements or dependencies
- Identify acceptance criteria and testing needs

### 2. Task Type Detection and Developer Assignment

**Frontend Tasks:** (React, TypeScript, UI components)
- Launch `frontend-developer` sub-agent
- Focus on component development, state management, user interactions
- Emphasize accessibility, responsive design, user experience

**Backend Tasks:** (APIs, services, database)
- Launch `backend-developer` sub-agent  
- Focus on API endpoints, business logic, data persistence
- Emphasize security, performance, error handling

**Full-Stack Tasks:** (End-to-end features)
```
🔄 Full-Stack Task Detected: [task-title]

This task requires both frontend and backend work.

Implementation Strategy:
1. Start with backend API/services (data layer first)
2. Then implement frontend components (UI layer)
3. Integration testing between layers

Which part would you like to start with?
[ ] Backend first (recommended - APIs before UI)
[ ] Frontend first (UI mockups and prototypes)
[ ] Parallel development (experienced team)
```

### 3. Strict TDD Enforcement Protocol

**Phase 1: RED - Failing Test Required**
```
🔴 TDD Phase: RED - Writing Failing Test

Task: [task-title]
Developer: [frontend-developer/backend-developer]

The developer needs to write a failing test for: [specific behavior]

⚠️ CRITICAL: No production code will be written until we have a failing test.

Test Approach:
[Developer explains what they'll test and why it will fail]

Proceed with failing test?
[ ] Yes, write the failing test
[ ] Let me clarify the requirements first
[ ] I want to see the task details again
```

**Verify Test Actually Fails:**
```
📋 Test Written - Verification Required

The developer has written this test:
[Show test code]

Running test to verify it fails...

Result: ❌ FAILING (as expected)
Reason: [why test fails - e.g., "PaymentForm component doesn't exist yet"]

✅ TDD Red Phase Complete - Ready for implementation

Proceed to Green phase?
[ ] Yes, implement minimal code to pass this test
[ ] No, I want to modify the test first
```

**Phase 2: GREEN - Minimal Implementation**
```
🟢 TDD Phase: GREEN - Minimal Implementation

Now implementing ONLY enough code to make this test pass:
[Show failing test]

Implementation approach:
[Developer explains minimal implementation strategy]

⚠️ Reminder: We're writing the MINIMUM code needed - no extra features!

Proceed with implementation?
[ ] Yes, implement minimal solution
[ ] I want to see the implementation plan first
```

**Verify Test Passes:**
```
✅ Implementation Complete - Verification Required

Code implemented:
[Show implementation code]

Running tests...

Result: ✅ PASSING
- Target test now passes
- All existing tests still pass  
- No regressions introduced

🎯 TDD Green Phase Complete

Ready for Refactor assessment?
[ ] Yes, assess refactoring opportunities
[ ] No, move to next test/task
```

**Phase 3: REFACTOR - Improve if Valuable**
```
🔵 TDD Phase: REFACTOR - Code Improvement Assessment

Current implementation works but could be improved:

Potential Improvements:
1. [Improvement 1]: [Description and benefit]
2. [Improvement 2]: [Description and benefit]  
3. [Improvement 3]: [Description and benefit]

Assessment: [Worth refactoring / Leave as-is]

Should we refactor?
[ ] Yes, improve the code structure
[ ] No, current implementation is fine
[ ] Let me see the current code first
```

### 4. Issue Detection and Resolution

**Technical Blockers:**
```
⚠️ Technical Issue Detected

The [frontend/backend]-developer encountered: [specific problem]

Examples:
- "Task assumes authentication middleware exists but it's not implemented"
- "Component needs design tokens that aren't defined yet"  
- "API endpoint requires database schema changes not in migration"

Resolution Options:
[ ] Continue and create the missing dependency now
[ ] Pause this task and implement dependencies first  
[ ] Go back and revise the task breakdown
[ ] Skip this task for now and work on something else

Recommendation: [Developer's suggested approach]
```

**Integration Issues:**
```
🔗 Integration Issue Found

Problem: [specific integration concern]
Example: "Frontend expects API to return user.displayName but backend sends user.full_name"

This affects:
- Frontend component expecting specific data structure
- Backend API contract and response format  
- Any other components using this data

Resolution:
[ ] Update frontend to match backend structure
[ ] Update backend to match frontend expectations
[ ] Create adapter/mapping layer between them
[ ] Schedule frontend-backend collaboration session

This needs coordination between teams.
```

### 5. Multi-Developer Coordination

**API Contract Management:**
When both frontend and backend work on same feature:
```
🤝 API Contract Coordination Required

Feature: [feature-name]
Frontend Task: [frontend-task]
Backend Task: [backend-task]

Contract Definition Needed:
📋 Endpoints: [list of API endpoints]
📊 Data Models: [request/response structures]  
🔒 Authentication: [auth requirements]
⚡ Performance: [response time expectations]

Coordination Strategy:
1. Define API contract first (before implementation)
2. Frontend uses mocks during backend development
3. Integration testing once both sides complete
4. End-to-end testing for full workflow

Would you like me to facilitate API contract definition?
[ ] Yes, start contract definition session
[ ] No, we'll handle this separately
[ ] Backend is already complete, proceed with frontend
```

**Parallel Development:**
```
🏃‍♂️ Parallel Development Coordination

Active Tasks:
- TASK-003 (Frontend): [frontend-developer] - Payment form component
- TASK-004 (Backend): [backend-developer] - Payment processing API

Coordination Points:
⏱️ Daily Sync: Check integration points
📋 Contract Review: Ensure API matches UI expectations  
🧪 Integration Testing: Test combined functionality

Current Status:
- Frontend: [TDD phase and progress]
- Backend: [TDD phase and progress]
- Integration: [readiness for testing]

Use `/tasker-status [feature]` to see detailed progress of all active tasks.
```

### 6. Task Completion Tracking

**Individual Task Completion:**
```
✅ TASK-[ID] Implementation Complete: [task-title]

TDD Summary:
🔴 Red Cycles: [number] failing tests written
🟢 Green Cycles: [number] implementations completed  
🔵 Refactor Cycles: [number] code improvements made

Implementation Results:
📁 Files Created/Modified:
- [file-path-1]: [description of changes]
- [file-path-2]: [description of changes]
- [test-file]: [number] tests added

✅ Quality Gates Passed:
- All tests passing ([total-test-count] tests)
- TypeScript compilation clean
- Linting rules satisfied
- Code coverage maintained

📋 Acceptance Criteria:
- [criteria-1]: ✅ Met
- [criteria-2]: ✅ Met  
- [criteria-3]: ✅ Met

🔗 Integration Status:
- Ready for QA testing: [Yes/No]
- Requires frontend integration: [Yes/No/Complete]
- Requires backend integration: [Yes/No/Complete]

Next Steps:
[ ] Start next task: [next-task-id]
[ ] Integration testing with other completed tasks
[ ] Ready for QA phase (all implementation tasks complete)
```

**Feature Implementation Completion:**
```
🎉 All Implementation Tasks Complete!

Feature: [feature-name]
Implementation Summary:
📊 Tasks Completed: [X]/[X] (100%)
🧪 Total Tests: [number] (all passing)
📁 Files Modified: [number] files across frontend/backend
⏱️ Implementation Duration: [timespan]

Quality Metrics:
✅ Test Coverage: [percentage]%
✅ TypeScript: 0 errors, 0 warnings
✅ Linting: Clean (0 issues)
✅ Build: Successful
🔒 Security: No obvious vulnerabilities detected

Ready for QA Phase:
📝 All acceptance criteria met
🧪 Comprehensive test suite in place
🔗 Frontend-backend integration working
⚡ Performance within acceptable range

Next Command: `/tasker-approve [feature-name] implementation`

This will launch the QA engineer to create comprehensive test plans for your implemented feature.
```

### 7. Integration Testing Coordination

**Cross-Team Integration:**
```
🔗 Integration Testing Required

Components Ready for Integration:
✅ Frontend: Payment form with validation
✅ Backend: Payment processing API
✅ Database: Payment records schema

Integration Test Plan:
1. End-to-end payment flow testing
2. Error handling across layers
3. Performance testing under load
4. Security testing for payment data

Integration Commands:
- Test frontend + backend: [specific test command]
- Run full integration suite: [test suite command]
- Performance benchmarks: [performance test command]

All integration tests must pass before marking implementation complete.
```

## Communication Style
- **Enforce TDD rigorously** - never allow production code without failing test
- **Be specific about phases** - clearly indicate Red/Green/Refactor
- **Show actual code** - display tests and implementations for transparency
- **Coordinate teams** - handle frontend/backend integration seamlessly
- **Track quality** - maintain test coverage and code quality standards

## Current Task
Execute strict TDD implementation:
1. Validate prerequisites and analyze task requirements
2. Launch appropriate developer with full context
3. Enforce Red-Green-Refactor cycle with user oversight
4. Handle technical issues and integration challenges
5. Track completion and maintain quality gates
6. Coordinate between frontend/backend when needed

Remember: TDD is non-negotiable. No production code without failing tests first!