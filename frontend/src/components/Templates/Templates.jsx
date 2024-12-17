import React, { useState } from 'react';
import TemplatesList from './TemplatesList';
import CreateForm from './CreateForm';
import "../../css/Templates.css";
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate

const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plantillas, setPlantillas] = useState([
    {
      nombre: "Plantilla Predefinida",
      transporte: "Avión",
      alojamiento: "Hotel 4 estrellas",
      actividades: ["Visita guiada", "Excursión en barco"],
      precio: 499,
    },  
  ]);
  const [packages, setPackages] = useState([
    {
      nombre: "Paquete Predefinido",
      transporte: "Avión",
      alojamiento: "Hotel 4 estrellas",
      actividades: ["Visita guiada", "Excursión en barco"],
      precio: 499,
    },
  ]);
  const [formHeader, setFormHeader] = useState("Crear Plantilla");
  const navigate = useNavigate(); // Usamos useNavigate para navegar

  const toggleModal = (header = "Crear Plantilla") => {
    setFormHeader(header);
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTemplate = (newTemplate) => {
    if (formHeader === "Crear Plantilla") {
      setPlantillas((prev) => [...prev, newTemplate]);
    } else if (formHeader === "Crear Paquete") {
      setPackages((prev) => [...prev, newTemplate]);
    }
    toggleModal();
  };

  const handleDeleteTemplate = (index, type) => {
    if (type === 'plantilla') {
      setPlantillas((prev) => prev.filter((_, i) => i !== index));
    } else if (type === 'paquete') {
      setPackages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleNavigate = (plantilla) => {
    navigate('/createTravel', { state: { plantilla, isTemplate: true } }); // Pasamos si es una plantilla
  };

  return (
    <div className='Templates-view'>
      <div className='Templates-component'>
        <div className="header">
          <h1>PLANTILLAS</h1>
          <button
            className="addTemplateButton"
            onClick={() => toggleModal("Crear Plantilla")}
          >
            Añadir plantilla
          </button>
        </div>
        <div className='List'>
          <TemplatesList
            plantillas={plantillas}
            onDelete={handleDeleteTemplate}
            type="plantilla"
            onNavigate={handleNavigate} // Pasamos la función de navegación
          />
        </div>
      </div>

      <div className='Templates-component'>
        <div className="header">
          <h1>PAQUETES</h1>
          <button
            className="addTemplateButton"
            onClick={() => toggleModal("Crear Paquete")}
          >
            Añadir paquete
          </button>
        </div>
        <div className='List'>
          <TemplatesList
            plantillas={packages}
            onDelete={handleDeleteTemplate}
            type="paquete"
            onNavigate={handleNavigate} // No debe navegar si es un paquete
          />
        </div>
      </div>

      <CreateForm
        header={formHeader}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handleAddTemplate={handleAddTemplate}
      />
    </div>
  );
};

export default Templates;
