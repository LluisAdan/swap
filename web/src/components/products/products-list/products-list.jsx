import React, { useEffect, useState, useContext } from 'react';
import { getProducts, getLikes } from '../../../services/api.service';
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
        let response;

        if (user && location.pathname === "/profile/favorites") {
          response = await getLikes(user.id);
        } else {
          const query = {};
          if (category) query.category = category;
          if (limit) query.limit = limit;
          if (page) query.page = page;
          if (lat && lng) {
            query.lat = lat;
            query.lng = lng;
        }
        
        response = await getProducts(query);
        }
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [category, limit, lat, lng, user]);

  if (!products) {
    return <div>Loading...</div>
  };

  if (user && location.pathname === ('/profile')) {
    return (
      <div className="product-list row row-cols-1 row-cols-md-3 row-cols-lg-5">
        {products
          .filter(product => product.owner === user.id && product.available)
          .map(product => (
              <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
        ))}
      </div>
    );
  }

  if (user && location.pathname === (`/products/${id}/create-request`)) {
    return (
      <div className={`${isRequest ? 'product-list-request': 'product-list row row-cols-1 row-cols-md-3 row-cols-lg-5'}`}>
          {products.length ? products
            .filter(product => (product.owner === user.id) && product.available)
            .map(product => (
                <div key={product.id} className="product-item col"><ProductItem product={product} isRequest selected={product.id === selected} onSelected={onSelected} /></div>
          )) : <div className="d-flex justify-content-center"><h5>No products found</h5></div> }
      </div>
    );
  }

  if (user && location.pathname === '/profile/favorites') {
    return (
      <div className="product-list row row-cols-1 row-cols-md-3 row-cols-lg-5">
          {products.length ? products
            .filter(product => product.available)
            .map(product => (
                <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
          )) : <div className="d-flex justify-content-center warning-favorites"><h5>Favorite products not found</h5></div> }
      </div>
    );
  };

  if (location.pathname === '/home') {
    return (
      <div className="product-list row row-cols-1 row-cols-md-3 row-cols-lg-5">
          {products.length ? products
            .filter(product => product.available)
            .map(product => (
                <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
          )) : <div className="d-flex justify-content-center"><h5>Products not found</h5></div> }
      </div>
    );
  };

  return (
    <div className="product-list row row-cols-1 row-cols-md-3 row-cols-lg-5">
        {products.length ? products
          .filter(product => product.available)
          .map(product => (
              <div key={product.id} className="product-item col"><ProductItem product={product}/></div>
        )) : <div className="d-flex justify-content-center warning-address"><h5>Products not found near this address</h5></div> }
    </div>
  );
}

export default ProductsList;