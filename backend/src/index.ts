import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import pdfRouter from './routes/pdf'
import searchRouter from './routes/search'
import mongoose from 'mongoose';
const app = express();
app.use(express.json());

const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error))

app.use('/', pdfRouter)
app.use('/', searchRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
