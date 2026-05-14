# Contributing Guide

This repository follows GitFlow, Conventional Commits and Semantic Versioning.

## Branching Model

Create branches from `develop` unless the team leader indicates another source branch.

```bash
git checkout develop
git pull origin develop
git checkout -b feature/sensor-monitoring
```

Recommended feature branch names:

- `feature/identity-access`
- `feature/user-profiles`
- `feature/subscription-billing`
- `feature/dashboard-overview`
- `feature/asset-inventory`
- `feature/sensor-monitoring`
- `feature/environmental-compliance`
- `feature/alerts-notifications`
- `feature/remote-control`
- `feature/reports-analytics`
- `feature/incident-management`
- `feature/audit-traceability`

## Development Rules

1. Keep code in English.
2. Add every visible label to both locale files.
3. Keep each bounded context inside its own DDD folder.
4. Do not create new bounded context folders unless the team agrees.
5. Use responsive layouts for every view.
6. Add ARIA labels to interactive controls when the visual label is not enough.
7. Use PrimeVue components when they improve consistency.
8. Keep shared components inside `src/shared/presentation`.
9. Keep API clients and repositories inside `infrastructure`.
10. Keep business/domain models inside `domain`.

## Conventional Commits

Format:

```text
<type>(<scope>): <message>
```

Allowed common types:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `chore`
- `test`
- `build`

Examples:

```bash
git commit -m "feat(shared): add collapsible sidebar layout"
git commit -m "feat(asset-inventory): add asset list route"
git commit -m "fix(shared): improve mobile sidebar overlay"
git commit -m "docs(contributing): describe bounded context workflow"
```

## Adding a View

1. Create the Vue view inside the bounded context:

```text
src/<bounded-context>/presentation/views/<ViewName>.vue
```

2. Update the bounded context route file:

```text
src/<bounded-context>/presentation/routes.js
```

3. Add translations to:

```text
src/locales/en.json
src/locales/es.json
```

4. Validate responsiveness in desktop, tablet and mobile widths.

## Pull Request Checklist

- The branch is updated with `develop`.
- The application runs with `npm run dev`.
- The mock API runs with `npm run server` when required.
- All new visible labels are translated.
- The view works in responsive layout.
- Commits follow Conventional Commits.
- The implementation stays inside the correct bounded context.
