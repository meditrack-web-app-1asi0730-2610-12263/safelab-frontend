import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export class AnalyticsApiService {
    getSummary(filters = {}) {
        return http.get('/analyticsSummary', {
            params: filters
        })
    }

    getTrends(filters = {}) {
        return http.get('/analyticsTrends', {
            params: filters
        })
    }
}
