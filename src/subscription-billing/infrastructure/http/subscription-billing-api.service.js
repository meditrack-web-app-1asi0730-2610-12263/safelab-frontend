import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || ''
})

export class SubscriptionBillingApiService {
  getPlans() {
    return http.get('/api/subscription-billing/plans')
  }

  getSubscriptions() {
    return http.get('/api/subscription-billing/subscriptions')
  }

  getInvoices() {
    return http.get('/api/subscription-billing/invoices')
  }

  getPayments() {
    return http.get('/api/subscription-billing/payments')
  }
}
