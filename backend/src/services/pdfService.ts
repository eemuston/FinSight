import Anthropic from '@anthropic-ai/sdk'
import { VoyageAIClient } from 'voyageai'
import { QdrantClient } from '@qdrant/js-client-rest'
import type { Express } from 'express'
import ReportSummary from '../models/reportSummary'
import fs from 'fs'

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

const vo = new VoyageAIClient({
    apiKey: process.env.VOYAGE_API_KEY
})

const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL
})

const extractPdfWithClaude = async (file: Express.Multer.File) => {
    const pdfBuffer = fs.readFileSync(file.path)
    const base64Pdf = pdfBuffer.toString('base64')

    const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        //haiku is cheaper than sonnet and good for here.
        max_tokens: 300,
        // 300 max only for testing. REMEMBER TO PUMP UP FOR LARGER SKALE TESTING!
        messages: [{
            role: 'user',
            content: [{
                type: 'document',
                source: {
                    type: 'base64',
                    media_type: 'application/pdf',
                    data: base64Pdf
                }
            },
            {
                type: 'text',
                text: 'Extract all text from this document. Return only the raw text, nothing else. No need for comments or explanations'
                //might need some tweaks still. better than it was before
            }
        ]
        }]
    })
    const textBlock =  response.content.find(block => block.type === 'text')
    if (!textBlock || textBlock.type !== 'text') throw new Error('No text in response')
    return textBlock.text;
}

const createReportSummary = async (file: Express.Multer.File, text: string) => {
    const fileName = file.filename
    const originalName = file.originalname

    const summary = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        // again limited max for testing.
        messages: [{
            role: 'user',
            content: `You are world-leading financial analyst. Analyze this annual report and provide a concise investor summary covering: company overview, financial health, key strengths, and main risks. Be direct and specific. \n\n ${text}`
            // The content itself is good but it needs tweaks for the out formatting.
        }]
    })

    const summaryBlock = summary.content.find(block => block.type === 'text')
    if (!summaryBlock || summaryBlock.type !== 'text') throw new Error('Summary generation failed!')

    const reportSummary = new ReportSummary({
        fileName: fileName,
        originalName: originalName,
        summary: summaryBlock.text
    })
    //Will add more data to here when needed. The schema already has extra fields but only these are required. Some also have default values.

    await reportSummary.save()
}

const chunkText = (text: string, chunkSize: number = 500, overlap: number = 50): string [] => {
    const chunks: string [] = []
    let start = 0

    while (start < text.length) {
        const end =  start + chunkSize
        chunks.push(text.slice(start, end))
        start = end - overlap
        //overlap is to prevent sentences being cut from the middle
    }
    return chunks
}

const embeddings = async (chunks: string[]): Promise<number[][]> => {
    const result = await vo.embed({
        input: chunks,
        model: "voyage-finance-2"
        //model for finance could be good for finance app.
    })
    return (result.data ?? []).map(item => item.embedding ?? [])
}

const collectionCreation = async (collectionName: string) => {
    const collections = await qdrant.getCollections()
    const exists = collections.collections.some(c => c.name === collectionName)
    if (!exists){
        await qdrant.createCollection(collectionName, {
            vectors: {
                size: 1024,
                distance: 'Cosine'
                //If need to change embedding model check that these match also that size and distance needs to be changed.
            }
        })
    }
}        

const storeInQdrant = async (chunks: string [], embeddings: number[][], collectionName: string) => {
    await qdrant.upsert(collectionName, {
        points: chunks.map((chunk, index) => ({
            id: index,
            vector: embeddings[index],
            payload: { text: chunk }
        }))
    })
}

const updateStatus = async (collectionName: string) => {
    //Add status as argument so we can pass ready and error and use this function in error handling.
    const reportSummary = await ReportSummary.findOne({ fileName: collectionName })
    if (!reportSummary) throw new Error('Report not found when updating status.')

    reportSummary.status = 'ready'

    await reportSummary.save()
}

const processPdf = async (file: Express.Multer.File) => {
    const extractedText = await extractPdfWithClaude(file)
    await createReportSummary(file, extractedText)
    const chunkedText = chunkText(extractedText)
    const embeddedText = await embeddings(chunkedText)
    await collectionCreation(file.filename)
    await storeInQdrant(chunkedText, embeddedText, file.filename)
    await updateStatus(file.filename)
    return { message: 'received'}
}

export default { processPdf }