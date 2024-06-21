import React from 'react';
import { Avatar, Card, CardBody, Rating, Typography } from '@/components/MaterialTailwind';


const EvaluationCard = (props) => {
    return (
        <Card className="w-2/3">
            <CardBody className="px-8 text-center">
                <Typography variant="paragraph" className="mb-6 font-medium">
                    {props.evaluation.note}
                </Typography>
                <Avatar
                    src={props.evaluation.from.imageUrl}
                    alt="user avatar"
                    size="md"
                />
                <Typography variant="h6" className="mt-4">
                    {props.evaluation.from.username}
                </Typography>
                <Typography variant="small" color="gray" className="flex items-center justify-center gap-2">Score awarded<Rating value={props.evaluation.mark} readonly /></Typography>
            </CardBody>
        </Card>
    );
}

export default EvaluationCard;