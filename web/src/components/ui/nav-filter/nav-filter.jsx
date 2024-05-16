import React from 'react';
import './nav-filter.css';
import AutocompleteInput from '../../google/autocomplete/autocomplete-input';
import { useNavigate } from 'react-router-dom';

function NavFilter() {
  const navigate = useNavigate();

  const handlePlaceChange = ({ lat, lng }) => {
    navigate({
      pathname: '/products',
      search: `?lat=${lat}&=${lng}`
    });
  };

  return (
    <div className="nav-filter d-flex row justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-end h-50">
        <AutocompleteInput onPlaceChange={handlePlaceChange} />
      </div>

      <div className="d-flex row align-items-center h-50">
        <div className="d-flex row align-items-end h-50">
          <hr />
        </div>

        <div className="d-flex row align-items-start h-50">
          {/*<h2>{address ? `${address}` : "Products you may be interested in:"}</h2>*/}
        </div>

      </div>

    </div>
  )
}

export default NavFilter;