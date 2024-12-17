import React, { useState, useEffect } from 'react';
import "../../css/CreateForm.css"

const CreateForm = ({ header, isModalOpen, toggleModal, handleAddTemplate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    transporte: '',
    alojamiento: '',
    actividades: [],
    precio: '',
    crearPaquete: false,
  });
  const [newActivity, setNewActivity] = useState('');

  useEffect(() => {
    if (!isModalOpen) {
      setFormData({
        nombre: '',
        transporte: '',
        alojamiento: '',
        actividades: [],
        precio: '',
        crearPaquete: false,
      });
      setNewActivity('');
    }
  }, [isModalOpen]);

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
        actividades: [...prev.actividades, newActivity],
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

  const handleActivityKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addActivity();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.precio) {
      alert('El campo Precio es obligatorio.');
      return;
    }

    handleAddTemplate(formData);
    setFormData({
      nombre: '',
      transporte: '',
      alojamiento: '',
      actividades: [],
      precio: '',
      crearPaquete: false,
    });
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
                  placeholder={`Vuelo Madrid-Londres 18/11 11:30
                  Vuelo Londres-Madrid 21/11 21:00`}
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
                <button type="button" onClick={toggleModal}>
                  Cancelar
                </button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
