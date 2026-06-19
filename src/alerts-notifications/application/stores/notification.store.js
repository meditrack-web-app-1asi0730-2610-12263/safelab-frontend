import { defineStore } from 'pinia'
import { NotificationService } from '../services/notification.service'
import { useAuthStore } from '@/identity-access/application/stores/auth.store'

const notificationService = new NotificationService()

export const useNotificationStore = defineStore('notifications', {
    state: () => ({
        notifications: [],
        loading: false,
        error: null
    }),

    getters: {
        recentNotifications(state) {
            return [...state.notifications]
                .sort((left, right) => {
                    const leftDate = new Date(left.createdAt || left.sentAt || 0).getTime()
                    const rightDate = new Date(right.createdAt || right.sentAt || 0).getTime()

                    return rightDate - leftDate
                })
                .slice(0, 5)
        },

        unreadCount(state) {
            return state.notifications.filter((notification) => !notification.readAt).length
        }
    },

    actions: {
        async fetchNotifications() {
            this.loading = true
            this.error = null

            try {
                const authStore = useAuthStore()
                authStore.restoreSession()
                const notifications = await notificationService.findAll()

                this.notifications = authStore.isAdmin
                    ? notifications
                    : notifications.filter((notification) =>
                        String(notification.recipientId || '') === String(authStore.currentUser?.id || '')
                    )
            } catch (error) {
                console.error(error)
                this.error = 'Could not load notifications.'
            } finally {
                this.loading = false
            }
        },

        async createNotification(payload) {
            const notification = await notificationService.create(payload)
            this.notifications.unshift(notification)

            return notification
        },

        async markAsRead(id) {
            await notificationService.markAsRead(id)
            await this.fetchNotifications()
        },

        async retryNotification(id) {
            await notificationService.retry(id)
            await this.fetchNotifications()
        }
    }
})