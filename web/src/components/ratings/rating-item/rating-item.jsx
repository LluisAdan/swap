import React from 'react';

import './rating-item.css';

function RatingItem ({ rating }) {
  return (
    <>
      <div>
        <div>
          <h4>{rating.owner.username}</h4>
          <p>{rating.createAt}</p>
        </div>
        <div>
          {rating.rating}
        </div>
        <div>
          {rating.text}
        </div>
      </div>
      <hr />
    </>
  )
}

export default RatingItem;