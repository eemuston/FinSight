import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
})

const extractPdfWithClaude = async (file: any) => {
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
                text: 'Extract all text from this document.'
            }
        ]
        }]
    })
    return response;
}


const processPdf = async (file: any) => {
    const content = await extractPdfWithClaude(file)
    console.log(content)
    return { message: 'received'}
}

export default { processPdf }