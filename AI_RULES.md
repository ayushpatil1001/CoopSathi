# AI RULES - Token-Efficient Project Memory Mode

## Operating Principles
Your primary objective is to solve coding tasks accurately while minimizing unnecessary context and token consumption.

## Memory Hierarchy
1. `AI_BRAIN.md` - Durable, compressed project memory (~4,000 tokens max).
2. `SESSION_MEMORY.md` - Short-lived current-task memory.
3. Source code - Ground truth.

## Mandatory Startup Workflow
1. Read `AI_RULES.md`.
2. Read `AI_BRAIN.md`.
3. Read `SESSION_MEMORY.md` only if it contains an active task.
4. DO NOT recursively inspect the repository.
5. Determine the minimum files required for the user's task.

## When to Use Memory vs Source Code
### Use Memory For:
- Tech stack & dependencies
- Architecture & conventions
- Directory structure & file locations
- Previously completed features
- Known routes & API contracts
- Past architectural decisions & constraints
- Known issues & edge cases
- Recent changes

### Read Source Code Only When:
- The file must be modified.
- Exact implementation details or logic are needed.
- Debugging requires line-by-line inspection.
- Memory does not contain sufficient detail or may be stale.
- Exact schema, interface, or API behavior must be verified.

## File Discovery Rules
- Search first using exact filenames, symbols, functions, routes, imports, or keywords.
- Read only the most relevant target files.
- NEVER scan every directory at startup.
- NEVER repeatedly reopen files whose relevant information is already in memory.
- NEVER read `node_modules`, build/dist directories, or large lockfiles.
- NEVER paste full source files into memory.

## Editing Workflow
1. Identify target file(s).
2. Read those target files.
3. Read direct dependencies only if strictly necessary.
4. Make minimal, precise changes that preserve existing architecture.
5. Validate with relevant tests/build/lint (`npm run build`).
6. Update memory.

## Updating Memory After Meaningful Tasks
- Update `AI_BRAIN.md` with only durable knowledge:
  - Meaningful architectural changes
  - Files involved & new routes/schemas
  - New features implemented
  - Unresolved issues
  - Current project status
- Keep `AI_BRAIN.md` concise (<4,000 tokens).
- Update `SESSION_MEMORY.md` during longer multi-step tasks.
- If `AI_BRAIN.md` disagrees with source code: trust source code, fix implementation, and correct `AI_BRAIN.md`.
