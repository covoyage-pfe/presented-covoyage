import { connectToDatabase } from "@/lib/db";
import { Notification, NotificationSchema } from "@/models/notification";
import { NextRequest } from "next/server";
import {
    NotificationStateCodeEnum,
    NotificationTypeCodeEnum,
    getNotificationAction,
    getNotificationContent,
    getNotificationSubject
} from "@/lib/notification";
import { User } from "@/models/user";
import { fetchUser } from "@/lib/api/user";


export async function GET(request: NextRequest, {params}) {
    try {
        await connectToDatabase()
        const searchParams = request.nextUrl.searchParams
        const LIMIT = 50

        const step = parseInt(searchParams.get('step') || '0');
        const state = searchParams.get('state') || NotificationStateCodeEnum.ALL;

        const {user} = await fetchUser(params.user, true);
        if (!user) {
            return Response.json({error: "invalid user"}, {status: 400});
        }
        if (state === NotificationStateCodeEnum.ALL) {
            return Response.json({notifications: user.notifications.content || []}, {status: 200});
        }
        console.log(state)
        return Response.json({
            notifications: user.notifications.content.filter(not => not.state === state).slice(LIMIT * step, (LIMIT * step) + LIMIT) || [],
            unread: user.notifications.unread
        }, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const searchParams = request.nextUrl.searchParams;

        if (!body.type || typeof(body.type) !== typeof(NotificationTypeCodeEnum)) {
            return Response.json({error: "unknow notification type"}, {status: 400});
        }

        const user = await User.findOne({clerkId: searchParams.get('user')})
        if (!user) {
            return Response.json({error: "invalid user"}, {status: 400});
        }

        const notification = new Notification({
            subject: getNotificationSubject(body.type),
            content: getNotificationContent(body.type),
            type: body.type,
            state: body.state,
            action: getNotificationAction(body.type)
        });

        user.notifications.unread += 1;
        user.notifications.content.unshift(notification);

        await user.save()
        return Response.json({message: "notification saved"}, {status: 201});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}
