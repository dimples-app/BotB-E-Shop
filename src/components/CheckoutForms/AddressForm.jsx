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

    const countries =  Object.entries(shippingCountries).map(([code, name]) => (
        { id: code, label:name}
    ))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
      }, []);

    
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

                    {/*<Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision </InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Subdivision
                            </MenuItem>
                        </Select>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options </InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Option
                            </MenuItem>
                        </Select>
                    </Grid> */}

                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
