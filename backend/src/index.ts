import dotenv from 'dotenv'
dotenv.config()
import { config } from './utils/config'
import express from 'express'
import pdfRouter from './routes/pdf'
import searchRouter from './routes/search'
import userRouter from './routes/users'
import loginRouter from './routes/login'
import mongoose from 'mongoose'
const app = express()
app.use(express.json())

mongoose.connect(config.MONGODB_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error))

app.use('/api/pdf', pdfRouter)
app.use('/api/search', searchRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
