import axios from 'axios'

const getReports = async (token: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reports`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export default { getReports }