import React, { useState } from 'react';
import UserList from '../User/UserList';
import UserForm from '../User/UserForm';
import { useLocation, useNavigate } from 'react-router-dom';  // Importa useNavigate
import TemplateElement from '../Templates/TemplateElement';

import "../../css/TravelPlan.css";

const TravelPlan = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();  // Inicializa la función de navegación

  const { plantilla, type } = location.state || {};  // Desestructuramos plantilla y type

  const [activityInput, setActivityInput] = useState("");
  const [activities, setActivities] = useState([]);

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
    setActivityInput(""); // Limpiamos el input
  };

  // Función para navegar al Home cuando se hace clic en "Crear Viaje"
  const handleCreateTravel = () => {
    navigate('/home');  // Cambia '/home' por la ruta de tu página de inicio
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

      {plantilla && (
        <div>
          <TemplateElement
            plantilla={{
              ...plantilla,
              actividades: [...(plantilla.actividades || []), ...activities],
            }}
          />
          {type === 'plantilla' && ( // Solo mostramos el input si es una plantilla
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
          )}
        </div>
      )}

      {isFormVisible && (
        <UserForm
          onClose={() => setIsFormVisible(false)}
          addUser={addUser}
        />
      )}

      <div className="createTravelButtonContainer">
        <button className="createTravelButton" onClick={handleCreateTravel}>Crear Viaje</button> {/* Llamamos a handleCreateTravel */}
      </div>
    </div>
  );
};

export default TravelPlan;

