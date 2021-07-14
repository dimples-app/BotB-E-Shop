import { IconButton, Typography } from '@material-ui/core'
import { CardContent, CardMedia } from '@material-ui/core'
import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import { classExpression } from '@babel/types'

const Product = (props) => {
    const {product} = props;
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image='' title={Product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterButton>
                        {Product.name}
                    </Typography>
                    <Typography variant="h5" gutterButton>
                        {Product.price}
                    </Typography>
                    <Typography variant="h2" color='textSecondary'>
                        {Product.description}
                    </Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>

        </Card>
    )
}

export default Product
