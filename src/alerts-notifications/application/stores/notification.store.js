import { defineStore } from 'pinia';
import { NotificationService } from '../services/notification.service';

const notificationService = new NotificationService();

export const useNotificationStore = defineStore('notifications', {
    state: () => ({
        notifications: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchNotifications(filters = {}) {
            this.loading = true;
            this.error = null;

            try {
                this.notifications = await notificationService.findAll(filters);
            } catch (error) {
                this.error = 'Could not load notifications.';
            } finally {
                this.loading = false;
            }
        },

        async retryNotification(id) {
            await notificationService.retry(id);
            await this.fetchNotifications();
        }
    }
});