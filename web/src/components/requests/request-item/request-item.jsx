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
          <Link to="/profile/mailbox">
            <button onClick={handleDecline}>Decline</button>
          </Link>
          <Link to="/profile/mailbox">
            <button onClick={handleAccept}>Accept</button>
          </Link>
        </React.Fragment>
      );
    };

    if (request.status != "Declined" && request.status !== "Finalized") {
      return (
        <React.Fragment>
          <h5>{request.request_owner.phone}</h5>
          <Link to={`/users/${request.product_owner?.owner}/create-rating`}>
            <button onClick={handleFinalize}>Assess and finalize</button>
          </Link>
        </React.Fragment>
      );
    }

    return null;
  };

  return (
    <div className="request-card d-flex cols justify-content-center align-items-center">
      <div className="prueba">
        <h5>Product que te ofrecen</h5>
        <div>
          <img className="img-product-request" src={request.product_owner?.image} alt={request.product_owner?.title} />
          {request.product_owner?.title}
        </div>
        <div>
          {request.request_owner.name}
        </div>
      </div>

      <div>
        <h5>Product que quieres cambiar</h5>
        <img className="img-product-request" src={request.product_target?.image} alt={request.product_target?.title} />
        {request.product_target?.title}
      </div>

      <div>
        <h5>Status: {request.status}</h5>
        {renderActionButtons()}
      </div>
    </div>
  );
}

export default RequestItem;