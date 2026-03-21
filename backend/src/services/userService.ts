import { NewUser } from '../types'
import bcrypt from 'bcrypt'
import User from '../models/user'

const processUser = async (user: NewUser) => {
    const { username, password, name } = user

    if (!user.password || user.password.length < 8) {
        throw new Error('password missing or shorter than 8 characters')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userObj = new User ({
        username,
        name,
        passwordHash
    })

    const savedUser = await userObj.save()

    return savedUser
}

export default { processUser }