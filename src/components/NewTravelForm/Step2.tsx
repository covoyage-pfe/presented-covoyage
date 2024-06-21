import React, { useState } from 'react';
import { Input } from '@/components/MaterialTailwind';

const Step2 = ({setFormData, formData}) => {

    const labelClasses = "!border-0 peer-focus:before:hidden before:hidden peer-focus:after:hidden after:hidden !peer-placeholder-shown:text-sm !text-sm !peer-focus:text-sm !static !order-1 !w-auto !p-0 !text-black peer-focus:text-white";
    const inputClasses = "!order-2 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-primary-color focus:!border-t-primary-color focus:ring-gray-600/5 !w-auto";
    const containerClasses = "min-w-[100px] h-auto !w-auto flex flex-col items-start";

    return (
        <fieldset className="text-center flex flex-col gap-8">
            <div>
                <p className="text-left">Departure</p>
                <hr className="my-4" />
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap gap-5">
                        <Input
                            label="City"
                            labelProps={{
                                className: labelClasses
                            }}
                            className={inputClasses + " self-stretch"}
                            containerProps={{ className: containerClasses + " flex-auto" }}
                            onChange={e => setFormData({
                                ...formData,
                                departure: {
                                    ...formData.departure,
                                    city: e.target.value
                                }
                            })}
                            value={formData.departure.city}
                            required
                        />
                        <Input
                            label="Date"
                            type="date"
                            labelProps={{
                                className: labelClasses
                            }}
                            className={inputClasses}
                            containerProps={{ className: containerClasses }}
                            onChange={e => setFormData({
                                ...formData,
                                departure: {
                                    ...formData.departure,
                                    date: e.target.value
                                }
                            })}
                            value={formData.departure.date}
                            required
                        />
                    </div>
                </div>
            </div>
            <div>
                <p className="text-left">Arrival</p>
                <hr className="my-4" />
                <div className="flex flex-wrap gap-5">
                    <Input
                        label="City"
                        labelProps={{
                            className: labelClasses
                        }}
                        className={inputClasses + " self-stretch"}
                        containerProps={{ className: containerClasses + " flex-auto" }}
                        onChange={e => setFormData({
                            ...formData,
                            arrival: {
                                ...formData.arrival,
                                city: e.target.value
                            }
                        })}
                        value={formData.arrival.city}
                        required
                    />
                    <Input
                        label="Date"
                        type="date"
                        labelProps={{
                            className: labelClasses
                        }}
                        className={inputClasses}
                        containerProps={{ className: containerClasses }}
                        onChange={e => setFormData({
                            ...formData,
                            arrival: {
                                ...formData.arrival,
                                date: e.target.value
                            }
                        })}
                        value={formData.arrival.date}
                        required
                    />
                </div>
            </div>
        </fieldset>
    );
}

export default Step2;