<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscriptionStore } from '../../application/stores/subscription.store'

const subscriptionStore = useSubscriptionStore()
const { t } = useI18n({ useScope: 'global' })

const usageItems = computed(() => {
  const usage = subscriptionStore.usageLimits

  if (!usage) return []

  return [
    {
      label: t('subscriptionBilling.usage.devices'),
      used: usage.devicesUsed,
      limit: usage.devicesLimit
    },
    {
      label: t('subscriptionBilling.usage.sensors'),
      used: usage.sensorsUsed,
      limit: usage.sensorsLimit
    },
    {
      label: t('subscriptionBilling.usage.reports'),
      used: usage.reportsGenerated,
      limit: usage.reportsLimit
    },
    {
      label: t('subscriptionBilling.usage.alerts'),
      used: usage.alertsCreated,
      limit: usage.alertsLimit
    }
  ]
})

const percentage = (item) => {
  return Math.min(Math.round((Number(item.used) / Number(item.limit || 1)) * 100), 100)
}

onMounted(() => {
  subscriptionStore.loadBillingData()
})
</script>

<template>
  <main class="billing-page">
    <header class="page-header">
      <p class="eyebrow">{{ t('subscriptionBilling.module.eyebrow') }}</p>
      <h1>{{ t('subscriptionBilling.usage.title') }}</h1>
      <p>{{ t('subscriptionBilling.usage.description') }}</p>
    </header>

    <section class="usage-grid">
      <article
          v-for="item in usageItems"
          :key="item.label"
          class="usage-card"
      >
        <div>
          <span>{{ item.label }}</span>
          <strong>{{ item.used }} / {{ item.limit }}</strong>
        </div>

        <div class="usage-track">
          <div
              class="usage-fill"
              :style="{ width: `${percentage(item)}%` }"
          ></div>
        </div>

        <small>{{ percentage(item) }}%</small>
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

.usage-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.usage-card {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.usage-card span {
  color: var(--muted);
  font-weight: 800;
  text-transform: uppercase;
}

.usage-card strong {
  display: block;
  margin-top: 0.3rem;
  color: var(--text);
  font-size: 1.6rem;
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

.usage-card small {
  color: var(--muted);
  font-weight: 800;
}

@media (max-width: 800px) {
  .usage-grid {
    grid-template-columns: 1fr;
  }
}
</style>