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
      )) : <h5>NO HAY RATINGS</h5> }
    </div>
  );
};

export default RatingList;