import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export class ReportsApiService {
    getAll() {
        return http.get('/reports')
    }

    generate(payload) {
        return http.post('/reports', payload)
    }

    getById(id) {
        return http.get(`/reports/${id}`)
    }

    download(id) {
        return http.get(`/reports/${id}/download`, {
            responseType: 'blob'
        })
    }
}
