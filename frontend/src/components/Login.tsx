import { useState } from "react"
import loginService from "../services/login"
import { useUser } from "../contexts/UserContext"

const Login = () => {
    const { userDispatch } = useUser()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        try{
            const user = await loginService.login({
                username,
                password
            })
            window.localStorage.setItem('loggedFinancialGuruuser', JSON.stringify(user))
            userDispatch({ type: 'LOGIN', payload: user})
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log('NO MIKEY NO NOO MIKEY THAT WAS SO NOT RIGHT!')
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <div>
                username:
                <input
                type="text"
                value={username}
                name="Username"
                data-testid="username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password:
                <input
                type="password"
                value={password}
                name="Password"
                data-testid="password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default Login