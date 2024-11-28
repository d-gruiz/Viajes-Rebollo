import React, { useState } from 'react';

const Plantillas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    transporte: '',
    alojamiento: '',
    actividades: [],
    precio: '',
  });
  const [plantillas, setPlantillas] = useState([]);
  const [newActivity, setNewActivity] = useState('');

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar que solo acepte números y puntos para el campo precio
    if (name === 'precio' && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar una nueva actividad
  const addActivity = () => {
    if (newActivity.trim()) {
      setFormData((prev) => ({
        ...prev,
        actividades: [...prev.actividades, newActivity],
      }));
      setNewActivity('');
    }
  };

  // Eliminar una actividad
  const removeActivity = (index) => {
    setFormData((prev) => ({
      ...prev,
      actividades: prev.actividades.filter((_, i) => i !== index),
    }));
  };

  // Manejar tecla presionada en el campo de actividades
  const handleActivityKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Evita que se haga un salto de línea
      addActivity();
    }
  };

  // Cerrar o abrir el pop-up
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el precio no esté vacío
    if (!formData.precio) {
      alert('El campo Precio es obligatorio.');
      return;
    }

    // Agregar nueva plantilla
    setPlantillas((prev) => [...prev, formData]);
    toggleModal();

    // Reiniciar formulario
    setFormData({ nombre: '', transporte: '', alojamiento: '', actividades: [], precio: '' });
  };

  return (
    <div>
      <h1>PLANTILLAS</h1>

      {/* Lista de plantillas */}
      <div style={styles.plantillasContainer}>
        {plantillas.map((plantilla, index) => (
          <div key={index} style={styles.plantilla}>
            <p style={styles.plantillaNombre}>{plantilla.nombre}</p>
            <p>{plantilla.transporte}</p>
            <div style={styles.spacing}></div>
            <p>{plantilla.alojamiento}</p>
            <div style={styles.spacing}></div>
            <div>
              <ul>
                {plantilla.actividades.map((actividad, i) => (
                  <li key={i}>{actividad}</li>
                ))}
              </ul>
            </div>
            <p style={styles.plantillaPrecio}>
              {plantilla.precio} €{' '}
              <button style={styles.createPlanButton}>Crear plan de viaje</button>
            </p>
          </div>
        ))}
      </div>

      <button onClick={toggleModal}>Crear paquete modificable</button>

      {/* Pop-up */}
      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Crear Paquete</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Nombre */}
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

              {/* Transporte */}
              <label>
                Transporte:
                <textarea
                  name="transporte"
                  value={formData.transporte}
                  onChange={handleChange}
                  placeholder={`Vuelo Madrid-Londres 18/11 11:30
Vuelo Londres-Madrid 21/11 21:00`}
                  rows="3"
                  style={styles.largeInput}
                />
              </label>

              {/* Alojamiento */}
              <label>
                Alojamiento:
                <textarea
                  name="alojamiento"
                  value={formData.alojamiento}
                  onChange={handleChange}
                  placeholder="Hotel Trafalgar Square 18/11 - 21/11"
                  rows="3"
                  style={styles.largeInput}
                />
              </label>

              {/* Actividades */}
              <label>
                Actividades:
                <div style={styles.activitiesContainer}>
                  <div style={styles.activitiesList}>
                    {formData.actividades.map((activity, index) => (
                      <div key={index} style={styles.activityItem}>
                        <span>{activity}</span>
                        <button type="button" onClick={() => removeActivity(index)} style={styles.removeButton}>
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
                    style={styles.addActivityInput}
                    rows="1"
                  />
                  <button type="button" onClick={addActivity}>
                    Añadir Actividad
                  </button>
                </div>
              </label>

              {/* Precio */}
              <label style={styles.priceLabel}>
                Precio:
                <input
                  type="text"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="220.80"
                  required
                  style={styles.smallInput}
                />
                <span>€</span>
              </label>

              {/* Botones */}
              <div style={styles.buttons}>
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

export default Plantillas;

// Estilos actualizados
const styles = {
  plantillasContainer: {
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '20px',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  plantilla: {
    marginBottom: '20px',
  },
  plantillaNombre: {
    fontWeight: 'bold',
  },
  spacing: {
    margin: '10px 0',
  },
  plantillaPrecio: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  createPlanButton: {
    marginLeft: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  largeInput: {
    width: '100%',
    fontSize: '14px',
    padding: '8px',
  },
  activitiesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  activitiesList: {
    maxHeight: '150px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  activityItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 0',
  },
  removeButton: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '2px 5px',
  },
  addActivityInput: {
    padding: '8px',
    fontSize: '14px',
  },
  smallInput: {
    width: '100px',
    padding: '8px',
    fontSize: '14px',
  },
  priceLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
