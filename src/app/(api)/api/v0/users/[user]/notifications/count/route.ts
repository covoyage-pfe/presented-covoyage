import { NotificationStateCodeEnum } from "@/lib/notification"
import { Notification } from "@/models/notification"
import { User } from "@/models/user";
import { NextRequest } from "next/server"


export async function GET(request: NextRequest, {params}) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const state = searchParams.get('state') || NotificationStateCodeEnum.UNREAD;

        const user = await User.findOne({clerkId: params.user})
        if (!user) {
            return Response.json({error: "invalid user"}, {status: 400});
        }

        if (state === NotificationStateCodeEnum.ALL) {
            return Response.json({count: user.notifications.content.length || []}, {status: 200});
        }
        return Response.json({count: user.notifications.unread}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}
