import { createContext, useReducer, useContext } from 'react'
import type { User, UserAction, UserContextType } from '../types'

const UserContext = createContext<UserContextType | null>(null)

const userReducer = (state: User | null, action: UserAction) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const useUser = () => {
    return useContext(UserContext) as UserContextType
}

export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={{user, userDispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext