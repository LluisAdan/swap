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

  const handleReceivedClick = () => {
    setSendTo(false); // Mostrar solicitudes recibidas
  };

  const handleSentClick = () => {
    setSendTo(true); // Mostrar solicitudes enviadas
  };

  if (!requests) {
    return <div>Loading...</div>
  };

  let filteredRequests = [];
  if (sendTo) {
    // Mostrar solicitudes enviadas
    filteredRequests = requests.filter(request => request?.request_owner.id === user.id);
  } else {
    // Mostrar solicitudes recibidas
    filteredRequests = requests.filter(request => request?.request_target.id === user.id);
  }

  return (
    <div className="d-flex row">
      <div className="d-flex justify-content-center">
        <ul className="nav nav-underline">
          <li className="nav-item" role="presentation">
            <a className={`nav-link ${!sendTo ? 'active' : ''}`} onClick={handleReceivedClick} role="tab" aria-selected={!sendTo}>Recibidos</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className={`nav-link ${sendTo ? 'active' : ''}`} onClick={handleSentClick} role="tab" aria-selected={sendTo}>Enviados</a>
          </li>
        </ul>
      </div>

      <div>
        {filteredRequests
        .map(request => <div className="product-item col"><RequestItem key={request.id} request={request} onUpdateStatus={handleUpdateStatus}/></div>)
        .sort((a, b) => a.status - b.status)}
      </div>
    </div>
  );
};

export default RequestsList;
