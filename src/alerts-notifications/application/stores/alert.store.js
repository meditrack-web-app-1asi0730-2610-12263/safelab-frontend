import { defineStore } from 'pinia'
import { AlertService } from '../../infrastructure/services/AlertService'

export const useAlertStore = defineStore('alert', {
    state: () => ({
        alerts: [],
        isLoading: false,
        error: null
    }),
    actions: {
        async fetchAlerts() {
            this.isLoading = true
            this.error = null
            try {
                this.alerts = await AlertService.getAll()
            } catch (err) {
                this.error = 'Error al cargar las alertas.'
                console.error(err)
            } finally {
                this.isLoading = false
            }
        },
        async createAlert(alertData) {
            try {
                const newAlert = await AlertService.create(alertData)
                this.alerts.push(newAlert)
            } catch (err) {
                this.error = 'Error al crear la alerta.'
            }
        },
        async updateAlert(id, alertData) {
            try {
                const updatedAlert = await AlertService.update(id, alertData)
                const index = this.alerts.findIndex(a => a.id === id)
                if (index !== -1) {
                    this.alerts[index] = updatedAlert
                }
            } catch (err) {
                this.error = 'Error al actualizar la alerta.'
            }
        },
        async deleteAlert(id) {
            try {
                await AlertService.delete(id)
                this.alerts = this.alerts.filter(a => a.id !== id)
            } catch (err) {
                this.error = 'Error al eliminar la alerta.'
            }
        }
    }
})