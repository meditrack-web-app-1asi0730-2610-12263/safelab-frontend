<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDashboardOverviewStore } from '@/dashboard-overview/application/stores/dashboard-overview.store'
import DashboardMetricCard from '@/dashboard-overview/presentation/components/DashboardMetricCard.vue'
import DashboardSectionHeader from '@/dashboard-overview/presentation/components/DashboardSectionHeader.vue'
import DashboardWidgetCard from '@/dashboard-overview/presentation/components/DashboardWidgetCard.vue'
import MiniLineChart from '@/dashboard-overview/presentation/components/MiniLineChart.vue'
import StatusBadge from '@/dashboard-overview/presentation/components/StatusBadge.vue'

const props = defineProps({
  mode: { type: String, default: 'laboratory-dashboard' }
})

const { t, locale } = useI18n({ useScope: 'global' })
const dashboardStore = useDashboardOverviewStore()

const viewDictionary = {
  'laboratory-dashboard': {
    eyebrow: 'dashboardOverview.hero.monitoring',
    title: 'dashboardOverview.views.laboratoryDashboard.title',
    description: 'dashboardOverview.views.laboratoryDashboard.description'
  },
  'compliance-overview': {
    eyebrow: 'dashboardOverview.hero.compliance',
    title: 'dashboardOverview.views.complianceOverview.title',
    description: 'dashboardOverview.views.complianceOverview.description'
  },
  'platform-overview': {
    eyebrow: 'dashboardOverview.hero.platform',
    title: 'dashboardOverview.views.platformOverview.title',
    description: 'dashboardOverview.views.platformOverview.description'
  },
  'kpi-summary': {
    eyebrow: 'dashboardOverview.hero.kpis',
    title: 'dashboardOverview.views.kpiSummary.title',
    description: 'dashboardOverview.views.kpiSummary.description'
  },
  'alert-overview': {
    eyebrow: 'dashboardOverview.hero.operations',
    title: 'dashboardOverview.views.alertOverview.title',
    description: 'dashboardOverview.views.alertOverview.description'
  },
  'asset-overview': {
    eyebrow: 'dashboardOverview.hero.inventory',
    title: 'dashboardOverview.views.assetOverview.title',
    description: 'dashboardOverview.views.assetOverview.description'
  },
  'sensor-overview': {
    eyebrow: 'dashboardOverview.hero.monitoring',
    title: 'dashboardOverview.views.sensorOverview.title',
    description: 'dashboardOverview.views.sensorOverview.description'
  },
  'incident-overview': {
    eyebrow: 'dashboardOverview.hero.operations',
    title: 'dashboardOverview.views.incidentOverview.title',
    description: 'dashboardOverview.views.incidentOverview.description'
  },
  'dashboard-filters': {
    eyebrow: 'dashboardOverview.hero.configuration',
    title: 'dashboardOverview.views.dashboardFilters.title',
    description: 'dashboardOverview.views.dashboardFilters.description'
  },
  'dashboard-widgets': {
    eyebrow: 'dashboardOverview.hero.configuration',
    title: 'dashboardOverview.views.dashboardWidgets.title',
    description: 'dashboardOverview.views.dashboardWidgets.description'
  }
}

const currentView = computed(() => {
  locale.value
  return viewDictionary[props.mode] ?? viewDictionary['laboratory-dashboard']
})

const healthScore = computed(() => Number(dashboardStore.healthScore || dashboardStore.compliance.score || 0).toFixed(1))
const storageProgress = computed(() => {
  const total = dashboardStore.compliance.totalStorage || 1
  const compliant = dashboardStore.compliance.compliantStorage || 0
  return Math.round((compliant / total) * 100)
})

const visibleWidgets = computed(() => {
  const widgets = dashboardStore.widgets
  if (props.mode === 'alert-overview') return widgets.filter(widget => ['alerts', 'incidents'].includes(widget.id))
  if (props.mode === 'asset-overview') return widgets.filter(widget => ['assets', 'compliance'].includes(widget.id))
  if (props.mode === 'sensor-overview') return widgets.filter(widget => ['sensors', 'laboratory'].includes(widget.id))
  if (props.mode === 'incident-overview') return widgets.filter(widget => ['incidents', 'alerts'].includes(widget.id))
  if (props.mode === 'compliance-overview') return widgets.filter(widget => ['compliance', 'assets', 'reports'].includes(widget.id))
  if (props.mode === 'kpi-summary') return widgets.filter(widget => ['kpis', 'platform', 'laboratory'].includes(widget.id))
  return widgets
})

const translatedFilters = computed(() => {
  locale.value
  return dashboardStore.filters.map(filter => ({
    key: filter.key,
    label: t(filter.labelKey),
    value: filter.valueKey ? t(filter.valueKey) : filter.value
  }))
})

const statusLabel = status => {
  const key = {
    success: 'dashboardOverview.status.normal',
    warning: 'dashboardOverview.status.warning',
    danger: 'dashboardOverview.status.critical',
    neutral: 'dashboardOverview.status.stable'
  }[status] || 'dashboardOverview.status.stable'
  return t(key)
}

onMounted(() => dashboardStore.loadOverview())
</script>

<template>
  <section class="dashboard-overview-page">
    <div class="dashboard-overview-hero">
      <DashboardSectionHeader
        :eyebrow="t(currentView.eyebrow)"
        :title="t(currentView.title)"
        :description="t(currentView.description)"
      />
      <div class="hero-health-card">
        <span>{{ t('dashboardOverview.hero.healthScore') }}</span>
        <strong>{{ healthScore }}%</strong>
        <small>{{ t('dashboardOverview.hero.lastUpdated') }}</small>
      </div>
    </div>

    <div v-if="dashboardStore.usesFallbackData" class="dashboard-info-banner" role="status">
      <i class="pi pi-info-circle" aria-hidden="true" />
      <span>{{ t('dashboardOverview.messages.fallback') }}</span>
    </div>

    <div class="dashboard-kpi-grid" :aria-label="t('dashboardOverview.sections.kpis')">
      <DashboardMetricCard
        v-for="kpi in dashboardStore.kpis"
        :key="kpi.key"
        :label="t(kpi.labelKey)"
        :value="kpi.value"
        :unit="kpi.unit"
        :trend="kpi.trendKey ? t(kpi.trendKey) : kpi.trend"
        :status="kpi.status"
        :icon="kpi.icon"
      />
    </div>

    <div class="dashboard-overview-layout">
      <article class="content-card dashboard-compliance-card">
        <div class="card-header">
          <div>
            <p class="eyebrow">{{ t('dashboardOverview.sections.compliance') }}</p>
            <h2>{{ t('dashboardOverview.compliance.title') }}</h2>
          </div>
          <StatusBadge status="success" :label="t('dashboardOverview.status.compliant')" />
        </div>
        <div class="dashboard-ring" :style="{ '--score': dashboardStore.compliance.score || 0 }">
          <span>{{ dashboardStore.compliance.score || 0 }}%</span>
        </div>
        <div class="dashboard-progress-row">
          <span>{{ t('dashboardOverview.compliance.compliantStorage') }}</span>
          <strong>{{ dashboardStore.compliance.compliantStorage || 0 }} / {{ dashboardStore.compliance.totalStorage || 0 }}</strong>
        </div>
        <div class="linear-progress"><i :style="{ width: `${storageProgress}%` }" /></div>
        <div class="compliance-mini-grid">
          <div>
            <span>{{ t('dashboardOverview.compliance.violatedRules') }}</span>
            <strong>{{ dashboardStore.compliance.violatedRules || 0 }}</strong>
          </div>
          <div>
            <span>{{ t('dashboardOverview.compliance.evidenceReady') }}</span>
            <strong>{{ dashboardStore.compliance.evidenceReady || 0 }}</strong>
          </div>
        </div>
      </article>

      <article class="content-card dashboard-notifications-card">
        <div class="card-header">
          <div>
            <p class="eyebrow">{{ t('dashboardOverview.sections.notifications') }}</p>
            <h2>{{ t('dashboardOverview.notifications.title') }}</h2>
          </div>
          <RouterLink class="small-action" to="/alerts-notifications/active-alerts">
            {{ t('actions.viewDetails') }}
          </RouterLink>
        </div>
        <ul class="dashboard-notification-list">
          <li v-for="notification in dashboardStore.notifications" :key="notification.id" :class="`is-${notification.severity}`">
            <i class="pi pi-bell" aria-hidden="true" />
            <div>
              <strong>{{ t(notification.titleKey) }}</strong>
              <small>{{ t(notification.messageKey) }}</small>
            </div>
            <time>{{ notification.time }}</time>
          </li>
        </ul>
      </article>
    </div>

    <section class="dashboard-overview-layout">
      <article class="content-card">
        <div class="card-header">
          <div>
            <p class="eyebrow">{{ t('dashboardOverview.sections.laboratories') }}</p>
            <h2>{{ t('dashboardOverview.laboratories.title') }}</h2>
          </div>
        </div>
        <div class="laboratory-list">
          <article v-for="laboratory in dashboardStore.laboratories" :key="laboratory.id">
            <div>
              <strong>{{ laboratory.name }}</strong>
              <small>{{ laboratory.sensors }} {{ t('dashboardOverview.laboratories.sensors') }} · {{ laboratory.alerts }} {{ t('dashboardOverview.laboratories.alerts') }}</small>
            </div>
            <StatusBadge :status="laboratory.status" :label="statusLabel(laboratory.status)" />
            <span>{{ laboratory.score }}%</span>
          </article>
        </div>
      </article>

      <article class="content-card">
        <div class="card-header">
          <div>
            <p class="eyebrow">{{ t('dashboardOverview.sections.risks') }}</p>
            <h2>{{ t('dashboardOverview.risks.title') }}</h2>
          </div>
        </div>
        <div class="risk-grid">
          <article v-for="risk in dashboardStore.operationalRisks" :key="risk.id" :class="`is-${risk.status}`">
            <span>{{ t(risk.labelKey) }}</span>
            <strong>{{ risk.value }}</strong>
          </article>
        </div>
      </article>
    </section>

    <section class="content-card dashboard-panel-section">
      <div class="card-header">
        <div>
          <p class="eyebrow">{{ t('dashboardOverview.sections.widgets') }}</p>
          <h2>{{ t('dashboardOverview.widgets.title') }}</h2>
        </div>
      </div>
      <div class="dashboard-widget-grid">
        <DashboardWidgetCard
          v-for="widget in visibleWidgets"
          :key="widget.id"
          :title="t(widget.titleKey)"
          :description="t(widget.descriptionKey)"
          :value="widget.value"
          :status="widget.status"
          :route="widget.route"
        />
      </div>
    </section>

    <section class="dashboard-bottom-grid">
      <article class="content-card">
        <div class="card-header">
          <div>
            <p class="eyebrow">{{ t('dashboardOverview.sections.trends') }}</p>
            <h2>{{ t('dashboardOverview.trends.title') }}</h2>
          </div>
        </div>
        <div class="mini-chart-grid">
          <MiniLineChart
            v-for="trend in dashboardStore.trends"
            :key="trend.labelKey"
            :label="t(trend.labelKey)"
            :values="trend.values"
            :unit="trend.unit"
          />
        </div>
      </article>

      <article class="content-card">
        <div class="card-header">
          <div>
            <p class="eyebrow">{{ t('dashboardOverview.sections.filters') }}</p>
            <h2>{{ t('dashboardOverview.filters.title') }}</h2>
          </div>
          <RouterLink class="small-action" to="/dashboard-overview/dashboard-filters">
            {{ t('dashboardOverview.filters.configure') }}
          </RouterLink>
        </div>
        <dl class="filter-summary-list">
          <div v-for="filter in translatedFilters" :key="filter.key">
            <dt>{{ filter.label }}</dt>
            <dd>{{ filter.value }}</dd>
          </div>
        </dl>
      </article>
    </section>
  </section>
</template>
