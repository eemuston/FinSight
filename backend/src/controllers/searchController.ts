import { Request, Response } from 'express'
import searchService from '../services/searchService'

const searchVector = async (req: Request, res: Response) => {
    if (!req.body.collectionName || !req.body.searchQuestion) {
        res.status(400).send({ error: 'No collection or question provided' })
        return
    }
    try {
        const result = await searchService.processSearch(req.body.collectionName, req.body.searchQuestion)
        res.send(result)
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Search processing failed'})
    }
}

export default { searchVector }