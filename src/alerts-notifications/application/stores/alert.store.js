import { defineStore } from 'pinia';
import { AlertService } from '../services/alert.service';

const alertService = new AlertService();

export const useAlertStore = defineStore('alerts', {
    state: () => ({
        alerts: [],
        selectedAlert: null,
        loading: false,
        error: null,
        filters: {
            severity: null,
            status: null,
            query: ''
        }
    }),

    getters: {
        criticalAlerts: (state) =>
            state.alerts.filter((alert) => alert.severity === 'Critical'),

        unacknowledgedAlerts: (state) =>
            state.alerts.filter((alert) => alert.status === 'Unacknowledged')
    },

    actions: {
        async fetchAlerts() {
            this.loading = true;
            this.error = null;

            try {
                this.alerts = await alertService.findAll(this.filters);
            } catch (error) {
                this.error = 'Could not load alerts.';
            } finally {
                this.loading = false;
            }
        },

        async fetchAlertById(id) {
            this.loading = true;
            this.error = null;

            try {
                this.selectedAlert = await alertService.findById(id);
            } catch (error) {
                this.error = 'Could not load alert detail.';
            } finally {
                this.loading = false;
            }
        },

        async acknowledgeAlert(id) {
            await alertService.acknowledge(id);
            await this.fetchAlertById(id);
            await this.fetchAlerts();
        },

        async resolveAlert(id) {
            await alertService.resolve(id);
            await this.fetchAlertById(id);
            await this.fetchAlerts();
        },

        async escalateAlert(id) {
            await alertService.escalate(id);
            await this.fetchAlertById(id);
            await this.fetchAlerts();
        },

        setFilters(filters) {
            this.filters = {
                ...this.filters,
                ...filters
            };
        },

        clearFilters() {
            this.filters = {
                severity: null,
                status: null,
                query: ''
            };
        }
    }
});