<script setup>
import { computed, onMounted } from 'vue';
import { useAlertStore } from '../../application/stores/alert.store';
import AlertTable from '../components/alert-table.component.vue';

const alertStore = useAlertStore();

const severityOptions = [
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Critical', value: 'critical' }
]
const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Acknowledged', value: 'acknowledged' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Escalated', value: 'escalated' }
]

const criticalCount = computed(() => alertStore.criticalAlerts.length);
const unacknowledgedCount = computed(() => alertStore.unacknowledgedAlerts.length);

const updateFilter = async (key, value) => {
  alertStore.setFilters({ [key]: value });
  await alertStore.fetchAlerts();
};

const clearFilters = async () => {
  alertStore.clearFilters();
  await alertStore.fetchAlerts();
};

onMounted(() => {
  alertStore.fetchAlerts();
});
</script>

<template>
  <main class="alerts-page" aria-labelledby="alerts-page-title">
    <header class="page-header">
      <div>
        <p class="eyebrow">Monitoring & Operations</p>
        <h1 id="alerts-page-title">Alerts & Notifications</h1>
        <p class="page-description">
          Review active alerts, acknowledge incidents and track notification delivery.
        </p>
      </div>
    </header>

    <section class="summary-grid" aria-label="Alert summary">
      <article class="summary-card critical">
        <span class="summary-label">Critical alerts</span>
        <strong>{{ criticalCount }}</strong>
      </article>

      <article class="summary-card warning">
        <span class="summary-label">Unacknowledged</span>
        <strong>{{ unacknowledgedCount }}</strong>
      </article>

      <article class="summary-card info">
        <span class="summary-label">Total alerts</span>
        <strong>{{ alertStore.alerts.length }}</strong>
      </article>
    </section>

    <section class="filters-panel" aria-label="Alert filters">
      <label>
        Search
        <input
            :value="alertStore.filters.query"
            type="search"
            placeholder="Search by device, location or type"
            @input="updateFilter('query', $event.target.value)"
        />
      </label>

      <label>
        Severity
        <select
            :value="alertStore.filters.severity || ''"
            @change="updateFilter('severity', $event.target.value || null)"
        >
          <option value="">All severities</option>
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
        Status
        <select
            :value="alertStore.filters.status || ''"
            @change="updateFilter('status', $event.target.value || null)"
        >
          <option value="">All statuses</option>
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
        Clear filters
      </button>
    </section>

    <p v-if="alertStore.error" class="error-message" role="alert">
      {{ alertStore.error }}
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
  margin: 0 0 0.25rem;
}

h1 {
  color: #0f172a;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.page-description {
  color: #475569;
  margin-top: 0.5rem;
}

.summary-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: 1.5rem;
}

.summary-card {
  border-radius: 0.5rem;
  background: #ffffff;
  border-left: 4px solid #4f46e5;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.summary-card strong {
  display: block;
  color: #0f172a;
  font-size: 2rem;
  margin-top: 0.5rem;
}

.summary-label {
  color: #475569;
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
  color: #334155;
  min-height: 40px;
  padding: 0.5rem 0.75rem;
}

input:focus,
select:focus {
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
}

.secondary-button:hover {
  background: #f8fafc;
}

.error-message {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
  color: #991b1b;
  margin-bottom: 1rem;
  padding: 1rem;
}

@media (max-width: 767px) {
  .alerts-page {
    padding: 1rem;
  }

  .summary-grid,
  .filters-panel {
    grid-template-columns: 1fr;
  }
}
</style>