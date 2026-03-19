import express  from "express";
import multer from 'multer';
import pdfController from '../controllers/pdfController'

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/pdf', upload.single('pdf'), pdfController.uploadPdf)

export default router;