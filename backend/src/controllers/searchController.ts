import { Request, Response, NextFunction } from 'express'
import searchService from '../services/searchService'

const searchVector = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.collectionName || !req.body.searchQuestion) {
        res.status(400).send({ error: 'No collection or question provided' })
        return
    }
    try {
        const result = await searchService.processSearch(req.body.collectionName, req.body.searchQuestion)
        res.send(result)
    } catch(error) {
        next(error)
    }
}

export default { searchVector }