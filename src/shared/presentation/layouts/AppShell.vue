<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/shared/application/stores/app.store'
import AppSidebar from '@/shared/presentation/components/AppSidebar.vue'
import AppTopbar from '@/shared/presentation/components/AppTopbar.vue'

const appStore = useAppStore()
const shellClasses = computed(() => ({
  'is-sidebar-collapsed': !appStore.sidebarVisible
}))

function syncSidebarWithViewport() {
  if (window.innerWidth < 1024) {
    appStore.sidebarVisible = false
    return
  }
  appStore.sidebarVisible = true
}

onMounted(() => {
  syncSidebarWithViewport()
  window.addEventListener('resize', syncSidebarWithViewport)
})

onUnmounted(() => window.removeEventListener('resize', syncSidebarWithViewport))
</script>

<template>
  <div class="app-shell" :class="shellClasses">
    <AppSidebar />
    <div v-if="appStore.mobileSidebarVisible" class="sidebar-backdrop" @click="appStore.closeMobileSidebar" />
    <div class="app-workspace">
      <AppTopbar />
      <main class="app-content" aria-live="polite">
        <RouterView />
      </main>
    </div>
  </div>
</template>
