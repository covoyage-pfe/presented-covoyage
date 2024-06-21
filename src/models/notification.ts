import { NotificationStateCodeEnum, NotificationTypeCodeEnum } from "@/lib/notification"
import mongoose from "mongoose"

export interface NotificationSchema extends mongoose.Document {
    subject: string
    content: string
    state: string
    type: string
    action: string
}

const notificationSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.String,
        maxlength: 255
    },
    content: {
        type: mongoose.Schema.Types.String,
        maxlength: 1500
    },
    type: mongoose.Schema.Types.String,
    state: mongoose.Schema.Types.String,
    action: {
        type: mongoose.Schema.Types.String,
        maxLength: 255
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    }
})

const Notification = mongoose.models.Notification || mongoose.model<NotificationSchema>('Notification', notificationSchema)

export interface NotificationData extends mongoose.Document {
    id: string
    subject: string
    content: string
    state: NotificationStateCodeEnum
    type: NotificationTypeCodeEnum
    action: string
}

export { Notification, notificationSchema }
