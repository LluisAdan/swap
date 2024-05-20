import React from "react";
import { Link } from "react-router-dom";

import "./product-item.css";

function ProductItem({ product, isRequest, selected, onSelected }) {
  
  if (isRequest) {
    return (
      <div
        onClick={() => {
          onSelected(product.id);
        }}
        className={`request-item-card d-flex justify-content-start align-items-center ${
          selected ? "request-item-card-selected" : ""
        }`}
      >
        <div className="d-flex justify-content-center">
          <img
            src={product.image}
            className="img-request-product"
            alt={product.title}
          />
        </div>

        <div className="mx-2 d-flex justify-content-start">
          <h5>{product.title}</h5>
        </div>
      </div>
    );
  }

  return (
    <Link className="link-card" to={`/products/${product.id}`}>
      <div className="product-item-card d-flex row justify-content-center align-items-center">
        <div className="img-product-card d-flex justify-content-center">
          <img
            src={product.image}
            className="img-product"
            alt={product.title}
          />
        </div>

        <div className="card-body d-flex row">
          <div className="d-flex justify-content-start">
            <h5 className="product-title">{product.title}</h5>
          </div>

          <div className="container">
            <hr />
          </div>

          <div className="product-info d-flex justify-content-around align-items-center">
            <div className="product-price d-flex justify-content-center align-items-center">
              <span>{product.price}</span>
            </div>
            <div className="product-category d-flex justify-content-center align-items-center">
              <span className="product-item-category">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
