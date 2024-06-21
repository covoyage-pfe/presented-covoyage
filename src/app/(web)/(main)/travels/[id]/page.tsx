"use client";
import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Rating, Button, Alert } from '@/components/MaterialTailwind'
import Spinner from '@/components/Spinner';
import { SubscriptionStateCodeEnum } from '@/lib/subscription';
import MessageDialog from '@/components/MessageDialog';
import { useAuth } from '@clerk/nextjs';

const Page = ({ params }: { params: { id: string } }) => {
    const [travel, setTravel]: any[] = useState({});
    const [fetching, setFetching] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);
    const [error, setError] = useState(false);
    const [participationError, setParticipationError] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [subscriptionState, setSubscriptionState] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const authentifiedUserId = useAuth().userId;

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    }

    const askParticipation = () => {
        setFetching(true);
        fetch(`/api/v0/travels/${params.id}/subscriptions`, {
            method: "POST",
            body: JSON.stringify({
                subscriber: authentifiedUserId
            })
        })
        .then(res => {
            if (!res.ok) {
                setParticipationError(true);
                setFetching(false);
            } else {
                res.json()
                .then(data => {
                    setParticipationError(false);
                    setFetching(false);
                    setSubscribed(true);
                    setSubscriptionState(data.subscriptionState)
                })
                .catch(err => {
                    setParticipationError(true);
                    setFetching(false);
                });
            }
        })
        .catch(err => {
            setParticipationError(true);
            setFetching(false);
        });
    }


    useEffect(() => {
        fetch(`/api/v0/travels/${params.id}`, {cache: "no-store"})
        .then(response => {
            response.json()
            .then((data) => {
                if (data.error) {
                    setError(true);
                    console.log(data);
                } else {
                    setTravel(data.travel);
                    const findSubscription = data.travel.participations.find((p) => p.user.clerkId === authentifiedUserId);
                    setSubscribed(findSubscription ? true : false);
                    setSubscriptionState(findSubscription?.state)
                }
                setFirstLoading(false);
            })
            .catch(error => {
                setFirstLoading(false);
                console.log(error);
            });
        })
        .catch(error => {
            setFirstLoading(false);
            setError(true);
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="flex justify-center items-stretch flex-col gap-4 w-3/4 m-auto">
        {firstLoading ?
            <div className="w-full h-screen flex items-center justify-center"><Spinner /></div> :
            error ? <Typography variant="lead">Oups an error occurred</Typography> :
            <>
                {participationError && <Alert className="text-center" variant="filled" color="red">Error when sending the participation request</Alert>}
                <Typography variant="h2" className="text-center">{travel.title}</Typography>
                <Typography variant="paragraph" className="text-center">{travel.description}</Typography>
                <Typography variant="lead">Created by</Typography>
                <div>
                    <div className="flex items-center gap-4">
                        <Avatar
                            src={travel.owner.imageUrl}
                            alt="avatar"
                            withBorder={true}
                            className="p-0.5"
                        />
                        <div>
                            <Typography variant="paragraph">{travel.owner.username}</Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                <Rating value={travel.owner.evaluations.average} readonly />
                            </Typography>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-5">
                        <a href={`/users/${travel.owner.clerkId}`}><Button variant="gradient" color="blue">Voir profil</Button></a>
                        <Button variant="gradient" color="blue" onClick={handleOpenDialog}>Contacter</Button>
                    </div>
                </div>
                <div className="self-start w-full">
                    <Typography variant="lead">Details</Typography>
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="rounded shadow-md pl-2 pr-24 py-3 bg-primary-color">
                            <Typography variant="lead">departure </Typography>
                            <p className="pl-5">
                                {travel.departure.city}<br/>
                                {new Date(travel.departure.date).toLocaleDateString()}
                            </p>
                        </div>
                        <span className="block h-56 w-px bg-gray-color m-auto"></span>
                        <div className="rounded shadow-md pl-2 pr-24 py-3 bg-primary-color">
                            <Typography variant="lead">Arrival </Typography>
                            <p className="pl-5">
                                {travel.arrival.city}<br/>
                                {new Date(travel.arrival.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex flex-col items-center">
                    <Typography variant="lead">You would travel will</Typography>
                    {travel.participations.length > 0 ?
                    <div className="flex flex-wrap justify-center gap-y-4 gap-x-4">
                        {travel.participations.map((p: any, index) => <a key={index} href={`/users/${p.user.clerkId}`} className="flex flex-col items-center"><Avatar src={p.user.imageUrl} size="sm" /><Typography>{p.user.username}</Typography></a>)}
                    </div> : <p>No user subscribed yet</p>}

                </div>
                <div className="m-5 flex justify-center">
                    <Button color="green" disabled={fetching || subscribed || authentifiedUserId === travel.owner.clerkId} onClick={askParticipation}>
                        {!subscribed ? "Ask for participation" :
                        subscriptionState === SubscriptionStateCodeEnum.PENDING ?
                        "Participation request sent, waiting for response" :
                        subscriptionState === SubscriptionStateCodeEnum.REJECTED ?
                        "Participation request rejected, you cannot participate to this travel" :
                        "Participation request accepted, prepare your belongings for the trip"}
                    </Button>
                </div>
                {openDialog && <MessageDialog open={openDialog} handleOpen={handleOpenDialog} receiver={travel.owner.clerkId} sender={authentifiedUserId} receiverUsername={travel.owner.username} />}
            </>
        }
        </main>
    );
}

export default Page;