import { apiClient } from '@/shared/infrastructure/http/api-client'

export class DashboardOverviewApiService {
  async getOverview() {
    const { data } = await apiClient.get('/dashboardOverview')
    return data
  }
}

export const dashboardOverviewApiService = new DashboardOverviewApiService()
