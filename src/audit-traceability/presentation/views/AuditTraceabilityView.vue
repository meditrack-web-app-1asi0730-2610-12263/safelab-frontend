<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuditTraceabilityStore } from '@/audit-traceability/application/stores/audit-traceability.store'
import AuditMetricCard from '@/audit-traceability/presentation/components/AuditMetricCard.vue'
import AuditLogTable from '@/audit-traceability/presentation/components/AuditLogTable.vue'
import TraceabilityTimeline from '@/audit-traceability/presentation/components/TraceabilityTimeline.vue'
import TraceabilityHealthBar from '@/audit-traceability/presentation/components/TraceabilityHealthBar.vue'
import AuditStatusBadge from '@/audit-traceability/presentation/components/AuditStatusBadge.vue'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const store = useAuditTraceabilityStore()

onMounted(() => store.loadOverview())

const currentView = computed(() => route.meta.viewKey?.split('.')[1] || 'AuditLog')
const pageTitle = computed(() => t(`audit.pages.${currentView.value}.title`))
const pageDescription = computed(() => t(`audit.pages.${currentView.value}.description`))

const tabs = computed(() => [
  { key: 'AuditLog', label: t('menu.audit.AuditLog'), path: '/audit-traceability/audit-log' },
  { key: 'ActivityHistory', label: t('menu.audit.ActivityHistory'), path: '/audit-traceability/activity-history' },
  { key: 'TraceabilityTimeline', label: t('menu.audit.TraceabilityTimeline'), path: '/audit-traceability/traceability-timeline' },
  { key: 'ComplianceTraceability', label: t('menu.audit.ComplianceTraceability'), path: '/audit-traceability/compliance-traceability' },
  { key: 'AuditEvidence', label: t('menu.audit.AuditEvidence'), path: '/audit-traceability/audit-evidence' },
  { key: 'ChangeHistory', label: t('menu.audit.ChangeHistory'), path: '/audit-traceability/change-history' },
  { key: 'RemoteCommandHistory', label: t('menu.audit.RemoteCommandHistory'), path: '/audit-traceability/remote-command-history' }
])

const metrics = computed(() => [
  { label: t('audit.metrics.totalLogs'), value: store.summary.totalLogs, helper: t('audit.metrics.retention', { days: store.summary.retainedDays }), icon: 'pi pi-list-check', tone: 'primary' },
  { label: t('audit.metrics.reviewedLogs'), value: store.summary.reviewedLogs, helper: t('audit.metrics.evidenceReady'), icon: 'pi pi-verified', tone: 'success' },
  { label: t('audit.metrics.pendingLogs'), value: store.summary.pendingLogs, helper: t('audit.metrics.needsReview'), icon: 'pi pi-clock', tone: 'warning' },
  { label: t('audit.metrics.criticalEvents'), value: store.summary.criticalEvents, helper: t('audit.metrics.highPriority'), icon: 'pi pi-shield', tone: 'danger' },
  { label: t('audit.metrics.integrityScore'), value: `${store.summary.integrityScore}%`, helper: t('audit.metrics.immutableTrace'), icon: 'pi pi-lock', tone: 'success' }
])

const healthBars = computed(() => [
  { label: t('audit.health.auditCoverage'), value: store.overview.traceabilityHealth.auditCoverage },
  { label: t('audit.health.evidenceCoverage'), value: store.overview.traceabilityHealth.evidenceCoverage },
  { label: t('audit.health.changeIntegrity'), value: store.overview.traceabilityHealth.changeIntegrity },
  { label: t('audit.health.remoteCommandTraceability'), value: store.overview.traceabilityHealth.remoteCommandTraceability }
])

const filterOptions = computed(() => ({
  statuses: [
    { value: 'all', label: t('audit.filters.allStatuses') },
    { value: 'reviewed', label: t('audit.status.reviewed') },
    { value: 'pending', label: t('audit.status.pending') }
  ],
  severities: [
    { value: 'all', label: t('audit.filters.allSeverities') },
    { value: 'info', label: t('audit.severity.info') },
    { value: 'warning', label: t('audit.severity.warning') },
    { value: 'critical', label: t('audit.severity.critical') }
  ]
}))

function goTo(path) {
  router.push(path)
}
</script>

<template>
  <section class="page-hero audit-hero">
    <div>
      <p class="eyebrow">{{ t('audit.heroEyebrow') }}</p>
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageDescription }}</p>
    </div>
    <div class="audit-score-card">
      <span>{{ t('audit.integrityScore') }}</span>
      <strong>{{ store.summary.integrityScore }}%</strong>
      <small>{{ t('audit.updatedRecently') }}</small>
    </div>
  </section>

  <section class="audit-tabs" :aria-label="t('audit.navigationLabel')">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      :class="{ active: currentView === tab.key }"
      @click="goTo(tab.path)"
    >
      {{ tab.label }}
    </button>
  </section>

  <section class="audit-metric-grid" :aria-label="t('audit.metricsLabel')">
    <AuditMetricCard
      v-for="metric in metrics"
      :key="`${locale}-${metric.label}`"
      :label="metric.label"
      :value="metric.value"
      :helper="metric.helper"
      :icon="metric.icon"
      :tone="metric.tone"
    />
  </section>

  <section class="audit-layout-grid">
    <article class="content-card audit-panel audit-log-panel">
      <div class="card-header">
        <div>
          <p class="eyebrow">{{ t('audit.auditLogEyebrow') }}</p>
          <h2>{{ t('audit.auditLogTitle') }}</h2>
        </div>
        <span v-if="store.loading" class="audit-loading">{{ t('audit.loading') }}</span>
      </div>

      <div class="audit-filters">
        <label>
          <span>{{ t('audit.filters.search') }}</span>
          <input :value="store.searchTerm" :placeholder="t('audit.filters.searchPlaceholder')" @input="store.setSearchTerm($event.target.value)" />
        </label>
        <label>
          <span>{{ t('audit.filters.severity') }}</span>
          <select :value="store.selectedSeverity" @change="store.setSeverity($event.target.value)">
            <option v-for="option in filterOptions.severities" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </label>
        <label>
          <span>{{ t('audit.filters.status') }}</span>
          <select :value="store.selectedStatus" @change="store.setStatus($event.target.value)">
            <option v-for="option in filterOptions.statuses" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </label>
      </div>

      <AuditLogTable :logs="store.filteredLogs" />
    </article>

    <aside class="audit-side-stack">
      <article class="content-card audit-panel">
        <div class="card-header compact">
          <div>
            <p class="eyebrow">{{ t('audit.timelineEyebrow') }}</p>
            <h2>{{ t('audit.timelineTitle') }}</h2>
          </div>
        </div>
        <TraceabilityTimeline :items="store.overview.timeline" />
      </article>

      <article class="content-card audit-panel">
        <div class="card-header compact">
          <div>
            <p class="eyebrow">{{ t('audit.healthEyebrow') }}</p>
            <h2>{{ t('audit.healthTitle') }}</h2>
          </div>
        </div>
        <TraceabilityHealthBar v-for="bar in healthBars" :key="`${locale}-${bar.label}`" :label="bar.label" :value="bar.value" />
      </article>
    </aside>
  </section>

  <section class="audit-bottom-grid">
    <article class="content-card audit-panel">
      <div class="card-header compact">
        <div>
          <p class="eyebrow">{{ t('audit.evidenceEyebrow') }}</p>
          <h2>{{ t('audit.evidenceTitle') }}</h2>
        </div>
      </div>
      <div class="audit-list-cards">
        <article v-for="item in store.overview.evidence" :key="item.id">
          <strong>{{ item.id }}</strong>
          <span>{{ item.type }}</span>
          <small>{{ item.owner }} · {{ item.linkedRecord }}</small>
          <AuditStatusBadge :value="item.status" :label="t(`audit.status.${item.status}`)" />
        </article>
      </div>
    </article>

    <article class="content-card audit-panel">
      <div class="card-header compact">
        <div>
          <p class="eyebrow">{{ t('audit.trackedEyebrow') }}</p>
          <h2>{{ t('audit.trackedTitle') }}</h2>
        </div>
      </div>
      <div class="tracked-grid">
        <article v-for="item in store.overview.trackedEntities" :key="item.labelKey">
          <i :class="item.icon" aria-hidden="true"></i>
          <span>{{ t(item.labelKey) }}</span>
          <strong>{{ item.value }}</strong>
          <small>{{ item.trend }}</small>
        </article>
      </div>
    </article>
  </section>

  <section class="audit-bottom-grid">
    <article class="content-card audit-panel">
      <div class="card-header compact">
        <div>
          <p class="eyebrow">{{ t('audit.changeEyebrow') }}</p>
          <h2>{{ t('audit.changeTitle') }}</h2>
        </div>
      </div>
      <div class="audit-list-cards">
        <article v-for="item in store.overview.changeHistory" :key="item.id">
          <strong>{{ item.id }} · {{ item.object }}</strong>
          <span>{{ item.description }}</span>
          <small>{{ item.changedBy }}</small>
          <AuditStatusBadge :value="item.risk" :label="t(`audit.risk.${item.risk}`)" />
        </article>
      </div>
    </article>

    <article class="content-card audit-panel">
      <div class="card-header compact">
        <div>
          <p class="eyebrow">{{ t('audit.commandEyebrow') }}</p>
          <h2>{{ t('audit.commandTitle') }}</h2>
        </div>
      </div>
      <div class="audit-list-cards">
        <article v-for="item in store.overview.commandHistory" :key="item.id">
          <strong>{{ item.id }} · {{ item.command }}</strong>
          <span>{{ item.actuator }}</span>
          <small>{{ item.requestedBy }}</small>
          <AuditStatusBadge :value="item.result" :label="t(`audit.commandResult.${item.result}`)" />
        </article>
      </div>
    </article>
  </section>
</template>
