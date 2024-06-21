"use client";
import React, { useEffect, useState } from 'react';
import { Button, Stepper, Step, Card, Alert } from '@/components/MaterialTailwind'
import Step1 from '@/components/NewTravelForm/Step1';
import Step2 from '@/components/NewTravelForm/Step2';
import Step3 from '@/components/NewTravelForm/Step3';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';
import { TransportData } from '@/models/transport';

const defaultFormData = {
    owner: 'user_2ggTnhMpQXrAXnhOZMC3XzUKiJz',
    title: '',
    description: '',
    departure: {
        city: '',
        date: ''
    },
    arrival: {
        city: '',
        date: ''
    },
    numberOfTraveller: 0,
    transport: '66493718823795ce0dc63e2b'
};

const Page = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [error, setError] = useState(false);
    const [sending, setSending] = useState(false);
    const [dismissError, setDismissError] = useState(false);
    const [transports, setTransports] = useState<TransportData[]>([]);
    const [formData, setFormData] = useState(defaultFormData);

    const stepClasses = "!bg-primary-color !border-2 !border-gray-color text-black cursor-pointer";
    const activeStepClasses = "ring-0 !bg-gray-color text-black !border-2 !border-gray-color";
    const completedStepClasses = "!bg-gray-color";
    
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setSending(true);
        fetch("/api/v0/travels", {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then(res => {
            res.json()
            .then(data => {
                if (data.error) {
                    setError(true);
                    console.log(data.error);
                } else {
                    router.push(`/travels/${data.newTravelId}`);
                }
            })
            .catch(error => {
                setError(true);
                console.log(error)
            })
        })
        .catch((error) => {
            setError(true);
            console.log(error)
        });
    };

    useEffect(() => {
        fetch("/api/v0/transports")
        .then(response => {
            response.json()
            .then((data: {transports: TransportData[]}) => setTransports(data.transports))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (error) {
            setSending(false);
            setDismissError(false);
        }
    }, [error])

    return (
        <>
            {error && 
                <Alert
                    open={!dismissError}
                    onClose={() => setDismissError(true)}
                    className="rounded-none border-l-4 border-red-color bg-red-color/10 font-medium text-red-color"
                >
                    Oops somthing went wrong ! Please try again
                </Alert>
            }
            {sending ?
                <div className="flex justify-center py-5">
                    <Spinner />
                </div>
                :
                <>
                    <h2 className="text-2xl text-secondary-color font-bold text-center mb-5 pt-5">Plan your next travel now</h2>
                    <Card className="p-5">
                        <form onSubmit={handleSubmit}>
                            <Stepper
                                activeStep={activeStep}
                                isLastStep={(value) => setIsLastStep(value)}
                                isFirstStep={(value) => setIsFirstStep(value)}
                                lineClassName="bg-primary-color"
                                activeLineClassName="bg-gray-color"
                            >
                                <Step
                                    className={stepClasses}
                                    activeClassName={activeStepClasses}
                                    completedClassName={completedStepClasses}
                                    onClick={() => setActiveStep(0)}
                                >
                                    1
                                </Step>
                                <Step
                                    className={stepClasses}
                                    activeClassName={activeStepClasses}
                                    completedClassName={completedStepClasses}
                                    onClick={() => setActiveStep(1)}
                                >
                                    2
                                </Step>
                                <Step
                                    className={stepClasses}
                                    activeClassName={activeStepClasses}
                                    completedClassName={completedStepClasses}
                                    onClick={() => setActiveStep(2)}
                                >
                                    3
                                </Step>
                            </Stepper>
                            <div className="my-3 px-3">
                                {activeStep === 0 ?
                                    <Step1
                                        setFormData={setFormData}
                                        formData={formData}
                                    />
                                : activeStep === 1 ?
                                    <Step2
                                        setFormData={setFormData}
                                        formData={formData}
                                    />
                                :
                                    <Step3
                                        setFormData={setFormData}
                                        formData={formData}
                                        transports={transports}
                                    />
                                }
                            </div>
                            <div className="mt-16 flex justify-between">
                                <Button
                                    className="bg-blue-color"
                                    onClick={handlePrev} disabled={isFirstStep}
                                >
                                    Previous
                                </Button>
                                {!isLastStep && <Button
                                    className="bg-green-color"
                                    onClick={handleNext} disabled={isLastStep}
                                >
                                    Next
                                </Button>}
                                {isLastStep &&
                                    <Button
                                        className="bg-green-color"
                                        type="submit"
                                    >
                                        Create
                                    </Button>
                                }
                            </div>
                        </form>
                    </Card>
                </>
            }
        </>
    );
}

export default Page;