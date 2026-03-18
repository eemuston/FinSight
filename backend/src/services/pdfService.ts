import Anthropic from '@anthropic-ai/sdk'
import { VoyageAIClient } from 'voyageai'
import type { Express } from 'express'
import fs from 'fs'

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

const vo = new VoyageAIClient({
    apiKey: process.env.VOYAGE_API_KEY
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

const embeddings = async (chunks: string[]) => {
    const result = await vo.embed({
        input: chunks,
        model: "voyage-3"
    })
    return result.data?.map(item => item.embedding)
}


const processPdf = async (file: Express.Multer.File) => {
    const extractedText = await extractPdfWithClaude(file)
    const chunkedText = chunkText(extractedText)
    const embeddedText = await embeddings(chunkedText)
    console.log(extractedText)
    console.log(embeddedText)
    return { message: 'received'}
}

export default { processPdf }