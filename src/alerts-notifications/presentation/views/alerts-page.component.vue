<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAlertStore } from '../../application/stores/alert.store'
import AlertTable from '../components/alert-table.component.vue'

const { t } = useI18n()
const alertStore = useAlertStore()

const severityOptions = computed(() => [
  {
    label: t('alertsNotifications.severity.info'),
    value: 'info'
  },
  {
    label: t('alertsNotifications.severity.warning'),
    value: 'warning'
  },
  {
    label: t('alertsNotifications.severity.critical'),
    value: 'critical'
  }
])

const statusOptions = computed(() => [
  {
    label: t('alertsNotifications.status.active'),
    value: 'active'
  },
  {
    label: t('alertsNotifications.status.acknowledged'),
    value: 'acknowledged'
  },
  {
    label: t('alertsNotifications.status.resolved'),
    value: 'resolved'
  },
  {
    label: t('alertsNotifications.status.escalated'),
    value: 'escalated'
  }
])

const criticalCount = computed(() => alertStore.criticalAlerts.length)

const unacknowledgedCount = computed(() => alertStore.unacknowledgedAlerts.length)

const totalAlerts = computed(() => alertStore.alerts.length)

const updateFilter = (key, value) => {
  alertStore.setFilters({
    [key]: value
  })
}

const clearFilters = () => {
  alertStore.clearFilters()
}

onMounted(() => {
  alertStore.fetchAlerts()
})
</script>

<template>
  <main class="alerts-page" aria-labelledby="alerts-page-title">
    <header class="page-header">
      <div>
        <p class="eyebrow">
          {{ t('alertsNotifications.module.eyebrow') }}
        </p>

        <h1 id="alerts-page-title">
          {{ t('alertsNotifications.module.title') }}
        </h1>

        <p class="page-description">
          {{ t('alertsNotifications.module.description') }}
        </p>
        <nav class="quick-actions" aria-label="Alertas y notificaciones">
          <RouterLink
              :to="{ name: 'alerts-notifications-notification-history' }"
              class="quick-action-link"
          >
            <i class="pi pi-history" aria-hidden="true"></i>
            <span>{{ t('alertsNotifications.actions.notificationHistory') }}</span>
          </RouterLink>

          <RouterLink
              :to="{ name: 'alerts-notifications-notification-settings' }"
              class="quick-action-link"
          >
            <i class="pi pi-cog" aria-hidden="true"></i>
            <span>{{ t('alertsNotifications.actions.notificationSettings') }}</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <section class="summary-grid" aria-label="Alert summary">
      <article class="summary-card critical">
                <span class="summary-label">
                    {{ t('alertsNotifications.summary.criticalAlerts') }}
                </span>

        <strong>{{ criticalCount }}</strong>
      </article>

      <article class="summary-card warning">
                <span class="summary-label">
                    {{ t('alertsNotifications.summary.unacknowledged') }}
                </span>

        <strong>{{ unacknowledgedCount }}</strong>
      </article>

      <article class="summary-card info">
                <span class="summary-label">
                    {{ t('alertsNotifications.summary.totalAlerts') }}
                </span>

        <strong>{{ totalAlerts }}</strong>
      </article>
    </section>

    <section class="filters-panel" aria-label="Alert filters">
      <label>
        {{ t('alertsNotifications.filters.search') }}

        <input
            :value="alertStore.filters.query"
            type="search"
            :placeholder="t('alertsNotifications.filters.searchPlaceholder')"
            @input="updateFilter('query', $event.target.value)"
        />
      </label>

      <label>
        {{ t('alertsNotifications.filters.severity') }}

        <select
            :value="alertStore.filters.severity || ''"
            @change="updateFilter('severity', $event.target.value || null)"
        >
          <option value="">
            {{ t('alertsNotifications.filters.allSeverities') }}
          </option>

          <option
              v-for="severity in severityOptions"
              :key="severity.value"
              :value="severity.value"
          >
            {{ severity.label }}
          </option>
        </select>
      </label>

      <label>
        {{ t('alertsNotifications.filters.status') }}

        <select
            :value="alertStore.filters.status || ''"
            @change="updateFilter('status', $event.target.value || null)"
        >
          <option value="">
            {{ t('alertsNotifications.filters.allStatuses') }}
          </option>

          <option
              v-for="status in statusOptions"
              :key="status.value"
              :value="status.value"
          >
            {{ status.label }}
          </option>
        </select>
      </label>

      <button
          type="button"
          class="secondary-button"
          @click="clearFilters"
      >
        {{ t('alertsNotifications.filters.clearFilters') }}
      </button>
    </section>

    <p
        v-if="alertStore.error"
        class="error-message"
        role="alert"
    >
      {{ t('alertsNotifications.errors.loadAlerts') }}
    </p>

    <p
        v-if="!alertStore.loading && !alertStore.error && alertStore.filteredAlerts.length === 0"
        class="empty-message"
    >
      {{ t('alertsNotifications.empty.alerts') }}
    </p>

    <AlertTable
        :alerts="alertStore.filteredAlerts"
        :loading="alertStore.loading"
    />
  </main>
</template>

<style scoped>
.alerts-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(to bottom right, #f8fafc 0%, #f1f5f9 100%);
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
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.page-description {
  color: #475569;
  font-size: 1rem;
  margin: 0.5rem 0 0;
}
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.quick-action-link {
  align-items: center;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  color: #334155;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 700;
  gap: 0.5rem;
  min-height: 40px;
  padding: 0.625rem 1rem;
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition:
      background-color 150ms ease-in-out,
      border-color 150ms ease-in-out,
      color 150ms ease-in-out,
      box-shadow 150ms ease-in-out,
      transform 150ms ease-in-out;
}

.quick-action-link:hover {
  background: #eef2ff;
  border-color: #4f46e5;
  color: #4338ca;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.quick-action-link:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

.quick-action-link i {
  font-size: 1rem;
}
.summary-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: 1.5rem;
}

.summary-card {
  border-left: 4px solid #4f46e5;
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.summary-card strong {
  display: block;
  color: #0f172a;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin-top: 0.75rem;
}

.summary-label {
  color: #334155;
  font-size: 0.875rem;
  font-weight: 600;
}

.summary-card.critical {
  border-left-color: #dc2626;
}

.summary-card.warning {
  border-left-color: #f59e0b;
}

.summary-card.info {
  border-left-color: #2563eb;
}

.filters-panel {
  align-items: end;
  background: #ffffff;
  border-radius: 0.5rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 2fr 1fr 1fr auto;
  margin-bottom: 1.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

label {
  color: #334155;
  display: grid;
  font-size: 0.875rem;
  font-weight: 600;
  gap: 0.5rem;
}

input,
select {
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  background: #ffffff;
  color: #334155;
  font: inherit;
  min-height: 40px;
  padding: 0.5rem 0.75rem;
}

input::placeholder {
  color: #94a3b8;
}

input:focus,
select:focus,
.secondary-button:focus {
  border-color: #4f46e5;
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

.secondary-button {
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  background: #ffffff;
  color: #334155;
  cursor: pointer;
  font-weight: 600;
  min-height: 40px;
  padding: 0.5rem 1rem;
  transition: background-color 150ms ease-in-out, border-color 150ms ease-in-out;
}

.secondary-button:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.error-message {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
  color: #991b1b;
  font-weight: 500;
  margin: 0 0 1rem;
  padding: 1rem;
}

.empty-message {
  background: #ffffff;
  border-left: 4px solid #2563eb;
  border-radius: 0.5rem;
  color: #1e40af;
  margin: 0 0 1rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

@media (max-width: 1023px) {
  .filters-panel {
    grid-template-columns: 1fr 1fr;
  }

  .secondary-button {
    width: fit-content;
  }

}
@media (max-width: 767px) {
  .alerts-page {
    padding: 1rem;
  }

  .summary-grid,
  .filters-panel {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 1.75rem;
  }

  .secondary-button {
    width: 100%;
  }

  .quick-actions {
    flex-direction: column;
  }

  .quick-action-link {
    justify-content: center;
    width: 100%;
  }
}
</style>