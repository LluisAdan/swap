import React, { useEffect, useState } from 'react';
import {useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createRequest } from '../../../services/api.service';
import ProductsList from '../../products/products-list/products-list';
import { getProductDetail } from '../../../services/api.service';
import { useAlert } from '../../../contexts/alert-context/alert.context';

import './create-request-form.css';

function CreateRequest() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productRequested, setProductRequested] = useState(null);
  const [selected, setSelected] = useState();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetch() {
      try {

        const { data } = await getProductDetail(id);
        setProductRequested(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  const handleProductSubmit = async () => {
    try {
      const request = { 
        target_id: productRequested.owner.id,
        product_owner: selected,
        product_target: productRequested.id
      }
      const res = await createRequest(request);
      showAlert("REQUEST SENT");
      navigate('/profile');
    } catch (error) { 
      console.error(error);
    }
  };


  if (!productRequested) {
    <h1>LOADING</h1>
  }

  return (
    <form className="create-request d-flex row justify-content-center align-items-center" onSubmit={handleSubmit(handleProductSubmit)}>

      <div className="product-requested">
        <h5>Selected product:</h5>
        <div className="requested-item-card d-flex justify-content-start align-items-center">
          <div className="d-flex justify-content-center">
            <img src={productRequested?.image} className="img-requested-product" alt={productRequested?.title} />
          </div>

          <div className="mx-2 d-flex justify-content-start">
            <h5>{productRequested?.title}</h5>
          </div>
        </div>
      </div>

      <div className="my-products d-flex row justify-content-center align-text-">
        <h5>These are the products you can exchange:</h5>
        <ProductsList isRequest onSelected={setSelected} selected={selected} />
      </div>


        <div className="d-flex justify-content-center align-items-center">
          <div className="btn-create-register d-flex justify-content-center align-items-center">
            <button type="submit" className='submit-form-create btn btn-secondary text-uppercase'>Send request</button>
          </div>
        </div>

    </form>
      )
}

export default CreateRequest;