import { apiClient } from '@/shared/infrastructure/http/api-client'

const safeGet = async (path, fallback = []) => {
  try {
    const { data } = await apiClient.get(path)
    return data ?? fallback
  } catch {
    return fallback
  }
}

export class DashboardOverviewApiService {
  async getOverview() {
    const [
      dashboardOverview,
      sensors,
      assets,
      alerts,
      incidents,
      reports,
      historicalData,
      users
    ] = await Promise.all([
      safeGet('/dashboardOverview', {}),
      safeGet('/sensors', []),
      safeGet('/assets', []),
      safeGet('/alerts', []),
      safeGet('/incidents', []),
      safeGet('/reports', []),
      safeGet('/historicalData', []),
      safeGet('/users', [])
    ])

    return {
      dashboardOverview,
      sensors,
      assets,
      alerts,
      incidents,
      reports,
      historicalData,
      users
    }
  }
}

export const dashboardOverviewApiService = new DashboardOverviewApiService()
