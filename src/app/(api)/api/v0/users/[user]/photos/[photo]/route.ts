import { connectToDatabase } from "@/lib/db";
import { Photo } from "@/models/photo";
import { User } from "@/models/user";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        await connectToDatabase();
        const user = await User.findOne({clerkId: searchParams.get('user')}); 
        if (!user) {
            return Response.json({message: "invalid user"}, {status: 400});
        }
        const photo = await Photo.findOne({_id: searchParams.get('photo')});
        return Response.json({photo}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400})
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectToDatabase();
        const searchParams = request.nextUrl.searchParams;
        const user = await User.findOne({clerkId: searchParams.get('user')});
        if (!user) {
            return Response.json({message: "invalid user"}, {status: 400});
        }
        await Photo.deleteOne({_id: searchParams.get('photo')})
        return Response.json({message: 'photo deleted'}, {status: 200})
    } catch (error) {
        return Response.json({error}, {status: 403});
    }
}
