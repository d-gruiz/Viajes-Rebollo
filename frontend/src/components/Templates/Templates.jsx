import React, { useState, useEffect } from 'react';
import TemplatesList from './TemplatesList';
import CreateForm from './CreateForm';
import ModificationForm from './ModificationForm';
import "../../css/Templates.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModificationOpen, setIsModificationOpen] = useState(false);
  const [plantillas, setPlantillas] = useState([]);
  const [packages, setPackages] = useState([]);
  const [formHeader, setFormHeader] = useState("Crear Plantilla");
  const [isPackageCreation, setIsPackageCreation] = useState(false);
  const [templateToModify, setTemplateToModify] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplatesAndPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/paquete-viaje');
        const plantillas = response.data.filter(item => item.esModificable);
        const packages = response.data.filter(item => !item.esModificable);
        setPlantillas(plantillas);
        setPackages(packages);
      } catch (error) {
        console.error("Error al obtener los datos del backend:", error);
      }
    };

    fetchTemplatesAndPackages();
  }, []);

  // Actualiza las listas después de crear un paquete
  const updateLists = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/paquete-viaje');
      const plantillas = response.data.filter(item => item.esModificable);
      const packages = response.data.filter(item => !item.esModificable);
      setPlantillas(plantillas);
      setPackages(packages);
    } catch (error) {
      console.error("Error al obtener los datos del backend:", error);
    }
  };

  const toggleModal = (header, isPackage) => {
    setFormHeader(header);
    setIsPackageCreation(isPackage);
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteTemplate = (index, type) => {
    if (type === 'plantilla') {
      setPlantillas((prev) => prev.filter((_, i) => i !== index));
    } else if (type === 'paquete') {
      setPackages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleNavigate = (plantilla) => {
    navigate('/createTravel', { state: { plantilla, isTemplate: true } });
  };

  const onModifyTemplate = (template) => {
    setTemplateToModify(template);
    setIsModificationOpen(true);
  };

  return (
    <div className='Templates-view'>
      <div className='Templates-component'>
        <div className="header">
          <h1>PLANTILLAS</h1>
          <button
            className="addTemplateButton"
            onClick={() => toggleModal("Crear Plantilla", false)}
          >
            Añadir plantilla
          </button>
        </div>
        <div className='List'>
          <TemplatesList
            plantillas={plantillas}
            onDelete={handleDeleteTemplate}
            type="plantilla"
            onNavigate={handleNavigate}
            onModify={onModifyTemplate}
          />
        </div>
      </div>

      <div className='Templates-component'>
        <div className="header">
          <h1>PAQUETES</h1>
          <button
            className="addTemplateButton"
            onClick={() => toggleModal("Crear Paquete", true)}
          >
            Añadir paquete
          </button>
        </div>
        <div className='List'>
          <TemplatesList
            plantillas={packages}
            onDelete={handleDeleteTemplate}
            type="paquete"
            onNavigate={handleNavigate}
          />
        </div>
      </div>

      <CreateForm
        header={formHeader}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isPackageCreation={isPackageCreation}
        updateLists={updateLists} // Pasamos la función updateLists
      />

      {templateToModify && (
        <ModificationForm
          template={templateToModify}
          isModificationOpen={isModificationOpen}
          setIsModificationOpen={setIsModificationOpen}
        />
      )}
    </div>
  );
};

export default Templates;