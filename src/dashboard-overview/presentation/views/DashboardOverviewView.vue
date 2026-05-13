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

const { t } = useI18n()
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

const currentView = computed(() => viewDictionary[props.mode] ?? viewDictionary['laboratory-dashboard'])
const mainProgress = computed(() => `${dashboardStore.compliance.score || 0}%`)
const storageProgress = computed(() => {
  const total = dashboardStore.compliance.totalStorage || 1
  const compliant = dashboardStore.compliance.compliantStorage || 0
  return Math.round((compliant / total) * 100)
})

const visibleWidgets = computed(() => {
  if (props.mode === 'alert-overview') return dashboardStore.widgets.filter(widget => widget.id === 'alerts')
  if (props.mode === 'asset-overview') return dashboardStore.widgets.filter(widget => widget.id === 'assets')
  if (props.mode === 'sensor-overview') return dashboardStore.widgets.filter(widget => widget.id === 'sensors')
  if (props.mode === 'incident-overview') return dashboardStore.widgets.filter(widget => widget.id === 'incidents')
  return dashboardStore.widgets
})

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
        <strong>{{ mainProgress }}</strong>
        <small>{{ t('dashboardOverview.hero.lastUpdated') }}</small>
      </div>
    </div>

    <div v-if="dashboardStore.usesFallbackData" class="dashboard-info-banner" role="status">
      <i class="pi pi-info-circle" />
      <span>{{ t('dashboardOverview.messages.fallback') }}</span>
    </div>

    <div class="dashboard-kpi-grid" aria-label="Dashboard KPIs">
      <DashboardMetricCard
        v-for="kpi in dashboardStore.kpis"
        :key="kpi.key"
        :label="t(kpi.labelKey)"
        :value="kpi.value"
        :unit="kpi.unit"
        :trend="kpi.trend"
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
            <i class="pi pi-bell" />
            <div>
              <strong>{{ t(notification.titleKey) }}</strong>
              <small>{{ t(notification.messageKey) }}</small>
            </div>
            <time>{{ notification.time }}</time>
          </li>
        </ul>
      </article>
    </div>

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
          <div v-for="(value, key) in dashboardStore.filters" :key="key">
            <dt>{{ t(`dashboardOverview.filters.${key}`) }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </article>
    </section>
  </section>
</template>
