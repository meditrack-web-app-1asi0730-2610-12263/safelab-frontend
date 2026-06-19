<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { boundedContextNavigation } from '@/shared/domain/model/navigation-items'
import { useAppStore } from '@/shared/application/stores/app.store'

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore()

const sidebarClasses = computed(() => ({
  'is-hidden': !appStore.sidebarVisible,
  'is-mobile-open': appStore.mobileSidebarVisible
}))

function isActive(item) {
  if (route.meta?.hideSidebarActive) {
    return false
  }

  if (route.meta?.sidebarContext) {
    return route.meta.sidebarContext === item.context
  }

  return route.path === item.path || route.path.startsWith(`/${item.context}`)
}

function closeOnMobile() {
  if (window.innerWidth < 1024) {
    appStore.closeMobileSidebar()
  }
}
</script>

<template>
  <aside class="app-sidebar" :class="sidebarClasses" :aria-label="t('navigation.main')">
    <RouterLink to="/" class="brand" @click="closeOnMobile">
      <span class="brand-mark">
        <img src="/safelab-shield.png" alt="" aria-hidden="true" />
      </span>

      <span class="brand-copy">
        <strong>{{ t('app.name') }}</strong>
        <small>{{ t('app.tagline') }}</small>
      </span>
    </RouterLink>

    <div class="nav-caption">
      {{ t('navigation.allModules') }}
    </div>

    <nav class="sidebar-nav">
      <RouterLink
          v-for="item in boundedContextNavigation"
          :key="item.context"
          class="nav-group-link"
          :class="{ active: isActive(item) }"
          :to="item.path"
          @click="closeOnMobile"
      >
        <i :class="`pi pi-${item.icon}`" aria-hidden="true"></i>
        <span>{{ t(item.titleKey) }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footnote">
      <span>{{ t('navigation.rolePreview') }}</span>
      <strong>{{ t('roles.safeLabAdministrator') }}</strong>
    </div>
  </aside>
</template>