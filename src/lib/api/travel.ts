import { Travel } from "@/models/travel"
import { connectToDatabase } from "../db"
import { User } from "@/models/user"
import { fetchUser } from "./user"
import mongoose from "mongoose"

interface SearchData {
    departure: {
        city: string
        date: string
    }
    arrival: {
        city:string
        maxDate?: string | null
    }
    state: string
    ownerMinRate?: number
    transport?: string
    maxTravellers?: number
}

function getSearchAggregatePipeline(searchData: SearchData): any[] {
    const matchParams: any = {
        "departure.date": new Date(`${searchData.departure.date}T00:00:00Z`),
        "departure.city": searchData.departure.city.toUpperCase(),
        "arrival.city": searchData.arrival.city.toUpperCase(),
        "state": searchData.state,
    };

    if (searchData.arrival.maxDate) {
        matchParams["arrival.date"] = {$lte: new Date(`${searchData.arrival.maxDate}T00:00:00Z`)};
    }
    if (searchData.ownerMinRate) {
        matchParams["owner.rate"] = {$gte: searchData.ownerMinRate};
    }
    if (searchData.transport) {
        matchParams["transport.code"] = searchData.transport;
    }
    if (searchData.maxTravellers) {
        matchParams["numberOfTraveller"] = {$lte: searchData.maxTravellers};
    }

    return [
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner_info"
            }
        },
        {
            $lookup: {
                from: "transports",
                localField: "transport",
                foreignField: "_id",
                as: "transport_info"
            }
        },
        {
            $project: {
                "owner": {
                    "clerkId": "$owner_info.clerkId",
                    "imageUrl": "$owner_info.imageUrl",
                    "username": "$owner_info.username",
                    "gender": "$owner_info.gender",
                    "rate": "$owner_info.evaluations.average"
                },
                "transport": {
                    "code": "$transport_info.code"
                },
                "title": 1,
                "description": 1,
                "departure": 1,
                "arrival": 1,
                "numberOfTraveller": 1,
                "state": 1,
            }
        },
        {
            $match: matchParams
        },
    ]    
}

async function fetchTravel(id) {
    try {
        await connectToDatabase();
        const travel = await Travel.findOne({_id: id})
        .populate('owner', "username imageUrl evaluations.average clerkId")
        .populate('participations.user', "username imageUrl clerkId");

        if (!travel) {
            return {error: "travel not found"};
        }

        return {travel};
    } catch(error) {
        return {error};
    }
}

async function fetchTravels(userId) {
    try {
        await connectToDatabase();
        const { user, error } = await fetchUser(userId);

        if (error) {
            throw new Error("cannot get user");
        }

        const travels = await Travel.find({owner: user._id}).sort({"arrival.date": -1});

        return {travels};
    } catch (error) {
        return {error};
    }
}

export { getSearchAggregatePipeline, fetchTravel, fetchTravels };
