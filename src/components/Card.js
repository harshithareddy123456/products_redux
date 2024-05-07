import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendproductid } from "../redux/actions";

export default function Card(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const handleselect = (id) => {
    dispatch(sendproductid(id));
  };
  return (
    <div className="card">
      <div>
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.title}
            className="image"
            onClick={() => handleselect(item.id)}
          ></img>
        </Link>
      </div>
      <div>
        <h5>{item.title}</h5>
      </div>
    </div>
  );
}
