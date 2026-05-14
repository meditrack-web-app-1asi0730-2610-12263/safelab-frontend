<script setup>
import { onMounted } from 'vue'
import { useHistoricalDataStore } from '../../application/stores/historical-data.store'
import HistoricalDataTable from '../components/historical-data-table.component.vue'

const historicalDataStore = useHistoricalDataStore()

const updateFilter = (key, value) => {
  historicalDataStore.fetchRecords({
    [key]: value
  })
}

onMounted(() => {
  historicalDataStore.fetchRecords()
})
</script>

<template>
  <main class="historical-data-page" aria-labelledby="historical-data-title">
    <header class="page-header">
      <p class="eyebrow">Reports & Analytics</p>
      <h1 id="historical-data-title">Historical data</h1>
      <p>Review temperature and humidity records over time.</p>
    </header>

    <section class="filters-panel">
      <label>
        Equipment ID
        <input
            :value="historicalDataStore.filters.equipmentId || ''"
            type="text"
            placeholder="Optional"
            @input="updateFilter('equipmentId', $event.target.value || null)"
        />
      </label>

      <label>
        Start date
        <input
            :value="historicalDataStore.filters.startDate"
            type="date"
            @change="updateFilter('startDate', $event.target.value)"
        />
      </label>

      <label>
        End date
        <input
            :value="historicalDataStore.filters.endDate"
            type="date"
            @change="updateFilter('endDate', $event.target.value)"
        />
      </label>

      <button type="button" class="secondary-button" @click="historicalDataStore.clearFilters">
        Clear filters
      </button>
    </section>

    <p v-if="historicalDataStore.error" class="error-message" role="alert">
      {{ historicalDataStore.error }}
    </p>

    <p v-if="!historicalDataStore.loading && !historicalDataStore.error && historicalDataStore.records.length === 0" class="empty-message">
      No historical data found.
    </p>

    <HistoricalDataTable
        :records="historicalDataStore.records"
        :loading="historicalDataStore.loading"
    />
  </main>
</template>

<style scoped>
.historical-data-page {
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

.filters-panel {
  align-items: end;
  background: #ffffff;
  border-radius: 0.75rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 1.5rem;
  padding: 1rem;
}

label {
  color: #334155;
  display: grid;
  font-weight: 700;
  gap: 0.35rem;
}

input {
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.65rem;
}

.secondary-button {
  background: #eef2ff;
  border: none;
  border-radius: 0.5rem;
  color: #4338ca;
  cursor: pointer;
  font-weight: 700;
  padding: 0.7rem 1rem;
}

.empty-message,
.error-message {
  border-radius: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
}

.empty-message {
  background: #eff6ff;
  border-left: 4px solid #2563eb;
  color: #1e40af;
}

.error-message {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
  color: #991b1b;
}

@media (max-width: 900px) {
  .historical-data-page {
    padding: 1rem;
  }

  .filters-panel {
    grid-template-columns: 1fr;
  }
}
</style>
