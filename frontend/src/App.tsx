import { useUser } from "./contexts/UserContext"
import Login from "./components/Login"
import Logout from "./components/Logout"

const App = () => {
  const { user } = useUser()

  return (
    <div>
      <h1>It's time to do some scetchy shit DOO DAA</h1>
      {user === null && <Login />}
      {user !== null && 
      <div>
        <Logout />
        Dashboard in here soon. Taco nights inc
      </div>}
    </div>
  )
}

export default App
