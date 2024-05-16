import React from 'react';
import ProductSection from '../components/products/products-section/products-section';
import PageLayout from '../components/layouts/page-layout';
import { useNavigate } from 'react-router-dom';

function Home() {
  
  return (
      <PageLayout withFilters={true}>
        <ProductSection title={"Electronic"} category={"Electronic"} />
        <ProductSection title={"Home"} category={"Home"} />
        <ProductSection title={"Sport"} category={"Sport"} />
        <ProductSection title={"Fashion"} category={"Fashion"} />
      </PageLayout>
  );
}

export default Home;