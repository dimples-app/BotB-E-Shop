import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from "./FormInput"
import {commerce} from '../../lib/commerce'

function AddressForm({checkoutToken}) {
    const method = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    //convert obj to arr and mapping over
    const countries =  Object.entries(shippingCountries).map(([code, name]) => (
        { id: code, label:name}
    ))

    //convert obj to arr and mapping over
    const subdivisions =  Object.entries(shippingSubdivisions).map(([code, name]) => (
        { id: code, label:name}
    ))

    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

    // fetching countries from commerce
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    // fetching subdivision from commerce
    const fetSubDivisions = async(countrycode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countrycode);
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    // fetching shipping options
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    
        setShippingOptions(options);
        setShippingOption(options[0].id);
      };
 
    // useeffect - fetching countries
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    // useefect - fetching subdivision
    useEffect(() => {
        if(shippingCountry) fetSubDivisions(shippingCountry);
    }, [shippingCountry]);

    // useeffect - fetching options
    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry,shippingSubdivision )
    }, [shippingSubdivision])
    
    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...method}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput 
                            required 
                            name='firstName' 
                            label='First Name' 
                        />

                        <FormInput 
                            required 
                            name='lastName' 
                            label='Last Name' 
                        />

                        <FormInput 
                            required 
                            name='address' 
                            label='Address' 
                        />  

                        <FormInput 
                            required 
                            name='email' 
                            label='Email' 
                        />

                        <FormInput 
                            required 
                            name='city' 
                            label='City' 
                        />

                        <FormInput 
                            required 
                            name='zip' 
                            label='Zip/Poatal Code' 
                        />

                    </Grid>

                     <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(event) => setShippingCountry(event.target.value)}>
                           {countries.map((county) => (
                               <MenuItem key={county.id} value={county.id}>
                                   {county.label}
                                </MenuItem>
                           ))}
                            
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision </InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(event) => setShippingSubdivision(event.target.value)}>
                            {subdivisions.map((division) => (
                                <MenuItem key={division.id} value={division.id}>
                                    {division.label}
                                </MenuItem>
                            ))}
                            
                        </Select>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options </InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(event) => setShippingOption(event.target.value)}>
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid> 

                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
