import { useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"

const Logout = () => {
    const { userDispatch } = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
       window.localStorage.clear()
       userDispatch({type: 'LOGOUT'})
       navigate('/')
    }
    return (
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Logout