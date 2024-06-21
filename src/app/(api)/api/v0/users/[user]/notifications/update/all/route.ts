import { NotificationStateCodeEnum } from "@/lib/notification";
import { User } from "@/models/user";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, {params}) {
    try {
        const user = await User.findOne({clerkId: params.user}, {notifications: 1});
        if (!user) {
            return Response.json({error: "invalid user"}, {status: 400});
        }
            
        user.notifications.content.forEach(notif => notif.state = NotificationStateCodeEnum.READ);
        user.notifications.unread = 0;
        await user.save();
        return Response.json({message: "all notifications updated"}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}
