import { dashboardOverviewApiService } from '@/dashboard-overview/infrastructure/http/dashboard-overview-api.service'
import { DashboardSummary } from '@/dashboard-overview/domain/models/dashboard-summary.model'
import { DashboardWidget } from '@/dashboard-overview/domain/entities/dashboard-widget.entity'

export const fallbackOverview = {
  fallback: true,
  lastUpdated: '2026-05-13T05:30:00',
  healthScore: 98.7,
  kpis: [
    { key: 'activeSensors', labelKey: 'dashboardOverview.kpis.activeSensors', value: 24, unit: '', trendKey: 'dashboardOverview.trendsText.online', status: 'success', icon: 'pi pi-wifi' },
    { key: 'storageUnits', labelKey: 'dashboardOverview.kpis.storageUnits', value: 35, unit: '', trendKey: 'dashboardOverview.trendsText.monitored', status: 'success', icon: 'pi pi-box' },
    { key: 'complianceScore', labelKey: 'dashboardOverview.kpis.complianceScore', value: 98.7, unit: '%', trendKey: 'dashboardOverview.trendsText.improved', status: 'success', icon: 'pi pi-check-circle' },
    { key: 'openAlerts', labelKey: 'dashboardOverview.kpis.openAlerts', value: 3, unit: '', trendKey: 'dashboardOverview.trendsText.requiresAttention', status: 'warning', icon: 'pi pi-bell' },
    { key: 'criticalIncidents', labelKey: 'dashboardOverview.kpis.criticalIncidents', value: 1, unit: '', trendKey: 'dashboardOverview.trendsText.urgent', status: 'danger', icon: 'pi pi-exclamation-triangle' },
    { key: 'reportsReady', labelKey: 'dashboardOverview.kpis.reportsReady', value: 8, unit: '', trendKey: 'dashboardOverview.trendsText.exportable', status: 'neutral', icon: 'pi pi-file-export' }
  ],
  compliance: {
    score: 98.7,
    compliantStorage: 32,
    totalStorage: 35,
    violatedRules: 2,
    evidenceReady: 18,
    nextAuditKey: 'dashboardOverview.values.nextAudit'
  },
  widgets: [
    { id: 'laboratory', titleKey: 'dashboardOverview.widgets.laboratory', type: 'summary', value: '98.7%', status: 'success', descriptionKey: 'dashboardOverview.widgets.laboratoryCopy', route: '/dashboard-overview/laboratory-dashboard' },
    { id: 'compliance', titleKey: 'dashboardOverview.widgets.compliance', type: 'summary', value: 2, status: 'warning', descriptionKey: 'dashboardOverview.widgets.complianceCopy', route: '/dashboard-overview/compliance-overview' },
    { id: 'platform', titleKey: 'dashboardOverview.widgets.platform', type: 'summary', value: 12, status: 'success', descriptionKey: 'dashboardOverview.widgets.platformCopy', route: '/dashboard-overview/platform-overview' },
    { id: 'kpis', titleKey: 'dashboardOverview.widgets.kpis', type: 'summary', value: 6, status: 'neutral', descriptionKey: 'dashboardOverview.widgets.kpisCopy', route: '/dashboard-overview/kpi-summary' },
    { id: 'alerts', titleKey: 'dashboardOverview.widgets.alerts', type: 'summary', value: 3, status: 'warning', descriptionKey: 'dashboardOverview.widgets.alertsCopy', route: '/dashboard-overview/alert-overview' },
    { id: 'assets', titleKey: 'dashboardOverview.widgets.assets', type: 'summary', value: 156, status: 'success', descriptionKey: 'dashboardOverview.widgets.assetsCopy', route: '/dashboard-overview/asset-overview' },
    { id: 'sensors', titleKey: 'dashboardOverview.widgets.sensors', type: 'summary', value: 24, status: 'success', descriptionKey: 'dashboardOverview.widgets.sensorsCopy', route: '/dashboard-overview/sensor-overview' },
    { id: 'incidents', titleKey: 'dashboardOverview.widgets.incidents', type: 'summary', value: 3, status: 'danger', descriptionKey: 'dashboardOverview.widgets.incidentsCopy', route: '/dashboard-overview/incident-overview' }
  ],
  notifications: [
    { id: 1, severity: 'danger', titleKey: 'dashboardOverview.notifications.freezerTitle', messageKey: 'dashboardOverview.notifications.freezerMessage', time: '05:30', source: 'Freezer A-01' },
    { id: 2, severity: 'warning', titleKey: 'dashboardOverview.notifications.humidityTitle', messageKey: 'dashboardOverview.notifications.humidityMessage', time: '04:55', source: 'Storage B' },
    { id: 3, severity: 'success', titleKey: 'dashboardOverview.notifications.reportTitle', messageKey: 'dashboardOverview.notifications.reportMessage', time: '03:40', source: 'Compliance' },
    { id: 4, severity: 'neutral', titleKey: 'dashboardOverview.notifications.sensorTitle', messageKey: 'dashboardOverview.notifications.sensorMessage', time: '02:10', source: 'Sensor T-204' }
  ],
  trends: [
    { labelKey: 'dashboardOverview.trends.temperature', values: [4.1, 4.2, 4.0, 4.3, 4.2, 4.1, 4.2], unit: '°C' },
    { labelKey: 'dashboardOverview.trends.humidity', values: [45, 46, 44, 45, 47, 46, 45], unit: '%' },
    { labelKey: 'dashboardOverview.trends.alerts', values: [6, 5, 4, 5, 3, 4, 3], unit: '' },
    { labelKey: 'dashboardOverview.trends.compliance', values: [94, 95, 96, 96, 97, 98, 98.7], unit: '%' }
  ],
  filters: [
    { key: 'role', labelKey: 'dashboardOverview.filters.role', valueKey: 'dashboardOverview.values.roleAdmin' },
    { key: 'laboratory', labelKey: 'dashboardOverview.filters.laboratory', valueKey: 'dashboardOverview.values.centralLaboratory' },
    { key: 'period', labelKey: 'dashboardOverview.filters.period', valueKey: 'dashboardOverview.values.last24Hours' },
    { key: 'refreshRate', labelKey: 'dashboardOverview.filters.refreshRate', valueKey: 'dashboardOverview.values.refreshRate' }
  ],
  laboratories: [
    { id: 'lab-a', name: 'Central Lab A', score: 99, sensors: 8, alerts: 1, status: 'success' },
    { id: 'lab-b', name: 'Storage Room B', score: 96, sensors: 6, alerts: 2, status: 'warning' },
    { id: 'pharma-01', name: 'Pharma Cold Chain', score: 100, sensors: 10, alerts: 0, status: 'success' }
  ],
  operationalRisks: [
    { id: 1, labelKey: 'dashboardOverview.risks.temperatureDeviation', value: 1, status: 'danger' },
    { id: 2, labelKey: 'dashboardOverview.risks.disconnectedSensors', value: 0, status: 'success' },
    { id: 3, labelKey: 'dashboardOverview.risks.pendingEvidence', value: 2, status: 'warning' },
    { id: 4, labelKey: 'dashboardOverview.risks.openIncidents', value: 3, status: 'warning' }
  ]
}

export class DashboardOverviewService {
  async fetchOverview() {
    try {
      const data = await dashboardOverviewApiService.getOverview()
      return this.toSummary(this.ensureValidData(data))
    } catch (error) {
      return this.toSummary(fallbackOverview)
    }
  }

  ensureValidData(data) {
    if (!data || typeof data !== 'object' || !Array.isArray(data.kpis) || data.kpis.length === 0) {
      return fallbackOverview
    }

    return {
      ...fallbackOverview,
      ...data,
      fallback: false,
      compliance: { ...fallbackOverview.compliance, ...(data.compliance || {}) },
      widgets: data.widgets?.length ? data.widgets : fallbackOverview.widgets,
      notifications: data.notifications?.length ? data.notifications : fallbackOverview.notifications,
      trends: data.trends?.length ? data.trends : fallbackOverview.trends,
      filters: data.filters?.length ? data.filters : fallbackOverview.filters,
      laboratories: data.laboratories?.length ? data.laboratories : fallbackOverview.laboratories,
      operationalRisks: data.operationalRisks?.length ? data.operationalRisks : fallbackOverview.operationalRisks
    }
  }

  toSummary(data) {
    return new DashboardSummary({
      ...data,
      widgets: (data.widgets || []).map(widget => new DashboardWidget(widget))
    })
  }
}

export const dashboardOverviewService = new DashboardOverviewService()
