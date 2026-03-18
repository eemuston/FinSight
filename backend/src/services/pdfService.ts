import Anthropic from '@anthropic-ai/sdk'
import { VoyageAIClient } from 'voyageai'
import { QdrantClient } from '@qdrant/js-client-rest'
import type { Express } from 'express'
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
        max_tokens: 300,
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
            }
        ]
        }]
    })
    const textBlock =  response.content.find(block => block.type === 'text')
    if (!textBlock || textBlock.type !== 'text') throw new Error('No text in response')
    return textBlock.text;
}

const chunkText = (text: string, chunkSize: number = 500, overlap: number = 50): string [] => {
    const chunks: string [] = []
    let start = 0

    while (start < text.length) {
        const end =  start + chunkSize
        chunks.push(text.slice(start, end))
        start = end - overlap
    }
    return chunks
}

const embeddings = async (chunks: string[]): Promise<number[][]> => {
    const result = await vo.embed({
        input: chunks,
        model: "voyage-finance-2"
    })
    return (result.data ?? []).map(item => item.embedding ?? [])
}

const collectionCreation = async () => {
    const collections = await qdrant.getCollections()
    const exists = collections.collections.some(c => c.name === 'test')
    if (! exists){
        await qdrant.createCollection('test', {
            vectors: {
                size: 1024,
                distance: 'Cosine'
            }
        })
    }
}        

const storeInQdrant = async (chunks: string [], embeddings: number[][]) => {
    await qdrant.upsert('test', {
        points: chunks.map((chunk, index) => ({
            id: index,
            vector: embeddings[index],
            payload: { text: chunk }
        }))
    })
}

const processPdf = async (file: Express.Multer.File) => {
    const extractedText = await extractPdfWithClaude(file)
    const chunkedText = chunkText(extractedText)
    const embeddedText = await embeddings(chunkedText)
    await collectionCreation()
    await storeInQdrant(chunkedText, embeddedText)
    console.log(extractedText)
    console.log(embeddedText)
    return { message: 'received'}
}

export default { processPdf }