<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNotificationStore } from '../../application/stores/notification.store'

const notificationStore = useNotificationStore()
const { t } = useI18n({ useScope: 'global' })

const notifications = computed(() => notificationStore.recentNotifications)
const unreadCount = computed(() => notificationStore.unreadCount)

const severityClass = (severity) => ({
  critical: 'notification-item critical',
  warning: 'notification-item warning',
  info: 'notification-item info'
}[severity] || 'notification-item info')

const formatDate = (value) => {
  if (!value) return '—'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  const pad = (number) => String(number).padStart(2, '0')

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

onMounted(() => {
  notificationStore.fetchNotifications()
})
</script>

<template>
  <section class="notification-panel">
    <header class="notification-panel-header">
      <div>
        <strong>{{ t('alertsNotifications.notificationPanel.title') }}</strong>
        <span>
          {{ unreadCount }}
          {{ t('alertsNotifications.notificationPanel.unread') }}
        </span>
      </div>
    </header>

    <div v-if="notificationStore.loading" class="notification-state">
      {{ t('alertsNotifications.loading.notifications') }}
    </div>

    <div v-else-if="notificationStore.error" class="notification-state error">
      {{ t('alertsNotifications.errors.loadNotifications') }}
    </div>

    <div v-else-if="notifications.length === 0" class="notification-state">
      {{ t('alertsNotifications.empty.notifications') }}
    </div>

    <div v-else class="notification-list">
      <article
          v-for="notification in notifications"
          :key="notification.id"
          :class="severityClass(notification.severity)"
      >
        <div class="notification-copy">
          <strong>{{ notification.title }}</strong>
          <p>{{ notification.message }}</p>

          <small>
            {{ notification.source }} · {{ formatDate(notification.createdAt || notification.sentAt) }}
          </small>
        </div>

        <button
            v-if="!notification.readAt"
            type="button"
            class="read-button"
            :aria-label="t('alertsNotifications.notificationPanel.markAsRead')"
            @click="notificationStore.markAsRead(notification.id)"
        >
          <i class="pi pi-check" aria-hidden="true"></i>
        </button>
      </article>
    </div>

    <RouterLink
        class="view-all-link"
        :to="{ name: 'alerts-notifications-notification-history' }"
    >
      {{ t('alertsNotifications.notificationPanel.viewAll') }}
    </RouterLink>
  </section>
</template>

<style scoped>
.notification-panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 30;
  width: min(360px, calc(100vw - 32px));
  border-radius: 22px;
  border: 1px solid var(--border);
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}

.notification-panel-header {
  padding: 16px 18px;
  border-bottom: 1px solid var(--border);
  background: #f8fafc;
}

.notification-panel-header div {
  display: grid;
  gap: 3px;
}

.notification-panel-header strong {
  color: var(--text);
}

.notification-panel-header span {
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 700;
}

.notification-state {
  padding: 18px;
  color: var(--muted);
  font-weight: 700;
  text-align: center;
}

.notification-state.error {
  color: var(--danger);
}

.notification-list {
  display: grid;
  max-height: 340px;
  overflow-y: auto;
}

.notification-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
}

.notification-item::before {
  content: "";
  width: 8px;
  height: 8px;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  border-radius: 999px;
  margin-top: 6px;
}

.notification-copy {
  grid-column: 1 / 2;
  display: grid;
  gap: 4px;
  padding-left: 16px;
  margin-top: -14px;
}

.notification-copy strong {
  color: var(--text);
  font-size: 0.9rem;
}

.notification-copy p {
  margin: 0;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.35;
}

.notification-copy small {
  color: var(--muted);
  font-size: 0.74rem;
  font-weight: 700;
}

.notification-item.critical::before {
  background: #ef4444;
}

.notification-item.warning::before {
  background: #f59e0b;
}

.notification-item.info::before {
  background: #4f46e5;
}

.read-button {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  color: #047857;
  background: #d1fae5;
  cursor: pointer;
}

.view-all-link {
  display: block;
  padding: 14px 16px;
  color: #4f46e5;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  background: #ffffff;
}

.view-all-link:hover {
  background: #eef2ff;
}
</style>