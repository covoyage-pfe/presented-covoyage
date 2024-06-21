import { connectToDatabase } from "@/lib/db";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { Notification } from "@/models/notification";
import { NextRequest } from "next/server";
import { NotificationStateCodeEnum, NotificationTypeCodeEnum, getNotificationContent, getNotificationSubject } from "@/lib/notification";


export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const params: { sender: string, receiver: string, message: string } = {
            sender: body.sender,
            receiver: body.receiver,
            message: body.message,
        }
        const findSender = await User.findOne({clerkId: params.sender}, {username: 1});
        const findReceiver = await User.findOne({clerkId: params.receiver});

        if (!findReceiver || !findSender) {
            return Response.json({error: "invalid users"}, {status: 400});
        }

        const data = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: {
                receiver_username: findReceiver.username,
                receiver_email: findReceiver.emailAddresses[0][0],
                sender_username: findSender.username,
                message: params.message,
                action: `localhost:3000/users/${params.sender}?sendMessage=true`
            }
        };
        console.log(findReceiver.emailAddresses[0][0]);
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const message = new Message({
            sender: findSender._id,
            receiver: findReceiver._id,
            message: params.message,
        });
        await message.save();

        const notification = new Notification({
            subject: getNotificationSubject(NotificationTypeCodeEnum.NEW_MESSAGE),
            content: getNotificationContent(NotificationTypeCodeEnum.NEW_MESSAGE, {sender: findSender.username}),
            type: NotificationTypeCodeEnum.NEW_MESSAGE,
            state: NotificationStateCodeEnum.UNREAD,
        });
        findReceiver.notifications.unread += 1;
        findReceiver.notifications.content.unshift(notification);
        findReceiver.save();
        
        return Response.json({message: "message sent"}, {status: 201});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}