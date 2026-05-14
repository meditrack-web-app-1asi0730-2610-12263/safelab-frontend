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

const updateStatus = async (status) => {
  if (!incident.value) return;

  await incidentStore.updateIncident(incident.value.id, {
    ...incident.value,
    status
  });
};

const goToReport = () => {
  router.push({
    name: 'incident-management-report',
    params: { id: incidentId.value }
  });
};

onMounted(async () => {
  await incidentStore.fetchIncidentById(incidentId.value);
});
</script>

<template>
  <main class="incident-detail-page" aria-labelledby="incident-detail-title">
    <button class="incident-detail-page__back" type="button" @click="router.back()">
      Back
    </button>

    <section v-if="incidentStore.loading" class="incident-detail-page__state">
      Loading incident...
    </section>

    <section v-else-if="incidentStore.error" class="incident-detail-page__state incident-detail-page__state--error">
      Could not load incident detail.
    </section>

    <article v-else-if="incident" class="incident-detail-page__card">
      <header class="incident-detail-page__header">
        <div>
          <p class="incident-detail-page__eyebrow">
            {{ incident.severity }} incident
          </p>

          <h1 id="incident-detail-title">
            {{ incident.title }}
          </h1>
        </div>

        <IncidentStatusBadge :status="incident.status" />
      </header>

      <p class="incident-detail-page__description">
        {{ incident.description }}
      </p>

      <dl class="incident-detail-page__details">
        <div>
          <dt>Assigned to</dt>
          <dd>{{ incident.assignedTo || 'Unassigned' }}</dd>
        </div>

        <div>
          <dt>Affected area</dt>
          <dd>{{ incident.affectedArea || 'Not specified' }}</dd>
        </div>

        <div>
          <dt>Source alert</dt>
          <dd>{{ incident.sourceAlertId || 'No linked alert' }}</dd>
        </div>

        <div>
          <dt>Created at</dt>
          <dd>{{ new Date(incident.createdAt).toLocaleString() }}</dd>
        </div>
      </dl>

      <section class="incident-detail-page__resolution" aria-labelledby="corrective-action-title">
        <h2 id="corrective-action-title">
          Corrective action
        </h2>

        <p>
          {{ incident.correctiveAction || 'No corrective action has been documented yet.' }}
        </p>
      </section>

      <footer class="incident-detail-page__actions">
        <button type="button" @click="updateStatus('investigating')">
          Mark as investigating
        </button>

        <button type="button" @click="updateStatus('resolved')">
          Mark as resolved
        </button>

        <button type="button" @click="updateStatus('closed')">
          Close incident
        </button>

        <button type="button" class="incident-detail-page__secondary" @click="goToReport">
          View report
        </button>
      </footer>
    </article>
  </main>
</template>

<style scoped>
.incident-detail-page {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem;
}

.incident-detail-page__back {
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #334155;
  cursor: pointer;
  font-weight: 700;
  margin-bottom: 1rem;
  padding: 0.625rem 0.875rem;
}

.incident-detail-page__card {
  border-radius: 0.75rem;
  background: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.incident-detail-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.incident-detail-page__eyebrow {
  margin: 0 0 0.5rem;
  color: #4f46e5;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.incident-detail-page h1 {
  margin: 0;
  color: #0f172a;
  font-size: 2rem;
}

.incident-detail-page__description {
  color: #334155;
  line-height: 1.6;
  margin: 1rem 0;
}

.incident-detail-page__details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.incident-detail-page__details div,
.incident-detail-page__resolution {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
}

.incident-detail-page__details dt {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.incident-detail-page__details dd {
  margin: 0.375rem 0 0;
  color: #334155;
}

.incident-detail-page__resolution h2 {
  color: #0f172a;
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
}

.incident-detail-page__resolution p {
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.incident-detail-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.incident-detail-page__actions button {
  border: none;
  border-radius: 0.5rem;
  background: #4f46e5;
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
  padding: 0.75rem 1rem;
}

.incident-detail-page__actions button:hover {
  background: #4338ca;
}

.incident-detail-page__actions .incident-detail-page__secondary {
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
}

.incident-detail-page__state {
  border-radius: 0.75rem;
  background: #ffffff;
  color: #475569;
  padding: 1rem;
  text-align: center;
}

.incident-detail-page__state--error {
  background: #fee2e2;
  color: #991b1b;
}

@media (max-width: 767px) {
  .incident-detail-page__header {
    flex-direction: column;
  }

  .incident-detail-page__details {
    grid-template-columns: 1fr;
  }
}
</style>