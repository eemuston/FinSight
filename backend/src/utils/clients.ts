import { config } from './config'
import { VoyageAIClient } from 'voyageai'
import { QdrantClient } from '@qdrant/js-client-rest'
import Anthropic from '@anthropic-ai/sdk'

export const voyageClient = new VoyageAIClient({
    apiKey: config.VOYAGE_API_KEY
})

export const qdrantClient = new QdrantClient({
    url: config.QDRANT_URL
})

export const anthropic = new Anthropic({
    apiKey: config.ANTHROPIC_API_KEY
})