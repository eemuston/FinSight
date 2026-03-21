import { Request, Response } from 'express'
import loginService from '../services/loginService'

const loginUser = async (req: Request, res: Response) => {
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).send({ error: 'Username and password are required' })
        return
    }
    try {
        const result = await loginService.processLogin(req.body)
        res.send(result)
    } catch(error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Login failed'})
        //status 400 mean client error. 500 server error. Might want to do a check which error we want to use
    }
}

export default { loginUser }