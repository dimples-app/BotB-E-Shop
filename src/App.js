//import { Cart } from "@chec/commerce.js/features/cart";
import React, {useEffect, useState} from "react";
import { Products, Navbar, Cart, Checkout}  from "./components"
import {commerce} from "./lib/commerce"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * function to fetch product
   */
  const fetchProducts = async() => {
    const response = await commerce.products.list();
    const data = response.data;
    setProducts(data)
  }

  /**
   * fetch cart
   */
  const fetchCart = async() => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  /**
   * Handle add items to cart
   * @param {*} productId 
   * @param {*} quantity 
   */
 const handleAddToCart = async(productId, quantity) => {
    // const itemsInCart = await commerce.cart.add(productId, quantity)
    // setCart(itemsInCart.cart)
    const {cart} = await commerce.cart.add(productId, quantity)
    setCart(cart);
 }

 /**
  * Update Cart Quantity
  * @param {} productId 
  * @param {*} quantity 
  */
 const handleUpdateCartQuantity = async(productId, quantity) => { 
  //const updatedItemsInCart = await commerce.cart.update(productId, {quantity})
  const {cart} = await commerce.cart.update(productId, {quantity})
  //setCart(updatedItemsInCart.cart)
  setCart(cart)

 }

/**
 * Remove from cart
 * @param {*} productId 
 */
const handleRemoveFromCart = async(productId) => { 
  // const removeItemsFromCart = await commerce.cart.update(productId);
  // setCart(removeItemsFromCart.cart)
  const {cart} = await commerce.cart.remove(productId);
  setCart(cart);
}

/**
 * empty cart
 */
const handleEmptyCart = async() => { 
  // const emptyCart = await commerce.cart.empty();
  // setCart(emptyCart.cart)
  const {cart} = await commerce.cart.empty();
  setCart(cart)
}

/**
 * Refresh cart
 */
const refreshCart = async () => {
  const newCart = await commerce.cart.refresh();

  setCart(newCart);
};

/**
 * 
 * @param {*} checkoutTokenId 
 * @param {*} newOrder 
 */
const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

    setOrder(incomingOrder);

    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.message);
  }
};
 
  /**
   * UseEffect to call fetchcall without side effects
   */
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])
  
  console.log("cart", cart)
  return ( 
   <div>
    E - Shop
     <Router>
      <Navbar totalItemsInCart={cart.total_items}/>

       <Switch>

          <Route exact path="/">
              <Products products ={products} handleAddToCart ={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
              <Cart 
              cart={cart}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
              />
          </Route>

          <Route path="/checkout" exact>
            <Checkout 
            cart={cart} 
            order={order} 
            onCaptureCheckout={handleCaptureCheckout} 
            error={errorMessage} 
            />
          </Route>

       </Switch>


     </Router>
    </div>
  )
}

export default App;