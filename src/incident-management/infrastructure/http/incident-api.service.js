import axios from 'axios';

const INCIDENTS_ENDPOINT = 'http://localhost:3000/incidents';

export class IncidentApiService {
    async getAll() {
        const response = await axios.get(INCIDENTS_ENDPOINT);
        return response.data;
    }

    async getById(id) {
        const response = await axios.get(`${INCIDENTS_ENDPOINT}/${id}`);
        return response.data;
    }

    async create(payload) {
        const response = await axios.post(INCIDENTS_ENDPOINT, payload);
        return response.data;
    }

    async update(id, payload) {
        const response = await axios.put(`${INCIDENTS_ENDPOINT}/${id}`, payload);
        return response.data;
    }

    async delete(id) {
        const response = await axios.delete(`${INCIDENTS_ENDPOINT}/${id}`);
        return response.data;
    }
}