<script setup>
import { useRouter } from 'vue-router';
import AlertSeverityTag from './alert-severity-tag.component.vue';
import AlertStatusTag from './alert-status-tag.component.vue';

defineProps({
  alerts: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const goToDetail = (alert) => {
  router.push({
    name: 'alert-detail',
    params: { id: alert.id }
  });
};
</script>

<template>
  <section class="alert-table-wrapper" aria-label="Alerts table">
    <p v-if="loading" class="loading-message">
      Loading alerts...
    </p>

    <table v-else class="alert-table">
      <thead>
      <tr>
        <th>Type</th>
        <th>Device</th>
        <th>Location</th>
        <th>Severity</th>
        <th>Status</th>
        <th>Created at</th>
        <th aria-label="Actions"></th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="alert in alerts" :key="alert.id">
        <td>{{ alert.type }}</td>
        <td>{{ alert.deviceName }}</td>
        <td>{{ alert.location }}</td>
        <td>
          <AlertSeverityTag :severity="alert.severity" />
        </td>
        <td>
          <AlertStatusTag :status="alert.status" />
        </td>
        <td>{{ alert.createdAt }}</td>
        <td>
          <button
              class="table-action"
              type="button"
              :aria-label="`View details for alert ${alert.id}`"
              @click="goToDetail(alert)"
          >
            View Details
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.alert-table-wrapper {
  overflow-x: auto;
  border-radius: 0.5rem;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.alert-table {
  width: 100%;
  border-collapse: collapse;
}

.alert-table th {
  background: #f1f5f9;
  color: #334155;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.75rem 1rem;
  text-align: left;
  text-transform: uppercase;
}

.alert-table td {
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  padding: 1rem;
}

.alert-table tbody tr:hover {
  background: #f8fafc;
}

.table-action {
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  background: white;
  color: #334155;
  cursor: pointer;
  font-weight: 600;
  min-height: 40px;
  padding: 0.5rem 0.75rem;
}

.table-action:hover {
  background: #f8fafc;
}

.loading-message {
  padding: 1rem;
  color: #475569;
}
</style>