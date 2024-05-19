import React from 'react';
import PageLayout from '../components/layouts/page-layout';
import RequestsList from '../components/requests/requests-list/requests-list';

function Mailbox() {
  return (
    
    <PageLayout withUser>
      <RequestsList sendTo />
    </PageLayout>
  )
}

export default Mailbox;