export const config = {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
    VOYAGE_API_KEY: process.env.VOYAGE_API_KEY || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    QDRANT_URL: process.env.QDRANT_URL || '',
    PORT: process.env.PORT || 3000
}