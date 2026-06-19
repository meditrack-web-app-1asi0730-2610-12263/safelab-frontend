<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRemoteControlStore } from '../../application/stores/remote-control.store'
import RemoteActuatorCard from '../components/RemoteActuatorCard.vue'
import CommandHistoryTable from '../components/CommandHistoryTable.vue'

const remoteControlStore = useRemoteControlStore()
const { t } = useI18n({ useScope: 'global' })

const typeOptions = computed(() => [
  'All',
  'Cooling',
  'DoorLock',
  'Alarm',
  'Telemetry',
  'Ventilation'
])

const availableCount = computed(() => remoteControlStore.availableActuators.length)
const blockedCount = computed(() => remoteControlStore.blockedActuators.length)
const totalCount = computed(() => remoteControlStore.actuators.length)

const executeCommand = async (actuator, command) => {
  const confirmed = confirm(
      t('remoteControl.messages.confirmCommand', {
        command: t(`remoteControl.commands.${command}`),
        device: actuator.name
      })
  )

  if (!confirmed) {
    return
  }

  await remoteControlStore.executeCommand(actuator, command)
}

onMounted(() => {
  remoteControlStore.loadRemoteControl()
})
</script>

<template>
  <section class="remote-page">
    <header class="page-hero remote-hero">
      <div>
        <p class="eyebrow">
          {{ t('remoteControl.module.eyebrow') }}
        </p>

        <h1>
          {{ t('remoteControl.module.title') }}
        </h1>

        <p>
          {{ t('remoteControl.module.description') }}
        </p>
      </div>
    </header>

    <section class="summary-grid">
      <article class="summary-card">
        <div class="summary-icon total">
          <i class="pi pi-sliders-h"></i>
        </div>
        <div>
          <span>{{ t('remoteControl.summary.totalDevices') }}</span>
          <strong>{{ totalCount }}</strong>
          <small>{{ t('remoteControl.summary.totalDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon success">
          <i class="pi pi-check-circle"></i>
        </div>
        <div>
          <span>{{ t('remoteControl.summary.availableDevices') }}</span>
          <strong>{{ availableCount }}</strong>
          <small>{{ t('remoteControl.summary.availableDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon warning">
          <i class="pi pi-lock"></i>
        </div>
        <div>
          <span>{{ t('remoteControl.summary.blockedDevices') }}</span>
          <strong>{{ blockedCount }}</strong>
          <small>{{ t('remoteControl.summary.blockedDescription') }}</small>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon info">
          <i class="pi pi-history"></i>
        </div>
        <div>
          <span>{{ t('remoteControl.summary.executedToday') }}</span>
          <strong>{{ remoteControlStore.executedToday }}</strong>
          <small>{{ t('remoteControl.summary.executedDescription') }}</small>
        </div>
      </article>
    </section>

    <section class="control-toolbar">
      <label>
        {{ t('remoteControl.filters.deviceType') }}

        <select
            :value="remoteControlStore.selectedType"
            @change="remoteControlStore.setSelectedType($event.target.value)"
        >
          <option
              v-for="type in typeOptions"
              :key="type"
              :value="type"
          >
            {{
              type === 'All'
                  ? t('remoteControl.filters.allTypes')
                  : t(`remoteControl.types.${type}`)
            }}
          </option>
        </select>
      </label>

      <button type="button" @click="remoteControlStore.loadRemoteControl()">
        <i class="pi pi-refresh"></i>
        {{ t('remoteControl.actions.refresh') }}
      </button>
    </section>

    <div v-if="remoteControlStore.loading" class="state-card">
      {{ t('remoteControl.states.loading') }}
    </div>

    <div v-else-if="remoteControlStore.error" class="state-card error">
      {{ remoteControlStore.error }}
    </div>

    <template v-else>
      <section class="actuator-grid">
        <RemoteActuatorCard
            v-for="actuator in remoteControlStore.filteredActuators"
            :key="actuator.id"
            :actuator="actuator"
            :disabled="remoteControlStore.executing"
            @execute-command="executeCommand"
        />
      </section>

      <section class="remote-grid">
        <CommandHistoryTable :commands="remoteControlStore.recentCommands" />

        <article class="policy-card">
          <header>
            <h2>{{ t('remoteControl.policy.title') }}</h2>
            <p>{{ t('remoteControl.policy.subtitle') }}</p>
          </header>

          <div
              v-for="policy in remoteControlStore.policies"
              :key="policy.id"
              class="policy-row"
          >
            <div>
              <strong>{{ policy.name }}</strong>
              <span>{{ policy.description }}</span>
            </div>

            <span
                class="policy-status"
                :class="{ active: policy.isActive }"
            >
              {{
                policy.isActive
                    ? t('remoteControl.policy.active')
                    : t('remoteControl.policy.inactive')
              }}
            </span>
          </div>
        </article>
      </section>
    </template>
  </section>
</template>

<style scoped>
.remote-page {
  display: grid;
  gap: 22px;
}

.remote-hero {
  background:
      radial-gradient(circle at right, rgba(35, 213, 171, 0.18), transparent 32%),
      #ffffff;
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
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.summary-card span {
  display: block;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.summary-card strong {
  display: block;
  color: var(--text);
  font-size: 1.9rem;
}

.summary-card small {
  color: var(--muted);
  font-weight: 600;
}

.summary-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
}

.summary-icon.total {
  color: #4f46e5;
  background: #e0e7ff;
}

.summary-icon.success {
  color: #10b981;
  background: #d1fae5;
}

.summary-icon.warning {
  color: #f59e0b;
  background: #fef3c7;
}

.summary-icon.info {
  color: #2563eb;
  background: #dbeafe;
}

.control-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.control-toolbar label {
  display: grid;
  gap: 0.5rem;
  color: var(--text);
  font-weight: 800;
}

.control-toolbar select,
.control-toolbar button {
  min-height: 42px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #ffffff;
  padding: 0.5rem 0.75rem;
  font: inherit;
  font-weight: 700;
}

.control-toolbar button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.actuator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 16px;
}

.remote-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 18px;
}

.policy-card {
  padding: 22px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

.policy-card h2 {
  margin: 0;
}

.policy-card p {
  margin: 4px 0 18px;
  color: var(--muted);
  font-weight: 600;
}

.policy-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}

.policy-row div {
  display: grid;
  gap: 4px;
}

.policy-row span {
  color: var(--muted);
  font-size: 0.84rem;
}

.policy-status {
  height: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  color: #b91c1c;
  background: #fee2e2;
  font-weight: 800;
}

.policy-status.active {
  color: #047857;
  background: #d1fae5;
}

.state-card {
  padding: 18px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  text-align: center;
  font-weight: 700;
}

.state-card.error {
  color: var(--danger);
}

@media (max-width: 1100px) {
  .summary-grid,
  .remote-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .remote-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .control-toolbar {
    flex-direction: column;
  }
}
</style>