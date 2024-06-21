import { connectToDatabase } from "@/lib/db";
import { Notification } from "@/models/notification";
import { NextRequest } from "next/server";
import { Evaluation } from "@/models/evaluation";
import { User } from "@/models/user";


export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const searchParams = request.nextUrl.searchParams
        const LIMIT = 50

        const step = parseInt(searchParams.get('step') || '0')

        const user = await User.findOne({clerkId: searchParams.get('user')}, {evaluations: 1})
        if (!user) {
            return Response.json({error: "invalid user"}, {status: 400});
        }
            
        const evaluations = user.evaluations.content.slice(LIMIT * step, (LIMIT * step) + LIMIT) || [];
        const evaluationsRes: any[] = []
        for (const eva of evaluations) {
            const from = await User.findOne({clerkId: eva.from});
            evaluationsRes.push({...eva, from: {username: from?.username, imageUrl: from?.imageUrl}});
        }
        return Response.json({evaluations: evaluationsRes, average: user.evaluations.average}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const searchParams = request.nextUrl.searchParams;

        if (!body.from || !body.mark) {
            return Response.json({error: "request params missing"}, {status: 400});
        }

        const from = await User.findOne({clerkId: body.from});
        if (!from) {
            return Response.json({error: "invalid user evaluator"}, {status: 400})
        }

        const user = await User.findOne({clerkId: searchParams.get('user')})
        if (!user) {
            return Response.json({error: "invalid user evaluated"}, {status: 400});
        }

        const evaluation = new Evaluation({
            from: from._id,
            mark: body.mark,
            note: body.note || '',
        });

        const content = user.evaluations.content;
        user.evaluations.average = content.reduce((s, eva) => s += eva.mark, 0) / content.length;
        user.evaluations.content.unshift(evaluation);

        await user.save()
        return Response.json({message: "evaluation saved"}, {status: 201});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}
