<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useIncidentStore } from '../../application/stores/incident.store';
import IncidentCard from '../components/incident-card.component.vue';

const router = useRouter();
const incidentStore = useIncidentStore();

const selectedStatus = ref('all');
const selectedSeverity = ref('all');

const filteredIncidents = computed(() => {
  return incidentStore.incidents.filter((incident) => {
    const matchesStatus =
        selectedStatus.value === 'all' || incident.status === selectedStatus.value;

    const matchesSeverity =
        selectedSeverity.value === 'all' || incident.severity === selectedSeverity.value;

    return matchesStatus && matchesSeverity;
  });
});

const goToDetail = (incidentId) => {
  router.push({
    name: 'incident-management-detail',
    params: { id: incidentId }
  });
};

onMounted(async () => {
  await incidentStore.fetchIncidents();
});
</script>

<template>
  <main class="incidents-page" aria-labelledby="incidents-title">
    <header class="incidents-page__header">
      <div>
        <p class="incidents-page__eyebrow">Operations</p>

        <h1 id="incidents-title">
          Incident Management
        </h1>

        <p>
          Track, investigate, resolve and document operational incidents related to
          cold chain monitoring.
        </p>
      </div>
    </header>

    <section class="incidents-page__summary" aria-label="Incident summary">
      <article>
        <span>{{ incidentStore.totalIncidents }}</span>
        <p>Total incidents</p>
      </article>

      <article>
        <span>{{ incidentStore.openIncidents.length }}</span>
        <p>Open</p>
      </article>

      <article>
        <span>{{ incidentStore.investigatingIncidents.length }}</span>
        <p>Investigating</p>
      </article>

      <article>
        <span>{{ incidentStore.criticalIncidents.length }}</span>
        <p>Critical</p>
      </article>
    </section>

    <section class="incidents-page__filters" aria-label="Incident filters">
      <label>
        Status
        <select v-model="selectedStatus">
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </label>

      <label>
        Severity
        <select v-model="selectedSeverity">
          <option value="all">All</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </label>
    </section>

    <section v-if="incidentStore.loading" class="incidents-page__state">
      Loading incidents...
    </section>

    <section v-else-if="incidentStore.error" class="incidents-page__state incidents-page__state--error">
      Could not load incidents.
    </section>

    <section v-else-if="filteredIncidents.length === 0" class="incidents-page__state">
      No incidents found with the selected filters.
    </section>

    <section v-else class="incidents-page__grid" aria-label="Incident list">
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
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem;
}

.incidents-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.incidents-page__eyebrow {
  margin: 0 0 0.5rem;
  color: #4f46e5;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.incidents-page h1 {
  margin: 0;
  color: #0f172a;
  font-size: 2rem;
}

.incidents-page__header p:last-child {
  max-width: 720px;
  color: #475569;
  line-height: 1.6;
}

.incidents-page__summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.incidents-page__summary article {
  border-radius: 0.75rem;
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.incidents-page__summary span {
  color: #0f172a;
  font-size: 1.75rem;
  font-weight: 800;
}

.incidents-page__summary p {
  margin: 0.25rem 0 0;
  color: #64748b;
}

.incidents-page__filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.incidents-page__filters label {
  color: #334155;
  font-size: 0.875rem;
  font-weight: 700;
}

.incidents-page__filters select {
  display: block;
  min-width: 180px;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: #ffffff;
  margin-top: 0.375rem;
  padding: 0.625rem;
}

.incidents-page__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.incidents-page__state {
  border-radius: 0.75rem;
  background: #ffffff;
  color: #475569;
  padding: 1rem;
  text-align: center;
}

.incidents-page__state--error {
  background: #fee2e2;
  color: #991b1b;
}

@media (max-width: 900px) {
  .incidents-page__summary,
  .incidents-page__grid {
    grid-template-columns: 1fr;
  }

  .incidents-page__filters {
    flex-direction: column;
  }
}
</style>