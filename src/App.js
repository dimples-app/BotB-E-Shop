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
   <div>
    E - Shop
     <Router>
      <Navbar totalItemsInCart={cart.total_items}/>

       <Switch>

          <Route exact path="/">
              <Products products ={products} handleAddToCart ={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
              <Cart cart={cart}/>
          </Route>

       </Switch>


     </Router>
    </div>
  )
}

export default App;