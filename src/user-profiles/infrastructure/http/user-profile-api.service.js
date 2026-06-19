import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
})

export class UserProfileApiService {
    getCurrentProfile() {
        return http.get('/userProfiles/1')
    }

    updateProfile(payload) {
        return http.patch('/userProfiles/1', payload)
    }
}