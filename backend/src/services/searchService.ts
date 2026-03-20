import { VoyageAIClient } from 'voyageai'
import { QdrantClient } from '@qdrant/js-client-rest'

const vo = new VoyageAIClient({
    apiKey: process.env.VOYAGE_API_KEY
})

const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL
})

const searchEmbeddings = async (searchQuestion: string): Promise<number[]> => {
    const result = await vo.embed({
        input: [searchQuestion],
        model: "voyage-finance-2"
        //model for finance could be good for finance app.
    })
    return result.data?.[0]?.embedding ?? []
}

const processSearch = async (collectionName: string, searchQuestion :string) => {
    const searchVector = await searchEmbeddings(searchQuestion)

    const results = await qdrant.search(collectionName, {
        vector: searchVector,
        limit: 4
    })

    return results
}

export default { processSearch }