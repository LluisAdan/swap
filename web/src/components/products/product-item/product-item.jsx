import React from 'react';
import { Link } from 'react-router-dom';
import './product-item.css';

function ProductItem({ product }) {
  return (
    <div className="product-item container card">
      <div className="d-flex justify-content-center">
        <img src={product.image} className="card-img-top img-product" alt={product.title}/>
      </div>
      <div className="card-body">
        <div>
          <h5>{product.title}</h5>
        </div>
        <div className="d-flex justify-content-between">
          <p className="fa fa-usd"> {product.price}</p>
          <p>{product.category}</p>
        </div>
        <Link to={`/products/${product.id}`} className="stretched-link"></Link>
      </div>
    </div>
  )
}

export default ProductItem;