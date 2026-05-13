<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <h1 class="text-2xl font-bold m-0">Asset List</h1>
      </template>
      <template #end>
        <Button label="New Asset" icon="pi pi-plus" severity="success" @click="openNew" />
      </template>
    </Toolbar>

    <div v-if="assetStore.error" class="p-error mb-4">
      {{ assetStore.error }}
    </div>

    <DataTable
        :value="assetStore.assets"
        :loading="assetStore.isLoading"
        responsiveLayout="scroll"
        stripedRows
        class="p-datatable-sm"
    >
      <Column field="id" header="ID" sortable style="width: 10%"></Column>
      <Column field="name" header="Asset Name" sortable style="width: 30%"></Column>
      <Column field="storageUnit" header="Storage Unit" sortable style="width: 25%"></Column>
      <Column field="status" header="Status" sortable style="width: 20%">
        <template #body="{ data }">
          <Tag :value="data.status.toUpperCase()" :severity="getSeverity(data.status)" />
        </template>
      </Column>
      <Column header="Actions" style="width: 15%">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editAsset(data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(data.id)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="assetDialog" :style="{width: '450px'}" header="Asset Details" :modal="true" class="p-fluid">
      <div class="field mb-4">
        <label for="name" class="font-bold">Name</label>
        <InputText id="name" v-model.trim="assetForm.name" required="true" autofocus :class="{'p-invalid': submitted && !assetForm.name}" />
        <small class="p-error" v-if="submitted && !assetForm.name">Name is required.</small>
      </div>
      <div class="field mb-4">
        <label for="storageUnit" class="font-bold">Storage Unit</label>
        <InputText id="storageUnit" v-model.trim="assetForm.storageUnit" required="true" />
      </div>
      <div class="field mb-4">
        <label for="status" class="font-bold">Status</label>
        <select v-model="assetForm.status" class="w-full p-2 border-1 surface-border border-round">
          <option value="compliant">Compliant</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveAsset" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAssetStore } from '../../application/stores/asset.store'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

const assetStore = useAssetStore()

// UI State
const assetDialog = ref(false)
const submitted = ref(false)
const isEditing = ref(false)

// Form State
const defaultAsset = { id: null, name: '', storageUnit: '', status: 'compliant' }
const assetForm = ref({ ...defaultAsset })

onMounted(() => {
  assetStore.fetchAssets()
})

const getSeverity = (status) => {
  switch (status) {
    case 'compliant': return 'success'
    case 'warning': return 'warning'
    case 'critical': return 'danger'
    default: return 'info'
  }
}

// Modal Actions
const openNew = () => {
  assetForm.value = { ...defaultAsset }
  submitted.value = false
  isEditing.value = false
  assetDialog.value = true
}

const hideDialog = () => {
  assetDialog.value = false
  submitted.value = false
}

const editAsset = (asset) => {
  assetForm.value = { ...asset }
  isEditing.value = true
  assetDialog.value = true
}

const saveAsset = async () => {
  submitted.value = true
  if (assetForm.value.name.trim()) {
    if (isEditing.value) {
      await assetStore.updateAsset(assetForm.value.id, assetForm.value)
    } else {
      // JSON-server asignará el ID automáticamente
      const { id, ...dataToSave } = assetForm.value
      await assetStore.createAsset(dataToSave)
    }
    assetDialog.value = false
    assetForm.value = { ...defaultAsset }
  }
}

const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this asset?')) {
    await assetStore.deleteAsset(id)
  }
}
</script>