export class DashboardSummary {
  constructor({ kpis = [], widgets = [], notifications = [], trends = [], compliance = {}, filters = {} } = {}) {
    this.kpis = kpis
    this.widgets = widgets
    this.notifications = notifications
    this.trends = trends
    this.compliance = compliance
    this.filters = filters
  }

  get criticalAlerts() {
    return this.kpis.find(kpi => kpi.key === 'criticalAlerts')?.value ?? 0
  }

  get complianceScore() {
    return this.kpis.find(kpi => kpi.key === 'complianceScore')?.value ?? 0
  }
}
