import React from 'react';
import "../../css/TravelPlanList.css"

const TravelPlanElement = ({ plan }) => {
  return (
    <div className="travelPlanElement">
      <h3>{plan.nombre}</h3>
      <p><strong>Transporte:</strong> {plan.transporte}</p>
      <p><strong>Alojamiento:</strong> {plan.alojamiento}</p>
      <p><strong>Actividades:</strong></p>
      <ul>
        {plan.actividades.map((actividad, index) => (
          <li key={index}>{actividad}</li>
        ))}
      </ul>
      <p><strong>Precio:</strong> {plan.precio} €</p>
    </div>
  );
};

export default TravelPlanElement;
