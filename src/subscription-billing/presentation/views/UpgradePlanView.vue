<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscriptionStore } from '../../application/stores/subscription.store'

const subscriptionStore = useSubscriptionStore()
const { t } = useI18n({ useScope: 'global' })

const isCurrentPlan = (plan) => {
  return Number(subscriptionStore.subscription?.currentPlanId) === Number(plan.id)
}

const selectPlan = async (plan) => {
  if (isCurrentPlan(plan)) return

  const confirmed = confirm(
      t('subscriptionBilling.upgrade.confirmPlan', {
        plan: plan.name
      })
  )

  if (!confirmed) return

  await subscriptionStore.selectPlan(plan)
}

onMounted(() => {
  subscriptionStore.loadBillingData()
})
</script>

<template>
  <main class="billing-page">
    <header class="page-header">
      <p class="eyebrow">{{ t('subscriptionBilling.module.eyebrow') }}</p>
      <h1>{{ t('subscriptionBilling.upgrade.title') }}</h1>
      <p>{{ t('subscriptionBilling.upgrade.description') }}</p>
    </header>

    <section class="plan-grid">
      <article
          v-for="plan in subscriptionStore.plans"
          :key="plan.id"
          class="plan-card"
          :class="{ current: isCurrentPlan(plan) }"
      >
        <div class="plan-header">
          <div>
            <h2>{{ plan.name }}</h2>
            <p>{{ plan.description }}</p>
          </div>

          <span v-if="isCurrentPlan(plan)" class="current-badge">
            {{ t('subscriptionBilling.upgrade.currentPlan') }}
          </span>
        </div>

        <strong class="price">${{ plan.monthlyCost }}</strong>
        <small>{{ t('subscriptionBilling.upgrade.perMonth') }}</small>

        <ul>
          <li>{{ plan.deviceLimit }} {{ t('subscriptionBilling.usage.devices') }}</li>
          <li>{{ plan.sensorsLimit }} {{ t('subscriptionBilling.usage.sensors') }}</li>
          <li>{{ plan.reportsLimit }} {{ t('subscriptionBilling.usage.reports') }}</li>
          <li>{{ plan.alertsLimit }} {{ t('subscriptionBilling.usage.alerts') }}</li>
        </ul>

        <button
            type="button"
            :disabled="isCurrentPlan(plan)"
            @click="selectPlan(plan)"
        >
          {{
            isCurrentPlan(plan)
                ? t('subscriptionBilling.upgrade.currentPlan')
                : t('subscriptionBilling.upgrade.selectPlan')
          }}
        </button>
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

.plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.plan-card {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

.plan-card.current {
  border-color: #4f46e5;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.plan-header h2 {
  margin: 0;
  color: var(--text);
}

.plan-header p {
  margin: 0.4rem 0 0;
  color: var(--muted);
}

.current-badge {
  height: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  color: #047857;
  background: #d1fae5;
  font-size: 0.72rem;
  font-weight: 800;
}

.price {
  color: var(--text);
  font-size: 2.4rem;
}

.plan-card small {
  color: var(--muted);
  font-weight: 700;
}

ul {
  display: grid;
  gap: 0.5rem;
  padding-left: 1rem;
  color: var(--text);
  font-weight: 700;
}

button {
  border: 0;
  border-radius: 14px;
  background: #4f46e5;
  color: #ffffff;
  cursor: pointer;
  font-weight: 800;
  min-height: 44px;
}

button:disabled {
  cursor: not-allowed;
  background: #d1d5db;
}

@media (max-width: 1000px) {
  .plan-grid {
    grid-template-columns: 1fr;
  }
}
</style>