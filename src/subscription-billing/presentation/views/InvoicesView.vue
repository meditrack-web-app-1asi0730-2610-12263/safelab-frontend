<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscriptionStore } from '../../application/stores/subscription.store'

const subscriptionStore = useSubscriptionStore()
const { t } = useI18n({ useScope: 'global' })

const statusClass = (status) => ({
  paid: 'status-pill paid',
  pending: 'status-pill pending',
  failed: 'status-pill failed'
}[status] || 'status-pill')

onMounted(() => {
  subscriptionStore.loadBillingData()
})
</script>

<template>
  <main class="billing-page">
    <header class="page-header">
      <p class="eyebrow">{{ t('subscriptionBilling.module.eyebrow') }}</p>
      <h1>{{ t('subscriptionBilling.invoices.title') }}</h1>
      <p>{{ t('subscriptionBilling.invoices.description') }}</p>
    </header>

    <section class="table-card">
      <table>
        <thead>
        <tr>
          <th>{{ t('subscriptionBilling.invoices.invoice') }}</th>
          <th>{{ t('subscriptionBilling.invoices.period') }}</th>
          <th>{{ t('subscriptionBilling.invoices.amount') }}</th>
          <th>{{ t('subscriptionBilling.invoices.status') }}</th>
          <th>{{ t('subscriptionBilling.invoices.dueDate') }}</th>
          <th>{{ t('subscriptionBilling.invoices.actions') }}</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="invoice in subscriptionStore.invoices" :key="invoice.id">
          <td>
            <strong>{{ invoice.code }}</strong>
            <small>{{ invoice.description }}</small>
          </td>
          <td>{{ invoice.period }}</td>
          <td>${{ invoice.amount }}</td>
          <td>
              <span :class="statusClass(invoice.status)">
                {{ t(`subscriptionBilling.invoiceStatus.${invoice.status}`) }}
              </span>
          </td>
          <td>{{ invoice.dueDate }}</td>
          <td>
            <button type="button">
              {{ t('subscriptionBilling.actions.download') }}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<style scoped>
.billing-page {
  display: grid;
  gap: 22px;
}

.page-header {
  display: grid;
  gap: 0.25rem;
}

.page-header h1 {
  margin: 0;
  color: var(--text);
}

.page-header p {
  margin: 0;
  color: var(--muted);
}

.table-card {
  overflow-x: auto;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f8fafc;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.85rem 1rem;
  text-align: left;
  text-transform: uppercase;
}

td {
  padding: 1rem;
  border-bottom: 1px solid var(--border);
}

td strong,
td small {
  display: block;
}

td small {
  margin-top: 4px;
  color: var(--muted);
}

.status-pill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
}

.status-pill.paid {
  color: #047857;
  background: #d1fae5;
}

.status-pill.pending {
  color: #b45309;
  background: #fef3c7;
}

.status-pill.failed {
  color: #b91c1c;
  background: #fee2e2;
}

button {
  border: 0;
  border-radius: 10px;
  background: #eef2ff;
  color: #4f46e5;
  cursor: pointer;
  font-weight: 800;
  padding: 0.55rem 0.8rem;
}
</style>