import dotenv from 'dotenv'
dotenv.config()
import { config } from './utils/config'
import express from 'express'
import pdfRouter from './routes/pdf'
import searchRouter from './routes/search'
import userRouter from './routes/users'
import loginRouter from './routes/login'
import chatRouter from './routes/chat'
import middleware from './utils/middleware'
import mongoose from 'mongoose'
const app = express()

mongoose.connect(config.MONGODB_URI!)
.then(() => console.log('MongoDB connected'))
.catch(error => console.error('MongoDB connection error:', error))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/pdf', middleware.userExtractor, pdfRouter)
app.use('/api/search', middleware.userExtractor, searchRouter)
app.use('/api/chat', middleware.userExtractor, chatRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})