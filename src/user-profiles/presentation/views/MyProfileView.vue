<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserProfileStore } from '../../application/stores/user-profile.store'

const profileStore = useUserProfileStore()
const { t } = useI18n({ useScope: 'global' })

const profile = computed(() => profileStore.profile)

const roleLabel = computed(() => {
  if (!profile.value?.role) return '—'

  return t(`userProfiles.roles.${profile.value.role}`)
})

const statusLabel = computed(() => {
  if (!profile.value?.status) return '—'

  return t(`userProfiles.status.${profile.value.status}`)
})

const formatDate = (value) => {
  if (!value) return '—'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  const pad = (number) => String(number).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

onMounted(() => {
  profileStore.loadProfile()
})
</script>

<template>
  <main class="profile-page">
    <header class="page-hero profile-hero">
      <div>
        <p class="eyebrow">
          {{ t('userProfiles.module.eyebrow') }}
        </p>

        <h1>
          {{ t('userProfiles.module.title') }}
        </h1>

        <p>
          {{ t('userProfiles.module.description') }}
        </p>
      </div>
    </header>

    <section v-if="profileStore.loading" class="state-card">
      {{ t('userProfiles.states.loading') }}
    </section>

    <section v-else-if="profileStore.error" class="state-card error">
      {{ t('userProfiles.states.error') }}
    </section>

    <template v-else-if="profile">
      <section class="profile-summary-card">
        <div class="avatar-xl">
          {{ profileStore.initials }}
        </div>

        <div class="summary-copy">
          <span>{{ t('userProfiles.summary.currentUser') }}</span>
          <h2>{{ profileStore.fullName }}</h2>
          <p>{{ profile.position }}</p>
        </div>

        <div class="summary-badges">
          <span class="status-pill active">
            {{ statusLabel }}
          </span>

          <span class="role-pill">
            {{ roleLabel }}
          </span>
        </div>
      </section>

      <section class="profile-grid">
        <article class="content-card">
          <header class="section-header">
            <div>
              <p class="eyebrow">
                {{ t('userProfiles.sections.personalDataEyebrow') }}
              </p>

              <h2>
                {{ t('userProfiles.sections.personalData') }}
              </h2>
            </div>
          </header>

          <form class="profile-form" @submit.prevent="profileStore.saveProfile">
            <label>
              {{ t('userProfiles.fields.firstName') }}
              <input v-model="profileStore.form.firstName" type="text" />
            </label>

            <label>
              {{ t('userProfiles.fields.lastName') }}
              <input v-model="profileStore.form.lastName" type="text" />
            </label>

            <label>
              {{ t('userProfiles.fields.email') }}
              <input v-model="profileStore.form.email" type="email" />
            </label>

            <label>
              {{ t('userProfiles.fields.phone') }}
              <input v-model="profileStore.form.phone" type="text" />
            </label>

            <label>
              {{ t('userProfiles.fields.laboratory') }}
              <input v-model="profileStore.form.laboratory" type="text" />
            </label>

            <button type="submit" :disabled="profileStore.saving">
              {{
                profileStore.saving
                    ? t('userProfiles.actions.saving')
                    : t('userProfiles.actions.saveChanges')
              }}
            </button>
          </form>
        </article>

        <aside class="side-stack">
          <article class="content-card">
            <header class="section-header">
              <div>
                <p class="eyebrow">
                  {{ t('userProfiles.sections.accessEyebrow') }}
                </p>

                <h2>
                  {{ t('userProfiles.sections.accessInformation') }}
                </h2>
              </div>
            </header>

            <div class="info-list">
              <div>
                <span>{{ t('userProfiles.fields.userId') }}</span>
                <strong>{{ profile.userId }}</strong>
              </div>

              <div>
                <span>{{ t('userProfiles.fields.role') }}</span>
                <strong>{{ roleLabel }}</strong>
              </div>

              <div>
                <span>{{ t('userProfiles.fields.position') }}</span>
                <strong>{{ profile.position }}</strong>
              </div>

              <div>
                <span>{{ t('userProfiles.fields.organization') }}</span>
                <strong>{{ profile.organization }}</strong>
              </div>

              <div>
                <span>{{ t('userProfiles.fields.lastAccess') }}</span>
                <strong>{{ formatDate(profile.lastAccess) }}</strong>
              </div>
            </div>
          </article>

          <article class="content-card">
            <header class="section-header">
              <div>
                <p class="eyebrow">
                  {{ t('userProfiles.sections.preferencesEyebrow') }}
                </p>

                <h2>
                  {{ t('userProfiles.sections.preferences') }}
                </h2>
              </div>
            </header>

            <div class="profile-form compact">
              <label>
                {{ t('userProfiles.fields.language') }}
                <select v-model="profileStore.form.language">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </label>

              <label>
                {{ t('userProfiles.fields.timezone') }}
                <select v-model="profileStore.form.timezone">
                  <option value="America/Lima">America/Lima</option>
                  <option value="America/Bogota">America/Bogota</option>
                  <option value="America/Mexico_City">America/Mexico City</option>
                </select>
              </label>

              <label>
                {{ t('userProfiles.fields.notificationPreference') }}
                <select v-model="profileStore.form.notificationPreference">
                  <option value="critical-only">
                    {{ t('userProfiles.notificationPreference.criticalOnly') }}
                  </option>

                  <option value="critical-and-daily">
                    {{ t('userProfiles.notificationPreference.criticalAndDaily') }}
                  </option>

                  <option value="all-operational">
                    {{ t('userProfiles.notificationPreference.allOperational') }}
                  </option>
                </select>
              </label>

              <button type="button" @click="profileStore.saveProfile">
                {{ t('userProfiles.actions.savePreferences') }}
              </button>
            </div>
          </article>

          <article class="content-card">
            <header class="section-header">
              <div>
                <p class="eyebrow">
                  {{ t('userProfiles.sections.securityEyebrow') }}
                </p>

                <h2>
                  {{ t('userProfiles.sections.security') }}
                </h2>
              </div>
            </header>

            <div class="security-box">
              <span>{{ t('userProfiles.fields.lastPasswordChange') }}</span>
              <strong>{{ formatDate(profile.lastPasswordChange) }}</strong>

              <p>
                {{ t('userProfiles.security.description') }}
              </p>

              <button type="button" @click="profileStore.simulatePasswordChange">
                {{ t('userProfiles.actions.updateSecurity') }}
              </button>
            </div>
          </article>
        </aside>
      </section>

      <p v-if="profileStore.successMessage" class="success-message">
        {{ t('userProfiles.states.saved') }}
      </p>
    </template>
  </main>
</template>

<style scoped>
.profile-page {
  display: grid;
  gap: 22px;
}

.profile-hero {
  background:
      radial-gradient(circle at right, rgba(35, 213, 171, 0.18), transparent 32%),
      #ffffff;
}

.profile-summary-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

.avatar-xl {
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border-radius: 24px;
  color: #ffffff;
  background: linear-gradient(135deg, #4f46e5, #2563eb);
  font-size: 2rem;
  font-weight: 900;
}

.summary-copy {
  flex: 1;
}

.summary-copy span {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.summary-copy h2 {
  margin: 0.25rem 0;
  color: var(--text);
  font-size: 2rem;
}

.summary-copy p {
  margin: 0;
  color: var(--muted);
  font-weight: 700;
}

.summary-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-pill,
.role-pill {
  display: inline-flex;
  width: fit-content;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
}

.status-pill.active {
  color: #047857;
  background: #d1fae5;
}

.role-pill {
  color: #4f46e5;
  background: #eef2ff;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 18px;
}

.side-stack {
  display: grid;
  gap: 18px;
}

.content-card {
  padding: 22px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: 0 16px 38px rgba(31, 41, 79, 0.07);
}

.section-header {
  margin-bottom: 18px;
}

.section-header h2 {
  margin: 0;
  color: var(--text);
}

.profile-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.profile-form.compact {
  grid-template-columns: 1fr;
}

.profile-form label {
  display: grid;
  gap: 0.45rem;
  color: var(--text);
  font-weight: 800;
}

.profile-form input,
.profile-form select {
  min-height: 42px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #ffffff;
  color: var(--text);
  font: inherit;
  padding: 0.6rem 0.75rem;
}

.profile-form button,
.security-box button {
  border: 0;
  border-radius: 12px;
  background: #4f46e5;
  color: #ffffff;
  cursor: pointer;
  font-weight: 800;
  min-height: 44px;
  padding: 0.75rem 1rem;
}

.profile-form button:hover,
.security-box button:hover {
  background: #4338ca;
}

.profile-form button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.info-list {
  display: grid;
  gap: 12px;
}

.info-list div,
.security-box {
  display: grid;
  gap: 5px;
  padding: 14px;
  border-radius: 16px;
  background: #f8fafc;
}

.info-list span,
.security-box span {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.info-list strong,
.security-box strong {
  color: var(--text);
}

.security-box p {
  color: var(--muted);
  font-weight: 600;
  line-height: 1.5;
}

.state-card,
.success-message {
  padding: 1rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  text-align: center;
  font-weight: 800;
}

.state-card.error {
  background: #fee2e2;
  color: #991b1b;
}

.success-message {
  color: #047857;
  background: #d1fae5;
}

@media (max-width: 1100px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .profile-summary-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .profile-form {
    grid-template-columns: 1fr;
  }
}
</style>