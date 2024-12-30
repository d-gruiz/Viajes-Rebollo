import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/CreateForm.css";

const ModificationForm = ({ plan, isModificationOpen, handleModify, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: plan.nombre || '',
    precio: plan.precio || '',
    transporte: plan.transporte || '',
    alojamiento: plan.alojamiento || '',
    actividades: plan.actividades || [],
  });

  const [newActivity, setNewActivity] = useState('');

  // Sincronizar el formulario con los datos del plan cuando cambian.
  useEffect(() => {
    setFormData({
      nombre: plan.nombre || '',
      precio: plan.precio || '',
      transporte: plan.transporte || '',
      alojamiento: plan.alojamiento || '',
      actividades: plan.actividades || [],
    });
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      compradorId: plan.compradorId,
      viajerosId: plan.viajerosId,
    };
  
    const apiUrl = `http://localhost:8080/api/plan-viaje/${plan.id}`;
  
    try {
      const response = await axios.put(apiUrl, postData);
      console.log('Respuesta del servidor:', response.data);
      alert('Plan de viaje actualizado correctamente.');
  
      // Pasar la respuesta actualizada al componente padre
      handleModify(response.data);  // Actualizar el plan en la lista
  
      onClose();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al guardar. Intenta de nuevo.');
    }
  };
  

  return (
    <div>
      {isModificationOpen && (
        <div className="overlay">
          <div className="modal">
            <h2>Modificar Plan de Viaje</h2>
            <form onSubmit={handleSubmit} className="form">
              <label>
                Nombre del Plan:
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Transporte:
                <textarea
                  name="transporte"
                  value={formData.transporte}
                  onChange={handleChange}
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
                    {formData.actividades.length > 0 ? (
                      formData.actividades.map((activity, index) => (
                        <div key={index} className="activityItem">
                          <span>{activity}</span>
                          <button type="button" onClick={() => removeActivity(index)} className="removeButton">
                            -
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No hay actividades disponibles.</p>
                    )}
                  </div>
                  <textarea
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyDown={handleActivityKeyDown}
                    className="addActivityInput"
                    rows="1"
                    placeholder="Añadir una nueva actividad"
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
                  required
                  className="smallInput"
                />
                <span>€</span>
              </label>

              <div className="buttons">
                <button type="button" onClick={onClose}>
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

export default ModificationForm;

