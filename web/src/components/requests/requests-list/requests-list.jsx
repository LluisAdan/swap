import React, { useContext, useEffect, useState } from 'react';
import { getRequests, updateRequest } from '../../../services/api.service';
import AuthContext from '../../../contexts/auth.context';
import RequestItem from '../request-item/request-item';
import { useNavigate } from 'react-router-dom';

import './requests-list.css';

function RequestsList() {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [sendTo, setSendTo] = useState(false);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await getRequests(user.id);
        setRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRequests();
  }, [user.id]);

  const handleUpdateStatus = (id, status) => {
    updateRequest(id, { status })
      .then(response => {
        setRequests(requests.map(request =>
          request.id === id ? { ...request, status: response.data.status } : request
        ));
      })
      .catch(error => {
        console.error('Hubo un error al actualizar el estado de la solicitud!', error);
      });
  };

  if (!requests) {
    return <div>Loading...</div>
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        {requests.length ? requests
        .sort((a, b) => {
          if(a.status < b.status) return 1; 
          if(a.status > b.status) return -1; 
          return 0;
        })
        .map(request => (<div className="product-item col"><RequestItem key={request.id} request={request} onUpdateStatus={handleUpdateStatus}/></div>
      )) : <div className="d-flex justify-content-center warning-requests"><h5>No requests yet</h5></div> }
        
      </div>
    </div>
  );
};

export default RequestsList;
