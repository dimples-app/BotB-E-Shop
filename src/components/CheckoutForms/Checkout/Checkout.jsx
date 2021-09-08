import React from 'react'
import { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce'

function Checkout({cart}) {

    const steps = ['Shipping address', 'Payment details'];
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(0)
    const [shippingData, setShippingData] = useState({})
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                
                setCheckoutToken(token)
            } catch (error) {

            }
        }
        generateToken();
    }, [cart])

    //next step
    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1)

    //back step
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1)

    //pass shipping data to 
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const ConfirmationForm = () => (
        <div>
            Confirmation
        </div>
    );

    const Form = () => (activeStep === 0 ? 
        <AddressForm checkoutToken={checkoutToken} next={next}/> : 
            <PaymentForm 
                shippingData={shippingData} 
                checkoutToken={checkoutToken} 
                backStep={backStep}
                shippingData={shippingData}
            /> )

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
                    {activeStep === steps.length ? <ConfirmationForm /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Checkout
