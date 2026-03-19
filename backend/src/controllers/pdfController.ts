import { Request, Response } from 'express'
import pdfService from "../services/pdfService";

const uploadPdf = async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).send({ error: 'No file uploaded' })
        return
    }
    try {
        const result = await pdfService.processPdf(req.file)
        res.send(result)
    } catch(error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Processing failed'})
    }
}

export default { uploadPdf }