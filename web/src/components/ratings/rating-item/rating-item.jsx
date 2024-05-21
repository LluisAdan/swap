import React from 'react';
import StarsRating from '../../stars/stars-rating-item/stars-rating-item';

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
        <div className="stars d-flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <i key={value}
              className="fa fa-star-o fa-lg"
              style={{ color: rating.rating >= value ? 'rgb(232, 174, 13)' : 'black' }}>
            </i>
          ))}
        </div>
        </div>

        <div>
          <div className="d-flex align-items-center my-2">
            <img className="rounded-circle object-fit-cover" src={rating.owner.avatar} alt={rating.owner.username}width="40" height="40"/>
            <h5 className="mx-2">{rating.owner.name} {rating.owner.lastName}</h5>
          </div>

          <span className="date">{formatDate(rating.createdAt)}</span>
        </div>

        <div className="my-3">
          <span className="rating-text">{rating.text}</span>
        </div>
      </div>
      <hr />
    </>
  )
}

export default RatingItem;