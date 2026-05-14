import { apiClient } from '@/shared/infrastructure/http/api-client'

export class AuditTraceabilityApiService {
  async getOverview() {
    const response = await apiClient.get('/auditTraceability')
    return response.data
  }
}
