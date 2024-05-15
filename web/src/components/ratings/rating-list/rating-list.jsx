import React, { useState, useContext, useEffect } from 'react';
import { getRatings } from '../../../services/api.service';
import RatingItem from '../rating-item/rating-item';
import { useAlert } from '../../../contexts/alert-context/alert.context';
import AuthContext from '../../../contexts/auth.context';

function RatingList() {
  const [ratings, setRatings] = useState(null);
  const { showAlert } = useAlert();
  const context = useContext(AuthContext);  

  useEffect(() => {
    async function fetch() {
      try {        
        const response = await getRatings();
        console.log(response)
        setRatings(response.data);
      } catch (err) {
        showAlert('Ratings not found');
      }
    }
    fetch();
  }, []);
  
  return (
    <div>
      {ratings
        .filter(rating => rating.target === context.user.id)
        .map(rating => (
            <div key={rating.id}><RatingItem rating={ratings}/></div>
      ))}
    </div>
  );
}

export default RatingList;