import axios from 'axios'

export const api = axios.create({
  baseURL: 'test',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (response) => response,
  (error) => {
    console.error('API request error:', error)
    return Promise.reject(error)
  },
)

export default {
  api,
}
