import React from 'react';
import ProductSection from '../components/products/products-section/products-section';
import PageLayout from '../components/layouts/page-layout';
import ProductsList from '../components/products/products-list/products-list';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const address = searchParams.get('address');

  return (
      <PageLayout withFilters={true} filtersTitle={address}>
        <ProductsList limit={20} page={0} lat={lat} lng={lng} />
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