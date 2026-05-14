import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarVisible: true,
    mobileSidebarVisible: false,
    currentUser: {
      fullName: 'Dr. Maria Lopez',
      role: 'SafeLab Administrator',
      initials: 'ML'
    }
  }),
  actions: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    },
    openMobileSidebar() {
      this.mobileSidebarVisible = true
    },
    closeMobileSidebar() {
      this.mobileSidebarVisible = false
    }
  }
})
