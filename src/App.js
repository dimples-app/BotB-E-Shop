import React, {useEffect, useState} from "react";
import { Products, Navbar}  from "./components"
import {commerce} from "./lib/commerce"

function App() {
  const [products, setProducts] = useState([])

  /**
   * function to fetch product
   */
  const fetchProducts = async() => {
    const response = await commerce.products.list();
    const data = response.data;
    setProducts(data)
  }

  /**
   * UseEffect to call fetchcall without side effects
   */
  useEffect(() => {
    fetchProducts();
  }, [])

  return <>
  E - Shop
  <Navbar />
  <Products />
  </>;
}

export default App;