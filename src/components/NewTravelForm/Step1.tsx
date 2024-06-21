import React from 'react';
import { Input, Textarea } from '@/components/MaterialTailwind';

const Step1 = ({setFormData, formData}) => {
    const labelClasses = "!border-0 peer-focus:before:hidden before:hidden peer-focus:after:hidden after:hidden !peer-placeholder-shown:text-sm !text-sm !peer-focus:text-sm !static !order-1 !w-1/5 !p-0 !text-black peer-focus:text-white";
    const inputClasses = "!order-2 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-primary-color focus:!border-t-primary-color focus:ring-gray-600/5";
    
    return (
        <fieldset className="text-center">
            <div className="flex flex-col gap-5">
                <Input
                    label="Title"
                    labelProps={{
                        className: labelClasses
                    }}
                    className={inputClasses}
                    containerProps={{ className: "min-w-[100px] h-auto flex items-center" }}
                    onChange={e => setFormData({
                        ...formData,
                        title: e.target.value
                    })}
                    name="title"
                    value={formData.title}
                    required
                />
                <Textarea
                    rows={8}
                    label="Description"
                    labelProps={{
                        className: labelClasses
                    }}
                    className={inputClasses}
                    containerProps={{ className: "min-w-[100px] h-auto flex items-start" }}
                    onChange={e => setFormData({
                        ...formData,
                        description: e.target.value
                    })}
                    name="description"
                    value={formData.description}
                    required
                />
            </div>
        </fieldset>
    );
}

export default Step1;