<script setup>
import { computed } from 'vue'

const props = defineProps({
  severity: {
    type: String,
    required: true,
    validator: value => ['info', 'warning', 'critical'].includes(value)
  }
})

const severityClass = computed(() => `severity-${props.severity}`)
</script>

<template>
  <span class="severity-tag" :class="severityClass">
    {{ severity }}
  </span>
</template>

<style scoped>
.severity-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.severity-info {
  background: #dbeafe;
  color: #1e40af;
}

.severity-warning {
  background: #fef3c7;
  color: #92400e;
}

.severity-critical {
  background: #fee2e2;
  color: #991b1b;
}
</style>