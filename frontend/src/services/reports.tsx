import axios from 'axios'

const getReports = async (token: string) => {
    const response = await axios.get('http://localhost:3000/api/reports', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export default { getReports }