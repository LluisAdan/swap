import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { updateProduct } from '../../../services/api.service';

import './request-item.css';

function RequestItem({ request, onUpdateStatus }) {
  const { productId } = useParams();

  const updateProductAvailability = async (productId, available) => {
    try {
      const response = await updateProduct(productId, { available });
      if (!response.ok) {
        throw new Error('Error al actualizar la disponibilidad del producto');
      }
      const updatedProduct = await response.json();
      return updatedProduct;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAccept = () => {
    onUpdateStatus(request.id, 'Accepted');
  };

  const handleDecline = () => {
    onUpdateStatus(request.id, 'Declined');
  };

  const handleFinalize = async () => {
    const updatedProductOwner = await updateProductAvailability(request.product_owner.id, false);
    const updatedProductTarget = await updateProductAvailability(request.product_target.id, false);

      const updatedRequest = {
        ...request,
        status: 'Finalized',
        product_owner: {
          ...request.product_owner,
          available: false,
        },
        product_target: {
          ...request.product_target,
          available: false
        }
      };

      onUpdateStatus(request.id, 'Finalized', updatedRequest);
  };

  const renderActionButtons = () => {
    if (request.status !== "Accepted" && request.status !== "Declined" && request.status !== "Finalized") {
      return (
        <React.Fragment>
          <div className="d-flex justify-content-around align-items-center">
            <div className="btn-status d-flex justify-content-center align-items-center"> 
              <Link to="/profile/mailbox">
                <button className="btn-status-request mx-3" onClick={handleDecline}>DECLINE</button>
              </Link>
            </div>
            
            <div className="btn-status d-flex justify-content-center align-items-center"> 
              <Link to="/profile/mailbox">
                <button className="btn-status-request" onClick={handleAccept}>ACCEPT</button>
              </Link>
            </div>

          </div>
        </React.Fragment>
      );
    };

    if (request.status != "Declined" && request.status !== "Finalized") {
      return (
        <React.Fragment>
          <div className="d-flex row justify-content-center align-items-center">
            <div className="d-flex row justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <h5>User's contact:</h5>
              </div>

              <div className="d-flex row justify-content-center align-items-center">
                <div className="d-flex row justify-content-center align-items-center">{request.request_owner.email}</div>
                <div className="d-flex row justify-content-center align-items-center">{request.request_owner.phone}</div>
              </div>
            </div>

            <div className="btn-status-finalize d-flex justify-content-center align-items-center">
              <Link className="" to={`/users/${request.product_owner?.owner}/create-rating`}>
                <button className="btn-finalize" onClick={handleFinalize}>ASSESS AND FINALIZE</button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return null;
  };

  return (
    <div className="request-card d-flex cols justify-content-around align-items-center">
      <Link className="product-offered d-flex row justify-content-center align-items-center" to={`/products/${request.product_owner?.id}`}>
        <div className="d-flex justify-content-center align-items-center">
          <img className="img-product-request" src={request.product_owner?.image} alt={request.product_owner?.title} />
        </div>

        <div className="d-flex justify-content-center my-3">
            <h5 className="title-product-request">{request.product_owner?.title}</h5>
        </div>
      </Link>

      <div className="product-mine d-flex row justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <img className="img-myproduct-request" src={request.product_target?.image} alt={request.product_target?.title} />
        </div>
      </div>

      <div className="status-request d-flex row justify-content-center align-items-center">
        <div className="d-flex justify-content-center my-5">
        <h5>Status: {request.status}</h5>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {renderActionButtons()}
        </div>

      </div>
    </div>
  );
}

export default RequestItem;