import { defineStore } from 'pinia';
import { IncidentService } from '../services/incident.service';
import { IncidentSeverity, IncidentStatus } from '../../domain/model/incident-status.model';

const incidentService = new IncidentService();

export const useIncidentStore = defineStore('incident', {
    state: () => ({
        incidents: [],
        selectedIncident: null,
        loading: false,
        error: null
    }),

    getters: {
        openIncidents: (state) =>
            state.incidents.filter((incident) => incident.status === IncidentStatus.OPEN),

        investigatingIncidents: (state) =>
            state.incidents.filter((incident) => incident.status === IncidentStatus.INVESTIGATING),

        resolvedIncidents: (state) =>
            state.incidents.filter((incident) => incident.status === IncidentStatus.RESOLVED),

        criticalIncidents: (state) =>
            state.incidents.filter((incident) => incident.severity === IncidentSeverity.CRITICAL),

        totalIncidents: (state) => state.incidents.length
    },

    actions: {
        async fetchIncidents() {
            this.loading = true;
            this.error = null;

            try {
                this.incidents = await incidentService.getIncidents();
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },

        async fetchIncidentById(id) {
            this.loading = true;
            this.error = null;

            try {
                this.selectedIncident = await incidentService.getIncidentById(id);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },

        async createIncident(payload) {
            this.loading = true;
            this.error = null;

            try {
                const createdIncident = await incidentService.createIncident(payload);
                this.incidents.push(createdIncident);
                return createdIncident;
            } catch (error) {
                this.error = error;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async updateIncident(id, payload) {
            this.loading = true;
            this.error = null;

            try {
                const updatedIncident = await incidentService.updateIncident(id, payload);

                this.incidents = this.incidents.map((incident) =>
                    String(incident.id) === String(id) ? updatedIncident : incident
                );

                if (String(this.selectedIncident?.id) === String(id)) {
                    this.selectedIncident = updatedIncident;
                }

                return updatedIncident;
            } catch (error) {
                this.error = error;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async deleteIncident(id) {
            this.loading = true;
            this.error = null;

            try {
                await incidentService.deleteIncident(id);

                this.incidents = this.incidents.filter(
                    (incident) => String(incident.id) !== String(id)
                );
            } catch (error) {
                this.error = error;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        clearSelectedIncident() {
            this.selectedIncident = null;
        }
    }
});