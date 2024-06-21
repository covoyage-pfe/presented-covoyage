import { NextRequest } from "next/server";
import { User } from "@/models/user";
import { connectToDatabase } from "@/lib/db";


export async function PUT(request: NextRequest, {params}) {
    try {
        await connectToDatabase();
        const body = await request.json();
        await User.updateOne({clerkId: params.user}, {$set: {description: body.description}});
        return Response.json({message: "user description updated", status: 200});
    } catch (error) {
        return Response.json({error, status: 400});
    }
}
