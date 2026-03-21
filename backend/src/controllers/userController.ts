import { Request, Response } from 'express'
import userService from '../services/userService'

const createUser = async (req: Request, res: Response) => {
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).send({ error: 'Username and password are required' })
        return
    }
    try {
        const result = await userService.processUser(req.body)
        res.send(result)
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'User creation failed'})
    }
}

export default { createUser }