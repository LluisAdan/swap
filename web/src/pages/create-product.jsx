import React from 'react'
import PageLayout from '../components/layouts/page-layout';
import ProductForm from '../components/products/product-create-form/product-form';

function CreateProduct() {
  return (
    <PageLayout>
      <ProductForm />
    </PageLayout>
  )
}

export default CreateProduct;