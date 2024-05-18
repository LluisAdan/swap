import React from 'react';
import PageLayout from '../components/layouts/page-layout';
import ProductDetail from '../components/products/detail-product/detail-product';
import { useSearchParams } from 'react-router-dom';

function Product() {

  return (
    <PageLayout>
      <ProductDetail />
    </PageLayout>
  )
}

export default Product;