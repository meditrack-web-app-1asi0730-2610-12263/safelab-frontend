<script setup>
import IncidentStatusBadge from './incident-status-badge.component.vue';

defineProps({
  incident: {
    type: Object,
    required: true
  }
});

defineEmits(['view-detail']);
</script>

<template>
  <article class="incident-card" :class="`incident-card--${incident.severity}`">
    <div class="incident-card__header">
      <div>
        <p class="incident-card__eyebrow">
          {{ incident.severity }}
        </p>

        <h3 class="incident-card__title">
          {{ incident.title }}
        </h3>
      </div>

      <IncidentStatusBadge :status="incident.status" />
    </div>

    <p class="incident-card__description">
      {{ incident.description }}
    </p>

    <dl class="incident-card__meta">
      <div>
        <dt>Assigned to</dt>
        <dd>{{ incident.assignedTo || 'Unassigned' }}</dd>
      </div>

      <div>
        <dt>Affected area</dt>
        <dd>{{ incident.affectedArea || 'Not specified' }}</dd>
      </div>
    </dl>

    <footer class="incident-card__footer">
      <small>
        Created at {{ new Date(incident.createdAt).toLocaleString() }}
      </small>

      <button
          class="incident-card__button"
          type="button"
          @click="$emit('view-detail', incident.id)"
      >
        View details
      </button>
    </footer>
  </article>
</template>

<style scoped>
.incident-card {
  border-left: 4px solid #475569;
  border-radius: 0.75rem;
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

.incident-card--critical {
  border-left-color: #dc2626;
}

.incident-card--warning {
  border-left-color: #f59e0b;
}

.incident-card--info {
  border-left-color: #2563eb;
}

.incident-card__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.incident-card__eyebrow {
  margin: 0 0 0.25rem;
  color: #475569;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.incident-card__title {
  margin: 0;
  color: #0f172a;
  font-size: 1.125rem;
}

.incident-card__description {
  margin: 0.75rem 0;
  color: #334155;
  line-height: 1.5;
}

.incident-card__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}

.incident-card__meta dt {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.incident-card__meta dd {
  margin: 0.25rem 0 0;
  color: #334155;
}

.incident-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 0.75rem;
}

.incident-card__footer small {
  color: #64748b;
}

.incident-card__button {
  border: none;
  border-radius: 0.5rem;
  background: #4f46e5;
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
  padding: 0.625rem 0.875rem;
}

.incident-card__button:hover {
  background: #4338ca;
}

@media (max-width: 767px) {
  .incident-card__header,
  .incident-card__footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .incident-card__meta {
    grid-template-columns: 1fr;
  }
}
</style>