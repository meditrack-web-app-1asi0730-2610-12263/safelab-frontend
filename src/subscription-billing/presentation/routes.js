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
