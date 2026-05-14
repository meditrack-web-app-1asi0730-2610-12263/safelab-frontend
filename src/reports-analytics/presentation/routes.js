/* 
import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'reports-analytics',
    name: 'reports-analytics',
    component: ComingSoonView,
    meta: { title: 'Reports & Analytics', contextKey: 'reports' }
  },
  {
    path: 'reports-analytics/reports-list',
    name: 'reports-analytics-reports-list',
    component: ComingSoonView,
    meta: { title: 'Reports List', contextKey: 'reports', viewKey: 'reports.ReportsList' }
  },
  {
    path: 'reports-analytics/report-detail',
    name: 'reports-analytics-report-detail',
    component: ComingSoonView,
    meta: { title: 'Report Detail', contextKey: 'reports', viewKey: 'reports.ReportDetail' }
  },
  {
    path: 'reports-analytics/report-generator',
    name: 'reports-analytics-report-generator',
    component: ComingSoonView,
    meta: { title: 'Report Generator', contextKey: 'reports', viewKey: 'reports.ReportGenerator' }
  },
  {
    path: 'reports-analytics/analytics-dashboard',
    name: 'reports-analytics-analytics-dashboard',
    component: ComingSoonView,
    meta: { title: 'Analytics Dashboard', contextKey: 'reports', viewKey: 'reports.AnalyticsDashboard' }
  },
  {
    path: 'reports-analytics/trend-analysis',
    name: 'reports-analytics-trend-analysis',
    component: ComingSoonView,
    meta: { title: 'Trend Analysis', contextKey: 'reports', viewKey: 'reports.TrendAnalysis' }
  },
  {
    path: 'reports-analytics/export-history',
    name: 'reports-analytics-export-history',
    component: ComingSoonView,
    meta: { title: 'Export History', contextKey: 'reports', viewKey: 'reports.ExportHistory' }
  },
  {
    path: 'reports-analytics/compliance-reports',
    name: 'reports-analytics-compliance-reports',
    component: ComingSoonView,
    meta: { title: 'Compliance Reports', contextKey: 'reports', viewKey: 'reports.ComplianceReports' }
  },
  {
    path: 'reports-analytics/operational-reports',
    name: 'reports-analytics-operational-reports',
    component: ComingSoonView,
    meta: { title: 'Operational Reports', contextKey: 'reports', viewKey: 'reports.OperationalReports' }
  },
]

*/

import ReportsPage from './views/reports-page.component.vue'
import HistoricalDataPage from './views/historical-data-page.component.vue'
import AnalyticsPage from './views/analytics-page.component.vue'
import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'reports-analytics',
    name: 'reports-analytics',
    component: AnalyticsPage,
    meta: {
      titleKey: 'contextLabels.reports',
      contextKey: 'reports'
    }
  },
  {
    path: 'reports-analytics/reports',
    name: 'reports-analytics-reports',
    component: ReportsPage,
    meta: {
      titleKey: 'menu.reports.Reports',
      contextKey: 'reports',
      viewKey: 'reports.Reports'
    }
  },
  {
    path: 'reports-analytics/historical-data',
    name: 'reports-analytics-historical-data',
    component: HistoricalDataPage,
    meta: {
      titleKey: 'menu.reports.HistoricalData',
      contextKey: 'reports',
      viewKey: 'reports.HistoricalData'
    }
  },
  {
    path: 'reports-analytics/analytics-overview',
    name: 'reports-analytics-overview',
    component: AnalyticsPage,
    meta: {
      titleKey: 'menu.reports.AnalyticsOverview',
      contextKey: 'reports',
      viewKey: 'reports.AnalyticsOverview'
    }
  },
  {
    path: 'reports-analytics/export-data',
    name: 'reports-analytics-export-data',
    component: ComingSoonView,
    meta: {
      titleKey: 'menu.reports.ExportData',
      contextKey: 'reports',
      viewKey: 'reports.ExportData'
    }
  },
  {
  context: 'reports-analytics',
  titleKey: 'contextLabels.reports',
  icon: 'chart-line',
  path: '/reports-analytics/analytics-overview',
  roleScope: 'Supervisors / Admin'
},
{
  path: 'reports-analytics/analytics-dashboard',
  name: 'reports-analytics-dashboard',
  component: AnalyticsPage,
  meta: {
    titleKey: 'menu.reports.AnalyticsDashboard',
    contextKey: 'reports-analytics',
    viewKey: 'reports-analytics.AnalyticsDashboard'
  }
},
]