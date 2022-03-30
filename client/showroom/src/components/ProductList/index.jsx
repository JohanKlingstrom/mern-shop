import { useEffect, useState } from "react";
import * as config from "../../config";
import "./styles.css";
import { Link, Navigate } from "react-router-dom";
import Product from "../Product";

const ProductList = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch(`${config.API_BASE_URL}/items`, {
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setProducts(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
  
    return (
      <ul className="dog-list">
        {products.map((product) => (
          <li key={product._id} product={product}>
            <h3>{product.title}</h3>
            <img src={product.img} alt="" />

          <button onClick={async() => {
            let cartId = localStorage.getItem("cart");
            console.log(cartId)
            let response = await fetch(`http://localhost:1337/carts/${cartId}`, {
              method: "GET",
            });
            let currentCart = await response.json();
            currentCart.products.push(product);
            await fetch(`http://localhost:1337/carts/${cartId}`, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(currentCart)
            });
          }}>ADD TO CART</button>

            <button onClick={async() =>{
              const response = await fetch("http://localhost:1337/carts", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  products: [product],
                  status: "carted"
                })
              });
              let cartId = await response.json();
              localStorage.setItem("cart", cartId);
              // Navigate("/checkout")
              console.log(product)
            }} >BUY NOW</button>

          </li>
        ))}
      </ul>
    );
  };

  export default ProductList;
  