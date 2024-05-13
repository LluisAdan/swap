import React from 'react';
import ProductsList from '../../components/products/products-list/products-list';

import './home.css';

function Home() {
  return (
    <div className="container">
      <h1>Products you may be interested in trading:</h1>
      <h2>Last products</h2>
      <ProductsList limit={4} page={0} />
      <h2>Electronic</h2>
      <ProductsList category="Electronic" limit={5} />
      <h2>Home</h2>
      <ProductsList category="Home" limit={5} />
      <h2>Fashion</h2>
      <ProductsList category="Fashion" limit={5} />
      <h2>Book, Film and Music</h2>
      <ProductsList category="Book, Film and Music" limit={5} />
      <h2>Sport</h2>
      <ProductsList category="Sport" />
    </div>

  )
}

export default Home;