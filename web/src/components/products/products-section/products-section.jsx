import React from 'react';
import ProductsList from '../products-list/products-list';

function ProductSection({ className, title, category }) {
  return (
    <div className={className}>
      <h2 className="">{title}</h2>
      <ProductsList category={category} limit={5} page={0} />
    </div>
  )
};

export default ProductSection;