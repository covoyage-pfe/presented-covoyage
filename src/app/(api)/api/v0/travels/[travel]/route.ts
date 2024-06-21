import { fetchTravel } from "@/lib/api/travel";
import { connectToDatabase } from "@/lib/db";
import { NotificationStateCodeEnum, NotificationTypeCodeEnum, getNotificationAction, getNotificationContent, getNotificationSubject } from "@/lib/notification";
import { TravelStateCodeEnum } from "@/lib/travel";
import { Notification } from "@/models/notification";
import { Travel } from "@/models/travel";
import { User } from "@/models/user";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { travel: string } }) {
    try {
        await connectToDatabase();
        const {travel, error} = await fetchTravel(params.travel);

        if (error) {
            return Response.json({error}, {status: 400});
        }

        return Response.json({travel}, {status: 200});
    } catch(error) {
        return Response.json({error}, {status: 400});
    }
}

export async function PUT(request: NextRequest, { params }: { params: { travel: string } }) {
    try {
        await connectToDatabase();
        const body = await request.json();

        const travel = await Travel.updateOne({_id: params.travel}, {$set: {...body}});

        if (body.state === TravelStateCodeEnum.CLOSED) {
            const notif = new Notification({
                subject: getNotificationSubject(NotificationTypeCodeEnum.WELCOME),
                content: getNotificationContent(NotificationTypeCodeEnum.WELCOME),
                type: NotificationTypeCodeEnum.WELCOME,
                state: NotificationStateCodeEnum.UNREAD,
                action: getNotificationAction(NotificationTypeCodeEnum.WELCOME)
            });

        }

        return Response.json({travel}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { travel: string } }) {
    try {
        await connectToDatabase();

        const travel = await Travel.findOneAndUpdate({_id: params.travel}, {$set: {state: TravelStateCodeEnum.CLOSED}});

        const notif = new Notification({
            subject: getNotificationSubject(NotificationTypeCodeEnum.TRAVEL_CANCELLED),
            content: getNotificationContent(NotificationTypeCodeEnum.TRAVEL_CANCELLED),
            type: NotificationTypeCodeEnum.TRAVEL_CANCELLED,
            state: NotificationStateCodeEnum.UNREAD,
            action: getNotificationAction(NotificationTypeCodeEnum.TRAVEL_CANCELLED)
        });

        for (const part of travel.participations) {
            User.updateOne({_id: part.user}, {$push: {notifications: {$each: [notif], $position: 0}}})
        }
    
        return Response.json({message: "travel deleted"}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}
