# SafeLab Frontend

Base frontend project for the SafeLab Web Application. It follows the course statement constraints for Vue Framework, HTML5, CSS3, JavaScript, Material Design principles, PrimeVue, responsive web design, internationalization and accessibility-ready UI.

## Main improvements in this template

- Fixed topbar with pill-style EN/ES language switcher.
- Profile button redirects to `/user-profiles/my-profile`.
- Notification bell redirects to `/alerts-notifications/active-alerts`.
- Sidebar shows only the main operational modules to avoid visual saturation.
- IAM login/register and User Profiles routes still exist, but they are not displayed as sidebar modules.
- SafeLab shield logo is used in the browser tab and inside the application sidebar.
- Home page includes an operational summary with metrics, a circular compliance chart, notification highlights and feature cards.

## Stack

- Vue 3 + Vite
- Vue Router
- Pinia
- PrimeVue + PrimeFlex + PrimeIcons
- Vue I18n
- Axios
- JSON Server for mock data

## Getting Started

```bash
npm install
npm run dev
```

Run the mock REST API:

```bash
npm run server
```

## Environment

Create `.env.local` if you need local overrides:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=SafeLab
VITE_DEFAULT_LOCALE=en
```

## Project Structure

```text
safelab-frontend/
├── public/
│   └── safelab-shield.png
├── server/
│   ├── db.json
│   ├── routes.json
│   └── start.sh
├── src/
│   ├── assets/
│   ├── locales/
│   │   ├── en.json
│   │   └── es.json
│   ├── router/
│   ├── shared/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   ├── identity-access/
│   ├── user-profiles/
│   ├── subscription-billing/
│   ├── dashboard-overview/
│   ├── asset-inventory/
│   ├── sensor-monitoring/
│   ├── environmental-compliance/
│   ├── alerts-notifications/
│   ├── remote-control/
│   ├── reports-analytics/
│   ├── incident-management/
│   └── audit-traceability/
├── .env.example
├── package.json
└── vite.config.js
```

## DDD Frontend Convention

Each bounded context contains the same folder structure to reduce merge conflicts during GitFlow work:

```text
application/      use cases, application services and stores
domain/           entities, value objects, domain models and constants
infrastructure/   API clients, repositories and mappers
presentation/     routes, views and UI components
```

## Bounded Contexts

1. `identity-access`
2. `user-profiles`
3. `subscription-billing`
4. `dashboard-overview`
5. `asset-inventory`
6. `sensor-monitoring`
7. `environmental-compliance`
8. `alerts-notifications`
9. `remote-control`
10. `reports-analytics`
11. `incident-management`
12. `audit-traceability`

## Sidebar Navigation Rule

The sidebar intentionally shows only the main operational entry points:

- Dashboard & Overview
- Assets & Inventory
- Sensor Monitoring
- Environmental Compliance
- Alerts & Notifications
- Remote Control
- Reports & Analytics
- Incident Management
- Audit & Traceability
- Plans & Billing
- Administration

IAM authentication views and profile views are still available by route, but they are accessed through login/register flows or the topbar profile button.

## Routing Convention

Each module has its own `presentation/routes.js`. To add a real view later, replace `ComingSoonView` with the real view component.

```js
import AssetListView from './views/AssetListView.vue'

export const routes = [
  {
    path: 'asset-inventory/asset-list',
    name: 'asset-inventory-asset-list',
    component: AssetListView,
    meta: { title: 'Asset List', contextKey: 'assets', viewKey: 'assets.AssetList' }
  }
]
```

## i18n Convention

All visible text must be declared in:

- `src/locales/en.json`
- `src/locales/es.json`

Default language is English. Spanish is selected from the fixed pill switcher in the topbar.

## Responsive Layout

The base shell includes:

- Fixed topbar
- Responsive collapsible sidebar
- Automatic sidebar hiding on tablet/mobile widths
- Mobile overlay for the sidebar
- Hidden sidebar scrollbar for a cleaner UI
- Cards and grids that adapt to desktop, tablet and mobile

## GitFlow Recommendation

Suggested branches:

```text
main
develop
feature/dashboard-overview
feature/asset-inventory
feature/sensor-monitoring
feature/environmental-compliance
feature/alerts-notifications
feature/remote-control
feature/reports-analytics
feature/incident-management
feature/audit-traceability
feature/subscription-billing
feature/identity-access
feature/user-profiles
release/v1.0.0
hotfix/<short-description>
```

Use Conventional Commits:

```text
feat(sensor-monitoring): implement live readings view
fix(shared): correct responsive sidebar behavior
docs(readme): update routing convention
style(shared): refine topbar language switcher
```
