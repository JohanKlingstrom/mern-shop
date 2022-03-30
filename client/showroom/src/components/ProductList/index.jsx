import { useEffect, useState } from "react";
import * as config from "../../config";
import "./styles.css";
import { Link } from "react-router-dom";
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
          </li>
        ))}
      </ul>
    );
  };

  export default ProductList;
  