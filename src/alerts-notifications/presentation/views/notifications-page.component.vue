<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNotificationStore } from '../../application/stores/notification.store'
import NotificationTable from '../components/notification-table.component.vue'

const { t } = useI18n()
const notificationStore = useNotificationStore()

const retryNotification = async (id) => {
  await notificationStore.retryNotification(id)
}

onMounted(() => {
  notificationStore.fetchNotifications()
})
</script>

<template>
  <main class="notifications-page" aria-labelledby="notifications-title">
    <header class="page-header">
      <p class="eyebrow">
        {{ t('alertsNotifications.notifications.eyebrow') }}
      </p>

      <h1 id="notifications-title">
        {{ t('alertsNotifications.notifications.title') }}
      </h1>

      <p>
        {{ t('alertsNotifications.notifications.description') }}
      </p>
    </header>

    <p
        v-if="notificationStore.loading"
        class="loading-message"
    >
      {{ t('alertsNotifications.loading.notifications') }}
    </p>

    <p
        v-else-if="notificationStore.error"
        class="error-message"
        role="alert"
    >
      {{ t('alertsNotifications.errors.loadNotifications') }}
    </p>

    <p
        v-else-if="notificationStore.notifications.length === 0"
        class="empty-message"
    >
      {{ t('alertsNotifications.empty.notifications') }}
    </p>

    <NotificationTable
        v-else
        :notifications="notificationStore.notifications"
        :loading="notificationStore.loading"
        @retry="retryNotification"
    />
  </main>
</template>

<style scoped>
.notifications-page {
  min-height: 100vh;
  padding: 2rem;
  background: #f8fafc;
}

.page-header {
  margin-bottom: 1.5rem;
}

.eyebrow {
  color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0 0 0.25rem;
  text-transform: uppercase;
}

h1 {
  color: #0f172a;
  font-size: 2rem;
  margin: 0;
}

p {
  color: #475569;
}

.loading-message,
.empty-message,
.error-message {
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.loading-message {
  background: #ffffff;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.empty-message {
  background: #eff6ff;
  color: #1e40af;
  border-left: 4px solid #2563eb;
}

.error-message {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
  color: #991b1b;
}

@media (max-width: 767px) {
  .notifications-page {
    padding: 1rem;
  }

  h1 {
    font-size: 1.75rem;
  }
}
</style>