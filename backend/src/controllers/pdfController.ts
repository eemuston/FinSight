import { Request, Response, NextFunction } from 'express'
import pdfService from '../services/pdfService'

const uploadPdf = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        res.status(400).send({ error: 'No file uploaded' })
        return
    }
    try {
        const result = await pdfService.processPdf(req.file)
        res.send(result)
    } catch(error) {
        next(error)
    }
}

export default { uploadPdf }