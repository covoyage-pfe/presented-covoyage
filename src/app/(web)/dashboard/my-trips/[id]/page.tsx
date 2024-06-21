"use client";
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Input, Option, Select, Textarea, Typography } from '@/components/MaterialTailwind';
import Spinner from '@/components/Spinner';
import { TransportData } from '@/models/transport';
import { SubscriptionStateCodeEnum } from '@/lib/subscription';


export default function TravelEditPage({params}) {
    const [travel, setTravel] = useState<any>({});
    const [transports, setTransports] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    const handleSave = (id) => {
        fetch(`/api/v0/travels/${id}`, {method: "PUT"})
        .then(res => {
            if (res.ok) {
                setSaved(true);
            }
        })
        .catch(err => console.log(err))
    }

    const handleChange = (field, value) => {
        setTravel({
            ...travel,
            [field]: value
        })
    }
    
    useEffect(() => {
        fetch(`/api/v0/travels/${params.id}`)
        .then(res => {
            if (!res.ok) {
                setError(true);
                setLoading(false)
            } else {
                res.json()
                .then(data => {
                    const depDate = new Date(data.travel.departure.date);
                    const arrDate = new Date(data.travel.arrival.date);
                    setTravel({
                        ...data.travel,
                        departure: {
                            ...data.travel.departure,
                            date: `${depDate.getFullYear()}-${depDate.getMonth() + 1 < 10 ? '0' : ''}${depDate.getMonth() + 1}-${depDate.getDate() < 10 ? '0' : ''}${depDate.getDate()}`
                        },
                        arrival: {
                            ...data.travel.arrival,
                            date: `${arrDate.getFullYear()}-${arrDate.getMonth() + 1 < 10 ? '0' : ''}${arrDate.getMonth() + 1}-${arrDate.getDate() < 10 ? '0' : ''}${arrDate.getDate()}`
                        }
                    });
                    fetch("/api/v0/transports")
                    .then(response => {
                        response.json()
                        .then((data: {transports: TransportData[]}) => {
                            setTransports(data.transports);
                            setError(false);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.log(error);
                            setError(true);
                            setLoading(false);
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        setError(true);
                        setLoading(false);
                    });
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

    return (
        <div className="py-10">
            <Typography className="p-2" variant="h2">Edit travel</Typography>
            <div className="flex flex-col gap-4 p-5">
            {loading ? <div className="w-full pt-24 flex items-center justify-center"><Spinner /></div> :
                <>
                    <Input
                        label="Title"
                        value={travel.title}
                        onChange={e => setTravel({...travel, title: e.target.value})}
                    />
                    <Textarea
                        label="Description"
                        value={travel.description}
                        onChange={e => setTravel({...travel, description: e.target.value})}
                    ></Textarea>
                    <Typography variant="lead">Departure</Typography>
                    <div className="flex gap-4">
                        <Input
                            label="address"
                            value={travel.departure.city}
                            onChange={e => setTravel({...travel, departure: {city: e.target.value}})}
                        />
                        <Input
                            type="date"
                            label="date"
                            value={travel.departure.date}
                            onChange={e => setTravel({...travel, departure: {date: e.target.value}})}
                        />
                    </div>
                    <Typography variant="lead">Arrival</Typography>
                    <div className="flex gap-4">
                        <Input
                            label="address"
                            value={travel.arrival.city}
                            onChange={e => setTravel({...travel, arrival: {city: e.target.value}})}
                        />
                        <Input
                            type="date"
                            label="date"
                            value={travel.arrival.date}
                            onChange={e => setTravel({...travel, arrival: {date: e.target.value}})}
                        />
                    </div>
                    <Typography variant="lead">Preferences</Typography>
                    <div className="flex gap-4">
                        <Input
                            label="Number of traveller"
                            type="number"
                            value={travel.numberOfTraveller}
                            onChange={e => setTravel({...travel, numberOfTraveller: e.target.value})}
                        />
                        <Select
                            label="Transport"
                            value={travel.transport}
                            onChange={value => setTravel({...travel, transport: value})}
                        >
                            {transports.map((transport: any) => 
                                <Option key={transport.code} value={transport._id}>{transport.value}</Option>
                            )}
                        </Select>
                    </div>
                    <Button color='green'>Save modifications</Button>
                </>
            }
            </div>
            <Typography>Participations</Typography>
            <Card>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" colSpan={2}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    User
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" colSpan={2}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Actions
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {travel?.participations?.map((p, index) => {
                            return (
                                <tr key={index}>
                                    <td><Avatar size="sm" src={p.user.imageUrl}/></td>
                                    <td>{p.user.username}</td>
                                    <td><Button size="sm" color="blue">Accept</Button></td>
                                    <td><Button size="sm" color="red">Reject</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
