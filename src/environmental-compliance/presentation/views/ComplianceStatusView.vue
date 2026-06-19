<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useComplianceStore } from '@/environmental-compliance/application/stores'
import ComplianceKpiCard from '../components/ComplianceKpiCard.vue'
import ComplianceRuleRow from '../components/ComplianceRuleRow.vue'

const complianceStore = useComplianceStore()
const { t } = useI18n({ useScope: 'global' })

const kpis = computed(() => complianceStore.kpis)
const rules = computed(() => complianceStore.complianceRules)
const violations = computed(() => complianceStore.recentViolations)
const evidence = computed(() => complianceStore.evidenceSummary)

const complianceRateLabel = computed(() => `${kpis.value.complianceRate.toFixed(1)}%`)
const evidenceRateLabel = computed(() => `${evidence.value.readinessRate.toFixed(1)}%`)

const ruleRows = computed(() =>
    rules.value.map((rule) => ({
      ...rule,
      status: rule.violationCount > 0 ? 'Violation' : 'Compliant'
    }))
)

const unitByType = {
  Temperature: '°C',
  Humidity: '%',
  Energy: 'kWh',
  Vibration: 'mm/s',
  DoorStatus: ''
}

const formatValue = (violation) => {
  const unit = unitByType[violation.type] ?? ''
  return `${violation.value}${unit}`
}

const formatRange = (violation) => {
  const unit = unitByType[violation.type] ?? ''
  return `${violation.minValue} - ${violation.maxValue}${unit}`
}

const formatDate = (date) => {
  if (!date) {
    return '—'
  }

  const pad = (value) => String(value).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

onMounted(() => {
  complianceStore.loadCompliance()
})
</script>

<template>
  <section class="compliance-status">
    <header class="page-hero dashboard-hero">
      <div>
        <p class="eyebrow">
          {{ t('menu.compliance.status.eyebrow') }}
        </p>

        <h1>
          {{ t('menu.compliance.status.title') }}
        </h1>

        <p>
          {{ t('menu.compliance.status.subtitle') }}
        </p>
      </div>
    </header>

    <section class="kpi-grid">
      <ComplianceKpiCard
          icon="pi pi-check-circle"
          :label="t('menu.compliance.status.kpis.compliance')"
          :value="complianceRateLabel"
      />

      <ComplianceKpiCard
          icon="pi pi-wifi"
          :label="t('menu.compliance.status.kpis.monitoredSensors')"
          :value="String(kpis.totalSensors)"
      />

      <ComplianceKpiCard
          icon="pi pi-exclamation-triangle"
          :label="t('menu.compliance.status.kpis.violations')"
          :value="String(kpis.activeViolations)"
      />

      <ComplianceKpiCard
          icon="pi pi-file-check"
          :label="t('menu.compliance.status.kpis.audits')"
          :value="String(kpis.pendingAudits)"
      />
    </section>

    <div v-if="complianceStore.loading" class="state-card">
      {{ t('menu.compliance.status.states.loading') }}
    </div>

    <div v-else-if="complianceStore.error" class="state-card error">
      {{ t('menu.compliance.status.states.error') }}
    </div>

    <template v-else>
      <section class="content-card">
        <header class="card-header">
          <div>
            <h2>{{ t('menu.compliance.status.rulesTitle') }}</h2>
            <p>{{ t('menu.compliance.status.rulesSubtitle') }}</p>
          </div>
        </header>

        <div v-if="ruleRows.length === 0" class="state-card">
          {{ t('menu.compliance.status.states.empty') }}
        </div>

        <div v-else class="rule-list">
          <ComplianceRuleRow
              v-for="rule in ruleRows"
              :key="rule.id"
              :rule="rule"
          />
        </div>
      </section>

      <section class="compliance-grid">
        <article class="content-card">
          <header class="card-header">
            <div>
              <h2>{{ t('menu.compliance.status.violationsTitle') }}</h2>
              <p>{{ t('menu.compliance.status.violationsSubtitle') }}</p>
            </div>
          </header>

          <div v-if="violations.length === 0" class="empty-panel">
            <i class="pi pi-check-circle"></i>
            <strong>{{ t('menu.compliance.status.noViolationsTitle') }}</strong>
            <span>{{ t('menu.compliance.status.noViolationsDescription') }}</span>
          </div>

          <div v-else class="violation-list">
            <article
                v-for="violation in violations"
                :key="violation.id"
                class="violation-row"
            >
              <div>
                <strong>{{ violation.sensorName }}</strong>
                <p>
                  {{ t('menu.compliance.status.ruleType', {
                  type: t(`menu.compliance.status.types.${violation.type}`)
                }) }}
                </p>
              </div>

              <div class="violation-meta">
                <span>
                  {{ t('menu.compliance.status.currentValue') }}:
                  <strong>{{ formatValue(violation) }}</strong>
                </span>

                <span>
                  {{ t('menu.compliance.status.allowedRange') }}:
                  <strong>{{ formatRange(violation) }}</strong>
                </span>

                <small>
                  {{ t('menu.compliance.status.lastReading') }}:
                  {{ formatDate(violation.lastReadingAt) }}
                </small>
              </div>
            </article>
          </div>
        </article>

        <article class="content-card">
          <header class="card-header">
            <div>
              <h2>{{ t('menu.compliance.status.evidenceTitle') }}</h2>
              <p>{{ t('menu.compliance.status.evidenceSubtitle') }}</p>
            </div>

            <span class="evidence-badge">
              {{ evidenceRateLabel }}
            </span>
          </header>

          <div class="evidence-list">
            <div class="evidence-row">
              <span>{{ t('menu.compliance.status.evidence.totalRules') }}</span>
              <strong>{{ evidence.totalRules }}</strong>
            </div>

            <div class="evidence-row">
              <span>{{ t('menu.compliance.status.evidence.compliantRules') }}</span>
              <strong>{{ evidence.compliantRules }}</strong>
            </div>

            <div class="evidence-row">
              <span>{{ t('menu.compliance.status.evidence.violatedRules') }}</span>
              <strong>{{ evidence.violatedRules }}</strong>
            </div>

            <div class="evidence-row">
              <span>{{ t('menu.compliance.status.evidence.pendingEvidence') }}</span>
              <strong>{{ evidence.pendingEvidence }}</strong>
            </div>
          </div>

          <div class="progress-track">
            <div
                class="progress-fill"
                :style="{ width: `${evidence.readinessRate}%` }"
            ></div>
          </div>
        </article>
      </section>
    </template>
  </section>
</template>

<style scoped>
.compliance-status {
  display: grid;
  gap: 22px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.rule-list {
  display: grid;
  gap: 12px;
}

.compliance-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 18px;
}

.content-card {
  border-radius: 24px;
  border: 1px solid var(--border);
  background: #ffffff;
  padding: 22px;
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

.state-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(31, 41, 79, 0.06);
  text-align: center;
}

.state-card.error {
  color: var(--danger);
}

.empty-panel {
  min-height: 190px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  text-align: center;
  color: var(--muted);
}

.empty-panel i {
  font-size: 2rem;
  color: var(--success);
}

.empty-panel strong {
  color: var(--text);
}

.violation-list {
  display: grid;
  gap: 12px;
}

.violation-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #fbfcff;
}

.violation-row p {
  margin: 4px 0 0;
  color: var(--muted);
  font-weight: 600;
}

.violation-meta {
  display: grid;
  gap: 4px;
  text-align: right;
  color: var(--muted);
  font-size: 0.82rem;
}

.violation-meta strong {
  color: var(--text);
}

.violation-meta small {
  color: var(--muted);
  font-weight: 700;
}

.evidence-badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
  font-weight: 800;
}

.evidence-list {
  display: grid;
  gap: 14px;
}

.evidence-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.evidence-row span {
  color: var(--muted);
  font-weight: 700;
}

.evidence-row strong {
  color: var(--text);
  font-size: 1.15rem;
}

.progress-track {
  margin-top: 20px;
  height: 10px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #4f46e5, #10b981);
}

@media (max-width: 1100px) {
  .kpi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .compliance-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .violation-row {
    grid-template-columns: 1fr;
  }

  .violation-meta {
    text-align: left;
  }

  .card-header {
    flex-direction: column;
  }
}
</style>