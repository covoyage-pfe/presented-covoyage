import { fetchUser } from "@/lib/api/user";
import { connectToDatabase } from "@/lib/db";
import { Photo } from "@/models/photo";
import { User } from "@/models/user";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { user: string } }) {
    try {
        await connectToDatabase()
        const urlParams = request.nextUrl.searchParams;
        const LIMIT = 50;
        const step = parseInt(urlParams.get('step') || '0');

        const user = await User.findOne({clerkId: params.user});
        return Response.json({photos: user?.photos.slice(step * LIMIT, (step * LIMIT) + LIMIT) || []}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400})
    }
    
}

export async function POST(request: NextRequest, { params }: { params: { user: string } }) {
    try {
        await connectToDatabase();
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File
        const user = await User.findOne({clerkId: params.user}, {photos: 1});

        if (!file) {
            return NextResponse.json({ success: false })
        }

        if (!user) {
            return NextResponse.json({ success: false, error: "invalid user" })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = `/memories/${params.user}_${file.name}`
        await writeFile(path, buffer);

        const photo = new Photo({
            path: path
        });

        user.photos.unshift(photo);
        user.save();

        return NextResponse.json({ photos: user.photos, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error, success: false }, {status: 400});
    }
}
