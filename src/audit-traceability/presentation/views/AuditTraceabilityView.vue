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

onMounted(() => {
  store.loadOverview()
})

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
  {
    label: t('audit.metrics.totalLogs'),
    value: store.summary.totalLogs,
    helper: t('audit.metrics.retention', { days: store.summary.retainedDays }),
    icon: 'pi pi-list-check',
    tone: 'primary'
  },
  {
    label: t('audit.metrics.reviewedLogs'),
    value: store.summary.reviewedLogs,
    helper: t('audit.metrics.evidenceReady'),
    icon: 'pi pi-verified',
    tone: 'success'
  },
  {
    label: t('audit.metrics.pendingLogs'),
    value: store.summary.pendingLogs,
    helper: t('audit.metrics.needsReview'),
    icon: 'pi pi-clock',
    tone: 'warning'
  },
  {
    label: t('audit.metrics.criticalEvents'),
    value: store.summary.criticalEvents,
    helper: t('audit.metrics.highPriority'),
    icon: 'pi pi-shield',
    tone: 'danger'
  },
  {
    label: t('audit.metrics.integrityScore'),
    value: `${store.summary.integrityScore}%`,
    helper: t('audit.metrics.immutableTrace'),
    icon: 'pi pi-lock',
    tone: 'success'
  }
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

const healthBars = computed(() => [
  { label: t('audit.health.auditCoverage'), value: store.overview.traceabilityHealth.auditCoverage },
  { label: t('audit.health.evidenceCoverage'), value: store.overview.traceabilityHealth.evidenceCoverage },
  { label: t('audit.health.changeIntegrity'), value: store.overview.traceabilityHealth.changeIntegrity },
  { label: t('audit.health.remoteCommandTraceability'), value: store.overview.traceabilityHealth.remoteCommandTraceability }
])

const activityHistory = computed(() =>
    store.overview.auditLogs.map((log) => ({
      id: log.id,
      title: log.action,
      subtitle: `${log.actor} · ${log.module}`,
      createdAt: log.createdAt,
      severity: log.severity,
      status: log.status
    }))
)

const complianceLogs = computed(() =>
    store.overview.auditLogs.filter((log) =>
        String(log.module).toLowerCase().includes('compliance') ||
        String(log.action).toLowerCase().includes('compliance') ||
        String(log.action).toLowerCase().includes('evidence')
    )
)

const auditEvidence = computed(() => store.overview.evidence)
const changeHistory = computed(() => store.overview.changeHistory)
const commandHistory = computed(() => store.overview.commandHistory)
const timeline = computed(() => store.overview.timeline)
const trackedEntities = computed(() => store.overview.trackedEntities)

function goTo(path) {
  router.push(path)
}
</script>

<template>
  <main class="audit-page">
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

    <section v-if="store.loading" class="state-card">
      {{ t('audit.loading') }}
    </section>

    <template v-else>
      <!-- Audit Log -->
      <section v-if="currentView === 'AuditLog'" class="audit-layout-grid">
        <article class="content-card audit-panel audit-log-panel">
          <div class="card-header">
            <div>
              <p class="eyebrow">{{ t('audit.auditLogEyebrow') }}</p>
              <h2>{{ t('audit.auditLogTitle') }}</h2>
            </div>
          </div>

          <div class="audit-filters">
            <label>
              <span>{{ t('audit.filters.search') }}</span>
              <input
                  :value="store.searchTerm"
                  :placeholder="t('audit.filters.searchPlaceholder')"
                  @input="store.setSearchTerm($event.target.value)"
              />
            </label>

            <label>
              <span>{{ t('audit.filters.severity') }}</span>
              <select
                  :value="store.selectedSeverity"
                  @change="store.setSeverity($event.target.value)"
              >
                <option
                    v-for="option in filterOptions.severities"
                    :key="option.value"
                    :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </label>

            <label>
              <span>{{ t('audit.filters.status') }}</span>
              <select
                  :value="store.selectedStatus"
                  @change="store.setStatus($event.target.value)"
              >
                <option
                    v-for="option in filterOptions.statuses"
                    :key="option.value"
                    :value="option.value"
                >
                  {{ option.label }}
                </option>
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

            <TraceabilityTimeline :items="timeline" />
          </article>

          <article class="content-card audit-panel">
            <div class="card-header compact">
              <div>
                <p class="eyebrow">{{ t('audit.healthEyebrow') }}</p>
                <h2>{{ t('audit.healthTitle') }}</h2>
              </div>
            </div>

            <TraceabilityHealthBar
                v-for="bar in healthBars"
                :key="`${locale}-${bar.label}`"
                :label="bar.label"
                :value="bar.value"
            />
          </article>
        </aside>
      </section>

      <!-- Activity History -->
      <section v-else-if="currentView === 'ActivityHistory'" class="content-card audit-panel">
        <div class="card-header compact">
          <div>
            <p class="eyebrow">{{ t('audit.pages.ActivityHistory.title') }}</p>
            <h2>{{ t('audit.pages.ActivityHistory.description') }}</h2>
          </div>
        </div>

        <div class="activity-list">
          <article
              v-for="item in activityHistory"
              :key="item.id"
              class="activity-row"
          >
            <div>
              <strong>{{ item.title }}</strong>
              <span>{{ item.subtitle }}</span>
              <small>{{ item.createdAt }}</small>
            </div>

            <div class="badge-group">
              <AuditStatusBadge
                  :value="item.severity"
                  :label="t(`audit.severity.${item.severity}`)"
              />
              <AuditStatusBadge
                  :value="item.status"
                  :label="t(`audit.status.${item.status}`)"
              />
            </div>
          </article>
        </div>
      </section>

      <!-- Traceability Timeline -->
      <section v-else-if="currentView === 'TraceabilityTimeline'" class="audit-layout-grid">
        <article class="content-card audit-panel">
          <div class="card-header compact">
            <div>
              <p class="eyebrow">{{ t('audit.timelineEyebrow') }}</p>
              <h2>{{ t('audit.timelineTitle') }}</h2>
            </div>
          </div>

          <TraceabilityTimeline :items="timeline" />
        </article>

        <aside class="audit-side-stack">
          <article class="content-card audit-panel">
            <div class="card-header compact">
              <div>
                <p class="eyebrow">{{ t('audit.trackedEyebrow') }}</p>
                <h2>{{ t('audit.trackedTitle') }}</h2>
              </div>
            </div>

            <div class="tracked-grid">
              <article
                  v-for="item in trackedEntities"
                  :key="item.labelKey"
              >
                <i :class="item.icon" aria-hidden="true"></i>
                <span>{{ t(item.labelKey) }}</span>
                <strong>{{ item.value }}</strong>
                <small>{{ item.trend }}</small>
              </article>
            </div>
          </article>

          <article class="content-card audit-panel">
            <div class="card-header compact">
              <div>
                <p class="eyebrow">{{ t('audit.healthEyebrow') }}</p>
                <h2>{{ t('audit.healthTitle') }}</h2>
              </div>
            </div>

            <TraceabilityHealthBar
                v-for="bar in healthBars"
                :key="`${locale}-${bar.label}`"
                :label="bar.label"
                :value="bar.value"
            />
          </article>
        </aside>
      </section>

      <!-- Compliance Traceability -->
      <section v-else-if="currentView === 'ComplianceTraceability'" class="audit-layout-grid">
        <article class="content-card audit-panel">
          <div class="card-header compact">
            <div>
              <p class="eyebrow">{{ t('audit.pages.ComplianceTraceability.title') }}</p>
              <h2>{{ t('audit.pages.ComplianceTraceability.description') }}</h2>
            </div>
          </div>

          <AuditLogTable :logs="complianceLogs" />
        </article>

        <aside class="audit-side-stack">
          <article class="content-card audit-panel">
            <div class="card-header compact">
              <div>
                <p class="eyebrow">{{ t('audit.evidenceEyebrow') }}</p>
                <h2>{{ t('audit.evidenceTitle') }}</h2>
              </div>
            </div>

            <div class="audit-list-cards">
              <article
                  v-for="item in auditEvidence"
                  :key="item.id"
              >
                <strong>{{ item.id }}</strong>
                <span>{{ item.type }}</span>
                <small>{{ item.owner }} · {{ item.linkedRecord }}</small>
                <AuditStatusBadge
                    :value="item.status"
                    :label="t(`audit.status.${item.status}`)"
                />
              </article>
            </div>
          </article>
        </aside>
      </section>

      <!-- Audit Evidence -->
      <section v-else-if="currentView === 'AuditEvidence'" class="content-card audit-panel">
        <div class="card-header compact">
          <div>
            <p class="eyebrow">{{ t('audit.evidenceEyebrow') }}</p>
            <h2>{{ t('audit.evidenceTitle') }}</h2>
          </div>
        </div>

        <div class="evidence-grid">
          <article
              v-for="item in auditEvidence"
              :key="item.id"
              class="evidence-card"
          >
            <div>
              <strong>{{ item.id }}</strong>
              <span>{{ item.type }}</span>
              <small>{{ item.owner }} · {{ item.linkedRecord }}</small>
            </div>

            <AuditStatusBadge
                :value="item.status"
                :label="t(`audit.status.${item.status}`)"
            />
          </article>
        </div>
      </section>

      <!-- Change History -->
      <section v-else-if="currentView === 'ChangeHistory'" class="content-card audit-panel">
        <div class="card-header compact">
          <div>
            <p class="eyebrow">{{ t('audit.changeEyebrow') }}</p>
            <h2>{{ t('audit.changeTitle') }}</h2>
          </div>
        </div>

        <div class="audit-list-cards">
          <article
              v-for="item in changeHistory"
              :key="item.id"
          >
            <strong>{{ item.id }} · {{ item.object }}</strong>
            <span>{{ item.description }}</span>
            <small>{{ item.changedBy }}</small>
            <AuditStatusBadge
                :value="item.risk"
                :label="t(`audit.risk.${item.risk}`)"
            />
          </article>
        </div>
      </section>

      <!-- Remote Command History -->
      <section v-else-if="currentView === 'RemoteCommandHistory'" class="content-card audit-panel">
        <div class="card-header compact">
          <div>
            <p class="eyebrow">{{ t('audit.commandEyebrow') }}</p>
            <h2>{{ t('audit.commandTitle') }}</h2>
          </div>
        </div>

        <div class="audit-list-cards">
          <article
              v-for="item in commandHistory"
              :key="item.id"
          >
            <strong>{{ item.id }} · {{ item.command }}</strong>
            <span>{{ item.actuator }}</span>
            <small>{{ item.requestedBy }}</small>
            <AuditStatusBadge
                :value="item.result"
                :label="t(`audit.commandResult.${item.result}`)"
            />
          </article>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.audit-page {
  display: grid;
  gap: 22px;
}

.audit-hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  background:
      radial-gradient(circle at right, rgba(35, 213, 171, 0.18), transparent 32%),
      #ffffff;
}

.audit-score-card {
  min-width: 180px;
  padding: 1.25rem;
  border-radius: 22px;
  color: #ffffff;
  background: linear-gradient(135deg, #4f46e5, #2563eb);
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.25);
}

.audit-score-card span,
.audit-score-card small {
  display: block;
  font-weight: 800;
}

.audit-score-card strong {
  display: block;
  font-size: 2.4rem;
  line-height: 1;
  margin: 0.35rem 0;
}

.audit-tabs {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.audit-tabs button {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #ffffff;
  color: var(--muted);
  cursor: pointer;
  font-weight: 800;
  padding: 0.75rem 1.1rem;
  white-space: nowrap;
}

.audit-tabs button.active {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #ffffff;
}

.audit-metric-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(160px, 1fr));
  gap: 1rem;
}

.audit-layout-grid,
.audit-bottom-grid {
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  gap: 18px;
}

.audit-side-stack {
  display: grid;
  gap: 18px;
}

.audit-panel {
  padding: 22px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.card-header h2 {
  margin: 0;
  color: var(--text);
}

.card-header.compact {
  margin-bottom: 16px;
}

.audit-filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.audit-filters label {
  display: grid;
  gap: 0.5rem;
  color: var(--text);
  font-weight: 800;
}

.audit-filters input,
.audit-filters select {
  min-height: 42px;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.6rem 0.75rem;
  font: inherit;
}

.activity-list,
.audit-list-cards,
.evidence-grid {
  display: grid;
  gap: 12px;
}

.activity-row,
.audit-list-cards article,
.evidence-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #f8fafc;
}

.activity-row div,
.audit-list-cards article,
.evidence-card div {
  display: grid;
  gap: 4px;
}

.activity-row strong,
.audit-list-cards strong,
.evidence-card strong {
  color: var(--text);
}

.activity-row span,
.audit-list-cards span,
.evidence-card span,
.activity-row small,
.audit-list-cards small,
.evidence-card small {
  color: var(--muted);
  font-weight: 600;
}

.badge-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tracked-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.tracked-grid article {
  display: grid;
  gap: 4px;
  padding: 14px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid var(--border);
}

.tracked-grid i {
  color: #4f46e5;
}

.tracked-grid span {
  color: var(--muted);
  font-weight: 800;
}

.tracked-grid strong {
  color: var(--text);
  font-size: 1.5rem;
}

.tracked-grid small {
  color: #10b981;
  font-weight: 800;
}

.state-card {
  padding: 1rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  color: var(--muted);
  text-align: center;
  font-weight: 800;
}

@media (max-width: 1200px) {
  .audit-metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .audit-layout-grid,
  .audit-bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .audit-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .audit-score-card {
    width: 100%;
  }

  .audit-metric-grid,
  .audit-filters,
  .tracked-grid {
    grid-template-columns: 1fr;
  }

  .activity-row,
  .audit-list-cards article,
  .evidence-card {
    flex-direction: column;
  }
}
</style>