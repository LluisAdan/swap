import React, { useEffect, useState } from 'react'
import { getRatings } from '../../../services/api.service';

import './stars-product.css';

function StarsProduct({ ownerId }) {
  const [avg, setAvg] = useState(0);
  const [cant, setCant] = useState(0);

  useEffect(() => {
    async function fetchRatings() {
      try {
        const response = await getRatings(ownerId);
        const ratings = response.data;
        if (ratings.length > 0) {
          const total = ratings.reduce((sum, { rating }) => sum + parseFloat(rating), 0);
          const average = total / ratings.length;
          setAvg(average);
          setCant(ratings.length)
        } else {
          setAvg(0);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    }

    fetchRatings();
  }, [ownerId]);

  return (
    <>
      <div className="d-flex justify-content-start align-items-center">
        <div className="stars d-flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <i key={value}
              className="fa fa-star-o"
              style={{ color: avg >= value ? 'rgb(255, 150, 3)' : 'rgb(165, 165, 165)' }}>
            </i>
          ))}
        </div>
        <div className="avg-ratings d-flex justify-content-center align-items-center">
          <span>{avg.toFixed(1)}</span>
        </div>

        <div className="cant-ratings d-flex justify-content-center align-items-center">        
          <span>({cant})</span>
        </div>
      </div>
    </>
  ) 
}

export default StarsProduct;