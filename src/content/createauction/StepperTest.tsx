import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Card, CardHeader, Grid, InputLabel, StepContent, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import CreateStep1 from "./steps/Step1";
import CreateStep2 from "./steps/Step2";
import CreateStep3 from "./steps/Step3";
import CreateStep4 from "./steps/Step4";
import {useState} from "react";

export default function HorizontalLinearStepper({setFormData, formData}) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const { t }: { t: any } = useTranslation();

    let timer;

    const updateFormData = (key, value) => {
        formData[key] = value;
        setFormData(formData);
    }

    const isStepOptional = (step: number) => {
        return false;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const steps = [
        {
            label: 'Basic Auction Details',
            description: `Below, please give your auction a name and select the currency this auction will take place in. For convenience, you can search for popular currencies by name, or enter the address of a custom token.`,
            content: <CreateStep1 updateFormField={updateFormData} formData={formData} />
        },
        {
            label: 'Auction Settings',
            description: 'Next, enter the information requested below to configure your auction.',
            content: <CreateStep2 updateFormField={updateFormData} formData={formData} />
        },
        {
            label: 'Optional Features',
            description: `By default, your auction will end when the time runs out. If you wish, you can enable custom auction modes below.`,
            content: <CreateStep3 updateFormField={updateFormData} formData={formData} />
        },
        {
            label: 'Confirm & Deposit Initial Value',
            description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
            content: <CreateStep4 updateFormField={updateFormData} formData={formData} />
        }
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Card>
                <CardHeader title={t('Create an Auction')} sx={{
                    pl: 2,
                    pr: 2,
                    background: 'rgb(0,1,27,50%)'
                }}></CardHeader>

                <Grid container spacing={3} sx={{ pt: 0, pl: 3, pr: 3, pb: 3 }}>
                    <Grid item xs={12}>
            <Stepper activeStep={activeStep}  orientation="vertical" sx={{background:"none"}}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 3 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            {step.content}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}