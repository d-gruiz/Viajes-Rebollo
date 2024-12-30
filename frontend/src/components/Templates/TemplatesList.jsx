import React from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateElement from './TemplateElement';

const TemplatesList = ({ plantillas, onDelete, type, onModify }) => {
  const navigate = useNavigate();

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
          onModify={onModify ? () => onModify(plantilla) : null}
          type={type}
        />
      ))}
    </div>
  );
};

export default TemplatesList;



