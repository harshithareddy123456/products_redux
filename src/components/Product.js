import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProdct } from "../redux/actions";

export default function Product() {
  const prod = useSelector((state) => state);
  console.log(prod);
  const { id, singleprod } = prod;
  // localStorage.setItem("id", id.toString());
  // const localid = parseInt(localStorage.getItem("id"));

  const [product, setProduct] = useState(null);
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchproduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      console.log(data);
      dispatch(setProdct(data));
    };
    fetchproduct();
  }, []);
  useEffect(() => {
    setProduct(singleprod);
  }, [singleprod]);
  return (
    <div className="main">
      <div className="product-container">
        <div className="left-container">
          {product && (
            <img
              src={singleprod.image}
              alt={singleprod.title}
              className="product-image"
            ></img>
          )}
        </div>
        {product && (
          <div className="right-container">
            <h2>{product.title}</h2>
            <h3>{product.category}</h3>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
