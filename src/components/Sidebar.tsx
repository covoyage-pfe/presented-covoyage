"use client";
import React, { useRef, useState } from 'react';
import {
    Card,
    IconButton,
    Typography,
    Input,
    Button,
    Option,
    Select
} from '@/components/MaterialTailwind';


export default function Sidebar({criteria, onFilter, onFilterCriteriaChange, transports}) {
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLDivElement>();

    const handleOpen = () => {
        if (!open) {
            ref.current?.classList.remove('translate-x-[-100%]');
            ref.current?.classList.add('translate-x-0');
        } else {
            ref.current?.classList.remove('translate-x-0');
            ref.current?.classList.add('translate-x-[-100%]');
        }
        setOpen(!open);
    };

    return (
        <div className="sticky top-0 left-0 min-h-screen w-full" ref={ref}>
            <Card className="bg-slate-500 min-h-screen w-full p-4 shadow-xl shadow-blue-gray-900/5">
                <div className="p-4 mb-6 flex items-center justify-between text-secondary-color">
                    <Typography variant="h5">
                        Filter By
                    </Typography>
                    <IconButton className="rounded-full bg-gray-50 sticky top-0 left-[100%]" variant="text" color="blue-gray" onClick={handleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </IconButton>
                </div>
                <div className="p-2">
                    <Input
                        label="Arrival date is before"
                        type="date"
                        value={criteria.arrivalMaxDate}
                        onChange={e => onFilterCriteriaChange('arrivalMaxDate', e.target.value)}
                    />
                </div>
                <div className="p-2">
                    <Input
                        label="Minimum owner mark"
                        type="number"
                        max={5}
                        min={1}
                        value={criteria.ownerMinRate}
                        onChange={e => onFilterCriteriaChange('ownerMinRate', e.target.value)}
                    />
                </div>
                <div className="p-2">
                    <Input
                        label="Max travellers"
                        type="number"
                        max={5}
                        min={1}
                        value={criteria.maxTravellers}
                        onChange={e => onFilterCriteriaChange('maxTravellers', e.target.value)}
                    />
                </div>
                <div className="p-2">
                    <Select
                        label="Transport"
                        onChange={value => onFilterCriteriaChange('transport', value)}
                    >
                        {transports.map((transport, index) => (
                            <Option key={index} value={transport.code}>{transport.value}</Option>
                        ))}
                    </Select>
                </div>
                <Button color="gray" variant="text" onClick={onFilter}>Filter</Button>
            </Card>
        </div>
    );
}
