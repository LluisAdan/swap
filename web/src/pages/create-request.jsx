import React from 'react'
import PageLayout from '../components/layouts/page-layout';
import CreateRequestForm from '../components/requests/create-request-form/create-request-form';

function CreateRequest() {
  return (
    <PageLayout>
      <CreateRequestForm />
    </PageLayout>
  )
}

export default CreateRequest;