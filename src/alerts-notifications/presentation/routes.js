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
    meta: {
      titleKey: 'contextLabels.alerts',
      contextKey: 'alerts'
    }
  },
  {
    path: 'alerts-notifications/active-alerts',
    name: 'alerts-notifications-active-alerts',
    component: AlertsPage,
    meta: {
      titleKey: 'menu.alerts.ActiveAlerts',
      contextKey: 'alerts',
      viewKey: 'alerts.ActiveAlerts'
    }
  },
  {
    path: 'alerts-notifications/alert-detail/:id',
    name: 'alerts-notifications-alert-detail',
    component: AlertDetailPage,
    props: true,
    meta: {
      titleKey: 'menu.alerts.AlertDetail',
      contextKey: 'alerts',
      viewKey: 'alerts.AlertDetail'
    }
  },
  {
    path: 'alerts-notifications/alert-history',
    name: 'alerts-notifications-alert-history',
    component: ComingSoonView,
    meta: { title: 'Alert History', contextKey: 'alerts', viewKey: 'alerts.AlertHistory' }
  },
  {
    path: 'alerts-notifications/critical-alerts',
    name: 'alerts-notifications-critical-alerts',
    component: AlertsPage,
    meta: {
      titleKey: 'menu.alerts.CriticalAlerts',
      contextKey: 'alerts',
      viewKey: 'alerts.CriticalAlerts'
    }
  },
  {
    path: 'alerts-notifications/notification-settings',
    name: 'alerts-notifications-notification-settings',
    component: DeliveryRulesPage,
    meta: {
      titleKey: 'menu.alerts.NotificationSettings',
      contextKey: 'alerts',
      viewKey: 'alerts.NotificationSettings'
    }
  },
  {
    path: 'alerts-notifications/notification-history',
    name: 'alerts-notifications-notification-history',
    component: NotificationsPage,
    meta: {
      titleKey: 'menu.alerts.NotificationHistory',
      contextKey: 'alerts',
      viewKey: 'alerts.NotificationHistory'
    }
  },
  {
    path: 'alerts-notifications/recipient-management',
    name: 'alerts-notifications-recipient-management',
    component: ComingSoonView,
    meta: {
      titleKey: 'menu.alerts.RecipientManagement',
      contextKey: 'alerts',
      viewKey: 'alerts.RecipientManagement'
    }
  },
  {
    path: 'alerts-notifications/escalation-policy',
    name: 'alerts-notifications-escalation-policy',
    component: ComingSoonView,
    meta: {
      titleKey: 'menu.alerts.EscalationPolicy',
      contextKey: 'alerts',
      viewKey: 'alerts.EscalationPolicy'
    }
  }
]
