import mongoose from "mongoose"

export interface PhotoSchema extends mongoose.Document {
    path: string
    createdAt: Date
}

const photoSchema = new mongoose.Schema({
    path: {
        type: String,
        maxlength: 255,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
})

const Photo = mongoose.models.Photo || mongoose.model<PhotoSchema>('Photo', photoSchema)

export interface PhotoData {
    id: string
    path: string
}

export { Photo, photoSchema }
