import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
})

export class IdentityAccessApiService {
    getUsers() {
        return http.get('/users')
    }

    createUser(payload) {
        return http.post('/users', payload)
    }

    createUserProfile(payload) {
        return http.post('/userProfiles', payload)
    }

    createUserSubscription(payload) {
        return http.post('/userSubscriptions', payload)
    }

    getBillingPlans() {
        return http.get('/billingPlans')
    }
}