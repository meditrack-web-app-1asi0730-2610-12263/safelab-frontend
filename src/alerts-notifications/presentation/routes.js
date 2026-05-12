import AlertsNotificationsHomeView from './views/alerts-notifications-home-view.component.vue'
import ActiveAlertsView from './views/active-alerts-view.component.vue'
import AlertDetailView from './views/alert-detail-view.component.vue'
import AlertHistoryView from './views/alert-history-view.component.vue'
import CriticalAlertsView from './views/critical-alerts-view.component.vue'
import NotificationSettingsView from './views/notification-settings-view.component.vue'
import NotificationHistoryView from './views/notification-history-view.component.vue'
import RecipientManagementView from './views/recipient-management-view.component.vue'
import EscalationPolicyView from './views/escalation-policy-view.component.vue'

export const routes = [
  {
    path: 'alerts-notifications',
    name: 'alerts-notifications',
    component: AlertsNotificationsHomeView,
    meta: { title: 'Alerts & Notifications', contextKey: 'alerts' }
  },
  {
    path: 'alerts-notifications/active-alerts',
    name: 'alerts-notifications-active-alerts',
    component: ActiveAlertsView,
    meta: { title: 'Active Alerts', contextKey: 'alerts', viewKey: 'alerts.ActiveAlerts' }
  },
  {
    path: 'alerts-notifications/alert-detail/:id',
    name: 'alerts-notifications-alert-detail',
    component: AlertDetailView,
    props: true,
    meta: { title: 'Alert Detail', contextKey: 'alerts', viewKey: 'alerts.AlertDetail' }
  },
  {
    path: 'alerts-notifications/alert-history',
    name: 'alerts-notifications-alert-history',
    component: AlertHistoryView,
    meta: { title: 'Alert History', contextKey: 'alerts', viewKey: 'alerts.AlertHistory' }
  },
  {
    path: 'alerts-notifications/critical-alerts',
    name: 'alerts-notifications-critical-alerts',
    component: CriticalAlertsView,
    meta: { title: 'Critical Alerts', contextKey: 'alerts', viewKey: 'alerts.CriticalAlerts' }
  },
  {
    path: 'alerts-notifications/notification-settings',
    name: 'alerts-notifications-notification-settings',
    component: NotificationSettingsView,
    meta: { title: 'Notification Settings', contextKey: 'alerts', viewKey: 'alerts.NotificationSettings' }
  },
  {
    path: 'alerts-notifications/notification-history',
    name: 'alerts-notifications-notification-history',
    component: NotificationHistoryView,
    meta: { title: 'Notification History', contextKey: 'alerts', viewKey: 'alerts.NotificationHistory' }
  },
  {
    path: 'alerts-notifications/recipient-management',
    name: 'alerts-notifications-recipient-management',
    component: RecipientManagementView,
    meta: { title: 'Recipient Management', contextKey: 'alerts', viewKey: 'alerts.RecipientManagement' }
  },
  {
    path: 'alerts-notifications/escalation-policy',
    name: 'alerts-notifications-escalation-policy',
    component: EscalationPolicyView,
    meta: { title: 'Escalation Policy', contextKey: 'alerts', viewKey: 'alerts.EscalationPolicy' }
  }
]