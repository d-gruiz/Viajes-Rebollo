import React from 'react';
import '../../css/TravelView.css';

function TravelList({ travels }) {
  return (
    <div className="TravelList">
      {travels.map((travel, index) => (
        <div className="TravelCard" key={index}>
          <div className="TravelCardHeader">{travel.name}</div>
          <div className="TravelCardBody">
            <p><strong>Destino:</strong> {travel.destination}</p>
            <p><strong>Duración:</strong> {travel.duration}</p>
            <p><strong>Precio:</strong> ${travel.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

TravelList.defaultProps = {
  travels: [
    { name: 'Viaje a Nueva York', destination: 'Estados Unidos', duration: '5 días', price: 800 },
    { name: 'Vacaciones en Cancún', destination: 'México', duration: '7 días', price: 1000 },
    { name: 'Explora Barcelona', destination: 'España', duration: '6 días', price: 1200 },
  ],
};

export default TravelList;
