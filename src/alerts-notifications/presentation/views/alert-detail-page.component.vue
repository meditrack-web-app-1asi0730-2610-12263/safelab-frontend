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

    <p v-if="alertStore.loading">Loading alert detail...</p>

    <p v-else-if="alertStore.error" class="error-message" role="alert">
      {{ alertStore.error }}
    </p>

    <article v-else-if="alertStore.selectedAlert" class="detail-card">
      <header class="detail-header">
        <div>
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

      <dl class="metadata-grid">
        <div>
          <dt>Code</dt>
          <dd>{{ alertStore.selectedAlert.code }}</dd>
        </div>

        <div>
          <dt>Type</dt>
          <dd>{{ alertStore.selectedAlert.type }}</dd>
        </div>

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