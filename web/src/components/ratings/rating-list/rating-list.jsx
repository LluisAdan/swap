import React, { useEffect, useContext } from 'react';
import RatingItem from '../rating-item/rating-item';
import Loading from '../../loading/loading';
import LoadingContext from '../../../contexts/loading-context/loading-context';


function RatingList({ ratings, limit, page }) {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true)
      try {
        const query = {};
        if (limit) query.limit = limit;
        if (page) query.page = page;
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    }
    fetch();
  }, [ limit ]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      {ratings?.length ? ratings.map(rating => (
        <div key={rating.id}><RatingItem rating={rating}/></div>
      )) : <div className="d-flex justify-content-center"><h5>There are no ratings yet</h5></div> }
    </div>
  );
};

export default RatingList;