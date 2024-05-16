import React, { useEffect, useState, useContext } from 'react';
import { getProductDetail } from '../../../services/api.service';
import AuthContext from '../../../contexts/auth.context';
import { useParams, useNavigate } from 'react-router-dom';
import RatingList from '../../../components/ratings/rating-list/rating-list';

import './product-detail.css';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { user, updateUser } = useContext(AuthContext);  
  const { id } = useParams()
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        const {data } = await getProductDetail(id);
        setProduct(data);
        console.log(data);
        console.log(user);
        {/*
        if (user) {
          console.log(user)
          if (user.favouriteProducts) {
            setIsFavorited(user.favouriteProducts.includes(id));
            console.log(setIsFavorited);
          }
        }
        */}
      } catch (error) {
        if (error.response?.status == 404) {
          navigate('/');
        }
      }
    }
    fetch();
  }, [id]);

  const toggleFavorite = () => {
    const updatedFavorites = isFavorited ? user.favouriteProducts.filter(productId => productId !== id) : [...user.favouriteProducts, id];
    
    updateUser({ ...user, favouriteProducts: updatedFavorites });
    setIsFavorited(!isFavorited);
  };

  if(!product) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="detail-card d-flex row justify-content-center">
        <div className="info-top-detail d-flex justify-content-between">
          <div className="info-user-detail d-flex row align-items-center">
            <h5>{product.owner.name} {product.owner.lastName}</h5>
            <p>Rating</p>
          </div>
          <div className="btns-detail d-flex justify-content-around align-items-center">
            <i type="button" className="fa fa-heart-o fa-lg icon-heart" onClick={toggleFavorite}
              style={{ color: isFavorited ? 'red' : 'black' }}></i>
            <button type="button" className="btn btn-chat btn-sm link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
              Chat
            </button>
          </div>
        </div>

        <div className="img-detail d-flex justify-content-center align-items-center">
          <img className="img-product-detail" src={product.image} alt={product.title} />
        </div>

        <div className="info-product-detail">
          <div className="product-title-detail">
            <h2>{product.title}</h2>
          </div>

          <div className="product-price-detail">
            <p className="fa fa-usd"> {product.price}</p>
          </div>
          <hr />
          <div className="product-desc-detail">
            <p>{product.description}</p>
          </div>
        </div>

        <div className="location-product-detail">
          LOCATION
        </div>

        <div className="rating-product-detail">
          RATINGS
          <RatingList ratings={product.owner.ratings}/>
        </div>

      </div>
    </>
  )
}

export default ProductDetail;