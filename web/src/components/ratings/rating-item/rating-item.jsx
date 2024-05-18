import React from 'react';

import './rating-item.css';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function RatingItem ({ rating }) {

  return (
    <>
      <div className="d-flex row align-items-center">
        <div className="my-2">
          {rating.rating}
        </div>

        <div>
          <div className="d-flex align-items-center my-2">
            <img className="rounded-circle object-fit-cover" src={rating.owner.avatar} alt={rating.owner.username}width="40" height="40"/>
            <h5>{rating.owner.name} {rating.owner.lastName}</h5>
          </div>

          <p>{formatDate(rating.createdAt)}</p>
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