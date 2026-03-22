import ReportSummary from "../models/reportSummary"

const validateReportOwnership = async (collectionName: string, userId: string) => {
    const report = await ReportSummary.findOne({
        fileName: collectionName,
        user: userId
    })
    if(!report) throw new Error('Report not found')

    return report
}

export { validateReportOwnership }