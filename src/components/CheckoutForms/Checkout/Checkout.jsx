import React from 'react'
import { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

function Checkout() {

    const steps = ['Shipping address', 'Payment details'];
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

    const ConfirmationForm = () => (
        <div>
            Confirmation
        </div>
    );

    const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm /> )

    return (

        <>
        <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <ConfirmationForm /> : <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Checkout
