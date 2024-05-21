import React from 'react';
import ProductsList from '../products-list/products-list';

import './products-section.css';

function ProductSection({ className, title, category, isFavorite }) {
  return (
    <div className={className}>
      <h4 className="title-sections">{title}</h4>
      <ProductsList isFavorite={isFavorite} category={category} limit={5} page={0} />
    </div>
  )
};

export default ProductSection;