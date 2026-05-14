import { defineStore } from 'pinia'
import { AnalyticsService } from '../services/analytics.service'
import { AnalyticsSummary } from '../../domain/entities/analytics-summary.entity'

const analyticsService = new AnalyticsService()

export const useAnalyticsStore = defineStore('reportsAnalytics', {
    state: () => ({
        summary: new AnalyticsSummary({}),
        trends: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchAnalytics(filters = {}) {
            this.loading = true
            this.error = null

            try {
                const [summary, trends] = await Promise.all([
                    analyticsService.getSummary(filters),
                    analyticsService.getTrends(filters)
                ])

                this.summary = summary
                this.trends = trends
            } catch (error) {
                console.error(error)
                this.error = 'Could not load analytics.'
            } finally {
                this.loading = false
            }
        }
    }
})
