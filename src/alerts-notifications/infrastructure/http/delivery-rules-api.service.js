import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export class DeliveryRulesApiService {
    getAll(params = {}) {
        return http.get('/delivery-rules', { params });
    }

    create(payload) {
        return http.post('/delivery-rules', payload);
    }

    update(id, payload) {
        return http.put(`/delivery-rules/${id}`, payload);
    }

    delete(id) {
        return http.delete(`/delivery-rules/${id}`);
    }
}