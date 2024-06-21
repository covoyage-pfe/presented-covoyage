import { UserGenderCodeEnum } from '@/lib/user'
import mongoose from 'mongoose'
import { EvaluationSchema, evaluationSchema } from './evaluation'
import { PhotoSchema, photoSchema } from './photo'
import { NotificationSchema, notificationSchema } from './notification'

export interface UserSchema extends mongoose.Document {
    clerkId: string
    firstname: string
    lastname: string
    username: string
    emailAddresses: [string]
    gender: UserGenderCodeEnum
    birthday: string
    imageUrl: string
    description: string
    evaluations: {
        average: number
        content: [EvaluationSchema]
    }
    notifications: {
        unread: number
        content: [NotificationSchema]
    }
    photos: [PhotoSchema]
    createdAt: Date
    updatedAt: Date
}

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        min: 1,
        max: 128,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
        maxLength: 191
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 191
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 191
    },
    emailAddresses: [
        {
            type: [String],
            required: true
        }
    ],
    birthday: {
        type: String,
        minlength: 2,
        maxlength: 191
    },
    gender: {
        type: String,
        length: 3
    },
    imageUrl: {
        type: String,
        minLength: 2,
        maxLength: 255
    },
    description: {
        type: String,
        maxLength: 1500
    },
    evaluations: {
        average: Number,
        content: [evaluationSchema]
    },
    notifications: {
        unread: Number,
        content: [notificationSchema]
    },
    photos: [photoSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.models.User || mongoose.model<UserSchema>('User', userSchema);

export { User, userSchema }
