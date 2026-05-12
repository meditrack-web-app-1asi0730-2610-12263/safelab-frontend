<script setup>
import { onMounted } from 'vue';
import { useDeliveryRuleStore } from '../../application/stores/delivery-rule.store';
import { useRecipientStore } from '../../application/stores/recipient.store';
import DeliveryRuleForm from '../components/delivery-rule-form.component.vue';

const deliveryRuleStore = useDeliveryRuleStore();
const recipientStore = useRecipientStore();

const createRule = async (payload) => {
  await deliveryRuleStore.createDeliveryRule(payload);
};

onMounted(async () => {
  await Promise.all([
    deliveryRuleStore.fetchDeliveryRules(),
    recipientStore.fetchRecipients()
  ]);
});
</script>

<template>
  <main class="delivery-rules-page" aria-labelledby="delivery-rules-title">
    <header>
      <p class="eyebrow">Configuration</p>
      <h1 id="delivery-rules-title">Delivery Rules</h1>
      <p>
        Configure who receives alerts depending on severity and delivery channel.
      </p>
    </header>

    <section class="layout-grid">
      <article class="panel">
        <h2>New rule</h2>

        <DeliveryRuleForm
            :recipients="recipientStore.recipients"
            @submit="createRule"
        />
      </article>

      <article class="panel">
        <h2>Configured rules</h2>

        <table class="rules-table">
          <thead>
          <tr>
            <th>Minimum severity</th>
            <th>Channel</th>
            <th>Recipients</th>
            <th>Active</th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="rule in deliveryRuleStore.deliveryRules"
              :key="rule.id"
          >
            <td>{{ rule.minimumSeverity }}</td>
            <td>{{ rule.channel }}</td>
            <td>{{ rule.recipientIds.length }}</td>
            <td>{{ rule.active ? 'Yes' : 'No' }}</td>
          </tr>
          </tbody>
        </table>
      </article>
    </section>
  </main>
</template>

<style scoped>
.delivery-rules-page {
  min-height: 100vh;
  padding: 2rem;
  background: #f8fafc;
}

.eyebrow {
  color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 700;
}

h1 {
  color: #0f172a;
  font-size: 2rem;
  margin: 0;
}

h2 {
  color: #0f172a;
  font-size: 1.5rem;
}

p {
  color: #475569;
}

.layout-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 420px 1fr;
  margin-top: 1.5rem;
}

.panel {
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.rules-table {
  width: 100%;
  border-collapse: collapse;
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

@media (max-width: 900px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}
</style>