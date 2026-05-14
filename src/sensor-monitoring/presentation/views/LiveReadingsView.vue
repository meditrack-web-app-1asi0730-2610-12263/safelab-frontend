<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ReadingStatus } from '@/sensor-monitoring/domain/models'
import { useSensorStore } from '@/sensor-monitoring/application/stores'
import MonitoringToolbar from '../components/MonitoringToolbar.vue'
import SensorCard from '../components/SensorCard.vue'

const sensorStore = useSensorStore()
const { t } = useI18n()

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

onMounted(() => {
  sensorStore.loadSensors()
})
</script>

<template>
  <section class="monitoring-dashboard">
    <header class="page-hero dashboard-hero">
      <div>
        <p class="eyebrow">{{ t('menu.sensors.monitoring.eyebrow') }}</p>
        <h1>{{ t('menu.sensors.monitoring.title') }}</h1>
        <p>{{ t('menu.sensors.monitoring.subtitle') }}</p>
      </div>
    </header>

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

    <div v-if="sensorStore.loading" class="state-card">{{ t('menu.sensors.monitoring.states.loading') }}</div>
    <div v-else-if="sensorStore.error" class="state-card error">{{ t('menu.sensors.monitoring.states.error') }}</div>
    <div v-else-if="sensors.length === 0" class="state-card">{{ t('menu.sensors.monitoring.states.empty') }}</div>

    <div v-else class="sensor-grid">
      <SensorCard v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
    </div>
  </section>
</template>

<style scoped>
.monitoring-dashboard {
  display: grid;
  gap: 22px;
}

.state-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #fff;
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

@media (max-width: 720px) {
  /* Component-specific responsive styles live in child components. */
}
</style>


