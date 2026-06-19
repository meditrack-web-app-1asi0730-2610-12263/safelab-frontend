<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAlertStore } from '../../application/stores/alert.store'
import AlertTable from '../components/alert-table.component.vue'

const { t } = useI18n({ useScope: 'global' })
const alertStore = useAlertStore()

const severityOptions = computed(() => [
  { label: t('alertsNotifications.severity.info'), value: 'info' },
  { label: t('alertsNotifications.severity.warning'), value: 'warning' },
  { label: t('alertsNotifications.severity.critical'), value: 'critical' }
])

const statusOptions = computed(() => [
  { label: t('alertsNotifications.status.active'), value: 'active' },
  { label: t('alertsNotifications.status.acknowledged'), value: 'acknowledged' },
  { label: t('alertsNotifications.status.resolved'), value: 'resolved' },
  { label: t('alertsNotifications.status.escalated'), value: 'escalated' }
])

const criticalCount = computed(() => alertStore.criticalAlerts.length)
const unacknowledgedCount = computed(() => alertStore.unacknowledgedAlerts.length)
const totalAlerts = computed(() => alertStore.alerts.length)

const warningCount = computed(() =>
    alertStore.alerts.filter((alert) => alert.severity === 'warning').length
)

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
    <header class="page-hero alerts-hero">
      <div>
        <p class="eyebrow">
          {{ t('alertsNotifications.module.eyebrow') }}
        </p>

        <h1 id="alerts-page-title">
          {{ t('alertsNotifications.module.title') }}
        </h1>

        <p>
          {{ t('alertsNotifications.module.description') }}
        </p>
      </div>
    </header>

    <section class="summary-grid">
      <article class="summary-card critical">
        <div class="summary-icon">
          <i class="pi pi-exclamation-triangle"></i>
        </div>

        <div>
          <span>{{ t('alertsNotifications.summary.criticalAlerts') }}</span>
          <strong>{{ criticalCount }}</strong>
          <small>{{ t('alertsNotifications.summary.criticalDescription') }}</small>
        </div>
      </article>

      <article class="summary-card warning">
        <div class="summary-icon">
          <i class="pi pi-bell"></i>
        </div>

        <div>
          <span>{{ t('alertsNotifications.summary.unacknowledged') }}</span>
          <strong>{{ unacknowledgedCount }}</strong>
          <small>{{ t('alertsNotifications.summary.unacknowledgedDescription') }}</small>
        </div>
      </article>

      <article class="summary-card info">
        <div class="summary-icon">
          <i class="pi pi-list"></i>
        </div>

        <div>
          <span>{{ t('alertsNotifications.summary.totalAlerts') }}</span>
          <strong>{{ totalAlerts }}</strong>
          <small>{{ t('alertsNotifications.summary.totalDescription') }}</small>
        </div>
      </article>

      <article class="summary-card yellow">
        <div class="summary-icon">
          <i class="pi pi-clock"></i>
        </div>

        <div>
          <span>{{ t('alertsNotifications.summary.warningAlerts') }}</span>
          <strong>{{ warningCount }}</strong>
          <small>{{ t('alertsNotifications.summary.warningDescription') }}</small>
        </div>
      </article>
    </section>

    <section class="filters-panel">
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

      <button type="button" class="secondary-button" @click="clearFilters">
        {{ t('alertsNotifications.filters.clearFilters') }}
      </button>
    </section>

    <p v-if="alertStore.error" class="error-message" role="alert">
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
  display: grid;
  gap: 22px;
}

.alerts-hero {
  background:
      radial-gradient(circle at right, rgba(35, 213, 171, 0.18), transparent 32%),
      #ffffff;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(170px, 1fr));
  gap: 1rem;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.summary-card span {
  display: block;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.summary-card strong {
  display: block;
  margin-top: 0.15rem;
  color: var(--text);
  font-size: 1.9rem;
}

.summary-card small {
  color: var(--muted);
  font-weight: 600;
}

.summary-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  font-size: 1.1rem;
}

.summary-card.critical .summary-icon {
  color: #ef4444;
  background: #fee2e2;
}

.summary-card.warning .summary-icon {
  color: #f59e0b;
  background: #fef3c7;
}

.summary-card.info .summary-icon {
  color: #4f46e5;
  background: #e0e7ff;
}

.summary-card.yellow .summary-icon {
  color: #ca8a04;
  background: #fef9c3;
}

.filters-panel {
  align-items: end;
  background: #ffffff;
  border-radius: 18px;
  display: grid;
  gap: 1rem;
  grid-template-columns: 2fr 1fr 1fr auto;
  padding: 1rem;
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

label {
  color: var(--text);
  display: grid;
  font-size: 0.875rem;
  font-weight: 700;
  gap: 0.5rem;
}

input,
select {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #ffffff;
  color: var(--text);
  font: inherit;
  min-height: 42px;
  padding: 0.5rem 0.75rem;
}

input:focus,
select:focus,
.secondary-button:focus {
  border-color: #4f46e5;
  outline: 2px solid rgba(79, 70, 229, 0.25);
  outline-offset: 2px;
}

.secondary-button {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #ffffff;
  color: var(--text);
  cursor: pointer;
  font-weight: 800;
  min-height: 42px;
  padding: 0.5rem 1rem;
}

.secondary-button:hover {
  background: #f8fafc;
}

.error-message {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
  border-radius: 14px;
  color: #991b1b;
  font-weight: 700;
  margin: 0;
  padding: 1rem;
}

.empty-message {
  background: #ffffff;
  border-left: 4px solid #2563eb;
  border-radius: 14px;
  color: #1e40af;
  margin: 0;
  padding: 1rem;
  box-shadow: 0 8px 20px rgba(31, 41, 79, 0.06);
}

@media (max-width: 1100px) {
  .summary-grid,
  .filters-panel {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .summary-grid,
  .filters-panel {
    grid-template-columns: 1fr;
  }

  .secondary-button {
    width: 100%;
  }
}
</style>