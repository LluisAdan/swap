import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import categoriesData from '../../../data/categories.json';
import pricesData from '../../../data/prices.json';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../services/api.service';
import AutocompleteInput from '../../google/autocomplete/autocomplete-input';

import './create-product-form.css';

function ProductForm() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: null, lng: null });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePlaceChange = ({ lat, lng }) => {
    setLocation({ lat, lng });
  };

  const handleProductSubmit = async (product) => {

    const data = new FormData();
    data.append("title", product.title);
    data.append("description", product.description);
    data.append("image", product.image[0]);
    data.append("price", product.price);
    data.append("category", product.category);

    const locationData = {
      type: 'Point',
      coordinates: [location.lng, location.lat]
    };

    data.append("location", JSON.stringify(locationData)); 

    try {
      const res = await createProduct(data);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="create-product d-flex justify-content-center align-items-center" onSubmit={handleSubmit(handleProductSubmit)}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="row row-cols-2 w-100 h-100">

          <div className="col d-flex align-items-center">
            <div className="w-100 form-floating mb-2">
              <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} {...register("title", { required: "Title is required" })} />
              <label>Title</label>
              {errors.title && (<div className='invalid-feedback'>{errors.title.message}</div>)}
            </div>
          </div>

          <div className="col d-flex align-items-center">
            <div className="create-image form-floating mb-2">
              <input type="file" className={`form-control ${errors.image ? 'is-invalid' : ''}`} {...register("image", { required: "Image is required" })} />
              <label>Image</label>
              {errors.image && (<div className='invalid-feedback'>{errors.image.message}</div>)}
            </div>
          </div>
          
          <div className="col d-flex align-items-center">
            <div className="w-100 form-floating mb-2">
              <textarea type="text" className={`form-control ${errors.description ? 'is-invalid' : ''}`} {...register("description", { required: 'Description is required'})} />
              <label>Description</label>
              {errors.description && (<div className='invalid-feedback'>{errors.description.message}</div>)}
            </div>
          </div>

          <div className="col d-flex align-items-center">
            <div className="create-category form-floating mb-2">
              <select className={`form-select ${errors.price ? 'is-invalid' : ''}`} 
              {...register("price", { required: "Price is required" })}>
                {pricesData.map((price) => (<option key={price.option} value={price.option}>{price.label}</option>))}
              </select>
              <label>Price</label>
              {errors.price && <div className='invalid-feedback'>{errors.price.message}</div>}
            </div>
            <div className="create-category form-floating mb-2">
              <select className={`form-select ${errors.category ? 'is-invalid' : ''}`} 
              {...register("category", { required: "Category is required" })}>
                {categoriesData.map((category) => (<option key={category.option} value={category.option}>{category.label}</option>))}
              </select>
              <label>Category</label>
              {errors.category && <div className='invalid-feedback'>{errors.category.message}</div>}
            </div>
          </div>

          <div className="col d-flex align-items-center">
            <div className="w-100 form-floating mb-2">
              <AutocompleteInput onPlaceChange={handlePlaceChange} />
              {errors.location && (<div className='invalid-feedback'>{errors.location.message}</div>)}
            </div>
          </div>

          <div className="div-btn-create d-flex justify-content-center align-items-center">
            <button type="submit" className='btn-form-create btn btn-secondary text-uppercase'>Create product</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;