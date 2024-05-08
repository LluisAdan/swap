import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api.service';

function Products() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts()
      .then(response => setProducts(response.data));
  }, []);

  if (!products) {
    return <div>Loading...</div>
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}

export default Products;