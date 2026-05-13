import { dashboardOverviewApiService } from '@/dashboard-overview/infrastructure/http/dashboard-overview-api.service'
import { DashboardSummary } from '@/dashboard-overview/domain/models/dashboard-summary.model'
import { DashboardWidget } from '@/dashboard-overview/domain/entities/dashboard-widget.entity'

const fallbackOverview = {
  lastUpdated: '2026-05-13T05:30:00',
  kpis: [
    { key: 'activeSensors', labelKey: 'dashboardOverview.kpis.activeSensors', value: 24, unit: '', trend: '+8%', status: 'success', icon: 'pi pi-wifi' },
    { key: 'complianceScore', labelKey: 'dashboardOverview.kpis.complianceScore', value: 98.7, unit: '%', trend: '+2.1%', status: 'success', icon: 'pi pi-check-circle' },
    { key: 'openAlerts', labelKey: 'dashboardOverview.kpis.openAlerts', value: 3, unit: '', trend: '-1', status: 'warning', icon: 'pi pi-bell' },
    { key: 'criticalAlerts', labelKey: 'dashboardOverview.kpis.criticalAlerts', value: 1, unit: '', trend: 'urgent', status: 'danger', icon: 'pi pi-exclamation-triangle' }
  ],
  compliance: {
    score: 98.7,
    compliantStorage: 32,
    totalStorage: 35,
    violatedRules: 2,
    evidenceReady: 18
  },
  widgets: [
    { id: 'alerts', titleKey: 'dashboardOverview.widgets.alerts', type: 'summary', value: 3, status: 'warning', descriptionKey: 'dashboardOverview.widgets.alertsCopy', route: '/dashboard-overview/alert-overview' },
    { id: 'assets', titleKey: 'dashboardOverview.widgets.assets', type: 'summary', value: 156, status: 'success', descriptionKey: 'dashboardOverview.widgets.assetsCopy', route: '/dashboard-overview/asset-overview' },
    { id: 'sensors', titleKey: 'dashboardOverview.widgets.sensors', type: 'summary', value: 24, status: 'success', descriptionKey: 'dashboardOverview.widgets.sensorsCopy', route: '/dashboard-overview/sensor-overview' },
    { id: 'incidents', titleKey: 'dashboardOverview.widgets.incidents', type: 'summary', value: 3, status: 'danger', descriptionKey: 'dashboardOverview.widgets.incidentsCopy', route: '/dashboard-overview/incident-overview' }
  ],
  notifications: [
    { id: 1, severity: 'danger', titleKey: 'dashboardOverview.notifications.freezerTitle', messageKey: 'dashboardOverview.notifications.freezerMessage', time: '05:30' },
    { id: 2, severity: 'warning', titleKey: 'dashboardOverview.notifications.humidityTitle', messageKey: 'dashboardOverview.notifications.humidityMessage', time: '04:55' },
    { id: 3, severity: 'success', titleKey: 'dashboardOverview.notifications.reportTitle', messageKey: 'dashboardOverview.notifications.reportMessage', time: '03:40' }
  ],
  trends: [
    { labelKey: 'dashboardOverview.trends.temperature', values: [4.1, 4.2, 4.0, 4.3, 4.2, 4.1, 4.2], unit: '°C' },
    { labelKey: 'dashboardOverview.trends.humidity', values: [45, 46, 44, 45, 47, 46, 45], unit: '%' }
  ],
  filters: {
    role: 'SafeLab Administrator',
    laboratory: 'Central Laboratory',
    period: 'Last 24 hours',
    refreshRate: '5 min'
  }
}

export class DashboardOverviewService {
  async fetchOverview() {
    try {
      const data = await dashboardOverviewApiService.getOverview()
      return this.toSummary(data)
    } catch (error) {
      return this.toSummary({ ...fallbackOverview, fallback: true })
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
