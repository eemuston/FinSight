import express from 'express'
import userController from '../controllers/userController'

const userRouter = express.Router()

userRouter.post('/', userController.createUser)

export default userRouter