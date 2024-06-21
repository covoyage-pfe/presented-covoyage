import { NotificationStateCodeEnum } from "@/lib/notification";
import { User } from "@/models/user";
import { NextRequest } from "next/server";


export async function PUT(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const user = await User.findOne({clerkId: searchParams.get('user')}, {notifications: 1});
        if (!user) {
            return Response.json({error: "invalid user"}, {status: 400});
        }

        const notif = user.notifications.content.find(notif => notif._id === searchParams.get('notif'));
        if (!notif) {
            return Response.json({message: "invalid notification"}, {status: 200});
        }

        notif.state = NotificationStateCodeEnum.READ
        user.notifications.unread -= 1;
        await user.save();
        return Response.json({message: "notification updated"}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}
