import React, { useEffect, useRef } from 'react';

function Map({ center }) {
  const mapRef = useRef();

  useEffect(() => {
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: 11
    });
    new window.google.maps.Marker({
      position: center,
      map: googleMap,
      title: "Product location"
    })
  }, []);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '300px'}}></div>
  )
}

export default Map;