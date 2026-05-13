import { AnalyticsApiService } from '../../infrastructure/http/analytics-api.service'
import { AnalyticsSummary } from '../../domain/entities/analytics-summary.entity'
import { Trend } from '../../domain/entities/trend.entity'

const api = new AnalyticsApiService()

export class AnalyticsService {
    async getSummary(filters = {}) {
        const response = await api.getSummary(filters)
        return new AnalyticsSummary(response.data)
    }

    async getTrends(filters = {}) {
        const response = await api.getTrends(filters)
        return response.data.map((trend) => new Trend(trend))
    }
}
