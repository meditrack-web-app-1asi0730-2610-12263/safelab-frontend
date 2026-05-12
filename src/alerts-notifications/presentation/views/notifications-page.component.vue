<script setup>
import { onMounted } from 'vue';
import { useNotificationStore } from '../../application/stores/notification.store';
import NotificationTable from '../components/notification-table.component.vue';

const notificationStore = useNotificationStore();

const retryNotification = async (id) => {
  await notificationStore.retryNotification(id);
};

onMounted(() => {
  notificationStore.fetchNotifications();
});
</script>

<template>
  <main class="notifications-page" aria-labelledby="notifications-title">
    <header class="page-header">
      <p class="eyebrow">Alerts & Notifications</p>
      <h1 id="notifications-title">Notification History</h1>
      <p>
        Track delivery status by channel, recipient and retry attempts.
      </p>
    </header>

    <p v-if="notificationStore.error" class="error-message" role="alert">
      {{ notificationStore.error }}
    </p>

    <NotificationTable
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

.eyebrow {
  color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 700;
}

h1 {
  color: #0f172a;
  font-size: 2rem;
  margin: 0;
}

p {
  color: #475569;
}

.error-message {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
  color: #991b1b;
  padding: 1rem;
}
</style>