import React from 'react';
import './style.css';

interface TextareaProps {
    label?: string
    id?: string
    className?: string
    placeholder?: string
    validated?: boolean
    validationMessage?: string
    rows?: number
    cols?: number
}

const Textarea = (props: TextareaProps) => {
    return (
        <div className="mb-4">
            <div className="input-wrapper">
                {props.label &&
                    <label className="text-gray-700 text-sm font-bold mb-2 label" htmlFor={props?.id}>
                        {props.label}
                    </label>
                }
                <textarea className="input" id={props?.id} placeholder={props?.placeholder} rows={props.rows || 10} cols={props.cols || 15} />
            </div>
            {props.validated && props.validationMessage && <p className="text-red-500 text-xs italic">{props.validationMessage}</p>}
        </div>
    );
}

export default Textarea;