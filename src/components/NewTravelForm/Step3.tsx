import React, { useEffect, useState } from 'react';
import { Input, Select, Option } from '@/components/MaterialTailwind';

const Step3 = ({ transports, setFormData, formData }) => {
    const [genderActivated, setGenderActivated] = useState(false)

    const labelClasses = "!border-0 peer-focus:before:hidden before:hidden peer-focus:after:hidden after:hidden !peer-placeholder-shown:text-sm !text-sm !peer-focus:text-sm !static !order-1 !w-auto !p-0 !text-black peer-focus:text-white";
    const inputClasses = "!order-2 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-primary-color focus:!border-t-primary-color focus:ring-gray-600/5 !w-auto";
    const containerClasses = "min-w-[100px] h-auto !w-auto flex flex-col items-start";

    useEffect(() => {
        setFormData({
            ...formData,
            numberOfTraveller: formData.numberOfTraveller,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genderActivated]);

    return (
        <fieldset className="text-left flex flex-col gap-4">
            <div className="w-72">
                <Select
                    onChange={value => setFormData({
                        ...formData,
                        transport: value
                    })}
                    label="Select the transport means"
                    value={formData.transport}
                >
                    {transports.map((transport, index) => (
                        <Option key={index} value={transport._id}>{transport.value}</Option>
                    ))}
                </Select>
            </div>
            <div>
                <Input
                    max="5"
                    min="1"
                    label="Number of travellers"
                    type="number"
                    labelProps={{
                        className: labelClasses
                    }}
                    className={inputClasses}
                    containerProps={{ className: containerClasses + " flex-auto" }}
                    onChange={e => {
                        setFormData({
                            ...formData,
                            numberOfTraveller: e.target.value
                        });
                    }}
                    value={formData.numberOfTraveller}
                    required
                />
            </div>
        </fieldset>
    );
}

export default Step3;