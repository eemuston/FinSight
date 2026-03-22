import mongoose, { Document } from 'mongoose'

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collectionName: {
        type: String,
        required: true
    },
    messages: [
        {
            role: {
                type: String,
                enum: ['user', 'assistant'],
                required: true
            },
            content: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

chatSchema.set('toJSON', {
    transform: (_document: Document, returnedObject: Record<string, any>) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat