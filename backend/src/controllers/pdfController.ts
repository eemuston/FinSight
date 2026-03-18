import { Request, Response } from 'express'
import pdfService from "../services/pdfService";

const uploadPdf = async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).send({ error: 'No file uploaded' })
        return
    }
    const result = await pdfService.processPdf(req.file)
    res.send(result)
}

export default { uploadPdf }