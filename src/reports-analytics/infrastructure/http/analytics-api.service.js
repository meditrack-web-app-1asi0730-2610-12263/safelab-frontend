import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
})

export class AnalyticsApiService {
    getSensors() {
        return http.get('/sensors')
    }

    getAlerts() {
        return http.get('/alerts')
    }

    getAssets() {
        return http.get('/assets')
    }

    getReports() {
        return http.get('/reports')
    }
}