import axios from 'axios'

interface NewLogin {
    username: string
    password: string
}

const login = async (credentials: NewLogin) => {
    const response = await axios.post('http://localhost:3000/api/login', credentials)
    return response.data
}

export default { login }