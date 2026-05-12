import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export class RecipientsApiService {
    getAll(params = {}) {
        return http.get('/recipients', { params });
    }

    getById(id) {
        return http.get(`/recipients/${id}`);
    }
}