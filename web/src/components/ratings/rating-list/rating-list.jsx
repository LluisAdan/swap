import React, { useEffect } from 'react';
import RatingItem from '../rating-item/rating-item';


function RatingList({ ratings, limit, page }) {

  useEffect(() => {
    async function fetch() {
      try {
        const query = {};
        if (limit) query.limit = limit;
        if (page) query.page = page;
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [ limit ]);

  return (
    <div>
      {ratings?.length ? ratings.map(rating => (
        <div key={rating.id}><RatingItem rating={rating}/></div>
      )) : <div className="d-flex justify-content-center"><h5>There are no ratings yet</h5></div> }
    </div>
  );
};

export default RatingList;