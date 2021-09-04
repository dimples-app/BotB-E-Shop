//import { Cart } from "@chec/commerce.js/features/cart";
import React, {useEffect, useState} from "react";
import { Products, Navbar, Cart}  from "./components"
import {commerce} from "./lib/commerce"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

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

 const handleAddToCart = async(productId, quantity) => {
    const itemsInCart = await commerce.cart.add(productId, quantity)
    setCart(itemsInCart.cart)
 }
 
  /**
   * UseEffect to call fetchcall without side effects
   */
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])
  
  console.log("cart", cart)
  return ( 
   <>

    E - Shop
      <Navbar totalItemsInCart={cart.total_items}/>
      {/* {<Products products ={products} handleAddToCart ={handleAddToCart} />} */}
      <Cart cart={cart}/>
    </>
  )
}

export default App;