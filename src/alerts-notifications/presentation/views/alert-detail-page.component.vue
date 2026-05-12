<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlertStore } from '../../application/stores/alert.store'
import AlertSeverityTag from '../components/alert-severity-tag.component.vue'
import AlertStatusTag from '../components/alert-status-tag.component.vue'

const route = useRoute()
const router = useRouter()
const alertStore = useAlertStore()

const acknowledge = async () => {
  await alertStore.acknowledgeAlert(route.params.id)
}

const resolve = async () => {
  await alertStore.resolveAlert(route.params.id)
}

const escalate = async () => {
  await alertStore.escalateAlert(route.params.id)
}

onMounted(() => {
  alertStore.fetchAlertById(route.params.id)
})
</script>

<template>
  <main class="alert-detail-page" aria-labelledby="alert-detail-title">
    <button type="button" class="back-button" @click="router.back()">
      Back
    </button>

    <p v-if="alertStore.loading" class="loading-message">
      Loading alert detail...
    </p>

    <p v-else-if="alertStore.error" class="error-message" role="alert">
      {{ alertStore.error }}
    </p>

    <article v-else-if="alertStore.selectedAlert" class="detail-card">
      <header class="detail-header">
        <div class="detail-heading">
          <p class="eyebrow">Alert Detail</p>

          <h1 id="alert-detail-title">
            {{ alertStore.selectedAlert.title }}
          </h1>

          <p class="description">
            {{ alertStore.selectedAlert.description }}
          </p>
        </div>

        <div class="tag-group">
          <AlertSeverityTag :severity="alertStore.selectedAlert.severity" />
          <AlertStatusTag :status="alertStore.selectedAlert.status" />
        </div>
      </header>

      <section class="metadata-grid" aria-label="Alert metadata">
        <div class="metadata-item">
          <span class="metadata-label">Code</span>
          <strong>{{ alertStore.selectedAlert.code || 'Not assigned' }}</strong>
        </div>

        <div class="metadata-item">
          <span class="metadata-label">Type</span>
          <strong>{{ alertStore.selectedAlert.type }}</strong>
        </div>

        <div class="metadata-item">
          <span class="metadata-label">Device</span>
          <strong>{{ alertStore.selectedAlert.deviceName }}</strong>
        </div>

        <div class="metadata-item">
          <span class="metadata-label">Location</span>
          <strong>{{ alertStore.selectedAlert.location }}</strong>
        </div>

        <div class="metadata-item">
          <span class="metadata-label">Created at</span>
          <strong>{{ alertStore.selectedAlert.createdAt }}</strong>
        </div>

        <div class="metadata-item">
          <span class="metadata-label">Assigned to</span>
          <strong>{{ alertStore.selectedAlert.assignedTo || 'Unassigned' }}</strong>
        </div>
      </section>

      <footer class="action-bar">
        <button
            type="button"
            class="primary-button"
            :disabled="alertStore.selectedAlert.status !== 'active'"
            @click="acknowledge"
        >
          Acknowledge
        </button>

        <button
            type="button"
            class="secondary-button"
            :disabled="alertStore.selectedAlert.status === 'resolved'"
            @click="resolve"
        >
          Resolve
        </button>

        <button
            type="button"
            class="danger-button"
            :disabled="alertStore.selectedAlert.status === 'escalated'"
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
  background: linear-gradient(to bottom right, #f8fafc 0%, #f1f5f9 100%);
}

.back-button {
  min-height: 40px;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  background: #ffffff;
  color: #334155;
  font-weight: 600;
  cursor: pointer;
}

.back-button:hover {
  background: #f8fafc;
}

.detail-card {
  max-width: 980px;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-heading {
  flex: 1;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #0f172a;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.description {
  margin: 0.75rem 0 0;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
}

.tag-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.metadata-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.metadata-item {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #f8fafc;
}

.metadata-label {
  display: block;
  margin-bottom: 0.35rem;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.metadata-item strong {
  color: #0f172a;
  font-size: 0.95rem;
  font-weight: 600;
}

.action-bar {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.primary-button,
.secondary-button,
.danger-button {
  min-height: 40px;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
}

.primary-button {
  border: 0;
  background: #4f46e5;
  color: #ffffff;
}

.primary-button:hover {
  background: #4338ca;
}

.secondary-button {
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
}

.secondary-button:hover {
  background: #f8fafc;
}

.danger-button {
  border: 0;
  background: #dc2626;
  color: #ffffff;
}

.danger-button:hover {
  background: #b91c1c;
}

button:disabled {
  background: #cbd5e1;
  color: #64748b;
  cursor: not-allowed;
}

.error-message {
  max-width: 980px;
  padding: 1rem;
  border-left: 4px solid #dc2626;
  background: #fee2e2;
  color: #991b1b;
}

.loading-message {
  max-width: 980px;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #475569;
}

@media (max-width: 767px) {
  .alert-detail-page {
    padding: 1rem;
  }

  .detail-header {
    flex-direction: column;
  }

  .tag-group {
    justify-content: flex-start;
  }

  .metadata-grid {
    grid-template-columns: 1fr;
  }

  .action-bar {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button,
  .danger-button {
    width: 100%;
  }
}
</style>