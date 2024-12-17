import React from 'react';
import TravelPlanElement from './TravelPlanElement';
import "../../css/TravelPlanList.css"

const TravelPlanList = () => {
  const travelPlans = [
    {
      id: 1,
      nombre: "Viaje a París",
      transporte: "Avión",
      alojamiento: "Hotel 5 estrellas",
      actividades: ["Tour por la Torre Eiffel", "Cena en Montmartre"],
      precio: 1200,
    },
    {
      id: 2,
      nombre: "Viaje a Londres",
      transporte: "Tren",
      alojamiento: "Hotel 3 estrellas",
      actividades: ["Visita al Big Ben", "Paseo por el río Támesis"],
      precio: 850,
    },
    {
      id: 3,
      nombre: "Viaje a Roma",
      transporte: "Avión",
      alojamiento: "Apartamento",
      actividades: ["Visita al Coliseo", "Tour gastronómico"],
      precio: 950,
    },
  ];

  return (
    <div className="travelListContainer">
      <div className="headerContainer">
        <h1>PLANES DE VIAJES</h1>
      </div>

      <div className="travelList">
        {travelPlans.map((plan) => (
          <TravelPlanElement key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default TravelPlanList;
