import { fetchTravel } from "@/lib/api/travel";
import { fetchUser } from "@/lib/api/user";
import { connectToDatabase } from "@/lib/db";
import { SubscriptionStateCodeEnum } from "@/lib/subscription";
import { Subscription, subscriptionSchema } from "@/models/subscription";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, {params}) {
    try {
        const {travel, error} = await fetchTravel(params.travel);

        if (error) {
            return Response.json({error}, {status: 400});
        }
        return Response.json({participations: travel.participations}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}

export async function POST(request: NextRequest, {params}) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const state = SubscriptionStateCodeEnum.PENDING;
        const {travel: findTravel} = await fetchTravel(params.travel);
        const {user: findUser} = await fetchUser(body.subscriber);
        let alreadySubscribed = true;

        if (!findTravel || !findUser) {
            if (!findUser) {
                return Response.json({error: "invalid user"}, {status: 400});
            } else {
                return Response.json({error: "travel not found"}, {status: 404});
            }
        }

        const findSubscription = findTravel.participations.find((p) => p.user === findUser._id);

        if (!findSubscription) {
            alreadySubscribed = false;
            const subscription = new Subscription({
                user: findUser._id,
                state,
            });
            findTravel.participations.push(subscription);
            await findTravel.save();
        }

        return Response.json({
            travel: findTravel,
            alreadySubscribed,
            subscriptionState: findSubscription?.state || SubscriptionStateCodeEnum.PENDING
        }, {status: alreadySubscribed ? 200 : 201});
    } catch (error) {
        console.log(error)
        return Response.json({error}, {status: 400});
    }
}