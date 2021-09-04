import React from 'react'
import { Typography, Button, Grid, Container } from '@material-ui/core'
import { classes } from 'istanbul-lib-coverage'
import useStyles from "./styles"
import Cartitem from './Cartitem/Cartitem';

function Cart({cart}) {
    const isEmpty = true;

    const classes = useStyles();

    if (!cart.line_items) return "loading..."

    const EmptyCart = () => {
        <Typography variant="subtitle1"> Your Cart is empty. Add to cart</Typography>
    }

    const FilledCart = () => (

        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id} >
                        <Cartitem item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4"> 
                    Subtotal: {cart.subtotal.formatted_with_symbol} 
                </Typography>

                <div>
                    <Button
                        className={classes.emptyButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="secondary"
                    >
                        Empty Cart
                    </Button>

                    <Button
                        className={classes.emptyButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="primary"
                    >
                        Checkout
                    </Button>
                </div>


            </div>

        </>
    )

    return (
        <Container>
            <div className = {classes.toolbar} />

            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart />  : <FilledCart /> }
            
        </Container>
    )
}

export default Cart

