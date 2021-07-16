import React from 'react';
import {Grid} from '@material-ui/core'
import Product from './Product/Product'

const products = [
    {id: 1, name: 'Shoes', description: 'Running shoes', price: `$10`, image: `https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`},
    {id: 1, name: 'Sandals', description: 'Wedding Sandal', price: `$20`, image: `https://images.pexels.com/photos/273930/pexels-photo-273930.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`},
]
const Products = () => {
    return (
        <main>
        <Grid container justify="center" spacing={4}>
            {
                products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product}/>
                    </Grid>
                ))
            }
        </Grid>
    </main>
    )
}

export default Products
