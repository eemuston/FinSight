import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import pdfRouter from './routes/pdf'
const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/', pdfRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
