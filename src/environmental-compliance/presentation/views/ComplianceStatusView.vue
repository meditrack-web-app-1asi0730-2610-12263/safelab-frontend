<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useComplianceStore } from '@/environmental-compliance/application/stores'
import ComplianceKpiCard from '../components/ComplianceKpiCard.vue'
import ComplianceRuleRow from '../components/ComplianceRuleRow.vue'

const complianceStore = useComplianceStore()
const { t } = useI18n()

const kpis = computed(() => complianceStore.kpis)
const rules = computed(() => complianceStore.complianceRules)

const complianceRateLabel = computed(() => `${kpis.value.complianceRate.toFixed(1)}%`)

const ruleRows = computed(() => rules.value.map((rule) => ({
  ...rule,
  status: rule.violationCount > 0 ? 'Violation' : 'Compliant'
})))

onMounted(() => {
  complianceStore.loadCompliance()
})
</script>

<template>
  <section class="compliance-status">
    <header class="page-hero dashboard-hero">
      <div>
        <p class="eyebrow">{{ t('menu.compliance.status.eyebrow') }}</p>
        <h1>{{ t('menu.compliance.status.title') }}</h1>
        <p>{{ t('menu.compliance.status.subtitle') }}</p>
      </div>
    </header>

    <section class="kpi-grid">
      <ComplianceKpiCard
        icon="pi pi-check-circle"
        :label="t('menu.compliance.status.kpis.compliance')"
        :value="complianceRateLabel"
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

    <section class="content-card">
      <header class="card-header">
        <div>
          <h2>{{ t('menu.compliance.status.rulesTitle') }}</h2>
          <p>{{ t('menu.compliance.status.rulesSubtitle') }}</p>
        </div>
      </header>

      <div v-if="complianceStore.loading" class="state-card">{{ t('menu.compliance.status.states.loading') }}</div>
      <div v-else-if="complianceStore.error" class="state-card error">{{ t('menu.compliance.status.states.error') }}</div>
      <div v-else-if="ruleRows.length === 0" class="state-card">{{ t('menu.compliance.status.states.empty') }}</div>

      <div v-else class="rule-list">
        <ComplianceRuleRow v-for="rule in ruleRows" :key="rule.id" :rule="rule" />
      </div>
    </section>
  </section>
</template>

<style scoped>
.compliance-status {
  display: grid;
  gap: 22px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.rule-list {
  display: grid;
  gap: 12px;
}

.state-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #fff;
  box-shadow: 0 8px 20px rgba(31, 41, 79, 0.06);
  text-align: center;
}

.state-card.error {
  color: var(--danger);
}

@media (max-width: 960px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>

