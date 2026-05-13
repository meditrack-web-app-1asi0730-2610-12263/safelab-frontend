import axios from 'axios'
import { Alert } from '../../domain/models/Alert'

const API_URL = 'http://localhost:3000/alerts'

export const AlertService = {
    async getAll() {
        try {
            const response = await axios.get(API_URL)
            return response.data.map(item => new Alert(item))
        } catch (error) {
            console.error('Error fetching alerts:', error)
            throw error
        }
    },
    async create(alertData) {
        const response = await axios.post(API_URL, alertData)
        return new Alert(response.data)
    },
    async update(id, alertData) {
        const response = await axios.put(`${API_URL}/${id}`, alertData)
        return new Alert(response.data)
    },
    async delete(id) {
        await axios.delete(`${API_URL}/${id}`)
        return id
    }
}