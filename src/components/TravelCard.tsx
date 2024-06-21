import React from 'react';
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Rating,
} from '@/components/MaterialTailwind';
import Link from 'next/link';


export default function TravelCard({travel}) {
    return (
        <Link className="mt-6 w-3/4" href={`/travels/${travel._id}`}>
            <Card>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        <div className="flex items-center gap-4">
                            <Avatar
                                src={travel.owner.imageUrl}
                                alt="avatar"
                            />
                            <div>
                                <Typography variant="h6">{travel.owner.username}</Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    <Rating readonly value={travel.owner.rate[0]}/>
                                </Typography>
                            </div>
                        </div>
                    </Typography>
                    <Typography variant="h4" color="blue" className="mb-2">
                        {travel.title}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Timeline>
                        <TimelineItem>
                            <TimelineConnector />
                            <TimelineHeader>
                                <TimelineIcon className="p-2">
                                    {/* <HomeIcon className="h-4 w-4" /> */}
                                </TimelineIcon>
                                <Typography variant="h5" color="blue-gray">
                                    {travel.departure.city}
                                </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-8">
                                <Typography color="gray" className="font-normal text-gray-600">
                                    {new Date(travel.departure.date).toLocaleDateString()}
                                </Typography>
                            </TimelineBody>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineHeader>
                                <TimelineIcon className="p-2">
                                    {/* <HomeIcon className="h-4 w-4" /> */}
                                </TimelineIcon>
                                <Typography variant="h5" color="blue-gray">
                                    {travel.arrival.city}
                                </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-8">
                                <Typography color="gray" className="font-normal text-gray-600">
                                    {new Date(travel.arrival.date).toLocaleDateString()}
                                </Typography>
                            </TimelineBody>
                        </TimelineItem>
                    </Timeline>
                </CardFooter>
            </Card>
        </Link>
    );
}
