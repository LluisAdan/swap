import React from 'react';
import { Link } from 'react-router-dom';

import './product-item.css';

function ProductItem({ product }) {
  return (
    <div className="product-item-card d-flex row justify-content-center align-items-center">
      <div className="img-product-card d-flex justify-content-center">
        <img src={product.image} className="img-product" alt={product.title} />
      </div>

      <div className="card-body d-flex row">
        <div className="product-title mx-2 d-flex justify-content-start">
          <h5>{product.title}</h5>
        </div>

        <div className="container">
          <hr />
        </div>

        <div className="product-info d-flex justify-content-around align-items-center">
          <div className="product-price d-flex justify-content-center align-items-center">
            <p className="fa fa-usd"> {product.price}</p>
          </div>
          <div className="product-category d-flex justify-content-center align-items-center">
            <p>{product.category}</p>
          </div>
        </div>
        
        {/* <Link to={`/products/${product.id}`} className="stretched-link"></Link> */}
      </div>
    </div>
  )
}

export default ProductItem;