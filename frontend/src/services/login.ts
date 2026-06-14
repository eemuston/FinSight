import axios from 'axios'
import type { NewLogin } from '../types'

const login = async (credentials: NewLogin) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, credentials)
    return response.data
}

export default { login }