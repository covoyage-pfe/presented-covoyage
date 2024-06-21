import { connectToDatabase } from "@/lib/db";
import { Transport } from "@/models/transport";


export async function GET() {
    try {
        await connectToDatabase();
        const transports = await Transport.find();

        return Response.json({transports}, {status: 200});
    } catch (error) {
        return Response.json({error}, {status: 500});
    }
}
