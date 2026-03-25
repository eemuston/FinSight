import { useUser } from "./contexts/UserContext"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Dashboard from "./components/Dashboard"
import { useEffect } from "react"
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const { user, userDispatch } = useUser()  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedFinancialGuruuser')
    if(loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: loggedUser})
    }
  }, []) 

  return (
    <div>
      <h1>It's time to do some scetchy shit DOO DAA</h1>
      {user === null && <Login />}
      {user !== null && 
      <div>
        <Routes>
          <Route path="/" element={
            <div>
              HOMEPAAAGE
            </div>
          }/>
          <Route path="/dashboard" element={
            <div>
              <Logout />
              <Dashboard />
              Dashboard in here soon. Taco nights inc
            </div>
            }/>
        </Routes>
      </div>}
    </div>
  )
}

export default App
