import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './nav-filter.css';

function NavFilter() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const address = searchParams.get('address');
  const [filters, setFilters] = useState(false);

  const city = address?.split(',');

  const handleClickFilters = () => {
    setFilters(prevFilters => !prevFilters);
  };

  return (
    <div className="nav-filter d-flex row justify-content-center align-items-center">
      <div className="div-nav-address d-flex justify-content-center align-items-start">
        <div className="address-nav d-flex justify-content-center">
          <h4>{address ? `These are the Products near "${city[0]}":` : "Welcome to Swap! Swap products with just a few clicks "}</h4>
        </div>
      </div>

      <div className="div-nav-filters d-flex row justify-content-center align-items-between">
        <div className="div-btn-filters d-flex justify-content-center align-items-center">
          <button onClick={handleClickFilters} className="btn-filter-nav">Filters</button> 
        </div>
        
        <div className="div-btn-categories d-flex justify-content-around align-items-center">
          {filters && (
            <>
              <div className="div-btn-filters d-flex justify-content-center align-items-center">
                <button className="btn-category-nav">Electronic</button> 
              </div>
              <div className="div-btn-filters d-flex justify-content-center align-items-center">
                <button className="btn-category-nav">Home</button> 
              </div>
              <div className="div-btn-filters d-flex justify-content-center align-items-center">
                <button className="btn-category-nav">Sport</button> 
              </div>
              <div className="div-btn-filters d-flex justify-content-center align-items-center">
                <button className="btn-category-nav">Fashion</button> 
              </div>
              <div className="div-btn-filters d-flex justify-content-center align-items-center">
                <button className="btn-category-nav">Book...</button> 
              </div>
              <div className="div-btn-filters d-flex justify-content-center align-items-center">
                <button className="btn-category-nav">Other</button> 
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  )
}

export default NavFilter;