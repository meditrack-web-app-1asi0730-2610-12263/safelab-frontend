import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'
import AlertListView from './views/AlertListView.vue'

export const routes = [
  {
    path: 'alerts-notifications',
    name: 'alerts-notifications',
    redirect: { name: 'alerts-notifications-list' },
    meta: { title: 'Alerts & Notifications', contextKey: 'alerts' }
  },
  {
    path: 'alerts-notifications/alert-list',
    name: 'alerts-notifications-list',
    component: AlertListView,
    meta: { title: 'Alert List', contextKey: 'alerts', viewKey: 'alerts.List' }
  },
  {
    path: 'alerts-notifications/history',
    name: 'alerts-notifications-history',
    component: ComingSoonView,
    meta: { title: 'Alert History', contextKey: 'alerts', viewKey: 'alerts.History' }
  },
  {
    path: 'alerts-notifications/settings',
    name: 'alerts-notifications-settings',
    component: ComingSoonView,
    meta: { title: 'Alert Settings', contextKey: 'alerts', viewKey: 'alerts.Settings' }
  }
]