import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate
import TemplateElement from './TemplateElement'; // Importamos TemplateElement

const TemplatesList = ({ plantillas, onDelete, type }) => {
  const navigate = useNavigate();  // Usamos useNavigate para obtener la función de navegación

  if (!Array.isArray(plantillas) || plantillas.length === 0) {
    return null;
  }

  return (
    <div className="plantillasContainer">
      {plantillas.map((plantilla, index) => (
        <TemplateElement
          key={index}
          plantilla={plantilla}
          onDelete={() => onDelete(index, type)}
          onCreatePlan={() => navigate('/createTravel', { state: { plantilla, type } })}
          type={type}
        />
      ))}
    </div>
  );
};

export default TemplatesList;


