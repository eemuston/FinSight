import mongoose, { Document } from "mongoose"

const reportSummarySchema = new mongoose.Schema({
    fileName: { type: String, required: true }, //we want the multer hash here so we can use it as unique id everywhere. Like Qdrant collection names and shit.
    originalName: { type: String, required: true},
    uploadedAt: { type: Date, default: Date.now },
    summary: { type: String, required: true},
    companyName: { type: String },
    reportYear: { type: Number },
    status: {
        type: String,
        enum: ['processing', 'ready', 'error'],
        default: 'processing'
    }
})

reportSummarySchema.set('toJSON', {
    transform: (_document: Document, returnedObject: Record<string, any>) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const ReportSummary = mongoose.model('ReportSummary', reportSummarySchema)

export default ReportSummary