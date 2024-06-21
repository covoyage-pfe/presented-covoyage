"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Input, Typography } from '@/components/MaterialTailwind';
import Image from 'next/image';


export default function MemoriesPage() {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const userId = useAuth().userId;

    const submit = async (e) => {
        e.preventDefault()

        try {
            const data = new FormData()
            data.set('file', e.target.files?.[0]);
        
            fetch(`/api/v0/users/${userId}/photos`, {
                method: 'POST',
                body: data
            })
            .then(res => {
                if (!res.ok) throw new Error("cannot upload");
                else {
                    res.json()
                    .then(data => setPhotos(data.photos))
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        } catch (e: any) {
            console.error(e)
        }
      }

    useEffect(() => {
        fetch(`/api/v0/users/${userId}/photos`)
        .then(res => {
            if (!res.ok) {
                setError(true);
                setLoading(false)
            } else {
                res.json()
                .then(data => {
                    setPhotos(data.photos);
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
            <Typography variant="h2">Travels memories</Typography>
            <div className="w-full flex flex-wrap gap-5 p-5">
                {photos.map((photo: any) => (
                    <div key={photo._id} className="cursor-pointer relative w-[20vw] h-[140px]">
                        <Image
                            src={photo.path}
                            alt="travel memory"
                            fill
                        />
                    </div>
                ))}
            </div>
            <ImageInput upload={submit}/>
        </div>
    );
}

function ImageInput({upload}) {
    return (
        <div className="py-20 bg-white px-2">
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                <div className="md:flex">
                    <div className="w-full p-3">
                        <div className="relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                            <div className="absolute">
                                <div className="flex flex-col items-center">
                                    <span className="block text-gray-400 font-normal">add you image here</span>
                                </div>
                            </div>
                            <input type="file" className="h-full w-full opacity-0" onChange={upload} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
