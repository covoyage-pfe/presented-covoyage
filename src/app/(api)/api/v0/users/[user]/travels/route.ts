import { fetchTravels } from "@/lib/api/travel";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, {params}) {
    try {
        const {travels} = await fetchTravels(params.user);

        return Response.json({travels}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 400});
    }
}