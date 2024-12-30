import React, { useState, useEffect } from 'react';
import UserList from '../User/UserList';
import UserForm from '../User/UserForm';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../../css/TravelPlan.css";

const TravelPlan = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { plantilla, type } = location.state || {};

  const [activityInput, setActivityInput] = useState("");
  const [activities, setActivities] = useState(plantilla?.actividades || []);  // Inicializar con las actividades de la plantilla
  const [travelPlanName, setTravelPlanName] = useState("");

  // Estados para las fechas de inicio y fin
  const [fechaInicio, setFechaInicio] = useState(plantilla?.fechaInicio || ""); 
  const [fechaFin, setFechaFin] = useState(plantilla?.fechaFin || ""); 

  // Estado para los campos editables de transporte, alojamiento y precio
  const [transporte, setTransporte] = useState(plantilla?.transporte || "");
  const [alojamiento, setAlojamiento] = useState(plantilla?.alojamiento || "");
  const [precio, setPrecio] = useState(plantilla?.precio || "");  // Lo dejamos vacío, ya que el precio no está predefinido en la plantilla

  const addUser = (user) => {
    if (user.type === "comprador" && users.some(u => u.type === "comprador")) {
      alert("Ya hay un comprador asignado.");
      return;
    }
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleAddActivity = () => {
    if (activityInput.trim() === "") {
      alert("La actividad no puede estar vacía.");
      return;
    }
    setActivities((prev) => [...prev, activityInput]);
    setActivityInput("");
  };

  const handleDeleteActivity = (activityToDelete) => {
    setActivities((prev) => prev.filter(activity => activity !== activityToDelete));
  };

  const handleCreateTravel = async () => {
    if (!travelPlanName) {
      alert("El nombre del plan de viaje es obligatorio.");
      return;
    }

    if (!transporte || !alojamiento || !precio || !fechaInicio || !fechaFin) {
      alert("Los campos de Transporte, Alojamiento, Precio, Fecha de Inicio y Fecha de Fin son obligatorios.");
      return;
    }

    // Buscar el comprador y los viajeros
    const comprador = users.find(user => user.type === "comprador");
    const viajeros = users.filter(user => user.type === "viajero");

    if (!comprador) {
      alert("Debe haber un comprador asignado.");
      return;
    }

    if (viajeros.length === 0) {
      alert("Debe haber al menos un viajero asignado.");
      return;
    }

    const planData = {
      nombre: travelPlanName,
      precio: parseFloat(precio),
      actividades: activities,
      compradorId: comprador.id,
      viajerosId: viajeros.map(v => v.id),
      alojamiento: alojamiento,
      transporte: transporte,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };

    try {
      const response = await axios.post('http://localhost:8080/api/plan-viaje', planData);
      console.log("Plan de viaje creado con éxito", response.data);
      navigate('/lista de plan de viajes');
    } catch (error) {
      console.error("Error al crear el plan de viaje", error);
      alert("Hubo un error al crear el plan de viaje. Intenta nuevamente.");
    }
  };

  return (
    <div className='TravelPlanView'>
      <div className="headerContainer">
        <h1>PLAN DE VIAJES</h1>
        <button onClick={() => setIsFormVisible(true)}>Añadir usuarios</button>
      </div>

      <div>
        <div className="userListsContainer">
          <div className="userListSection">
            <strong>Comprador</strong>
            <UserList users={users.filter(user => user.type === "comprador")} />
          </div>
          <div className="userListSection">
            <strong>Viajeros</strong>
            <UserList users={users.filter(user => user.type === "viajero")} />
          </div>
        </div>
      </div>

      {plantilla && type === 'plantilla' && (
        <div>
          <div className="addActivityContainer">
            <input
              type="text"
              placeholder="Añadir actividad"
              value={activityInput}
              onChange={(e) => setActivityInput(e.target.value)}
              className="activityInput"
            />
            <button onClick={handleAddActivity} className="addActivityButton">
              Añadir
            </button>
          </div>
        </div>
      )}

      {isFormVisible && (
        <UserForm
          onClose={() => setIsFormVisible(false)}
          addUser={addUser}
        />
      )}

      <div className="editableFields">
        <div className="inputGroup">
          <label>Nombre del Plan:</label>
          <input
            type="text"
            value={travelPlanName}
            onChange={(e) => setTravelPlanName(e.target.value)}
            placeholder="Nombre del Plan de Viaje"
            className="editableInput"
            required
          />
        </div>
        <div className="inputGroup">
        <label>Transporte:</label>
        <textarea
          value={transporte}
          onChange={(e) => setTransporte(e.target.value)}
          placeholder="Ejemplo: Vuelo Madrid-Londres 18/11 11:30"
          className="editableTextarea"
          required
        />
      </div>
      <div className="inputGroup">
        <label>Alojamiento:</label>
        <textarea
          value={alojamiento}
          onChange={(e) => setAlojamiento(e.target.value)}
          placeholder="Ejemplo: Hotel Trafalgar Square 18/11 - 21/11"
          className="editableTextarea"
          required
        />
      </div>

        <div className="inputGroup">
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ejemplo: 220.80"
            className="editableInput"
            required
          />
        </div>

        <div className="inputGroup">
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="editableInput"
            required
          />
        </div>

        <div className="inputGroup">
          <label>Fecha de Fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="editableInput"
            required
          />
        </div>
      </div>

      <div className="activityListContainer">
        <h3>Actividades:</h3>
        <ul>
          {activities.map((activity, index) => (
            <li key={index} className="activityItem">
              {activity} 
              {type === 'plantilla' && (
                <button
                  onClick={() => handleDeleteActivity(activity)}
                  className="deleteActivityButton"
                >
                  Eliminar
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="createTravelButtonContainer">
        <button className="createTravelButton" onClick={handleCreateTravel}>Crear Viaje</button>
      </div>
    </div>
  );
};

export default TravelPlan;







