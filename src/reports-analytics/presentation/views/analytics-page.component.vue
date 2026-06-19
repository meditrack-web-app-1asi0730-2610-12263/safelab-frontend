<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAnalyticsStore } from '../../application/stores/analytics.store'

const analyticsStore = useAnalyticsStore()
const { t } = useI18n({ useScope: 'global' })

const summary = computed(() => analyticsStore.summary)

const formattedTemperature = computed(() =>
    summary.value.averageTemperature === null
        ? '—'
        : `${summary.value.averageTemperature}°C`
)

const formattedHumidity = computed(() =>
    summary.value.averageHumidity === null
        ? '—'
        : `${summary.value.averageHumidity}%`
)

const formattedCompliance = computed(() =>
    `${summary.value.complianceScore}%`
)

const riskLevel = computed(() => {
  if (summary.value.operationalRisk >= 5) {
    return 'high'
  }

  if (summary.value.operationalRisk >= 2) {
    return 'medium'
  }

  return 'low'
})

const trendWidth = (trend) => {
  if (trend.unit === '%') {
    return `${Math.min(Number(trend.value) || 0, 100)}%`
  }

  if (trend.id === 'active-alerts') {
    return `${Math.min((Number(trend.value) || 0) * 20, 100)}%`
  }

  return `${Math.min((Number(trend.value) || 0) * 10, 100)}%`
}

onMounted(() => {
  analyticsStore.fetchAnalytics()
})
</script>

<template>
  <main class="analytics-page" aria-labelledby="analytics-title">
    <header class="page-hero analytics-hero">
      <div>
        <p class="eyebrow">
          {{ t('reportsAnalytics.module.eyebrow') }}
        </p>

        <h1 id="analytics-title">
          {{ t('reportsAnalytics.module.title') }}
        </h1>

        <p>
          {{ t('reportsAnalytics.module.description') }}
        </p>
      </div>
    </header>

    <section class="navigation-grid">
      <RouterLink class="nav-card" to="/reports-analytics/reports">
        <i class="pi pi-file"></i>
        <div>
          <h3>{{ t('reportsAnalytics.navigation.reports') }}</h3>
          <p>{{ t('reportsAnalytics.navigation.reportsDescription') }}</p>
        </div>
      </RouterLink>

      <RouterLink class="nav-card" to="/reports-analytics/historical-data">
        <i class="pi pi-database"></i>
        <div>
          <h3>{{ t('reportsAnalytics.navigation.historicalData') }}</h3>
          <p>{{ t('reportsAnalytics.navigation.historicalDataDescription') }}</p>
        </div>
      </RouterLink>

      <RouterLink class="nav-card" to="/reports-analytics/export-data">
        <i class="pi pi-download"></i>
        <div>
          <h3>{{ t('reportsAnalytics.navigation.exportData') }}</h3>
          <p>{{ t('reportsAnalytics.navigation.exportDataDescription') }}</p>
        </div>
      </RouterLink>
    </section>

    <p v-if="analyticsStore.error" class="error-message" role="alert">
      {{ t('reportsAnalytics.states.error') }}
    </p>

    <section class="summary-grid">
      <article class="summary-card">
        <div class="summary-icon reports">
          <i class="pi pi-file"></i>
        </div>
        <div>
          <span>{{ t('reportsAnalytics.summary.totalReports') }}</span>
          <strong>{{ summary.totalReports }}</strong>
          <small>{{ t('reportsAnalytics.summary.totalReportsDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon alerts">
          <i class="pi pi-bell"></i>
        </div>
        <div>
          <span>{{ t('reportsAnalytics.summary.activeAlerts') }}</span>
          <strong>{{ summary.activeAlerts }}</strong>
          <small>{{ t('reportsAnalytics.summary.activeAlertsDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon temperature">
          <i class="pi pi-sun"></i>
        </div>
        <div>
          <span>{{ t('reportsAnalytics.summary.averageTemperature') }}</span>
          <strong>{{ formattedTemperature }}</strong>
          <small>{{ t('reportsAnalytics.summary.averageTemperatureDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon humidity">
          <i class="pi pi-cloud"></i>
        </div>
        <div>
          <span>{{ t('reportsAnalytics.summary.averageHumidity') }}</span>
          <strong>{{ formattedHumidity }}</strong>
          <small>{{ t('reportsAnalytics.summary.averageHumidityDescription') }}</small>
        </div>
      </article>
    </section>

    <section class="analytics-grid">
      <article class="content-card">
        <header class="card-header">
          <div>
            <h2>{{ t('reportsAnalytics.trends.title') }}</h2>
            <p>{{ t('reportsAnalytics.trends.subtitle') }}</p>
          </div>
        </header>

        <div v-if="analyticsStore.loading" class="state-card">
          {{ t('reportsAnalytics.states.loading') }}
        </div>

        <div v-else class="trend-list">
          <article
              v-for="trend in analyticsStore.trends"
              :key="trend.id"
              class="trend-row"
          >
            <div>
              <strong>{{ trend.label }}</strong>
              <span>{{ trend.helper }}</span>
            </div>

            <div class="trend-value">
              <strong>{{ trend.value }}{{ trend.unit }}</strong>
              <div class="trend-track">
                <div
                    class="trend-fill"
                    :class="trend.direction"
                    :style="{ width: trendWidth(trend) }"
                ></div>
              </div>
            </div>
          </article>
        </div>
      </article>

      <article class="content-card risk-card">
        <header class="card-header">
          <div>
            <h2>{{ t('reportsAnalytics.risk.title') }}</h2>
            <p>{{ t('reportsAnalytics.risk.subtitle') }}</p>
          </div>

          <span :class="['risk-badge', riskLevel]">
            {{ t(`reportsAnalytics.risk.levels.${riskLevel}`) }}
          </span>
        </header>

        <div class="risk-grid">
          <div>
            <span>{{ t('reportsAnalytics.risk.criticalAlerts') }}</span>
            <strong>{{ summary.criticalAlerts }}</strong>
          </div>

          <div>
            <span>{{ t('reportsAnalytics.risk.outOfRangeSensors') }}</span>
            <strong>{{ summary.outOfRangeSensors }}</strong>
          </div>

          <div>
            <span>{{ t('reportsAnalytics.risk.disconnectedSensors') }}</span>
            <strong>{{ summary.disconnectedSensors }}</strong>
          </div>

          <div>
            <span>{{ t('reportsAnalytics.risk.complianceScore') }}</span>
            <strong>{{ formattedCompliance }}</strong>
          </div>
        </div>
      </article>
    </section>

    <section class="analytics-grid">
      <article class="content-card">
        <header class="card-header">
          <div>
            <h2>{{ t('reportsAnalytics.recentReports.title') }}</h2>
            <p>{{ t('reportsAnalytics.recentReports.subtitle') }}</p>
          </div>
        </header>

        <div v-if="analyticsStore.recentReports.length === 0" class="state-card">
          {{ t('reportsAnalytics.recentReports.empty') }}
        </div>

        <div v-else class="compact-list">
          <article
              v-for="report in analyticsStore.recentReports"
              :key="report.id"
              class="compact-row"
          >
            <div>
              <strong>{{ report.title }}</strong>
              <span>{{ report.equipmentName || t('reportsAnalytics.recentReports.allEquipment') }}</span>
            </div>

            <span class="status-pill">
              {{ report.format }}
            </span>
          </article>
        </div>
      </article>

      <article class="content-card">
        <header class="card-header">
          <div>
            <h2>{{ t('reportsAnalytics.recentAlerts.title') }}</h2>
            <p>{{ t('reportsAnalytics.recentAlerts.subtitle') }}</p>
          </div>
        </header>

        <div v-if="analyticsStore.recentAlerts.length === 0" class="state-card">
          {{ t('reportsAnalytics.recentAlerts.empty') }}
        </div>

        <div v-else class="compact-list">
          <article
              v-for="alert in analyticsStore.recentAlerts"
              :key="alert.id"
              class="compact-row"
          >
            <div>
              <strong>{{ alert.title }}</strong>
              <span>{{ alert.deviceName }} · {{ alert.location }}</span>
            </div>

            <span :class="['severity-pill', alert.severity]">
              {{ alert.severity }}
            </span>
          </article>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.analytics-page {
  display: grid;
  gap: 22px;
}

.analytics-hero {
  background:
      radial-gradient(circle at right, rgba(35, 213, 171, 0.18), transparent 32%),
      #ffffff;
}

.navigation-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.nav-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.1rem;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #ffffff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.nav-card:hover {
  border-color: #4f46e5;
  transform: translateY(-2px);
}

.nav-card i {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  color: #4f46e5;
  background: #eef2ff;
}

.nav-card h3 {
  margin: 0;
  color: var(--text);
}

.nav-card p {
  margin: 0.35rem 0 0;
  color: var(--muted);
  font-weight: 600;
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
}

.summary-icon.reports {
  color: #4f46e5;
  background: #e0e7ff;
}

.summary-icon.alerts {
  color: #f59e0b;
  background: #fef3c7;
}

.summary-icon.temperature {
  color: #ef4444;
  background: #fee2e2;
}

.summary-icon.humidity {
  color: #2563eb;
  background: #dbeafe;
}

.analytics-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 18px;
}

.content-card {
  padding: 22px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.card-header h2 {
  margin: 0;
  color: var(--text);
}

.card-header p {
  margin: 4px 0 0;
  color: var(--muted);
  font-weight: 600;
}

.trend-list {
  display: grid;
  gap: 14px;
}

.trend-row {
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 18px;
  padding: 14px;
  border-radius: 16px;
  background: #f8fafc;
}

.trend-row strong {
  color: var(--text);
}

.trend-row span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-weight: 600;
  font-size: 0.84rem;
}

.trend-value {
  text-align: right;
}

.trend-track {
  margin-top: 8px;
  height: 8px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
}

.trend-fill {
  height: 100%;
  border-radius: inherit;
  background: #4f46e5;
}

.trend-fill.up {
  background: #10b981;
}

.trend-fill.down {
  background: #f59e0b;
}

.risk-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.risk-grid div {
  display: grid;
  gap: 4px;
  padding: 14px;
  border-radius: 16px;
  background: #f8fafc;
}

.risk-grid span {
  color: var(--muted);
  font-weight: 700;
  font-size: 0.82rem;
}

.risk-grid strong {
  color: var(--text);
  font-size: 1.4rem;
}

.risk-badge {
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 800;
}

.risk-badge.low {
  color: #047857;
  background: #d1fae5;
}

.risk-badge.medium {
  color: #b45309;
  background: #fef3c7;
}

.risk-badge.high {
  color: #b91c1c;
  background: #fee2e2;
}

.compact-list {
  display: grid;
  gap: 10px;
}

.compact-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  border-radius: 16px;
  background: #f8fafc;
}

.compact-row strong {
  color: var(--text);
}

.compact-row span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-weight: 600;
  font-size: 0.84rem;
}

.status-pill,
.severity-pill {
  height: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.status-pill {
  color: #4f46e5;
  background: #eef2ff;
}

.severity-pill.critical {
  color: #b91c1c;
  background: #fee2e2;
}

.severity-pill.warning {
  color: #b45309;
  background: #fef3c7;
}

.severity-pill.info {
  color: #1d4ed8;
  background: #dbeafe;
}

.state-card,
.error-message {
  padding: 1rem;
  border-radius: 16px;
  font-weight: 700;
}

.state-card {
  color: var(--muted);
  background: #f8fafc;
  text-align: center;
}

.error-message {
  background: #fee2e2;
  color: #991b1b;
  border-left: 4px solid #dc2626;
}

@media (max-width: 1100px) {
  .summary-grid,
  .navigation-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .analytics-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .summary-grid,
  .navigation-grid,
  .risk-grid {
    grid-template-columns: 1fr;
  }

  .trend-row {
    grid-template-columns: 1fr;
  }

  .trend-value {
    text-align: left;
  }

  .compact-row {
    flex-direction: column;
  }
}
</style>