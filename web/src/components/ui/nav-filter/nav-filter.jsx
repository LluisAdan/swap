import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './nav-filter.css';

function NavFilter() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const address = searchParams.get('address');

  const city = address?.split(',');

  return (
    <div className="nav-filter d-flex row justify-content-center align-items-center">

      <div className="d-flex row align-items-center h-50">
        <div className="d-flex row align-items-start h-50">
          <h2>{address ? `These are the Products near "${city[0]}":` : "Products you may be interested in:"}</h2>
        </div>
      </div>
    </div>
  )
}

export default NavFilter;