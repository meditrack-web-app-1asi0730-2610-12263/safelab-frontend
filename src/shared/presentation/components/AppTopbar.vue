<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/shared/application/services/i18n.service'
import { useAppStore } from '@/shared/application/stores/app.store'

const router = useRouter()
const appStore = useAppStore()
const { t, locale } = useI18n()

function toggleSidebar() {
  if (window.innerWidth < 1024) {
    appStore.openMobileSidebar()
    return
  }
  appStore.toggleSidebar()
}

function changeLanguage(language) {
  setLocale(language)
}

function openProfile() {
  router.push('/user-profiles/my-profile')
}

function openNotifications() {
  router.push('/alerts-notifications/active-alerts')
}
</script>

<template>
  <header class="app-topbar">
    <button class="icon-button menu-toggle" type="button" :aria-label="t('actions.toggleSidebar')" @click="toggleSidebar">
      <i class="pi pi-bars" aria-hidden="true"></i>
    </button>

    <div class="topbar-search" role="search">
      <i class="pi pi-search" aria-hidden="true"></i>
      <input :placeholder="t('app.searchPlaceholder')" :aria-label="t('app.search')" />
    </div>

    <div class="topbar-actions">
      <div class="language-pill" role="group" :aria-label="t('actions.language')">
        <button type="button" :class="{ active: locale === 'en' }" @click="changeLanguage('en')">EN</button>
        <button type="button" :class="{ active: locale === 'es' }" @click="changeLanguage('es')">ES</button>
      </div>

      <button class="notification-button" type="button" :aria-label="t('actions.notifications')" @click="openNotifications">
        <i class="pi pi-bell" aria-hidden="true"></i>
        <span class="notification-dot" aria-hidden="true"></span>
      </button>

      <button class="profile-button" type="button" :aria-label="t('actions.profile')" @click="openProfile">
        <span class="avatar">{{ appStore.currentUser.initials }}</span>
        <span class="profile-copy">
          <strong>{{ appStore.currentUser.fullName }}</strong>
          <small>{{ t('roles.safeLabAdministrator') }}</small>
        </span>
        <i class="pi pi-angle-right" aria-hidden="true"></i>
      </button>
    </div>
  </header>
</template>
