import React from 'react';
import './style.css';

interface InputProps {
    type?: string
    label?: string
    id?: string
    className?: string
    placeholder?: string
    validated?: boolean
    validationMessage?: string
}

const Input = (props: InputProps) => {
    return (
        <div className="mb-4">
            <div className="input-wrapper">
                {props.label &&
                    <label className="text-gray-700 text-sm font-bold mb-2 label" htmlFor={props.id}>
                        {props.label}
                    </label>
                }
                <input className="input" id={props.id} type="text" placeholder={props.placeholder} />
            </div>
            {props.validated && props.validationMessage && <p className="text-red-500 text-xs italic">{props.validationMessage}</p>}
        </div>
    );
}

export default Input;