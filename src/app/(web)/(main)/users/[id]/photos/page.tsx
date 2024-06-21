"use client"
import Spinner from '@/components/Spinner';
import { Typography } from '@/components/MaterialTailwind';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';

const UserPhotosPage = ({params}) => {
    const [active, setActive] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [photos, setPhotos] = React.useState<any>([]);

    useEffect(() => {
        fetch(`/api/v0/users/${params.id}/photos`)
        .then(res => {
            if (!res.ok) {
                setError(true);
                setLoading(false);
            } else {
                res.json()
                .then(data => {
                    setPhotos(data.photos);
                    setError(false);
                    setLoading(false)
                })
                .catch(() => {
                    setError(true);
                    setLoading(false)
                });
            }
        })
        .catch(err => {
            setError(true);
            setLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (photos.length > 0) {
            setActive(photos[0].path);
        }
    }, [photos])
   
    return (
        <>
            {loading ? <div className="h-full w-full flex justify-center items-center"> <Spinner /> </div> :
            error ? <Typography variant="lead">Ooops an unhandled error occurs</Typography> :
            <div className="grid gap-4">
                <div className="sticky top-0 h-[50vh]">
                    <img
                        className="h-full w-full max-w-full rounded-lg object-cover object-center"
                        src={active}
                        alt=""
                    />
                </div>
                <div className="grid grid-cols-5 gap-4">
                {photos.map(({ path }, index) => (
                    <div key={index}>
                        <img
                            onClick={() => setActive(path)}
                            src={path}
                            className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                            alt="gallery-image"
                        />
                    </div>
                ))}
                </div>
            </div>}
        </>
    );
}

export default UserPhotosPage;