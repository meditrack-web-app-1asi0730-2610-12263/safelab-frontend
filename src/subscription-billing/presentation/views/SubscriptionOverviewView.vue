<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSubscriptionStore } from '../../application/stores/subscription.store'

const subscriptionStore = useSubscriptionStore()
const { t } = useI18n({ useScope: 'global' })

const subscription = computed(() => subscriptionStore.subscription)
const latestInvoice = computed(() => subscriptionStore.latestInvoice)

onMounted(() => {
  subscriptionStore.loadBillingData()
})
</script>

<template>
  <main class="billing-page">
    <header class="page-hero billing-hero">
      <div>
        <p class="eyebrow">
          {{ t('subscriptionBilling.module.eyebrow') }}
        </p>

        <h1>
          {{ t('subscriptionBilling.module.title') }}
        </h1>

        <p>
          {{ t('subscriptionBilling.module.description') }}
        </p>
      </div>
    </header>

    <section v-if="subscriptionStore.loading" class="state-card">
      {{ t('subscriptionBilling.states.loading') }}
    </section>

    <section v-else-if="subscriptionStore.error" class="state-card error">
      {{ t('subscriptionBilling.states.error') }}
    </section>

    <template v-else-if="subscription">
      <section class="subscription-card">
        <div class="subscription-grid">
          <div>
            <span>{{ t('subscriptionBilling.overview.currentPlan') }}</span>
            <strong>{{ subscription.planName }}</strong>
          </div>

          <div>
            <span>{{ t('subscriptionBilling.overview.status') }}</span>
            <strong class="status-pill active">
              {{ t(`subscriptionBilling.status.${subscription.status}`) }}
            </strong>
          </div>

          <div>
            <span>{{ t('subscriptionBilling.overview.renewalDate') }}</span>
            <strong>{{ subscription.renewalDate }}</strong>
          </div>

          <div>
            <span>{{ t('subscriptionBilling.overview.monthlyCost') }}</span>
            <strong>${{ subscription.monthlyCost }}</strong>
          </div>
        </div>

        <div class="usage-block">
          <div>
            <span>{{ t('subscriptionBilling.overview.deviceUsage') }}</span>
            <strong>
              {{ subscription.devicesUsed }} / {{ subscription.devicesLimit }}
              {{ t('subscriptionBilling.overview.devices') }}
            </strong>
          </div>

          <div class="usage-track">
            <div
                class="usage-fill"
                :style="{ width: `${subscriptionStore.deviceUsagePercentage}%` }"
            ></div>
          </div>
        </div>
      </section>

      <section class="billing-navigation">
        <RouterLink to="/subscription-billing/invoices">
          <i class="pi pi-file"></i>
          <strong>{{ t('subscriptionBilling.navigation.invoices') }}</strong>
          <span>{{ t('subscriptionBilling.navigation.invoicesDescription') }}</span>
        </RouterLink>

        <RouterLink to="/subscription-billing/payment-history">
          <i class="pi pi-credit-card"></i>
          <strong>{{ t('subscriptionBilling.navigation.paymentHistory') }}</strong>
          <span>{{ t('subscriptionBilling.navigation.paymentHistoryDescription') }}</span>
        </RouterLink>

        <RouterLink to="/subscription-billing/usage-limits">
          <i class="pi pi-chart-bar"></i>
          <strong>{{ t('subscriptionBilling.navigation.usageLimits') }}</strong>
          <span>{{ t('subscriptionBilling.navigation.usageLimitsDescription') }}</span>
        </RouterLink>

        <RouterLink to="/subscription-billing/upgrade-plan">
          <i class="pi pi-arrow-up-right"></i>
          <strong>{{ t('subscriptionBilling.navigation.upgradePlan') }}</strong>
          <span>{{ t('subscriptionBilling.navigation.upgradePlanDescription') }}</span>
        </RouterLink>
      </section>

      <section class="activity-card">
        <h2>{{ t('subscriptionBilling.activity.title') }}</h2>

        <div class="activity-grid">
          <article>
            <span>{{ t('subscriptionBilling.activity.latestInvoice') }}</span>
            <strong>{{ latestInvoice?.code || '—' }}</strong>
            <p>{{ t('subscriptionBilling.activity.latestInvoiceDescription') }}</p>
          </article>

          <article>
            <span>{{ t('subscriptionBilling.activity.billingCycle') }}</span>
            <strong>{{ t(`subscriptionBilling.billingCycle.${subscription.billingCycle}`) }}</strong>
            <p>{{ t('subscriptionBilling.activity.billingCycleDescription') }}</p>
          </article>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.billing-page {
  display: grid;
  gap: 22px;
}

.billing-hero {
  background:
      radial-gradient(circle at right, rgba(35, 213, 171, 0.18), transparent 32%),
      #ffffff;
}

.subscription-card,
.activity-card {
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid var(--border);
  padding: 24px;
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

.subscription-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.subscription-grid div,
.activity-grid article {
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: 16px;
  background: #f8fafc;
}

.subscription-grid span,
.activity-grid span,
.usage-block span {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.subscription-grid strong,
.activity-grid strong {
  color: var(--text);
  font-size: 1.3rem;
}

.status-pill {
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
}

.status-pill.active {
  color: #047857;
  background: #d1fae5;
}

.usage-block {
  margin-top: 1.5rem;
  display: grid;
  gap: 0.75rem;
}

.usage-track {
  height: 12px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
}

.usage-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #4f46e5, #10b981);
}

.billing-navigation {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.billing-navigation a {
  display: grid;
  gap: 0.6rem;
  min-height: 150px;
  align-content: center;
  justify-items: center;
  padding: 1.25rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  color: var(--text);
  text-decoration: none;
  text-align: center;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.billing-navigation a:hover {
  border-color: #4f46e5;
  transform: translateY(-2px);
}

.billing-navigation i {
  color: #4f46e5;
  font-size: 1.4rem;
}

.billing-navigation span {
  color: var(--muted);
  font-weight: 600;
}

.activity-card h2 {
  margin: 0 0 1rem;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.activity-grid p {
  margin: 0;
  color: var(--muted);
}

.state-card {
  padding: 1rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  text-align: center;
  font-weight: 700;
}

.state-card.error {
  background: #fee2e2;
  color: #991b1b;
}

@media (max-width: 1100px) {
  .subscription-grid,
  .billing-navigation,
  .activity-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .subscription-grid,
  .billing-navigation,
  .activity-grid {
    grid-template-columns: 1fr;
  }
}
</style>