import React from 'react';
import PageLayout from '../components/layouts/page-layout';
import UserForm from '../components/users/create-user-form/create-user-form';

function CreateUser() {
  return (
    <PageLayout>
      <UserForm />
    </PageLayout>
  )
}

export default CreateUser;