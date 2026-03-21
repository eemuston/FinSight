import mongoose, { Document } from "mongoose"

const reportSummarySchema = new mongoose.Schema({
    //report identity
    fileName: { type: String, required: true }, //we want the multer hash here so we can use it as unique id everywhere. Like Qdrant collection names and shit.
    originalName: { type: String, required: true},
    uploadedAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['processing', 'ready', 'error'],
        default: 'processing'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    //AI analysis
    summary: { type: String, required: true},
    companyName: { type: String },
    reportYear: { type: Number },
    healthRating: { type: String, enum: ['Healthy', 'Caution', 'Risky']},

    //AI scores for the company to display on frontend
    scores: {
        liquidity: Number,
        profitability: Number,
        debt: Number,
        growth: Number,
        overallHealth: Number,
    },

    //Key metrics to display in frontend
    keyMetrics: {
        revenue: String,
        revenueGrowth: String,
        netIncome: String,
        grossMargin: String,
        cashPosition: String,
        debtToEquity: String,
        currentRation: String,
        employees: String
    },

    //Strengths and risks.
    keyStrengths: [String],
    keyRisks: [String]
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