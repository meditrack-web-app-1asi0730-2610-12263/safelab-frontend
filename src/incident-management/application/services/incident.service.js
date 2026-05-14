import { IncidentApiService } from '../../infrastructure/http/incident-api.service';

const incidentApiService = new IncidentApiService();

export class IncidentService {
    async getIncidents() {
        return await incidentApiService.getAll();
    }

    async getIncidentById(id) {
        return await incidentApiService.getById(id);
    }

    async createIncident(payload) {
        const incidentPayload = {
            ...payload,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return await incidentApiService.create(incidentPayload);
    }

    async updateIncident(id, payload) {
        const incidentPayload = {
            ...payload,
            updatedAt: new Date().toISOString()
        };

        return await incidentApiService.update(id, incidentPayload);
    }

    async deleteIncident(id) {
        return await incidentApiService.delete(id);
    }
}