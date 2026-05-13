<script setup>
defineProps({
  records: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <table class="historical-table" aria-label="Historical data">
    <thead>
    <tr>
      <th>Equipment</th>
      <th>Location</th>
      <th>Temperature</th>
      <th>Humidity</th>
      <th>Recorded at</th>
    </tr>
    </thead>

    <tbody>
    <tr v-if="loading">
      <td colspan="5">Loading historical data...</td>
    </tr>

    <tr
        v-for="record in records"
        v-else
        :key="record.id"
    >
      <td>{{ record.equipmentName }}</td>
      <td>{{ record.location }}</td>
      <td>{{ record.temperature }} °C</td>
      <td>{{ record.humidity }} %</td>
      <td>{{ record.recordedAt }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.historical-table {
  background: #ffffff;
  border-collapse: collapse;
  border-radius: 0.75rem;
  overflow: hidden;
  width: 100%;
}

th {
  background: #f1f5f9;
  color: #334155;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.75rem;
  text-align: left;
  text-transform: uppercase;
}

td {
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  padding: 0.75rem;
}
</style>
