import { AppBar, Toolbar, Typography, Badge, MenuItem, Menu, IconButton } from '@material-ui/core'
import React from 'react'
import { ShoppingCart} from '@material-ui/icons'
import logo from '../../Assets/e-shop.png'
import { classes } from 'istanbul-lib-coverage'
import useStyles from "./styles.js"

function Navbar() {
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                          E-Shop
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button} >
                        <IconButton aria-label="Show cart items" color="inherit" >
                            <Badge badgeContent={2} color="secondary" >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
