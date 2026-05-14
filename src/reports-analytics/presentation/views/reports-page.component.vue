<script setup>
import { onMounted } from 'vue'
import { useReportStore } from '../../application/stores/report.store'
import ReportForm from '../components/report-form.component.vue'
import ReportTable from '../components/report-table.component.vue'

const reportStore = useReportStore()

const generateReport = async (payload) => {
  await reportStore.generateReport(payload)
}

const downloadReport = async (id) => {
  await reportStore.downloadReport(id)
}

onMounted(() => {
  reportStore.fetchReports()
})
</script>

<template>
  <main class="reports-page" aria-labelledby="reports-title">
    <header class="page-header">
      <p class="eyebrow">Reports & Analytics</p>
      <h1 id="reports-title">Reports</h1>
      <p>Generate and download reports by equipment and date range.</p>
    </header>

    <section class="layout-grid">
      <article class="panel">
        <h2>New report</h2>
        <ReportForm @submit="generateReport" />
      </article>

      <article class="panel">
        <h2>Generated reports</h2>

        <p v-if="reportStore.error" class="error-message" role="alert">
          {{ reportStore.error }}
        </p>

        <p v-if="!reportStore.loading && !reportStore.error && reportStore.reports.length === 0" class="empty-message">
          No reports available.
        </p>

        <ReportTable
            :reports="reportStore.reports"
            :loading="reportStore.loading"
            @download="downloadReport"
        />
      </article>
    </section>
  </main>
</template>

<style scoped>
.reports-page {
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

.layout-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 360px 1fr;
}

.panel {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
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
  .reports-page {
    padding: 1rem;
  }

  .layout-grid {
    grid-template-columns: 1fr;
  }
}
</style>
