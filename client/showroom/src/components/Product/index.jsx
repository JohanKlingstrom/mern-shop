import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import "./styles.css";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/items/${params._id}`, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.status);
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((json) => {
        setProduct(json);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [params.id]);

  if (!product && !error) {
    return (
      <div className="dog">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="dog">
        <p className="error">Got error status: {error}</p>
      </div>
    );
  }

  return (
    <div className="dog">
      <h2 className="dog__header">{product.title}</h2>
      <img className="dog__image" src={product.url} />
      <div className="dog__info"></div>
    </div>
  );
};

export default Product;
