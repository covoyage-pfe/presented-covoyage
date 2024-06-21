import { TravelStateCodeEnum } from "@/lib/travel";
import mongoose from "mongoose";
import { SubscriptionSchema, subscriptionSchema } from "./subscription";

interface TravelSchema extends mongoose.Document {
    owner: mongoose.Schema.Types.ObjectId
    title: string
    description: string
    departure: {
        city: string
        date: string
    },
    arrival: {
        city: string
        address: string
    },
    preference: {
        numberOfTraveller: number,
        transport: string
    },
    state?: TravelStateCodeEnum
    participations: [SubscriptionSchema],
    createdAt?: Date
    updatedAt?: Date
}

const travelSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    departure: {
        city: mongoose.Schema.Types.String,
        date: mongoose.Schema.Types.Date
    },
    arrival: {
        city: mongoose.Schema.Types.String,
        date: mongoose.Schema.Types.Date
    },
    numberOfTraveller: mongoose.Schema.Types.Number,
    transport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transport'
    },
    state: mongoose.Schema.Types.String,
    participations: [subscriptionSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Travel = mongoose.models.Travel || mongoose.model<TravelSchema>('Travel', travelSchema);

export { Travel, travelSchema }
