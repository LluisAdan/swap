import React, { useEffect, useState, useContext } from 'react';
import { getProductDetail, like } from '../../../services/api.service';
import AuthContext from '../../../contexts/auth.context';
import { useParams, useNavigate, Link } from 'react-router-dom';
import RatingList from '../../ratings/rating-list/rating-list';
import Map from '../../google/map/map';

import './detail-product.css';

function ProductDetail({ lat, lng }) {
  const [product, setProduct] = useState(null);
  const { user, updateUser } = useContext(AuthContext);  
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        const query = {};
        if (lat && lng) {
          query.lat = lat;
          query.lng = lng;
        }

        const { data } = await getProductDetail(id, query);
        setProduct(data);

        if (user) {
          if (user.likes) {
            const isFav = user.likes.some(product => product.product === id)
            setIsFavorited(isFav);
          }
        }

      } catch (error) {
        if (error.response?.status == 404) {
          navigate('/');
        }
      }
    }

    if (user !== undefined) {
      fetch()
    }
  }, [id, lat, lng, user]);

  const toggleFavorite = () => {
    const updatedFavorites = isFavorited ? user.likes.filter(productId => productId !== id) : [...user.favoriteProducts, id];

    like(id);
    console.info(user)
    setIsFavorited(!isFavorited);
  };

  if(!product) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="detail-card d-flex row justify-content-center">
        <div className="info-top-detail d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="mx-2">
              <img className="rounded-circle object-fit-cover" src={product.owner.avatar} alt={product.owner.avatar} width="60" height="60"/>
            </div>
            <div className="d-flex row">
              <h5>{product.owner.name} {product.owner.lastName}</h5>
              <p>Rating</p>
            </div>
          </div>
          <div className="btns-detail d-flex justify-content-around align-items-center">
            <div>
              <i type="button" className="fa fa-heart-o fa-lg icon-heart" onClick={toggleFavorite}
                style={{ color: isFavorited ? 'red' : 'black' }}></i>
            </div>

              <div className="div-btn-match d-flex justify-content-center align-items-center">
                <Link to={`/products/${product.id}/create-request`}>
                  <button type="button" className="btn-match">Match</button>
                </Link>

              </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <img className="img-product-detail" src={product.image} alt={product.title} />
        </div>

        <div className="info-product-detail">
          <div className="product-title-detail">
            <h2>{product.title}</h2>
          </div>

          <div className="product-price-detail">
            <p>{product.price}</p>
          </div>
          <hr />
          <div className="product-desc-detail">
            <p>{product.description}</p>
          </div>
          <hr />
        </div>

        <div className="map-product d-flex justify-content-center m-20">
          <Map center={{lat: parseFloat(product.location.coordinates[1]), lng: parseFloat(product.location.coordinates[0])}} />
        </div>

        <div className="rating-product-detail">
          <RatingList ratings={product.owner.ratings}/>
        </div>
      </div>
    </>
  )
}

export default ProductDetail;