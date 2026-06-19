<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ReadingStatus } from '@/sensor-monitoring/domain/models'
import { useSensorStore } from '@/sensor-monitoring/application/stores'
import MonitoringToolbar from '../components/MonitoringToolbar.vue'
import SensorCard from '../components/SensorCard.vue'

const sensorStore = useSensorStore()
const { t } = useI18n({ useScope: 'global' })

const searchQuery = computed({
  get: () => sensorStore.searchQuery,
  set: (value) => sensorStore.setSearchQuery(value)
})

const statusFilter = computed({
  get: () => sensorStore.statusFilter,
  set: (value) => sensorStore.setStatusFilter(value)
})

const typeFilter = computed({
  get: () => sensorStore.typeFilter,
  set: (value) => sensorStore.setTypeFilter(value)
})

const statusOptions = computed(() => [
  { value: 'All', label: t('menu.sensors.monitoring.filters.all') },
  ...Object.values(ReadingStatus).map(status => ({
    value: status,
    label: t(`menu.sensors.monitoring.readingStatus.${status}`)
  }))
])

const typeOptions = computed(() => {
  const types = ['Temperature', 'Humidity', 'DoorStatus', 'Vibration', 'Energy']

  return [
    { value: 'All', label: t('menu.sensors.monitoring.filters.all') },
    ...types.map(type => ({
      value: type,
      label: t(`menu.sensors.monitoring.types.${type}`)
    }))
  ]
})

const sensors = computed(() => sensorStore.filteredSensors)

const summary = computed(() => {
  const allSensors = sensorStore.sensors || []

  return {
    total: allSensors.length,
    normal: allSensors.filter(sensor => sensor.status === 'Normal').length,
    outOfRange: allSensors.filter(sensor => sensor.status === 'OutOfRange').length,
    invalid: allSensors.filter(sensor => sensor.status === 'Invalid').length
  }
})

onMounted(() => {
  sensorStore.loadSensors()
})
</script>

<template>
  <section class="monitoring-dashboard">
    <header class="page-hero dashboard-hero">
      <div>
        <p class="eyebrow">
          {{ t('menu.sensors.monitoring.eyebrow') }}
        </p>

        <h1>
          {{ t('menu.sensors.monitoring.title') }}
        </h1>

        <p>
          {{ t('menu.sensors.monitoring.subtitle') }}
        </p>
      </div>
    </header>

    <div class="summary-grid">
      <article class="summary-card">
        <div class="summary-icon total">
          <i class="pi pi-wifi"></i>
        </div>

        <div>
          <span>{{ t('menu.sensors.monitoring.summary.totalSensors') }}</span>
          <strong>{{ summary.total }}</strong>
          <small>{{ t('menu.sensors.monitoring.summary.totalSensorsDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon normal">
          <i class="pi pi-check-circle"></i>
        </div>

        <div>
          <span>{{ t('menu.sensors.monitoring.summary.normalReadings') }}</span>
          <strong>{{ summary.normal }}</strong>
          <small>{{ t('menu.sensors.monitoring.summary.normalReadingsDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon warning">
          <i class="pi pi-exclamation-triangle"></i>
        </div>

        <div>
          <span>{{ t('menu.sensors.monitoring.summary.outOfRange') }}</span>
          <strong>{{ summary.outOfRange }}</strong>
          <small>{{ t('menu.sensors.monitoring.summary.outOfRangeDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon invalid">
          <i class="pi pi-times-circle"></i>
        </div>

        <div>
          <span>{{ t('menu.sensors.monitoring.summary.invalidReadings') }}</span>
          <strong>{{ summary.invalid }}</strong>
          <small>{{ t('menu.sensors.monitoring.summary.invalidReadingsDescription') }}</small>
        </div>
      </article>
    </div>

    <MonitoringToolbar
        v-model:searchQuery="searchQuery"
        v-model:statusFilter="statusFilter"
        v-model:typeFilter="typeFilter"
        :status-options="statusOptions"
        :type-options="typeOptions"
        :search-placeholder="t('menu.sensors.monitoring.searchPlaceholder')"
        :type-label="t('menu.sensors.monitoring.filters.type')"
        :status-label="t('menu.sensors.monitoring.filters.status')"
        :search-aria-label="t('menu.sensors.monitoring.searchAriaLabel')"
    />

    <div v-if="sensorStore.loading" class="state-card">
      {{ t('menu.sensors.monitoring.states.loading') }}
    </div>

    <div v-else-if="sensorStore.error" class="state-card error">
      {{ t('menu.sensors.monitoring.states.error') }}
    </div>

    <div v-else-if="sensors.length === 0" class="state-card">
      {{ t('menu.sensors.monitoring.states.empty') }}
    </div>

    <div v-else class="sensor-grid">
      <SensorCard
          v-for="sensor in sensors"
          :key="sensor.id"
          :sensor="sensor"
      />
    </div>
  </section>
</template>

<style scoped>
.monitoring-dashboard {
  display: grid;
  gap: 22px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(170px, 1fr));
  gap: 1rem;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.summary-card span {
  display: block;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.summary-card strong {
  display: block;
  margin-top: 0.15rem;
  color: var(--text);
  font-size: 1.9rem;
}

.summary-card small {
  color: var(--muted);
  font-weight: 600;
}

.summary-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  font-size: 1.1rem;
}

.summary-icon.total {
  color: #4f46e5;
  background: #e0e7ff;
}

.summary-icon.normal {
  color: #10b981;
  background: #d1fae5;
}

.summary-icon.warning {
  color: #ef4444;
  background: #fee2e2;
}

.summary-icon.invalid {
  color: #f59e0b;
  background: #fef3c7;
}

.state-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(31, 41, 79, 0.06);
  text-align: center;
}

.state-card.error {
  color: var(--danger);
}

.sensor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>