import { fetchUser } from "@/lib/api/user";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { user: string } }) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const urlParams: { getNotifications } = {
            getNotifications: !searchParams.get('getNotifications')
        };

        const { user } = await fetchUser(params.user, urlParams.getNotifications)
        return Response.json({user}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}
