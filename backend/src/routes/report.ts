import express from 'express'
import reportController from '../controllers/reportController'

const reportRouter = express.Router()

reportRouter.get('/', reportController.getReports)

export default reportRouter