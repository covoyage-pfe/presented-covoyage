import { User } from "@/models/user";
import { WebhookEvent } from "@clerk/nextjs/server";
import { UserGenderCodeEnum } from "../user";
import { NotificationStateCodeEnum, NotificationTypeCodeEnum, getNotificationAction, getNotificationContent, getNotificationSubject } from "../notification";
import { Notification } from "@/models/notification";
import { connectToDatabase } from "../db";

enum WEBHOOK_ACTIONS_ENUM {
    NEW_USER='001',
    UPDATE_USER='002'
}

function getWebhookSecretKey(action: string) {
    if (process.env.NODE_ENV !== 'production') {
        return action === WEBHOOK_ACTIONS_ENUM.NEW_USER ?
            process.env.WEBHOOK_NEW_USER_KEY :
            process.env.WEBHOOK_UPDATE_USER_KEY;
    } else {
        return ''
    }
}

async function handlerUserCreated(event: WebhookEvent) {
    let response = [{}, {}];
    try {
        await connectToDatabase();
        if (event.type === 'user.created') {
            console.log("test")
            const notification = new Notification({
                subject: getNotificationSubject(NotificationTypeCodeEnum.WELCOME),
                content: getNotificationContent(NotificationTypeCodeEnum.WELCOME),
                type: NotificationTypeCodeEnum.WELCOME,
                state: NotificationStateCodeEnum.UNREAD,
                action: getNotificationAction(NotificationTypeCodeEnum.WELCOME)
            });
            console.log(event.data)
            const gender = event.data.gender !== 'Male' ? UserGenderCodeEnum.FEMALE : UserGenderCodeEnum.MALE;
            const data = {
                clerkId: event.data.id,
                firstname: event.data.first_name,
                lastname: event.data.last_name,
                username: event.data.username,
                emailAddresses: event.data.email_addresses.map(email => email.email_address),
                gender: gender,
                birthday: event.data.birthday,
                imageUrl: event.data.image_url,
                description: '',
                evaluations: {
                    average: 0,
                    content: []
                },
                notifications: {
                    unread: 1,
                    content: [notification]
                },
                photos: []
            };
            const user = new User(data);

            await user.save()
            console.log("user saved in the database")
            response = [{message: "user saved in the database", user: user}, {status: 200}];
        }
    } catch(error) {
        console.log(error)
        response = [{error}, {status: 400}]
    };
    return response;
}

async function handlerUserUpdated(event: WebhookEvent) {
    let response = [{}, {}];
    
    try {
        await connectToDatabase();
        if (event.type === 'user.updated') {
            const gender = event.data.gender === 'Male' ? UserGenderCodeEnum.MALE : UserGenderCodeEnum.FEMALE
            const clerkId = event.data.id;
            const data = {
                firstname: event.data.first_name,
                lastname: event.data.last_name,
                username: event.data.username,
                emailAddresses: event.data.email_addresses.map(email => email.email_address),
                gender: gender,
                birthday: event.data.birthday,
                imageUrl: event.data.image_url,
                updatedAt: event.data.updated_at
            };

            const user = await User.updateOne({clerkId: clerkId}, {$set: data});
            console.log("user updated in the database")
            response = [{message: "user updated in the database", user: user}, {status: 200}];
        }
    } catch (error) {
        console.log(error)
        response = [{error}, {status: 400}];
    }
    return response;
}

async function handlerUserDeleted(event: WebhookEvent) {
    let response;

    try {
        await connectToDatabase();
        if (event.type === 'user.deleted') {
            const clerkId = event.data.id;

            await User.deleteOne({clerkId});
            console.log("user deleted from the database");
            response = [{message: "user deleted from the database"}, {status: 200}];
        }
    } catch(error) {
        console.log(error);
        response = [{error}, {status: 400}];
    }
    return response;
}

export {
    handlerUserCreated,
    handlerUserUpdated,
    handlerUserDeleted,
    getWebhookSecretKey,
    WEBHOOK_ACTIONS_ENUM
};