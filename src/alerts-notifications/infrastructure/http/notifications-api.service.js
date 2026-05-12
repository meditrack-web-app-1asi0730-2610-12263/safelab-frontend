import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export class NotificationsApiService {
    getAll(params = {}) {
        return http.get('/notifications', { params });
    }

    getById(id) {
        return http.get(`/notifications/${id}`);
    }

    retry(id) {
        return http.patch(`/notifications/${id}/retry`);
    }
}