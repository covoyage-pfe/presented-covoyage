import React from 'react';
import { Typography } from '@/components/MaterialTailwind';
import { FaRegUser } from 'react-icons/fa';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import { TravelStateCodeEnum } from '@/lib/travel';
import Link from 'next/link';


interface DashboardTravelCardProps {
    id: string
    title: string
    departureDate: string
    arrivalDate: string
    travellersNumber: number
    state: TravelStateCodeEnum
}

export default function DashboardTravelCard({
    id,
    title,
    departureDate,
    arrivalDate,
    travellersNumber,
    state
}: DashboardTravelCardProps) {

    return (
        <Link href={`/dashboard/my-trips/${id}`}>
            <div className="flex flex-col border-2 bg-[#f5f5f5]] rounded-xl divide-y-2 divide-dashed divide-primary-color p-2">
                <Typography variant="lead">{title}</Typography>
                <div className="flex items-center gap-2 w-full">
                    <Typography variant="paragraph" className="flex items-center gap-1">
                        <FaRegUser /> {travellersNumber}
                    </Typography>
                    <RxDividerVertical />
                    <Typography variant="paragraph" className="flex items-center gap-1">
                        <IoCalendarNumberOutline />{departureDate} - <IoCalendarNumberOutline />{arrivalDate}
                    </Typography>
                </div>
            </div>
        </Link>
    );
}
