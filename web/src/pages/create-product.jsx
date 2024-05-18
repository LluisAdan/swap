import React from 'react'
import PageLayout from '../components/layouts/page-layout';
import ProductForm from '../components/products/create-product-form/create-product-form';

function CreateProduct() {
  return (
    <PageLayout>
      <ProductForm />
    </PageLayout>
  )
}

export default CreateProduct;