import { defineStore } from 'pinia'
import { dashboardOverviewService } from '@/dashboard-overview/application/services/dashboard-overview.service'

export const useDashboardOverviewStore = defineStore('dashboardOverview', {
  state: () => ({
    overview: null,
    loading: false,
    error: null
  }),
  getters: {
    kpis: state => state.overview?.kpis ?? [],
    widgets: state => state.overview?.widgets ?? [],
    notifications: state => state.overview?.notifications ?? [],
    trends: state => state.overview?.trends ?? [],
    compliance: state => state.overview?.compliance ?? {},
    filters: state => state.overview?.filters ?? {},
    usesFallbackData: state => Boolean(state.overview?.fallback)
  },
  actions: {
    async loadOverview() {
      this.loading = true
      this.error = null
      try {
        this.overview = await dashboardOverviewService.fetchOverview()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
