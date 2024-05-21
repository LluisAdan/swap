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
        <h4 className="my-4">Last products added:</h4>
        <ProductsList limit={20} page={0} lat={lat} lng={lng} />
        <ProductSection title={"The most interesting electronic products"} category={"Electronic"} />
        <ProductSection title={"All kinds of appliances and furniture for your home"} category={"Home"} />
        <ProductSection title={"Sport products"} category={"Sport"} />
        <ProductSection title={"What are you wearing today?"} category={"Fashion"} />
        <ProductSection title={"Book, Film and Music... CULTURE"} category={"Book, Film and Music"} />
        <ProductSection title={"Other:"} category={"Other"} />
      </PageLayout>
  );
};

export default Home;