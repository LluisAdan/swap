import React from 'react';
import PageLayout from '../components/layouts/page-layout';
import ProductDetail from '../components/products/detail-product/detail-product';
import { useSearchParams } from 'react-router-dom';

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const address = searchParams.get('address');

  return (
    <PageLayout>
      <ProductDetail lat={lat} lng={lng} />
    </PageLayout>
  )
}

export default Product;