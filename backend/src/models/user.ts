import mongoose, { Document } from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ReportSummary'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (_document: Document, returnedObject: Record<string, any>) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

export default User