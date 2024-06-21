import { getSearchAggregatePipeline } from "@/lib/api/travel";
import { connectToDatabase } from "@/lib/db";
import { TravelStateCodeEnum } from "@/lib/travel";
import { Travel } from "@/models/travel";
import { User } from "@/models/user";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const userExists = await User.findOne({clerkId: body.owner});

        if (!userExists) {
            return Response.json({error: "invalid owner"}, {status: 400})
        }

        const departureDate = new Date(`${body.departure.date}T00:00:00Z`);
        const maxArrivalDate = new Date(`${body.arrival.date}T00:00:00Z`);
        const travel = new Travel({
            ...body,
            owner: userExists._id,
            departure: {
                city: body.departure.city.toUpperCase(),
                date: departureDate,
            },
            arrival: {
                city: body.arrival.city.toUpperCase(),
                date: maxArrivalDate,
            },
            state: TravelStateCodeEnum.COMMING
        });
        await travel.save();

        return Response.json({message: "travel saved", newTravelId: travel._id}, {status: 201});
    } catch (error) {
        console.log(error);
        return Response.json({error}, {status: 400});
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const searchParams = request.nextUrl.searchParams;
    
        const LIMIT = 50;
        const step = parseInt(searchParams.get('step') || '0');
        const requestState = searchParams.get('state') || TravelStateCodeEnum.COMMING;
        const departureCity = searchParams.get('departureCity');
        const arrivalCity = searchParams.get('arrivalCity');
        const departureDate = searchParams.get('departureDate');
        const arrivalMaxDate = searchParams.get('arrivalMaxDate') || undefined;
        const transport = searchParams.get('transport') || undefined;
        let maxTravellers: any = searchParams.get('maxTravellers') || undefined;
        const ownerMinRate = parseFloat(searchParams.get('ownerMinRate') || '0');
        const state = requestState === TravelStateCodeEnum.CLOSED || requestState === TravelStateCodeEnum.IN_PROGRESS || requestState === TravelStateCodeEnum.COMMING ? requestState : TravelStateCodeEnum.COMMING;

        if (!departureCity || !departureDate || !arrivalCity) {
            return Response.json({error: "invalid search params"}, {status: 400});
        }
        if (maxTravellers) {
            maxTravellers = parseInt(maxTravellers);
        }
        const aggregateParams = {
            departure: {
                city: departureCity,
                date: departureDate
            },
            arrival: {
                city: arrivalCity,
                maxDate: arrivalMaxDate,
            },
            ownerMinRate,
            state,
            transport,
            maxTravellers
        }

        const travels = await Travel.aggregate(getSearchAggregatePipeline(aggregateParams))
        .sort({createdAt: -1})
        .skip(LIMIT * step)
        .limit(LIMIT);
        return Response.json({travels}, {status: 200});
    } catch (error) {
        console.log(error);

        return Response.json({error}, {status: 400});
    }
}
