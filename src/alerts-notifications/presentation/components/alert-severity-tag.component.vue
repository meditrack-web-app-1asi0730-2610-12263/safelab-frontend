<script setup>
defineProps({
  severity: {
    type: String,
    required: true
  }
});

const severityClassMap = {
  Info: 'severity-info',
  Warning: 'severity-warning',
  Critical: 'severity-critical'
};
</script>

<template>
  <span
      class="severity-tag"
      :class="severityClassMap[severity]"
  >
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