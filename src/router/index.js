import { createRouter, createWebHistory } from 'vue-router'
import AppShell from '@/shared/presentation/layouts/AppShell.vue'
import HomeView from '@/shared/presentation/views/HomeView.vue'
import { routes as IdentityAccessRoutes } from '@/identity-access/presentation/routes'
import { routes as UserProfilesRoutes } from '@/user-profiles/presentation/routes'
import { routes as SubscriptionBillingRoutes } from '@/subscription-billing/presentation/routes'
import { routes as DashboardOverviewRoutes } from '@/dashboard-overview/presentation/routes'
import { routes as AssetInventoryRoutes } from '@/asset-inventory/presentation/routes'
import { routes as SensorMonitoringRoutes } from '@/sensor-monitoring/presentation/routes'
import { routes as EnvironmentalComplianceRoutes } from '@/environmental-compliance/presentation/routes'
import { routes as AlertsNotificationsRoutes } from '@/alerts-notifications/presentation/routes'
import { routes as RemoteControlRoutes } from '@/remote-control/presentation/routes'
import { routes as ReportsAnalyticsRoutes } from '@/reports-analytics/presentation/routes'
import { routes as IncidentManagementRoutes } from '@/incident-management/presentation/routes'
import { routes as AuditTraceabilityRoutes } from '@/audit-traceability/presentation/routes'

const routes = [
  {
    path: '/',
    component: AppShell,
    children: [
      { path: '', name: 'home', component: HomeView, meta: { title: 'SafeLab' } },
  ...IdentityAccessRoutes,
  ...UserProfilesRoutes,
  ...SubscriptionBillingRoutes,
  ...DashboardOverviewRoutes,
  ...AssetInventoryRoutes,
  ...SensorMonitoringRoutes,
  ...EnvironmentalComplianceRoutes,
  ...AlertsNotificationsRoutes,
  ...RemoteControlRoutes,
  ...ReportsAnalyticsRoutes,
  ...IncidentManagementRoutes,
  ...AuditTraceabilityRoutes
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | SafeLab` : 'SafeLab'
})

export default router
