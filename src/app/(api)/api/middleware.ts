import { connectToDatabase } from "@/lib/db";

export default async function apiMiddleware () {
    await connectToDatabase()
}