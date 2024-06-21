import { User } from "@/models/user";
import { connectToDatabase } from "../db";


async function fetchUser(id: string, getNotifications = false) {
    try {
        const projection = {
            clerkId: 1,
            username: 1,
            gender: 1,
            imageUrl: 1,
            description: 1,
            evaluations: 1,
            photos: {$slice: 3}
        }

        if (getNotifications) projection['notifications'] = 1;

        await connectToDatabase();
        const user = await User.findOne({clerkId: id}, projection).populate('evaluations.content.from', "username imageUrl");
        return {user};
    } catch (error) {
        return {error}
    }
}

export { fetchUser };
