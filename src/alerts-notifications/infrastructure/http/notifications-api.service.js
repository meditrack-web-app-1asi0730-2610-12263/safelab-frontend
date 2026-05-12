import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export class NotificationsApiService {
    getAll() {
        return http.get('/notifications')
    }

    getById(id) {
        return http.get(`/notifications/${id}`)
    }

    retry(id) {
        return http.patch(`/notifications/${id}`, {
            status: 'pending',
            retryCount: 0
        })
    }
}