import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
})

export class UserProfileApiService {
  getProfileByAccountId(accountId) {
    return http.get(`/userProfiles?accountId=${accountId}`)
  }

  updateProfile(id, payload) {
    return http.patch(`/userProfiles/${id}`, payload)
  }

  updateUser(accountId, payload) {
    return http.patch(`/users/${accountId}`, payload)
  }
}
