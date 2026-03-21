import { Request, Response, NextFunction } from 'express'
import loginService from '../services/loginService'

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).send({ error: 'Username and password are required' })
        return
    }
    try {
        const result = await loginService.processLogin(req.body)
        res.send(result)
    } catch(error) {
        next(error)
    }
}

export default { loginUser }