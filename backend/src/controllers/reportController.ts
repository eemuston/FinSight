import { Request, Response, NextFunction } from 'express'
import ReportSummary from '../models/reportSummary'

const getReports = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.status(401).send({ error: 'Authentication required' })
        return
    }
    try {
        const reports = await ReportSummary.find({ user: req.user._id})
        res.send(reports)
    } catch(error) {
        next(error)
    }
}

export default { getReports }