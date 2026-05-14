/*
import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'

export const routes = [
  {
    path: 'subscription-billing',
    name: 'subscription-billing',
    component: ComingSoonView,
    meta: { title: 'Plans & Billing', contextKey: 'billing' }
  },
  {
    path: 'subscription-billing/plans',
    name: 'subscription-billing-plans',
    component: ComingSoonView,
    meta: { title: 'Plans', contextKey: 'billing', viewKey: 'billing.Plans' }
  },
  {
    path: 'subscription-billing/subscription-status',
    name: 'subscription-billing-subscription-status',
    component: ComingSoonView,
    meta: { title: 'Subscription Status', contextKey: 'billing', viewKey: 'billing.SubscriptionStatus' }
  },
  {
    path: 'subscription-billing/billing-dashboard',
    name: 'subscription-billing-billing-dashboard',
    component: ComingSoonView,
    meta: { title: 'Billing Dashboard', contextKey: 'billing', viewKey: 'billing.BillingDashboard' }
  },
  {
    path: 'subscription-billing/invoice-history',
    name: 'subscription-billing-invoice-history',
    component: ComingSoonView,
    meta: { title: 'Invoice History', contextKey: 'billing', viewKey: 'billing.InvoiceHistory' }
  },
  {
    path: 'subscription-billing/payment-history',
    name: 'subscription-billing-payment-history',
    component: ComingSoonView,
    meta: { title: 'Payment History', contextKey: 'billing', viewKey: 'billing.PaymentHistory' }
  },
  {
    path: 'subscription-billing/plan-management',
    name: 'subscription-billing-plan-management',
    component: ComingSoonView,
    meta: { title: 'Plan Management', contextKey: 'billing', viewKey: 'billing.PlanManagement' }
  },
  {
    path: 'subscription-billing/customer-subscriptions',
    name: 'subscription-billing-customer-subscriptions',
    component: ComingSoonView,
    meta: { title: 'Customer Subscriptions', contextKey: 'billing', viewKey: 'billing.CustomerSubscriptions' }
  },
]
*/
import ComingSoonView from '@/shared/presentation/views/ComingSoonView.vue'
import PlansPage from './views/plans-page.component.vue'
import SubscriptionStatusPage from './views/subscription-status-page.component.vue'
import BillingDashboardPage from './views/billing-dashboard-page.component.vue'
import InvoiceHistoryPage from './views/invoice-history-page.component.vue'
import PaymentHistoryPage from './views/payment-history-page.component.vue'
import CustomerSubscriptionsPage from './views/customer-subscriptions-page.component.vue'

export const routes = [
  {
    path: 'subscription-billing',
    name: 'subscription-billing',
    component: PlansPage,
    meta: {
      titleKey: 'contextLabels.billing',
      contextKey: 'subscription-billing'
    }
  },
  {
    path: 'subscription-billing/plans',
    name: 'subscription-billing-plans',
    component: PlansPage,
    meta: {
      titleKey: 'menu.billing.Plans',
      contextKey: 'subscription-billing',
      viewKey: 'subscription-billing.Plans'
    }
  },
  {
    path: 'subscription-billing/subscription-status',
    name: 'subscription-billing-subscription-status',
    component: SubscriptionStatusPage,
    meta: {
      titleKey: 'menu.billing.SubscriptionStatus',
      contextKey: 'subscription-billing',
      viewKey: 'subscription-billing.SubscriptionStatus'
    }
  },
  {
    path: 'subscription-billing/billing-dashboard',
    name: 'subscription-billing-billing-dashboard',
    component: BillingDashboardPage,
    meta: {
      titleKey: 'menu.billing.BillingDashboard',
      contextKey: 'subscription-billing',
      viewKey: 'subscription-billing.BillingDashboard'
    }
  },
  {
    path: 'subscription-billing/invoice-history',
    name: 'subscription-billing-invoice-history',
    component: InvoiceHistoryPage,
    meta: {
      titleKey: 'menu.billing.InvoiceHistory',
      contextKey: 'subscription-billing',
      viewKey: 'subscription-billing.InvoiceHistory'
    }
  },
  {
    path: 'subscription-billing/payment-history',
    name: 'subscription-billing-payment-history',
    component: PaymentHistoryPage,
    meta: {
      titleKey: 'menu.billing.PaymentHistory',
      contextKey: 'subscription-billing',
      viewKey: 'subscription-billing.PaymentHistory'
    }
  },
  {
    path: 'subscription-billing/plan-management',
    name: 'subscription-billing-plan-management',
    component: ComingSoonView,
    meta: {
      titleKey: 'menu.billing.PlanManagement',
      contextKey: 'subscription-billing',
      viewKey: 'subscription-billing.PlanManagement'
    }
  },

  {
    path: 'subscription-billing/upgrade-plan',
    name: 'subscription-billing-upgrade-plan',
    component: ComingSoonView,
    meta: {
      titleKey: 'menu.billing.UpgradePlan',
      contextKey: 'subscription-billing',
      viewKey: 'subscription-billing.UpgradePlan'
    }
  },

  {
    path: 'subscription-billing/customer-subscriptions',
    name: 'subscription-billing-customer-subscriptions',
    component: CustomerSubscriptionsPage,
    meta: {
      titleKey: 'menu.billing.CustomerSubscriptions',
      contextKey: 'subscription-billing',
      viewKey: 'subscription-billing.CustomerSubscriptions'
    }
  }
]