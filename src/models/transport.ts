import { TransportCodeEnum } from "@/lib/transport"
import mongoose from "mongoose"

interface TransportSchema extends mongoose.Document {
    code: string
    value: string
}

const transportSchema = new mongoose.Schema({
    code: {
        type: mongoose.Schema.Types.String,
        unique: true,
    },
    value: mongoose.Schema.Types.String
})

const Transport = mongoose.models.Transport || mongoose.model<TransportSchema>('Transport', transportSchema)

export interface TransportData {
    _id: string
    code: TransportCodeEnum
    value: string
}

export { Transport, transportSchema }
