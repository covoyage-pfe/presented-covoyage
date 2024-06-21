"use client";
import { UserProfile, useAuth } from '@clerk/nextjs';
import React from 'react';


export default function AccountPage() {
    const {isLoaded} = useAuth();

    return (
        <div className="w-full flex justify-center">
            {isLoaded && <UserProfile path="/dashboard/my-account" />}
        </div>
    );
}
