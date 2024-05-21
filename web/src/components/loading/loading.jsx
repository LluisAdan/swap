import React, { useContext } from 'react';
import LoadingContext from '../../contexts/loading-context/loading-context';

const Loading = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    isLoading && (
    
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
  )
  );
};

export default Loading;