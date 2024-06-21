"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Typography, Button } from '@/components/MaterialTailwind';
import EvaluationCard from '@/components/EvaluationCard';
import Carousel from '@/components/Carousel';
import MessageDialog from '@/components/MessageDialog';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';
import { useAuth } from '@clerk/nextjs';


const Page = ({params})  => {
    const [openDialog, setOpenDialog] = useState(Boolean(useSearchParams().get('sendMessage')));
    const [error, setError] = useState(false);
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const authentifiedUserId = useAuth().userId;

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    }

    useEffect(() => {
        fetch(`/api/v0/users/${params.id}`)
        .then(res => {
            if (!res.ok) {
                setError(true);
                setLoading(false)
            } else {
                res.json()
                .then(data => {
                    setUser(data.user);
                    setError(false);
                    setLoading(false)
                console.log(data.user)
                })
                .catch(err => {
                    setError(true);
                    setLoading(false);
                })
            }
        })
        .catch(err => {
            setError(true);
            setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading ?
            <div className="w-full h-screen flex items-center justify-center"><Spinner /></div> :
            error ? <Typography variant="lead">Oups an error occurred</Typography> :
            <>
                <div className="flex flex-col gap-4">
                    <Typography variant="h3">Travels memories</Typography>
                    <div className="flex justify-between flex-wrap gap-y-5">
                        {user.photos.map((photo, index) =>
                        <Image
                            key={index}
                            src={photo.path}
                            alt="travel"
                            className="object-cover object-center"
                            width={280}
                            height={300}
                        />)}
                    </div>
                    {user.photos.length === 3 && <a className="self-end" href={`/users/${user.clerkId}/photos`}><Button variant="text" color="indigo">See more</Button></a>}
                </div>
                <div>
                    <Typography variant="h3">Comments</Typography>
                    {user.evaluations.content.length === 0 ?
                    <Typography variant="paragraph">No comments yet</Typography> :
                    <Carousel items={
                        user.evaluations.content.map((evaluation, index) =>
                        <EvaluationCard
                            key={index}
                            evaluation={evaluation}
                        />)}
                    />}
                </div>
                <div className="w-full">
                    <Button className="w-full normal-case font-bold" color="blue" size="lg" variant="outlined" onClick={handleOpenDialog}>Contact {user.username}</Button>
                    {openDialog && <MessageDialog open={openDialog} handleOpen={handleOpenDialog} receiver={user.clerkId} sender={authentifiedUserId} receiverUsername={user.username} />}
                </div>
            </>}
        </>
    );
}

export default Page;