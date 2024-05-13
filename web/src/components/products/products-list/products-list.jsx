import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../services/api.service';
import ProductItem from '../product-item/product-item';
import { useAlert } from '../../../contexts/alert-context/alert.context';

import './product-list.css';

function ProductsList({ category, limit, page }) {
  const [products, setProducts] = useState(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    async function fetch() {
      try {
        const query = {};
        if (category) query.category = category;
        if (limit) query.limit = limit;
        if (page) query.page = page;
        
        const response = await getProducts(query);
        setProducts(response.data);
      } catch (err) {
        showAlert('Products not found');
      }
    }
    fetch();
  }, [category, limit]);

  if (!products) {
    return <div>Loading...</div>
  };

  return (
    <div className="product-list container d-flex flex-column gap-2">
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-2">
        {products.map(product => (
          <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;