import { Request, Response } from 'express'
import pdfService from "../services/pdfService";

const uploadPdf = async (req: Request, res: Response) => {
    const file = req.file
    const result = await pdfService.processPdf(file)
    res.send(result)
}

export default { uploadPdf }