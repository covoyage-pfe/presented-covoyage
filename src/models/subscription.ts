import { TravelStateCodeEnum } from "@/lib/travel"
import { UserGenderCodeEnum } from "@/lib/user"
import mongoose from "mongoose"

export interface SubscriptionSchema extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId,
    state: mongoose.Schema.Types.String,
    createdAt: mongoose.Schema.Types.Date
    updatedAt: mongoose.Schema.Types.Date
}

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: mongoose.Schema.Types.String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Subscription = mongoose.models.Subscription || mongoose.model<SubscriptionSchema>('Subscription', subscriptionSchema);

export { Subscription, subscriptionSchema };
