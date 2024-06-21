"use client";
import React, { useEffect, useState } from 'react';
import SearchTravelForm from '@/components/SearchTravelForm';
import Sidebar from '@/components/Sidebar';
import { TransportData } from '@/models/transport';
import TravelCard from '@/components/TravelCard';
import Spinner from '@/components/Spinner';


interface SpatioTemporal {
    date?: string
    city?: string
}

const Page = () => {
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [transports, setTransports] = useState<TransportData[]>([]);
    const [searchCriteria, setSearchCriteria] = useState({
        departureCity: '',
        arrivalCity: '',
        departureDate: '',
        arrivalMaxDate: '',
        transport: '',
        ownerMinRate: '',
        maxTravellers: ''
    });
    
    useEffect(() => {
        fetch("/api/v0/transports")
        .then(response => {
            response.json()
            .then((data: {transports: TransportData[]}) => setTransports(data.transports))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = () => {
        setLoading(true);
        fetch(`/api/v0/travels?${new URLSearchParams({
            ...searchCriteria
        }).toString()}`, {cache: 'no-store'})
        .then(res => {
            if (!res.ok) {
                console.log("cannot get the listing");
                setLoading(false);
            } else {
                res.json()
                .then(data => {
                    setTravels(data.travels);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
            }
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    };

    const handleChange = (criterion: 'departureCity' | 'arrivalCity' | 'departureDate' | 'arrivalMaxDate' | 'transport' | 'ownerMinRate' | 'maxTravellers', value: string|undefined) => {
        setSearchCriteria({
            ...searchCriteria,
            [criterion]: value
        })
    }
    
    return (
        <main className="flex">
            <aside className="w-1/4">
                <Sidebar
                    criteria={searchCriteria}
                    onFilter={handleSearch}
                    onFilterCriteriaChange={handleChange}
                    transports={transports}
                />
            </aside>
            <section className="flex flex-col items-center w-full">
                <SearchTravelForm criteria={searchCriteria} onSearch={handleSearch} onSearchCriteriaChange={handleChange}/>
                <div className=" w-full flex flex-col justify-center items-center gap-4">
                    {loading && <div className="w-full pt-24 flex items-center justify-center"><Spinner /></div>}
                    {travels.map((travel, index) => <TravelCard key={index} travel={travel} />)}
                </div>
            </section>
        </main>
        
    );
}

export default Page;