import React from 'react';
import { Avatar, Typography, Rating } from '@/components/MaterialTailwind';
import { fetchUser } from '@/lib/api/user';


const UserLayoutPage = async ({params, children}) => {
    const { user, error } = await fetchUser(params.id);
    if (!user) {
        console.log(error);
    }

    return (
        <main className="flex justify-center items-stretch flex-col gap-4 w-3/4 m-auto mb-5">
        {
            error ? <Typography variant="h1" className="text-center">Oups an error occurred</Typography> :
            <>
                <div className="flex justify-between">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar
                            src={user.imageUrl}
                            alt="avatar"
                            withBorder={true}
                            color="blue-gray"
                            size="xl"
                            className="p-0.5"
                        />
                        <div className="text-center">
                            <Typography variant="small" color="gray" className="font-normal">
                                <Rating value={user.evaluations.average} readonly />
                            </Typography>
                            <Typography variant="paragraph">{user.username}</Typography>
                        </div>
                    </div>
                    <div className="w-3/4 flex items-center justify-center text-center pl-6 py-5">
                        <Typography variant="paragraph">{user.description}</Typography>
                    </div>
                </div>
                {children}
            </>
        }
        </main>
    );
}

export default UserLayoutPage;