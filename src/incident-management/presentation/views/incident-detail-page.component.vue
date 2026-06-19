<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useIncidentStore } from '../../application/stores/incident.store'
import IncidentStatusBadge from '../components/incident-status-badge.component.vue'

const route = useRoute()
const router = useRouter()
const incidentStore = useIncidentStore()
const { t } = useI18n({ useScope: 'global' })

const incidentId = computed(() => route.params.id)
const incident = computed(() => incidentStore.selectedIncident)

const formatDate = (value) => {
  if (!value) return '—'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  const pad = (number) => String(number).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const updateStatus = async (status) => {
  if (!incident.value) return

  await incidentStore.updateIncidentStatus(incident.value, status)
}

const goToReport = () => {
  router.push({
    name: 'incident-management-report',
    params: { id: incidentId.value }
  })
}

onMounted(async () => {
  await incidentStore.fetchIncidentById(incidentId.value)
})
</script>

<template>
  <main class="incident-detail-page" aria-labelledby="incident-detail-title">
    <button class="back-button" type="button" @click="router.back()">
      <i class="pi pi-arrow-left"></i>
      {{ t('incidentManagement.actions.back') }}
    </button>

    <section v-if="incidentStore.loading" class="state-card">
      {{ t('incidentManagement.states.loadingDetail') }}
    </section>

    <section v-else-if="incidentStore.error" class="state-card error">
      {{ t('incidentManagement.states.errorDetail') }}
    </section>

    <article v-else-if="incident" class="detail-card">
      <header class="detail-header">
        <div>
          <p class="eyebrow">
            {{ incident.code || `INC-${incident.id}` }} ·
            {{ t(`incidentManagement.severity.${incident.severity}`) }}
          </p>

          <h1 id="incident-detail-title">
            {{ incident.title }}
          </h1>

          <p>{{ incident.description }}</p>
        </div>

        <IncidentStatusBadge :status="incident.status" />
      </header>

      <section class="detail-grid">
        <div>
          <span>{{ t('incidentManagement.fields.assignedTo') }}</span>
          <strong>{{ incident.assignedTo || t('incidentManagement.empty.unassigned') }}</strong>
        </div>

        <div>
          <span>{{ t('incidentManagement.fields.affectedArea') }}</span>
          <strong>{{ incident.affectedArea || t('incidentManagement.empty.notSpecified') }}</strong>
        </div>

        <div>
          <span>{{ t('incidentManagement.fields.relatedAlert') }}</span>
          <strong>{{ incident.sourceAlertTitle || incident.sourceAlertId || '—' }}</strong>
        </div>

        <div>
          <span>{{ t('incidentManagement.fields.relatedSensor') }}</span>
          <strong>{{ incident.relatedSensorCode || '—' }}</strong>
        </div>

        <div>
          <span>{{ t('incidentManagement.fields.relatedAsset') }}</span>
          <strong>{{ incident.relatedAssetName || '—' }}</strong>
        </div>

        <div>
          <span>{{ t('incidentManagement.fields.evidence') }}</span>
          <strong>{{ incident.evidenceCount }}</strong>
        </div>

        <div>
          <span>{{ t('incidentManagement.fields.createdAt') }}</span>
          <strong>{{ formatDate(incident.createdAt) }}</strong>
        </div>

        <div>
          <span>{{ t('incidentManagement.fields.updatedAt') }}</span>
          <strong>{{ formatDate(incident.updatedAt) }}</strong>
        </div>
      </section>

      <section class="resolution-card">
        <h2>{{ t('incidentManagement.sections.correctiveAction') }}</h2>
        <p>
          {{ incident.correctiveAction || t('incidentManagement.empty.noCorrectiveAction') }}
        </p>
      </section>

      <section class="timeline-card">
        <h2>{{ t('incidentManagement.sections.timeline') }}</h2>

        <div v-if="!incident.timeline || incident.timeline.length === 0" class="timeline-empty">
          {{ t('incidentManagement.empty.noTimeline') }}
        </div>

        <div v-else class="timeline-list">
          <article
              v-for="item in incident.timeline"
              :key="item.id"
              class="timeline-item"
          >
            <span></span>
            <div>
              <strong>{{ item.event }}</strong>
              <p>{{ item.actor }} · {{ formatDate(item.createdAt) }}</p>
            </div>
          </article>
        </div>
      </section>

      <footer class="detail-actions">
        <button type="button" @click="updateStatus('investigating')">
          {{ t('incidentManagement.actions.markInvestigating') }}
        </button>

        <button type="button" @click="updateStatus('resolved')">
          {{ t('incidentManagement.actions.markResolved') }}
        </button>

        <button type="button" @click="updateStatus('closed')">
          {{ t('incidentManagement.actions.closeIncident') }}
        </button>

        <button type="button" class="secondary-button" @click="goToReport">
          {{ t('incidentManagement.actions.viewReport') }}
        </button>
      </footer>
    </article>
  </main>
</template>

<style scoped>
.incident-detail-page {
  display: grid;
  gap: 18px;
}

.back-button {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #ffffff;
  color: var(--text);
  cursor: pointer;
  font-weight: 800;
  padding: 0.65rem 0.9rem;
}

.detail-card {
  border-radius: 24px;
  background: #ffffff;
  padding: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #4f46e5;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-header h1 {
  margin: 0;
  color: var(--text);
  font-size: 2rem;
}

.detail-header p {
  max-width: 850px;
  margin: 0.75rem 0 0;
  color: var(--muted);
  line-height: 1.6;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.detail-grid div {
  display: grid;
  gap: 5px;
  padding: 1rem;
  border-radius: 16px;
  background: #f8fafc;
}

.detail-grid span {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.detail-grid strong {
  color: var(--text);
}

.resolution-card,
.timeline-card {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1rem;
  margin-top: 1rem;
}

.resolution-card h2,
.timeline-card h2 {
  margin: 0 0 0.75rem;
  color: var(--text);
}

.resolution-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.timeline-list {
  display: grid;
  gap: 12px;
}

.timeline-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: flex-start;
}

.timeline-item > span {
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 999px;
  background: #4f46e5;
}

.timeline-item strong {
  color: var(--text);
}

.timeline-item p,
.timeline-empty {
  margin: 4px 0 0;
  color: var(--muted);
  font-weight: 600;
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.detail-actions button {
  border: none;
  border-radius: 12px;
  background: #4f46e5;
  color: #ffffff;
  cursor: pointer;
  font-weight: 800;
  padding: 0.75rem 1rem;
}

.detail-actions button:hover {
  background: #4338ca;
}

.detail-actions .secondary-button {
  border: 1px solid var(--border);
  background: #ffffff;
  color: var(--text);
}

.state-card {
  border-radius: 18px;
  background: #ffffff;
  color: var(--muted);
  padding: 1rem;
  text-align: center;
  font-weight: 700;
  border: 1px solid var(--border);
}

.state-card.error {
  background: #fee2e2;
  color: #991b1b;
}

@media (max-width: 1100px) {
  .detail-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .detail-header {
    flex-direction: column;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>