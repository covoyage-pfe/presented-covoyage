import { EvaluationSchema } from "@/models/evaluation"
import { SubscriptionStateCodeEnum } from "../subscription"
import { UserGenderCodeEnum } from "../user"
import { NotificationSchema } from "@/models/notification"
import { TravelStateCodeEnum } from "../travel"
import { PhotoSchema } from "@/models/photo"

export interface SubscriptionResponseSchema {
    traveller: {
        imageUrl: string
        username: string
        mark: number
    },
    travel: string,
    state: SubscriptionStateCodeEnum
}

export interface EvaluationResponseSchema {
    id: string
    from: {
        username: string,
        imageUrl: string
    }
    mark: number,
    note: string
}

export interface UserResponseSchema {
    username: 1
    gender: 1
    imageUrl: 1
    description?: string
    evaluations: {
        average: number
        content?: [EvaluationSchema]
    },
    notifications?: {
        unread: number
        content: [NotificationSchema]
    },
    photos: [PhotoSchema],
};

export interface TravelResponseSchema {
    owner: {
        id: string
        imageUrl: string
        username: string
        gender: UserGenderCodeEnum
        mark: number
    }
    title: string
    description: string
    departure: {
        city: string
        address: string
        date: string
        time: string
    },
    arrival: {
        city: string
        address: string
    },
    preference: {
        numberOfTraveller: number,
        transport: string
    },
    subscribers?: [
        {
            id: string
            imageUrl: string
            username: string
            gender: UserGenderCodeEnum
            mark: number
        }
    ]
    contact?: string
}
