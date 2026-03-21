import { voyageClient, qdrantClient } from '../utils/clients'

const searchEmbeddings = async (searchQuestion: string): Promise<number[]> => {
    const result = await voyageClient.embed({
        input: [searchQuestion],
        model: "voyage-finance-2"
        //model for finance could be good for finance app.
    })
    return result.data?.[0]?.embedding ?? []
}

const processSearch = async (collectionName: string, searchQuestion :string) => {
    const searchVector = await searchEmbeddings(searchQuestion)

    const results = await qdrantClient.search(collectionName, {
        vector: searchVector,
        limit: 1
        //limit is 1 for testing. 4 or 5 chunks needed probably in real app.
    })

    return results
}

export default { processSearch }