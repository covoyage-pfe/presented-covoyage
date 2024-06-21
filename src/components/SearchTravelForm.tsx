import React from 'react';
import { Button, Input } from '@/components/MaterialTailwind';


export default function SearchTravelForm({criteria, onSearch, onSearchCriteriaChange}) {

    return (
        <div className="w-full flex justify-between items-center p-8 border-b border-b-blue-gray-100">
            <div className="flex gap-3">
                <Input
                    type="text"
                    label="departure address"
                    value={criteria.departureCity}
                    onChange={e => onSearchCriteriaChange('departureCity', e.target.value)}
                />
                <Input
                    type="text"
                    label="arrival address"
                    value={criteria.arrivalCity}
                    onChange={e => onSearchCriteriaChange('arrivalCity', e.target.value)}
                />
                <Input
                    type="date"
                    label="departure date"
                    value={criteria.departureDate}
                    onChange={e => onSearchCriteriaChange('departureDate', e.target.value)}
                />
            </div>
            <div>
                <Button disabled={!criteria.departureCity || !criteria.departureDate || !criteria.arrivalCity} color="teal" onClick={onSearch}>Search</Button>
            </div>
        </div>
    );
}
