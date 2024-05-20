import React from 'react';
import AutocompleteInput from '../../google/autocomplete/autocomplete-input';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './nav-filter.css';


function NavFilter() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const address = searchParams.get('address');

  const handlePlaceChange = ({ lat, lng, address }) => {
    navigate({
      pathname: '/products',
      search: `?lat=${lat}&lng=${lng}&address=${address}`
    });
  };

  const city = address?.split(',');

  return (
    <div className="nav-filter d-flex row justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-end h-50">
        <AutocompleteInput onPlaceChange={handlePlaceChange} />
      </div>

      <div className="d-flex row align-items-center h-50">
        <div className="d-flex row align-items-start h-50">
          <h2>{address ? `These are the Products near "${city[0]}":` : "Products you may be interested in:"}</h2>
        </div>
      </div>
    </div>
  )
}

export default NavFilter;