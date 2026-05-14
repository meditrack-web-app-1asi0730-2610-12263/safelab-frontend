<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useIncidentStore } from '../../application/stores/incident.store';
import IncidentStatusBadge from '../components/incident-status-badge.component.vue';

const route = useRoute();
const router = useRouter();
const incidentStore = useIncidentStore();

const incidentId = computed(() => route.params.id);
const incident = computed(() => incidentStore.selectedIncident);

onMounted(async () => {
  await incidentStore.fetchIncidentById(incidentId.value);
});
</script>

<template>
  <main class="incident-report-page" aria-labelledby="incident-report-title">
    <button class="incident-report-page__back" type="button" @click="router.back()">
      Back
    </button>

    <section v-if="incidentStore.loading" class="incident-report-page__state">
      Loading report...
    </section>

    <article v-else-if="incident" class="incident-report-page__document">
      <header class="incident-report-page__header">
        <div>
          <p>SafeLab Incident Report</p>

          <h1 id="incident-report-title">
            {{ incident.title }}
          </h1>
        </div>

        <IncidentStatusBadge :status="incident.status" />
      </header>

      <section class="incident-report-page__section">
        <h2>Incident summary</h2>

        <p>{{ incident.description }}</p>
      </section>

      <section class="incident-report-page__grid">
        <div>
          <h3>Severity</h3>
          <p>{{ incident.severity }}</p>
        </div>

        <div>
          <h3>Status</h3>
          <p>{{ incident.status }}</p>
        </div>

        <div>
          <h3>Affected area</h3>
          <p>{{ incident.affectedArea || 'Not specified' }}</p>
        </div>

        <div>
          <h3>Assigned to</h3>
          <p>{{ incident.assignedTo || 'Unassigned' }}</p>
        </div>
      </section>

      <section class="incident-report-page__section">
        <h2>Corrective action</h2>

        <p>
          {{ incident.correctiveAction || 'No corrective action has been documented.' }}
        </p>
      </section>

      <section class="incident-report-page__section">
        <h2>Traceability</h2>

        <p>
          Created at {{ new Date(incident.createdAt).toLocaleString() }}.
          Last updated at {{ new Date(incident.updatedAt).toLocaleString() }}.
        </p>
      </section>
    </article>
  </main>
</template>

<style scoped>
.incident-report-page {
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
}

.incident-report-page__back {
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #334155;
  cursor: pointer;
  font-weight: 700;
  margin-bottom: 1rem;
  padding: 0.625rem 0.875rem;
}

.incident-report-page__document {
  max-width: 920px;
  border-radius: 0.75rem;
  background: #ffffff;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.08);
}

.incident-report-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
}

.incident-report-page__header p {
  color: #4f46e5;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

.incident-report-page h1 {
  color: #0f172a;
  font-size: 2rem;
  margin: 0;
}

.incident-report-page__section {
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 0;
}

.incident-report-page__section h2 {
  color: #0f172a;
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
}

.incident-report-page__section p {
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.incident-report-page__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 0;
}

.incident-report-page__grid div {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
}

.incident-report-page__grid h3 {
  color: #64748b;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  margin: 0 0 0.375rem;
  text-transform: uppercase;
}

.incident-report-page__grid p {
  color: #334155;
  margin: 0;
}

.incident-report-page__state {
  border-radius: 0.75rem;
  background: #ffffff;
  color: #475569;
  padding: 1rem;
  text-align: center;
}

@media (max-width: 767px) {
  .incident-report-page__header {
    flex-direction: column;
  }

  .incident-report-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>