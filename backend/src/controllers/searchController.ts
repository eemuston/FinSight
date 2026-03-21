import { Request, Response, NextFunction } from 'express'
import searchService from '../services/searchService'

const searchVector = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.collectionName || !req.body.searchQuestion) {
        res.status(400).send({ error: 'No collection or question provided' })
        return
    }
    if (!req.user) {
        res.status(401).send({ error: 'Authentication required.'})
        return
    }
    try {
        const result = await searchService.processSearch(req.body.collectionName, req.body.searchQuestion, req.user._id)
        res.send(result)
    } catch(error) {
        next(error)
    }
}

export default { searchVector }