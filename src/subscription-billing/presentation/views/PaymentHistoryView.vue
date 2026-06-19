<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscriptionStore } from '../../application/stores/subscription.store'

const subscriptionStore = useSubscriptionStore()
const { t } = useI18n({ useScope: 'global' })

onMounted(() => {
  subscriptionStore.loadBillingData()
})
</script>

<template>
  <main class="billing-page">
    <header class="page-header">
      <p class="eyebrow">{{ t('subscriptionBilling.module.eyebrow') }}</p>
      <h1>{{ t('subscriptionBilling.payments.title') }}</h1>
      <p>{{ t('subscriptionBilling.payments.description') }}</p>
    </header>

    <section class="payment-list">
      <article
          v-for="payment in subscriptionStore.payments"
          :key="payment.id"
          class="payment-card"
      >
        <div>
          <strong>{{ payment.code }}</strong>
          <span>{{ payment.method }}</span>
        </div>

        <div>
          <span>{{ t('subscriptionBilling.payments.amount') }}</span>
          <strong>${{ payment.amount }}</strong>
        </div>

        <div>
          <span>{{ t('subscriptionBilling.payments.paidAt') }}</span>
          <strong>{{ payment.paidAt }}</strong>
        </div>

        <div>
          <span>{{ t('subscriptionBilling.payments.status') }}</span>
          <strong class="status-pill">{{ t(`subscriptionBilling.paymentStatus.${payment.status}`) }}</strong>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.billing-page {
  display: grid;
  gap: 22px;
}

.page-header h1,
.page-header p {
  margin: 0;
}

.page-header p {
  color: var(--muted);
}

.payment-list {
  display: grid;
  gap: 1rem;
}

.payment-card {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.payment-card div {
  display: grid;
  gap: 0.25rem;
}

.payment-card span {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 700;
}

.payment-card strong {
  color: var(--text);
}

.status-pill {
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  color: #047857;
  background: #d1fae5;
}

@media (max-width: 900px) {
  .payment-card {
    grid-template-columns: 1fr;
  }
}
</style>