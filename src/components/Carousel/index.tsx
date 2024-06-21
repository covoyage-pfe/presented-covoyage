"use  client";
import React, { useState } from 'react';


const Carousel = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const handleClick = (index) => {
		setCurrentIndex(index);
    };

    return (
        <>
            {props.items.length && (
            <div className="w-full flex justify-center flex-col items-center gap-3">
                <div className="w-full flex justify-center flex-1">
                    {props.items[currentIndex]}
                </div>

                <div className="flex gap-5">
                    <div className="rounded-full flex justify-center items-center text-lg shadow-blue-gray-900 shadow-2xl w-[50px] h-[50px] hover:bg-secondary-color hover:text-white transition duration-300" onClick={() => handleClick(currentIndex === 0 ? props.items.length - 1 : currentIndex - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-[20px] h-[20px] bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </div>

                    <div className="rounded-full flex justify-center items-center text-lg shadow-blue-gray-900 shadow-2xl w-[50px] h-[50px] hover:bg-secondary-color hover:text-white transition duration-300" onClick={() => handleClick(currentIndex === props.items.length - 1 ? 0 : currentIndex + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-[20px] h-[20px] bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </div>
                </div>
            </div>)}
        </>
    );
}

export default Carousel;