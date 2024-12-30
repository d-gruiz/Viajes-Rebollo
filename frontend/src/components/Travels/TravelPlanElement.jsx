import React from 'react';
import "../../css/TravelPlanList.css";

const TravelPlanElement = ({ plan, onDelete, onModify }) => {
  return (
    <div className="travelPlanElement">
      <h3>{plan.nombre}</h3>
      <p><strong>Transporte:</strong> {plan.transporte}</p>
      <p><strong>Alojamiento:</strong> {plan.alojamiento}</p>
      <p><strong>Actividades:</strong></p>
      <ul>
        {plan.actividades && plan.actividades.length > 0 ? (
          plan.actividades.map((actividad, index) => (
            <li key={index}>{actividad}</li>
          ))
        ) : (
          <p>No hay actividades disponibles.</p>
        )}
      </ul>
      <p><strong>Precio:</strong> {plan.precio} €</p>

      <div className="buttons">
        <button onClick={() => onModify(plan, true)}>
          Modificar
        </button>
        <button onClick={() => onDelete(plan.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TravelPlanElement;





