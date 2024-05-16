import React, { useEffect, useState, useContext } from 'react';
import { getProducts } from '../../../services/api.service';
import ProductItem from '../product-item/product-item';
import { useAlert } from '../../../contexts/alert-context/alert.context';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../../contexts/auth.context';

import './product-list.css';

function ProductsList({ category, limit, page,  lat, lng }) {
  const [products, setProducts] = useState(null);
  const { showAlert } = useAlert();
  const location = useLocation();
  const context = useContext(AuthContext);  

  useEffect(() => {
    async function fetch() {
      try {
        const query = {};
        if (category) query.category = category;
        if (limit) query.limit = limit;
        if (page) query.page = page;
        if (lat && lng) {
          query.lat = lat;
          query.lng = lng;
        }
        
        const response = await getProducts(query);
        setProducts(response.data);
      } catch (err) {
        showAlert('Products not found');
      }
    }
    fetch();
  }, [category, limit, lat, lng]);

  if (!products) {
    return <div>Loading...</div>
  };

  if (location.pathname === '/profile') {
    return (
      <div className="product-list row row-cols-1 row-cols-md-3 row-cols-lg-5">
          {products
            .filter(product => product.owner === context.user.id)
            .map(product => (
                <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
          ))}

      </div>
    );
  }

  if (location.pathname != '/profile') {
    return (
        <div className="product-list row row-cols-1 row-cols-md-3 row-cols-lg-5">
          {products.map(product => (
            <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
          ))}
        </div>
    );
  }

}

export default ProductsList;