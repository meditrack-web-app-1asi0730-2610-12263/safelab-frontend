import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export class HistoricalDataApiService {
    getAll(filters = {}) {
        return http.get('/historicalData', {
            params: filters
        })
    }
}
