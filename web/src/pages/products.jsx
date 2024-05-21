import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '../components/layouts/page-layout';
import ProductsList from '../components/products/products-list/products-list';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const address = searchParams.get('address');

  return (
    <PageLayout withFilters={true} filtersTitle={address}>
      <ProductsList limit={20} page={0} lat={lat} lng={lng} />
    </PageLayout>
  )
}

export default Products;