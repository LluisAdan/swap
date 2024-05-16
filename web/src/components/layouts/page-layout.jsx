import React from 'react';
import NavFilter from '../ui/nav-filter/nav-filter';

function PageLayout({ children, withFilters, filtersTitle }) {
  return (
    <div>
      {withFilters && (<NavFilter title={filtersTitle} />)}
      <div className="container">{children}</div>
    </div>
  )
}

export default PageLayout;