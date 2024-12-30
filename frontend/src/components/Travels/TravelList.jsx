import React from 'react';
import '../../css/TravelView.css';

function TravelList({ travels }) {
  return (
    <div className="TravelList">
      {travels.map((travel, index) => (
        <div className="TravelCard" key={index}>
          <div className="TravelCardHeader">{travel.nombre}</div>
          <div className="TravelCardBody">
            <p><strong>Alojamiento:</strong> {travel.alojamiento || 'No especificado'}</p>
            <p><strong>Transporte:</strong> {travel.transporte || 'No especificado'}</p>
            <p><strong>Precio:</strong> ${travel.precio}</p>
            <p><strong>Fecha Inicio:</strong> {new Date(travel.fechaInicio).toLocaleDateString()}</p>
            <p><strong>Fecha Fin:</strong> {new Date(travel.fechaFin).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TravelList;
