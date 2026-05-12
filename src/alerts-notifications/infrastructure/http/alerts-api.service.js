import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export class AlertsApiService {
    getAll(params = {}) {
        return http.get('/alerts', { params });
    }

    getById(id) {
        return http.get(`/alerts/${id}`);
    }

    acknowledge(id) {
        return http.patch(`/alerts/${id}/acknowledge`);
    }

    resolve(id) {
        return http.patch(`/alerts/${id}/resolve`);
    }

    escalate(id) {
        return http.patch(`/alerts/${id}/escalate`);
    }
}