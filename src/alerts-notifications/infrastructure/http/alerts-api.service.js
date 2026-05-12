import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export class AlertsApiService {
    getAll(params = {}) {
        return http.get('/alerts', { params })
    }

    getById(id) {
        return http.get(`/alerts/${id}`)
    }

    update(id, payload) {
        return http.patch(`/alerts/${id}`, payload)
    }

    acknowledge(id) {
        return this.update(id, {
            status: 'acknowledged',
            acknowledgedAt: new Date().toISOString()
        })
    }

    resolve(id) {
        return this.update(id, {
            status: 'resolved',
            resolvedAt: new Date().toISOString()
        })
    }

    escalate(id) {
        return this.update(id, {
            status: 'escalated'
        })
    }
}