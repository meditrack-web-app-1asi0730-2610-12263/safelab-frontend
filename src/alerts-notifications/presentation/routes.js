import AlertsPage from './views/alerts-page.component.vue'
import AlertDetailPage from './views/alert-detail-page.component.vue'
import NotificationsPage from './views/notifications-page.component.vue'
import DeliveryRulesPage from './views/delivery-rules-page.component.vue'
import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'alerts-notifications',
    name: 'alerts-notifications',
    component: AlertsPage,
    meta: { title: 'Alerts & Notifications', contextKey: 'alerts' }
  },
  {
    path: 'alerts-notifications/active-alerts',
    name: 'alerts-notifications-active-alerts',
    component: AlertsPage,
    meta: { title: 'Active Alerts', contextKey: 'alerts', viewKey: 'alerts.ActiveAlerts' }
  },
  {
    path: 'alerts-notifications/alert-detail/:id',
    name: 'alerts-notifications-alert-detail',
    component: AlertDetailPage,
    props: true,
    meta: { title: 'Alert Detail', contextKey: 'alerts', viewKey: 'alerts.AlertDetail' }
  },
  {
    path: 'alerts-notifications/alert-history',
    name: 'alerts-notifications-alert-history',
    component: AlertsPage,
    meta: { title: 'Alert History', contextKey: 'alerts', viewKey: 'alerts.AlertHistory' }
  },
  {
    path: 'alerts-notifications/critical-alerts',
    name: 'alerts-notifications-critical-alerts',
    component: AlertsPage,
    meta: { title: 'Critical Alerts', contextKey: 'alerts', viewKey: 'alerts.CriticalAlerts' }
  },
  {
    path: 'alerts-notifications/notification-settings',
    name: 'alerts-notifications-notification-settings',
    component: DeliveryRulesPage,
    meta: { title: 'Notification Settings', contextKey: 'alerts', viewKey: 'alerts.NotificationSettings' }
  },
  {
    path: 'alerts-notifications/notification-history',
    name: 'alerts-notifications-notification-history',
    component: NotificationsPage,
    meta: { title: 'Notification History', contextKey: 'alerts', viewKey: 'alerts.NotificationHistory' }
  },
  {
    path: 'alerts-notifications/recipient-management',
    name: 'alerts-notifications-recipient-management',
    component: ComingSoonView,
    meta: { title: 'Recipient Management', contextKey: 'alerts', viewKey: 'alerts.RecipientManagement' }
  },
  {
    path: 'alerts-notifications/escalation-policy',
    name: 'alerts-notifications-escalation-policy',
    component: ComingSoonView,
    meta: { title: 'Escalation Policy', contextKey: 'alerts', viewKey: 'alerts.EscalationPolicy' }
  }
]