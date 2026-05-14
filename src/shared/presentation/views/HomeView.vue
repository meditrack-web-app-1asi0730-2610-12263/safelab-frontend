<script setup>
import { useI18n } from 'vue-i18n'
import { boundedContextNavigation } from '@/shared/domain/model/navigation-items'

const { t } = useI18n()

const metrics = [
  { labelKey: 'home.metricActiveSensors', value: '156', icon: 'pi pi-wifi', trendKey: 'home.trendStable' },
  { labelKey: 'home.metricCompliance', value: '98.7%', icon: 'pi pi-check-circle', trendKey: 'home.trendPositive' },
  { labelKey: 'home.metricOpenAlerts', value: '3', icon: 'pi pi-bell', trendKey: 'home.trendAttention' },
  { labelKey: 'home.metricRoutesReady', value: boundedContextNavigation.length, icon: 'pi pi-sitemap', trendKey: 'home.trendModules' }
]

const highlights = [
  { titleKey: 'home.highlightSensors', copyKey: 'home.highlightSensorsCopy', icon: 'pi pi-wifi', to: '/sensor-monitoring/live-readings' },
  { titleKey: 'home.highlightCompliance', copyKey: 'home.highlightComplianceCopy', icon: 'pi pi-shield', to: '/environmental-compliance/compliance-status' },
  { titleKey: 'home.highlightIncidents', copyKey: 'home.highlightIncidentsCopy', icon: 'pi pi-exclamation-triangle', to: '/incident-management/incident-list' },
  { titleKey: 'home.highlightReports', copyKey: 'home.highlightReportsCopy', icon: 'pi pi-chart-line', to: '/reports-analytics/analytics-dashboard' }
]
</script>

<template>
  <section class="page-hero dashboard-hero">
    <div>
      <p class="eyebrow">{{ t('home.frontendLabel') }}</p>
      <h1>{{ t('home.title') }}</h1>
      <p>{{ t('home.subtitle') }}</p>
    </div>
    <RouterLink class="primary-action" to="/dashboard-overview/laboratory-dashboard">
      {{ t('actions.viewDetails') }}
      <i class="pi pi-arrow-right" aria-hidden="true"></i>
    </RouterLink>
  </section>

  <section class="metric-grid" :aria-label="t('home.metricsLabel')">
    <article v-for="metric in metrics" :key="metric.labelKey" class="metric-card">
      <i :class="metric.icon" aria-hidden="true"></i>
      <span>{{ t(metric.labelKey) }}</span>
      <strong>{{ metric.value }}</strong>
      <small>{{ t(metric.trendKey) }}</small>
    </article>
  </section>

  <section class="overview-grid">
    <article class="content-card chart-card">
      <div class="card-header">
        <div>
          <p class="eyebrow">{{ t('home.operationalSummary') }}</p>
          <h2>{{ t('home.monitoringCoverage') }}</h2>
        </div>
      </div>
      <div class="donut-chart" aria-hidden="true">
        <span>98.7%</span>
      </div>
      <div class="chart-legend">
        <span><i></i>{{ t('home.compliantStorage') }}</span>
        <span><i></i>{{ t('home.pendingReview') }}</span>
      </div>
    </article>

    <article class="content-card notifications-card">
      <div class="card-header">
        <div>
          <p class="eyebrow">{{ t('home.priorityAlerts') }}</p>
          <h2>{{ t('home.recentNotifications') }}</h2>
        </div>
      </div>
      <ul class="notification-list">
        <li>
          <span class="severity-dot critical"></span>
          <div><strong>{{ t('home.alertColdRoom') }}</strong><small>{{ t('home.alertColdRoomCopy') }}</small></div>
        </li>
        <li>
          <span class="severity-dot warning"></span>
          <div><strong>{{ t('home.alertCalibration') }}</strong><small>{{ t('home.alertCalibrationCopy') }}</small></div>
        </li>
        <li>
          <span class="severity-dot success"></span>
          <div><strong>{{ t('home.alertReport') }}</strong><small>{{ t('home.alertReportCopy') }}</small></div>
        </li>
      </ul>
    </article>
  </section>

  <section class="content-card">
    <div class="card-header">
      <div>
        <p class="eyebrow">{{ t('home.moduleSummary') }}</p>
        <h2>{{ t('home.description') }}</h2>
      </div>
    </div>
    <div class="feature-grid">
      <RouterLink v-for="item in highlights" :key="item.titleKey" :to="item.to">
        <article>
          <i :class="item.icon" aria-hidden="true"></i>
          <h3>{{ t(item.titleKey) }}</h3>
          <p>{{ t(item.copyKey) }}</p>
        </article>
      </RouterLink>
    </div>
  </section>
</template>
