import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user'
import { NewLogin } from '../types'

const processLogin = async (user: NewLogin) => {
    const { username, password } = user

    const userObj = await User.findOne({ username })
    let passwordCorrect = false

    if (userObj !== null && userObj.passwordHash) {
        passwordCorrect = await bcrypt.compare(password, userObj.passwordHash)
    }

    if (!userObj || !passwordCorrect) {
        throw new Error('invalid username or password')
    }

    const userForToken = {
        username: userObj.username,
        id: userObj._id
    }

    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) throw new Error('JWT_SECRET not defined')

    const token = jwt.sign(
        userForToken,
        JWT_SECRET,
        { expiresIn: 60*60 }
    )

    return ({ token, username: userObj.username, name: userObj.name, id: userObj._id})
}

export default { processLogin }