"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Typography } from '@/components/MaterialTailwind';
import DashboardTravelCard from '@/components/DashboardTravelCard';
import { TravelStateCodeEnum } from '@/lib/travel';
import { useAuth } from '@clerk/nextjs';


export default function MemoriesPage() {
    const [travels, setTravels] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [canceled, setCanceled] = useState(false);

    const userId = useAuth().userId;
    
    const handleCancel = (id) => {
        fetch(`/api/v0/travels/${id}`, {method: "DELETE"})
        .then(res => {
            if (res.ok) {
                setCanceled(true);
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(`/api/v0/users/${userId}/travels`)
        .then(res => {
            if (!res.ok) {
                setError(true);
                setLoading(false)
            } else {
                res.json()
                .then(data => {
                    setTravels(data.travels);
                    setError(false);
                    setLoading(false);
                })
                .catch(err => {
                    setError(true);
                    setLoading(false);
                });
            }
        })
        .catch(err => {
            setError(true);
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const commingTravel: any = useMemo(() => {
        if (!travels) return null;
        return travels.find((travel: any) => travel.state === TravelStateCodeEnum.COMMING);
    }, [travels]);

    const otherTravels: any = useMemo(() => {
        if (!travels) return [];
        return travels.filter((travel: any) => travel.state !== TravelStateCodeEnum.COMMING);
    }, [travels]);

    return (!error ?
        <div className="w-full">
            <Typography variant="h2">My trips</Typography>
            <div className="flex flex-col w-full p-1 pr-4">
                <div className="flex flex-col border-2 border-gray-color rounded-md p-2 my-3 w-full">
                    <Typography variant="h3" color="green">Comming</Typography>
                    {canceled ? <Typography variant="lead">Travel canceled</Typography> : commingTravel ?
                    <DashboardTravelCard
                        id={commingTravel._id}
                        title={commingTravel.title}
                        departureDate={new Date(commingTravel.departure.date).toLocaleDateString()}
                        arrivalDate={new Date(commingTravel.arrival.date).toLocaleDateString()}
                        travellersNumber={commingTravel.numberOfTraveller}
                        state={commingTravel.state}
                    /> : null}
                    {<Button disabled={!commingTravel || canceled} variant="text" color="red" onClick={() => handleCancel(commingTravel._id)} className="self-end">Cancel</Button>}
                </div>
                <div className="border-t-2 border-primary-color py-4 w-full">
                    <Typography variant="h3" color="gray">Past trips</Typography>
                    <div className="flex flex-col w-full">
                        {otherTravels.map(travel =>
                            <DashboardTravelCard
                                key={travel._id}
                                id={travel._id}
                                title={travel.title}
                                departureDate={new Date(travel.departure.date).toLocaleDateString()}
                                arrivalDate={new Date(travel.arrival.date).toLocaleDateString()}
                                travellersNumber={travel.numberOfTraveller}
                                state={travel.state}
                            />
                        )}
                    </div>
                        
                </div>
            </div>
        </div> :
        <Typography variant="lead">Oops an error occured</Typography>
    );
}