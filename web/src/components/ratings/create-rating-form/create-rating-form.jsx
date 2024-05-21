import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createRating } from '../../../services/api.service';
import ratingData from '../../../data/ratings.json';

import './create-rating-form.css';

function CreateRating() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm();

  async function handleRatingSubmit(data) {
    try {
      await createRating(id, data); 
      navigate('/profile/mailbox');
    } catch (error) { 
      console.error(error);
    }
  };

  return (
    <form className="register d-flex justify-content-center align-items-center" onSubmit={handleSubmit(handleRatingSubmit)}>
    <div className="d-flex justify-content-center align-items-center">
      <div className="row row-cols-2 w-100 h-100">

        <div className="col d-flex align-items-center">
          <div className="w-100 form-floating mb-2">
          <select className={`form-select ${errors.rating ? 'is-invalid' : ''}`} 
              {...register("rating", { required: "Rating is required" })}>
                {ratingData.map((rating) => (<option key={rating.option} value={rating.option}>{rating.label}</option>))}
              </select>
              <label>Rating</label>
          </div>
        </div>

        <div className="col d-flex align-items-center">
          <div className="w-100 form-floating mb-2">
            <textarea type="text" className={`form-control ${errors.text ? 'is-invalid' : ''}`} {...register("text")} />
            <label>Comment</label>
          </div>
        </div>

        <div className="col d-flex justify-content-around align-items-center">
          <div className="btn-create-register d-flex justify-content-center align-items-center">
            <button type="submit" className='submit-form-create btn btn-secondary text-uppercase'>Create rating</button>
          </div>
        </div>

      </div>
    </div>
  </form>
  )
}

export default CreateRating;