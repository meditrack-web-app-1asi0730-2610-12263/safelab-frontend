import { defineStore } from 'pinia'
import { AlertService } from '../service/alert.service'

const alertService = new AlertService()

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
        filteredAlerts: (state) => {
            return state.alerts.filter((alert) => {
                const matchesSeverity =
                    !state.filters.severity || alert.severity === state.filters.severity

                const matchesStatus =
                    !state.filters.status || alert.status === state.filters.status

                const query = state.filters.query.toLowerCase().trim()

                const matchesQuery =
                    !query ||
                    alert.title?.toLowerCase().includes(query) ||
                    alert.type?.toLowerCase().includes(query) ||
                    alert.deviceName?.toLowerCase().includes(query) ||
                    alert.location?.toLowerCase().includes(query)

                return matchesSeverity && matchesStatus && matchesQuery
            })
        },

        criticalAlerts: (state) =>
            state.alerts.filter((alert) => alert.severity === 'critical'),

        unacknowledgedAlerts: (state) =>
            state.alerts.filter((alert) => alert.status === 'active')
    },

    actions: {
        async fetchAlerts() {
            this.loading = true
            this.error = null

            try {
                this.alerts = await alertService.findAll()
            } catch (error) {
                console.error(error)
                this.error = 'Could not load alerts.'
            } finally {
                this.loading = false
            }
        },

        async fetchAlertById(id) {
            this.loading = true
            this.error = null
            this.selectedAlert = null

            try {
                this.selectedAlert = await alertService.findById(id)
            } catch (error) {
                console.error(error)
                this.error = 'Could not load alert detail.'
            } finally {
                this.loading = false
            }
        },

        async acknowledgeAlert(id) {
            await alertService.acknowledge(id)
            await this.fetchAlertById(id)
            await this.fetchAlerts()
        },

        async resolveAlert(id) {
            await alertService.resolve(id)
            await this.fetchAlertById(id)
            await this.fetchAlerts()
        },

        async escalateAlert(id) {
            await alertService.escalate(id)
            await this.fetchAlertById(id)
            await this.fetchAlerts()
        },

        setFilters(filters) {
            this.filters = {
                ...this.filters,
                ...filters
            }
        },

        clearFilters() {
            this.filters = {
                severity: null,
                status: null,
                query: ''
            }
        }
    }
})