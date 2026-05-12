import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export class EscalationPoliciesApiService {
    getAll(params = {}) {
        return http.get('/escalation-policies', { params });
    }

    create(payload) {
        return http.post('/escalation-policies', payload);
    }

    update(id, payload) {
        return http.put(`/escalation-policies/${id}`, payload);
    }

    delete(id) {
        return http.delete(`/escalation-policies/${id}`);
    }
}