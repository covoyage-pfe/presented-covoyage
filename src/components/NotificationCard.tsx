import React from 'react';
import { Typography } from '@/components/MaterialTailwind';
import { FaRegUser } from 'react-icons/fa';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import Link from 'next/link';
import { NotificationStateCodeEnum } from '@/lib/notification';
import { HiOutlineInboxArrowDown } from 'react-icons/hi2';


interface NotificationCardProps {
    subject: string
    content: string
    state: string
    action: string
}

export default function NotificationCard({
    subject,
    content,
    state,
    action
}: NotificationCardProps) {

    return (
        action && <Link href={action}>
            <div className={`flex flex-col border-2 border-${state === NotificationStateCodeEnum.UNREAD ? 'amber-500' : 'primary-color'} rounded-xl p-2`}>
                <div>
                    <Typography className="flex gap-2 items-center" variant="lead"><HiOutlineInboxArrowDown />{subject}</Typography>
                </div>
                <div className="flex items-center gap-2 w-full pl-4">
                    <Typography variant="paragraph" className="flex items-center gap-1">
                        {content}
                    </Typography>
                </div>
            </div>
        </Link>
    );
}
