<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useIncidentStore } from '../../application/stores/incident.store'
import IncidentCard from '../components/incident-card.component.vue'

const router = useRouter()
const incidentStore = useIncidentStore()
const { t } = useI18n({ useScope: 'global' })

const selectedStatus = ref('all')
const selectedSeverity = ref('all')
const searchQuery = ref('')

const filteredIncidents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return incidentStore.incidents.filter((incident) => {
    const matchesStatus =
        selectedStatus.value === 'all' || incident.status === selectedStatus.value

    const matchesSeverity =
        selectedSeverity.value === 'all' || incident.severity === selectedSeverity.value

    const matchesQuery =
        !query ||
        incident.title.toLowerCase().includes(query) ||
        incident.description.toLowerCase().includes(query) ||
        String(incident.code || '').toLowerCase().includes(query) ||
        String(incident.relatedSensorCode || '').toLowerCase().includes(query) ||
        String(incident.affectedArea || '').toLowerCase().includes(query)

    return matchesStatus && matchesSeverity && matchesQuery
  })
})

const goToDetail = (incidentId) => {
  router.push({
    name: 'incident-management-detail',
    params: { id: incidentId }
  })
}

onMounted(async () => {
  await incidentStore.fetchIncidents()
})
</script>

<template>
  <main class="incidents-page" aria-labelledby="incidents-title">
    <header class="page-hero incidents-hero">
      <div>
        <p class="eyebrow">
          {{ t('incidentManagement.module.eyebrow') }}
        </p>

        <h1 id="incidents-title">
          {{ t('incidentManagement.module.title') }}
        </h1>

        <p>
          {{ t('incidentManagement.module.description') }}
        </p>
      </div>
    </header>

    <section class="summary-grid" aria-label="Incident summary">
      <article class="summary-card">
        <div class="summary-icon total">
          <i class="pi pi-list"></i>
        </div>
        <div>
          <span>{{ t('incidentManagement.summary.total') }}</span>
          <strong>{{ incidentStore.totalIncidents }}</strong>
          <small>{{ t('incidentManagement.summary.totalDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon open">
          <i class="pi pi-exclamation-circle"></i>
        </div>
        <div>
          <span>{{ t('incidentManagement.summary.open') }}</span>
          <strong>{{ incidentStore.openIncidents.length }}</strong>
          <small>{{ t('incidentManagement.summary.openDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon investigation">
          <i class="pi pi-search"></i>
        </div>
        <div>
          <span>{{ t('incidentManagement.summary.investigating') }}</span>
          <strong>{{ incidentStore.investigatingIncidents.length }}</strong>
          <small>{{ t('incidentManagement.summary.investigatingDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon critical">
          <i class="pi pi-exclamation-triangle"></i>
        </div>
        <div>
          <span>{{ t('incidentManagement.summary.critical') }}</span>
          <strong>{{ incidentStore.criticalIncidents.length }}</strong>
          <small>{{ t('incidentManagement.summary.criticalDescription') }}</small>
        </div>
      </article>
    </section>

    <section class="filters-panel" aria-label="Incident filters">
      <label>
        {{ t('incidentManagement.filters.search') }}
        <input
            v-model="searchQuery"
            type="search"
            :placeholder="t('incidentManagement.filters.searchPlaceholder')"
        />
      </label>

      <label>
        {{ t('incidentManagement.filters.status') }}
        <select v-model="selectedStatus">
          <option value="all">{{ t('incidentManagement.filters.all') }}</option>
          <option value="open">{{ t('incidentManagement.status.open') }}</option>
          <option value="investigating">{{ t('incidentManagement.status.investigating') }}</option>
          <option value="resolved">{{ t('incidentManagement.status.resolved') }}</option>
          <option value="closed">{{ t('incidentManagement.status.closed') }}</option>
        </select>
      </label>

      <label>
        {{ t('incidentManagement.filters.severity') }}
        <select v-model="selectedSeverity">
          <option value="all">{{ t('incidentManagement.filters.all') }}</option>
          <option value="critical">{{ t('incidentManagement.severity.critical') }}</option>
          <option value="warning">{{ t('incidentManagement.severity.warning') }}</option>
          <option value="info">{{ t('incidentManagement.severity.info') }}</option>
        </select>
      </label>
    </section>

    <section v-if="incidentStore.loading" class="state-card">
      {{ t('incidentManagement.states.loading') }}
    </section>

    <section v-else-if="incidentStore.error" class="state-card error">
      {{ t('incidentManagement.states.error') }}
    </section>

    <section v-else-if="filteredIncidents.length === 0" class="state-card">
      {{ t('incidentManagement.states.empty') }}
    </section>

    <section v-else class="incidents-grid" aria-label="Incident list">
      <IncidentCard
          v-for="incident in filteredIncidents"
          :key="incident.id"
          :incident="incident"
          @view-detail="goToDetail"
      />
    </section>
  </main>
</template>

<style scoped>
.incidents-page {
  display: grid;
  gap: 22px;
}

.incidents-hero {
  background:
      radial-gradient(circle at right, rgba(35, 213, 171, 0.18), transparent 32%),
      #ffffff;
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

.summary-icon.total {
  color: #4f46e5;
  background: #e0e7ff;
}

.summary-icon.open {
  color: #ef4444;
  background: #fee2e2;
}

.summary-icon.investigation {
  color: #f59e0b;
  background: #fef3c7;
}

.summary-icon.critical {
  color: #b91c1c;
  background: #fee2e2;
}

.filters-panel {
  align-items: end;
  background: #ffffff;
  border-radius: 18px;
  display: grid;
  gap: 1rem;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 1rem;
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.filters-panel label {
  color: var(--text);
  display: grid;
  font-size: 0.875rem;
  font-weight: 800;
  gap: 0.5rem;
}

.filters-panel input,
.filters-panel select {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #ffffff;
  color: var(--text);
  font: inherit;
  min-height: 42px;
  padding: 0.5rem 0.75rem;
}

.incidents-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
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

@media (max-width: 1000px) {
  .summary-grid,
  .incidents-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filters-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .summary-grid,
  .incidents-grid {
    grid-template-columns: 1fr;
  }
}
</style>