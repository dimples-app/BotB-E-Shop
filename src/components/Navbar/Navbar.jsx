import { AppBar, Toolbar, Typography, Badge, MenuItem, Menu, IconButton } from '@material-ui/core'
import React from 'react'
import { ShoppingCart} from '@material-ui/icons'
import logo from '../../Assets/e-shop.png'
import { classes } from 'istanbul-lib-coverage'
import useStyles from "./styles.js"
import {Link} from "react-router-dom"
import {useLocation} from "react-router-dom"

function Navbar({totalItemsInCart}) {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component ={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                          E-Shop
                    </Typography>
                    <div className={classes.grow} />
                    { location.pathname === "/" && (
                    <div className={classes.button} >
                        <IconButton component ={Link} to="/cart" aria-label="Show cart items" color="inherit" >
                            <Badge badgeContent={totalItemsInCart} color="secondary" >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
