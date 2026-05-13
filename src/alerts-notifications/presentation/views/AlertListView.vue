<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <h1 class="text-2xl font-bold m-0">Alerts & Notifications</h1>
      </template>
      <template #end>
        <Button label="New Alert" icon="pi pi-bell" severity="danger" @click="openNew" />
      </template>
    </Toolbar>

    <div v-if="alertStore.error" class="p-error mb-4">
      {{ alertStore.error }}
    </div>

    <DataTable
        :value="alertStore.alerts"
        :loading="alertStore.isLoading"
        responsiveLayout="scroll"
        stripedRows
        class="p-datatable-sm"
    >
      <Column field="id" header="ID" sortable style="width: 10%"></Column>
      <Column field="title" header="Alert Title" sortable style="width: 40%"></Column>
      <Column field="severity" header="Severity" sortable style="width: 20%">
        <template #body="{ data }">
          <Tag :value="data.severity.toUpperCase()" :severity="getSeverity(data.severity)" />
        </template>
      </Column>
      <Column field="status" header="Status" sortable style="width: 15%">
        <template #body="{ data }">
          <Tag :value="data.status.toUpperCase()" :severity="data.status === 'active' ? 'danger' : 'success'" />
        </template>
      </Column>
      <Column header="Actions" style="width: 15%">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editAlert(data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(data.id)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="alertDialog" :style="{width: '450px'}" header="Alert Details" :modal="true" class="p-fluid">
      <div class="field mb-4">
        <label for="title" class="font-bold">Title</label>
        <InputText id="title" v-model.trim="alertForm.title" required="true" autofocus :class="{'p-invalid': submitted && !alertForm.title}" />
        <small class="p-error" v-if="submitted && !alertForm.title">Title is required.</small>
      </div>
      <div class="field mb-4">
        <label for="severity" class="font-bold">Severity</label>
        <select v-model="alertForm.severity" class="w-full p-2 border-1 surface-border border-round">
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <div class="field mb-4">
        <label for="status" class="font-bold">Status</label>
        <select v-model="alertForm.status" class="w-full p-2 border-1 surface-border border-round">
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveAlert" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAlertStore } from '../../application/stores/alert.store'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

const alertStore = useAlertStore()

const alertDialog = ref(false)
const submitted = ref(false)
const isEditing = ref(false)

const defaultAlert = { id: null, title: '', severity: 'info', status: 'active' }
const alertForm = ref({ ...defaultAlert })

onMounted(() => {
  alertStore.fetchAlerts()
})

const getSeverity = (severity) => {
  switch (severity) {
    case 'info': return 'info'
    case 'warning': return 'warning'
    case 'critical': return 'danger'
    default: return 'info'
  }
}

const openNew = () => {
  alertForm.value = { ...defaultAlert }
  submitted.value = false
  isEditing.value = false
  alertDialog.value = true
}

const hideDialog = () => {
  alertDialog.value = false
  submitted.value = false
}

const editAlert = (alert) => {
  alertForm.value = { ...alert }
  isEditing.value = true
  alertDialog.value = true
}

const saveAlert = async () => {
  submitted.value = true
  if (alertForm.value.title.trim()) {
    if (isEditing.value) {
      await alertStore.updateAlert(alertForm.value.id, alertForm.value)
    } else {
      const { id, ...dataToSave } = alertForm.value
      await alertStore.createAlert(dataToSave)
    }
    alertDialog.value = false
    alertForm.value = { ...defaultAlert }
  }
}

const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this alert?')) {
    await alertStore.deleteAlert(id)
  }
}
</script>