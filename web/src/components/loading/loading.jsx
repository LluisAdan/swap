import React, { useContext } from 'react';
import LoadingContext from './LoadingContext';

const Loading = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    isLoading && <div className="loading-spinner">Loading...</div>
  );
};

export default Loading;