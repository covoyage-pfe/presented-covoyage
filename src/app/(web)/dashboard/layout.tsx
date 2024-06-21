import DashboardSidebar from '@/components/DashbordSidebar';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { fetchUser } from '@/lib/api/user';
import { redirect } from 'next/navigation';


export default async function DashboardLayout({children, params}) {
    const authUserId = auth().userId;
    let user = null, error;

    if (authUserId) {
        while (!user) {
            const res = await fetchUser(authUserId);
            user = res?.user;
        }
    }



    return (
        <>
        {authUserId && !error && 
            <div className="flex">
                <aside>
                    <DashboardSidebar user={{
                        clerkId: user.clerkId,
                        username: user.username,
                        imageUrl: user.imageUrl,
                        description: user.description
                    }}/>
                </aside>
                <main className="w-4/5">
                    {children}
                </main>
            </div>
        }
        </>
        
    );
}
