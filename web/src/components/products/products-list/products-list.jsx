import React, { useEffect, useState, useContext } from 'react';
import { getProducts } from '../../../services/api.service';
import ProductItem from '../product-item/product-item';
import { useLocation, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/auth.context';

import './product-list.css';

function ProductsList({ category, limit, page,  lat, lng, isRequest, selected, onSelected }) {
  const [products, setProducts] = useState(null);
  const location = useLocation();
  const { user } = useContext(AuthContext); 
  const { id } = useParams();

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
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [category, limit, lat, lng]);

  if (!products) {
    return <div>Loading...</div>
  };

  if (location.pathname === ('/profile')) {
    return (
      <div className="product-list row row-cols-1 row-cols-md-3 row-cols-lg-5">
          {products
            .filter(product => product.owner === user?.id && product.available)
            .map(product => (
                <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
          ))}

      </div>
    );
  }

  if (location.pathname === (`/products/${id}/create-request`)) {
    return (
      <div className={`${isRequest ? 'product-list-request': 'product-list row row-cols-1 row-cols-md-3 row-cols-lg-5'}`}>
          {products
            .filter(product => product.owner === user.id && product.available)
            .map(product => (
                <div key={product.id} className="product-item col"><ProductItem product={product} isRequest selected={product.id === selected} onSelected={onSelected} /></div>
          ))}
      </div>
    );
  }

  if (location.pathname != '/profile') {
    return (
        <div className={` ${isRequest ? 'text-success': 'product-list row row-cols-1 row-cols-md-3 row-cols-lg-5'}`}>
          {products
          .filter(product => product.available)
          .map(product => (
            <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
          ))}
        </div>
    );
  }
}

export default ProductsList;