import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const searchParams = request.nextUrl.searchParams;

        if (!body.from || !body.mark) {
            return Response.json({error: "request params missing"}, {status: 400});
        }
        
        const from = await User.findOne({clerkId: body.from})
        if (!from) {
            return Response.json({error: "invalid user evaluator"}, {status: 400})
        }
        const user = await User.findOne({clerkId: searchParams.get('user')}, {evaluations: 1})
        if (!user) {
            return Response.json({error: "invalid user evaluated"}, {status: 400});
        }

        const evaluation = user.evaluations.content.find(eva => eva._id === searchParams.get('eval'));
        if (!evaluation) {
            return Response.json({message: "invalid evaluation"}, {status: 200});
        }

        evaluation.mark = body.mark;
        evaluation.note = body.note || '';
        
        const content = user.evaluations.content;
        user.evaluations.average = content.reduce((s, eva) => s += eva.mark, 0) / content.length;
        await user.save()
        return Response.json({message: "evaluation updated"}, {status: 200});
    } catch(error) {
        return Response.json({error}, {status: 400});
    }
}
