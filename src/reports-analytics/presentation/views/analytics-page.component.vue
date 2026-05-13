<script setup>
import { onMounted } from 'vue'
import { useAnalyticsStore } from '../../application/stores/analytics.store'
import SummaryCard from '../components/summary-card.component.vue'
import TrendList from '../components/trend-list.component.vue'

const analyticsStore = useAnalyticsStore()

onMounted(() => {
  analyticsStore.fetchAnalytics()
})
</script>

<template>
  <main class="analytics-page" aria-labelledby="analytics-title">
    <header class="page-header">
      <p class="eyebrow">Reports & Analytics</p>
      <h1 id="analytics-title">Analytics overview</h1>
      <p>Review key indicators and trends to support decisions.</p>
    </header>

    <p v-if="analyticsStore.error" class="error-message" role="alert">
      {{ analyticsStore.error }}
    </p>

    <section class="summary-grid">
      <SummaryCard label="Reports" :value="analyticsStore.summary.totalReports" helper="Generated reports" />
      <SummaryCard label="Incidents" :value="analyticsStore.summary.totalIncidents" helper="Logged alerts" />
      <SummaryCard label="Avg. temperature" :value="analyticsStore.summary.averageTemperature ?? '-'" helper="Celsius" />
      <SummaryCard label="Avg. humidity" :value="analyticsStore.summary.averageHumidity ?? '-'" helper="Percentage" />
    </section>

    <section class="panel">
      <h2>Trends</h2>

      <p v-if="analyticsStore.loading" class="loading-message">
        Loading analytics...
      </p>

      <p v-else-if="analyticsStore.trends.length === 0" class="empty-message">
        No trends available.
      </p>

      <TrendList v-else :trends="analyticsStore.trends" />
    </section>
  </main>
</template>

<style scoped>
.analytics-page {
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

.summary-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-bottom: 1.5rem;
}

.panel {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.loading-message,
.empty-message,
.error-message {
  border-radius: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
}

.loading-message {
  background: #ffffff;
  border: 1px solid #e2e8f0;
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

@media (max-width: 767px) {
  .analytics-page {
    padding: 1rem;
  }
}
</style>
