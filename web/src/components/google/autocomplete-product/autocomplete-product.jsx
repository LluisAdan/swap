import React, { useRef, useEffect, forwardRef } from 'react';

import './autocomplete-product.css';

const autocompleteOptions = {
  componentRestrictions: { country: 'es' },
  type: ['address']
};

const AutocompleteProduct = forwardRef(({ onPlaceChange }, ref) => {
  const autocompleteInputRef = useRef();

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, autocompleteOptions);
    window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry?.location) {
        const location = { 
          lat: place.geometry.location.lat(), 
          lng: place.geometry.location.lng(), 
          address: place.formatted_address 
        };
        onPlaceChange(location);
      }
    });

    return () => {
      window.google.maps.event.clearListeners(autocomplete, "place_changed");
    };
  }, [onPlaceChange]);

  return (
    <div className="search-products-bar form-floating">
      <input ref={ref || autocompleteInputRef} type="text" className="input-search-product form-control" id="autocomplete-input" placeholder=" " />
      <label htmlFor="autocomplete-input">Location</label>
    </div>
  );
});

export default AutocompleteProduct;