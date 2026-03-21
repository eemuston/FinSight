import express  from "express";
import multer from 'multer';
import pdfController from '../controllers/pdfController'

const pdfRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

pdfRouter.post('/', upload.single('pdf'), pdfController.uploadPdf)

export default pdfRouter;