import { Request, Response, NextFunction } from 'express'
import chatService from '../services/chatService'

const chatHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || !req.body.message || !req.body.collectionName) {
        res.status(400).send({ error: 'message or collection missing' })
        return
    }
    if (!req.user) {
        res.status(401).send({ error: 'Authentication required.'})
        return
    }
    try {
        const result = await chatService.processChat(req.body, req.user._id)
        res.send(result)
    } catch(error) {
        next(error)
    }
}

export default { chatHandler }