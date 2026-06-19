<template>
  <section class="asset-page">
    <div class="asset-hero">
      <div>
        <span class="section-label">
          {{ t('assetInventory.module.eyebrow') }}
        </span>

        <h1>
          {{ t('assetInventory.module.title') }}
        </h1>

        <p>
          {{ t('assetInventory.module.description') }}
        </p>
      </div>

      <Button
          :label="t('assetInventory.actions.newAsset')"
          icon="pi pi-plus"
          severity="success"
          @click="openNew"
      />
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon success">
          <i class="pi pi-box"></i>
        </div>

        <div>
          <span>{{ t('assetInventory.summary.totalAssets') }}</span>
          <strong>{{ summary.total }}</strong>
          <small>{{ t('assetInventory.summary.totalAssetsDescription') }}</small>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon success">
          <i class="pi pi-check-circle"></i>
        </div>

        <div>
          <span>{{ t('assetInventory.summary.compliant') }}</span>
          <strong>{{ summary.compliant }}</strong>
          <small>{{ t('assetInventory.summary.compliantDescription') }}</small>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon warning">
          <i class="pi pi-exclamation-circle"></i>
        </div>

        <div>
          <span>{{ t('assetInventory.summary.warning') }}</span>
          <strong>{{ summary.warning }}</strong>
          <small>{{ t('assetInventory.summary.warningDescription') }}</small>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon danger">
          <i class="pi pi-times-circle"></i>
        </div>

        <div>
          <span>{{ t('assetInventory.summary.critical') }}</span>
          <strong>{{ summary.critical }}</strong>
          <small>{{ t('assetInventory.summary.criticalDescription') }}</small>
        </div>
      </div>
    </div>

    <div class="card table-card">
      <Toolbar class="mb-4 asset-toolbar">
        <template #start>
          <div>
            <h2 class="text-2xl font-bold m-0">
              {{ t('assetInventory.table.title') }}
            </h2>

            <p class="toolbar-subtitle">
              {{ t('assetInventory.table.subtitle') }}
            </p>
          </div>
        </template>

        <template #end>
          <Button
              :label="t('assetInventory.actions.refresh')"
              icon="pi pi-refresh"
              text
              @click="assetStore.fetchAssets()"
          />
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
          paginator
          :rows="5"
          class="p-datatable-sm"
      >
        <template #empty>
          <div class="empty-state">
            {{ t('assetInventory.table.empty') }}
          </div>
        </template>

        <Column
            field="id"
            :header="t('assetInventory.table.id')"
            sortable
            style="width: 6%"
        />

        <Column
            field="name"
            :header="t('assetInventory.table.assetName')"
            sortable
            style="min-width: 210px"
        >
          <template #body="{ data }">
            <strong>{{ data.name }}</strong>
            <small class="table-muted">
              {{ data.category || t('assetInventory.table.uncategorized') }}
            </small>
          </template>
        </Column>

        <Column
            field="storageUnit"
            :header="t('assetInventory.table.storageUnit')"
            sortable
            style="min-width: 180px"
        />

        <Column
            field="location"
            :header="t('assetInventory.table.location')"
            sortable
            style="min-width: 170px"
        />

        <Column
            field="lastInspection"
            :header="t('assetInventory.table.lastInspection')"
            sortable
            style="min-width: 150px"
        />

        <Column
            field="responsible"
            :header="t('assetInventory.table.responsible')"
            sortable
            style="min-width: 180px"
        />

        <Column
            field="status"
            :header="t('assetInventory.table.status')"
            sortable
            style="min-width: 130px"
        >
          <template #body="{ data }">
            <Tag
                :value="formatStatus(data.status)"
                :severity="getSeverity(data.status)"
            />
          </template>
        </Column>

        <Column
            :header="t('assetInventory.table.actions')"
            style="width: 120px"
        >
          <template #body="{ data }">
            <Button
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
                :aria-label="t('assetInventory.actions.edit')"
                @click="editAsset(data)"
            />

            <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                :aria-label="t('assetInventory.actions.delete')"
                @click="confirmDelete(data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
        v-model:visible="assetDialog"
        :style="{ width: '520px' }"
        :header="t('assetInventory.form.title')"
        :modal="true"
        class="p-fluid"
    >
      <div class="form-grid">
        <div class="field">
          <label for="name" class="font-bold">
            {{ t('assetInventory.form.assetName') }}
          </label>

          <InputText
              id="name"
              v-model.trim="assetForm.name"
              autofocus
              :class="{ 'p-invalid': submitted && !assetForm.name }"
          />

          <small class="p-error" v-if="submitted && !assetForm.name">
            {{ t('assetInventory.validation.assetNameRequired') }}
          </small>
        </div>

        <div class="field">
          <label for="category" class="font-bold">
            {{ t('assetInventory.form.category') }}
          </label>

          <InputText
              id="category"
              v-model.trim="assetForm.category"
              :placeholder="t('assetInventory.form.categoryPlaceholder')"
          />
        </div>

        <div class="field">
          <label for="storageUnit" class="font-bold">
            {{ t('assetInventory.form.storageUnit') }}
          </label>

          <InputText
              id="storageUnit"
              v-model.trim="assetForm.storageUnit"
              :class="{ 'p-invalid': submitted && !assetForm.storageUnit }"
          />

          <small class="p-error" v-if="submitted && !assetForm.storageUnit">
            {{ t('assetInventory.validation.storageUnitRequired') }}
          </small>
        </div>

        <div class="field">
          <label for="location" class="font-bold">
            {{ t('assetInventory.form.location') }}
          </label>

          <InputText
              id="location"
              v-model.trim="assetForm.location"
              :placeholder="t('assetInventory.form.locationPlaceholder')"
          />
        </div>

        <div class="field">
          <label for="lastInspection" class="font-bold">
            {{ t('assetInventory.form.lastInspection') }}
          </label>

          <InputText
              id="lastInspection"
              v-model.trim="assetForm.lastInspection"
              :placeholder="t('assetInventory.form.lastInspectionPlaceholder')"
          />
        </div>

        <div class="field">
          <label for="responsible" class="font-bold">
            {{ t('assetInventory.form.responsible') }}
          </label>

          <InputText
              id="responsible"
              v-model.trim="assetForm.responsible"
              :placeholder="t('assetInventory.form.responsiblePlaceholder')"
          />
        </div>

        <div class="field full-field">
          <label for="status" class="font-bold">
            {{ t('assetInventory.form.status') }}
          </label>

          <select
              id="status"
              v-model="assetForm.status"
              class="w-full p-2 border-1 surface-border border-round"
          >
            <option value="compliant">
              {{ t('assetInventory.status.compliant') }}
            </option>

            <option value="warning">
              {{ t('assetInventory.status.warning') }}
            </option>

            <option value="critical">
              {{ t('assetInventory.status.critical') }}
            </option>
          </select>
        </div>
      </div>

      <template #footer>
        <Button
            :label="t('assetInventory.actions.cancel')"
            icon="pi pi-times"
            text
            @click="hideDialog"
        />

        <Button
            :label="t('assetInventory.actions.save')"
            icon="pi pi-check"
            @click="saveAsset"
        />
      </template>
    </Dialog>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAssetStore } from '../../application/stores/asset.store'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

const { t } = useI18n({ useScope: 'global' })
const assetStore = useAssetStore()

const assetDialog = ref(false)
const submitted = ref(false)
const isEditing = ref(false)

const defaultAsset = {
  id: null,
  name: '',
  category: '',
  storageUnit: '',
  location: '',
  status: 'compliant',
  lastInspection: '',
  responsible: ''
}

const assetForm = ref({ ...defaultAsset })

onMounted(() => {
  assetStore.fetchAssets()
})

const summary = computed(() => {
  const assets = assetStore.assets || []

  return {
    total: assets.length,
    compliant: assets.filter(asset => asset.status === 'compliant').length,
    warning: assets.filter(asset => asset.status === 'warning').length,
    critical: assets.filter(asset => asset.status === 'critical').length
  }
})

const getSeverity = (status) => {
  switch (status) {
    case 'compliant':
      return 'success'
    case 'warning':
      return 'warning'
    case 'critical':
      return 'danger'
    default:
      return 'info'
  }
}

const formatStatus = (status) => {
  const availableStatuses = ['compliant', 'warning', 'critical']

  if (!availableStatuses.includes(status)) {
    return t('assetInventory.status.unknown')
  }

  return t(`assetInventory.status.${status}`)
}

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
  submitted.value = false
  isEditing.value = true
  assetDialog.value = true
}

const saveAsset = async () => {
  submitted.value = true

  const hasRequiredFields =
      assetForm.value.name.trim() &&
      assetForm.value.storageUnit.trim()

  if (!hasRequiredFields) return

  if (isEditing.value) {
    await assetStore.updateAsset(assetForm.value.id, assetForm.value)
  } else {
    const { id, ...dataToSave } = assetForm.value
    await assetStore.createAsset(dataToSave)
  }

  assetDialog.value = false
  assetForm.value = { ...defaultAsset }
}

const confirmDelete = async (id) => {
  if (confirm(t('assetInventory.messages.deleteConfirmation'))) {
    await assetStore.deleteAsset(id)
  }
}
</script>

<style scoped>
.asset-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.asset-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.8rem;
  border-radius: 22px;
  background:
      radial-gradient(circle at right, rgba(35, 213, 171, 0.18), transparent 32%),
      #ffffff;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.section-label {
  display: inline-block;
  margin-bottom: 0.4rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #4f46e5;
  text-transform: uppercase;
}

.asset-hero h1 {
  margin: 0;
  color: #111827;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1;
}

.asset-hero p {
  max-width: 720px;
  margin: 0.75rem 0 0;
  color: #64748b;
  font-weight: 500;
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
  border: 1px solid #e5e7eb;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.summary-card span {
  display: block;
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
}

.summary-card strong {
  display: block;
  margin-top: 0.15rem;
  color: #111827;
  font-size: 1.9rem;
}

.summary-card small {
  color: #64748b;
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

.summary-icon.success {
  color: #10b981;
  background: #d1fae5;
}

.summary-icon.warning {
  color: #f59e0b;
  background: #fef3c7;
}

.summary-icon.danger {
  color: #ef4444;
  background: #fee2e2;
}

.table-card {
  border-radius: 22px;
  border: 0;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.asset-toolbar {
  border: 0;
  border-radius: 18px;
  background: transparent;
}

.toolbar-subtitle {
  margin: 0.35rem 0 0;
  color: #64748b;
  font-weight: 500;
}

.table-muted {
  display: block;
  margin-top: 0.25rem;
  color: #64748b;
  font-weight: 600;
}

.empty-state {
  padding: 1.5rem;
  text-align: center;
  color: #64748b;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.full-field {
  grid-column: 1 / -1;
}

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .asset-hero {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .summary-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .asset-hero {
    padding: 1.25rem;
  }
}
</style>