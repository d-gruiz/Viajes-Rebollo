import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/CreateForm.css";

const CreateForm = ({ header, isModalOpen, setIsModalOpen, isPackageCreation, updateLists }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    transporte: '',
    alojamiento: '',
    actividades: [],
    precio: '',
    esModificable: !isPackageCreation,
  });

  const [newActivity, setNewActivity] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      esModificable: !isPackageCreation,
    }));
  }, [isPackageCreation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      if (name === 'precio' && !/^\d*\.?\d*$/.test(value)) {
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addActivity = () => {
    if (newActivity.trim()) {
      setFormData((prev) => ({
        ...prev,
        actividades: [...prev.actividades, newActivity.trim()],
      }));
      setNewActivity('');
    }
  };

  const removeActivity = (index) => {
    setFormData((prev) => ({
      ...prev,
      actividades: prev.actividades.filter((_, i) => i !== index),
    }));
  };

  const onClick = () => {
    setIsModalOpen(false);
  };

  const handleActivityKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addActivity();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.precio) {
      alert('El campo Precio es obligatorio.');
      return;
    }

    const postData = {
      ...formData,
    };

    const apiUrl = 'http://localhost:8080/api/paquete-viaje';

    try {
      setIsModalOpen(false);
      const response = await axios.post(apiUrl, postData);
      alert('Paquete creado correctamente!');
      updateLists();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al guardar. Intenta de nuevo.');
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <h2>{header}</h2>
            <form onSubmit={handleSubmit} className="form">
              <label>
                Nombre:
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Fin de semana en Londres"
                  required
                />
              </label>

              <label>
                Transporte:
                <textarea
                  name="transporte"
                  value={formData.transporte}
                  onChange={handleChange}
                  placeholder={`Vuelo Madrid-Londres 18/11 11:30\nVuelo Londres-Madrid 21/11 21:00`}
                  rows="3"
                  className="largeInput"
                />
              </label>

              <label>
                Alojamiento:
                <textarea
                  name="alojamiento"
                  value={formData.alojamiento}
                  onChange={handleChange}
                  placeholder="Hotel Trafalgar Square 18/11 - 21/11"
                  rows="3"
                  className="largeInput"
                />
              </label>

              <label>
                Actividades:
                <div className="activitiesContainer">
                  <div className="activitiesList">
                    {formData.actividades.map((activity, index) => (
                      <div key={index} className="activityItem">
                        <span>{activity}</span>
                        <button type="button" onClick={() => removeActivity(index)} className="removeButton">
                          -
                        </button>
                      </div>
                    ))}
                  </div>
                  <textarea
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyDown={handleActivityKeyDown}
                    placeholder="Free Tour Londres 20/11 10:30"
                    className="addActivityInput"
                    rows="1"
                  />
                  <button type="button" onClick={addActivity}>
                    Añadir Actividad
                  </button>
                </div>
              </label>

              <label className="priceLabel">
                Precio:
                <input
                  type="text"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="220.80"
                  required
                  className="smallInput"
                />
                <span>€</span>
              </label>

              <div className="buttons">
                <button type="button" onClick={onClick}>
                  Cancelar
                </button>
                <button type="submit">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateForm;


