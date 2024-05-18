import React from 'react';
import NavFilter from '../ui/nav-filter/nav-filter';
import NavUser from '../ui/nav-user/nav-user';

function PageLayout({ children, withFilters, withUser, filtersTitle }) {
  return (
    <div>
      {withFilters && (<NavFilter title={filtersTitle} />)}
      {withUser && (<NavUser />)}
      <div className="container">{children}</div>
    </div>
  )
}

export default PageLayout;