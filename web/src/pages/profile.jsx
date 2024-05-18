import React from 'react';
import PageLayout from '../components/layouts/page-layout';
import ProductsList from '../components/products/products-list/products-list';

function Profile() {
  return (
    <PageLayout withUser={true}>
      <ProductsList limit={4} page={0} />
    </PageLayout>
  )
}

export default Profile;