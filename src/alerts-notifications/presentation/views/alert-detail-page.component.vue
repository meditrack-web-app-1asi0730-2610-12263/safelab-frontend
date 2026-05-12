<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../application/stores/alert.store';
import AlertSeverityTag from '../components/alert-severity-tag.component.vue';
import AlertStatusTag from '../components/alert-status-tag.component.vue';

const route = useRoute();
const router = useRouter();
const alertStore = useAlertStore();

const acknowledge = async () => {
  await alertStore.acknowledgeAlert(route.params.id);
};

const resolve = async () => {
  await alertStore.resolveAlert(route.params.id);
};

const escalate = async () => {
  await alertStore.escalateAlert(route.params.id);
};

onMounted(() => {
  alertStore.fetchAlertById(route.params.id);
});
</script>

<template>
  <main class="alert-detail-page" aria-labelledby="alert-detail-title">
    <button type="button" class="back-button" @click="router.back()">
      Back
    </button>

    <p v-if="alertStore.loading">Loading alert detail...</p>

    <article v-else-if="alertStore.selectedAlert" class="detail-card">
      <header class="detail-header">
        <div>
          <p class="eyebrow">Alert Detail</p>
          <h1 id="alert-detail-title">
            {{ alertStore.selectedAlert.title }}
          </h1>
        </div>

        <div class="tag-group">
          <AlertSeverityTag :severity="alertStore.selectedAlert.severity" />
          <AlertStatusTag :status="alertStore.selectedAlert.status" />
        </div>
      </header>

      <p class="description">
        {{ alertStore.selectedAlert.description }}
      </p>

      <dl class="metadata-grid">
        <div>
          <dt>Device</dt>
          <dd>{{ alertStore.selectedAlert.deviceName }}</dd>
        </div>

        <div>
          <dt>Location</dt>
          <dd>{{ alertStore.selectedAlert.location }}</dd>
        </div>

        <div>
          <dt>Created at</dt>
          <dd>{{ alertStore.selectedAlert.createdAt }}</dd>
        </div>

        <div>
          <dt>Assigned to</dt>
          <dd>{{ alertStore.selectedAlert.assignedTo || 'Unassigned' }}</dd>
        </div>
      </dl>

      <footer class="action-bar">
        <button
            type="button"
            class="primary-button"
            :disabled="alertStore.selectedAlert.status !== 'Unacknowledged'"
            @click="acknowledge"
        >
          Acknowledge
        </button>

        <button
            type="button"
            class="secondary-button"
            :disabled="alertStore.selectedAlert.status === 'Resolved'"
            @click="resolve"
        >
          Resolve
        </button>

        <button
            type="button"
            class="danger-button"
            :disabled="alertStore.selectedAlert.status === 'Escalated'"
            @click="escalate"
        >
          Escalate
        </button>
      </footer>
    </article>
  </main>
</template>

<style scoped>
.alert-detail-page {
  min-height: 100vh;
  padding: 2rem;
  background: #f8fafc;
}

.back-button,
.secondary-button {
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  background: #ffffff;
  color: #334155;
  cursor: pointer;
  font-weight: 600;
  min-height: 40px;
  padding: 0.5rem 1rem;
}

.detail-card {
  background: #ffffff;
  border-radius: 0.75rem;
  margin-top: 1rem;
  max-width: 960px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-header {
  align-items: start;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.eyebrow {
  color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

h1 {
  color: #0f172a;
  font-size: 2rem;
  margin: 0;
}

.description {
  color: #334155;
  margin: 1.5rem 0;
}

.tag-group {
  display: flex;
  gap: 0.5rem;
}

.metadata-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

dt {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

dd {
  color: #0f172a;
  margin: 0.25rem 0 0;
}

.action-bar {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.primary-button,
.danger-button {
  border: 0;
  border-radius: 0.375rem;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
  min-height: 40px;
  padding: 0.5rem 1rem;
}

.primary-button {
  background: #4f46e5;
}

.primary-button:hover {
  background: #4338ca;
}

.danger-button {
  background: #dc2626;
}

button:disabled {
  background: #cbd5e1;
  color: #64748b;
  cursor: not-allowed;
}

@media (max-width: 767px) {
  .alert-detail-page {
    padding: 1rem;
  }

  .detail-header,
  .action-bar {
    flex-direction: column;
  }

  .metadata-grid {
    grid-template-columns: 1fr;
  }
}
</style>