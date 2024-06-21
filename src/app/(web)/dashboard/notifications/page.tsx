"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Typography } from '@/components/MaterialTailwind';
import NotificationCard from '@/components/NotificationCard';


export default function MemoriesPage() {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const userId = useAuth().userId;

    useEffect(() => {
        fetch(`/api/v0/users/${userId}/notifications/update/all`, {method: "PUT"})
        .then(res => !res.ok ? console.log("cannot update notifications state") : null)
        .catch(error => console.log(error));

        fetch(`/api/v0/users/${userId}/notifications`)
        .then(res => {
            if (!res.ok) {
                setError(true);
                setLoading(false)
            } else {
                res.json()
                .then(data => {
                    setNotifications(data.notifications);
                    setError(false);
                    setLoading(false);
                    console.log(data)
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
        <div className="w-full p-2 flex flex-col gap-4">
            <Typography variant="h2">Notifications</Typography>
            <div className="w-full flex flex-col">
                {notifications.map((notif: any) => (
                    <NotificationCard
                        key={notif._id}
                        subject={notif.subject}
                        content={notif.content}
                        state={notif.state}
                        action={notif.action}
                    />
                ))}
            </div>
        </div>
    );
}