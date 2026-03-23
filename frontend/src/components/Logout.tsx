import { useUser } from "../contexts/UserContext"

const Logout = () => {
    const { userDispatch } = useUser()

    const handleLogout = () => {
       window.localStorage.clear()
       userDispatch({type: 'LOGOUT'})
    }
    return (
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Logout