import mongoose from "mongoose"

export interface MessageSchema extends mongoose.Document {
    receiver: mongoose.Schema.Types.ObjectId
    sender: mongoose.Schema.Types.ObjectId
    message: mongoose.Schema.Types.String
}

const messageSchema = new mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: mongoose.Schema.Types.String,
        minlength: 2,
        maxlength: 4000,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
})

const Message = mongoose.models.Message || mongoose.model<MessageSchema>('Message', messageSchema)

export { Message, messageSchema }
