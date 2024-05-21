import React from 'react';
import ProductSection from '../components/products/products-section/products-section';
import PageLayout from '../components/layouts/page-layout';

function Home() {
  
  return (
      <PageLayout withFilters={true}>
        <ProductSection isFavorite />
        <ProductSection title={"Electronic:"} category={"Electronic"} />
        <ProductSection title={"Home:"} category={"Home"} />
        <ProductSection title={"Sport:"} category={"Sport"} />
        <ProductSection title={"Fashion:"} category={"Fashion"} />
        <ProductSection title={"Book, Film and Music:"} category={"Book, Film and Music"} />
        <ProductSection title={"Other:"} category={"Other"} />
      </PageLayout>
  );
};

export default Home;