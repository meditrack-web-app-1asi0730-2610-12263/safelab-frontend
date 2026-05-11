import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'dashboard-overview',
    name: 'dashboard-overview',
    component: ComingSoonView,
    meta: { title: 'Dashboard & Overview', contextKey: 'dashboard' }
  },
  {
    path: 'dashboard-overview/laboratory-dashboard',
    name: 'dashboard-overview-laboratory-dashboard',
    component: ComingSoonView,
    meta: { title: 'Laboratory Dashboard', contextKey: 'dashboard', viewKey: 'dashboard.LaboratoryDashboard' }
  },
  {
    path: 'dashboard-overview/compliance-overview',
    name: 'dashboard-overview-compliance-overview',
    component: ComingSoonView,
    meta: { title: 'Compliance Overview', contextKey: 'dashboard', viewKey: 'dashboard.ComplianceOverview' }
  },
  {
    path: 'dashboard-overview/platform-overview',
    name: 'dashboard-overview-platform-overview',
    component: ComingSoonView,
    meta: { title: 'Platform Overview', contextKey: 'dashboard', viewKey: 'dashboard.PlatformOverview' }
  },
  {
    path: 'dashboard-overview/kpi-summary',
    name: 'dashboard-overview-kpi-summary',
    component: ComingSoonView,
    meta: { title: 'KPI Summary', contextKey: 'dashboard', viewKey: 'dashboard.KPISummary' }
  },
  {
    path: 'dashboard-overview/alert-overview',
    name: 'dashboard-overview-alert-overview',
    component: ComingSoonView,
    meta: { title: 'Alert Overview', contextKey: 'dashboard', viewKey: 'dashboard.AlertOverview' }
  },
  {
    path: 'dashboard-overview/asset-overview',
    name: 'dashboard-overview-asset-overview',
    component: ComingSoonView,
    meta: { title: 'Asset Overview', contextKey: 'dashboard', viewKey: 'dashboard.AssetOverview' }
  },
  {
    path: 'dashboard-overview/sensor-overview',
    name: 'dashboard-overview-sensor-overview',
    component: ComingSoonView,
    meta: { title: 'Sensor Overview', contextKey: 'dashboard', viewKey: 'dashboard.SensorOverview' }
  },
  {
    path: 'dashboard-overview/incident-overview',
    name: 'dashboard-overview-incident-overview',
    component: ComingSoonView,
    meta: { title: 'Incident Overview', contextKey: 'dashboard', viewKey: 'dashboard.IncidentOverview' }
  },
  {
    path: 'dashboard-overview/dashboard-filters',
    name: 'dashboard-overview-dashboard-filters',
    component: ComingSoonView,
    meta: { title: 'Dashboard Filters', contextKey: 'dashboard', viewKey: 'dashboard.DashboardFilters' }
  },
  {
    path: 'dashboard-overview/dashboard-widgets',
    name: 'dashboard-overview-dashboard-widgets',
    component: ComingSoonView,
    meta: { title: 'Dashboard Widgets', contextKey: 'dashboard', viewKey: 'dashboard.DashboardWidgets' }
  },
]
