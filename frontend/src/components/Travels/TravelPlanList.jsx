import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelPlanElement from './TravelPlanElement';
import ModificationForm from './ModificationForm'; // Asumiendo que el formulario de modificación está importado correctamente
import "../../css/TravelPlanList.css";

const TravelPlanList = () => {
  const [isModification, setIsModification] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Agregado para seleccionar el plan a modificar
  const [travelPlans, setTravelPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/plan-viaje');
        setTravelPlans(response.data);
      } catch (err) {
        setError('Error al obtener los planes de viaje');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelPlans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/plan-viaje/${id}`);
      setTravelPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
    } catch (error) {
      console.error('Error al eliminar el plan de viaje:', error);
      alert('Hubo un error al eliminar el plan. Intenta de nuevo.');
    }
  };

  const handleModify = (modifiedPlan) => {
    // Actualizar el plan en la lista de planes
    setTravelPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === modifiedPlan.id ? modifiedPlan : plan
      )
    );
    setIsModification(true);
    setSelectedPlan(modifiedPlan); // Si deseas mostrar el plan actualizado en el formulario
  };
  

  const handleCloseModification = () => {
    setIsModification(false);
    setSelectedPlan(null); // Limpiar la selección al cerrar el formulario
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="travelListContainer">
      <div className="headerContainer">
        <h1>PLANES DE VIAJES</h1>
      </div>

      <div className="travelList">
        {travelPlans.length === 0 ? (
          <p>No hay planes de viaje disponibles.</p>
        ) : (
          travelPlans.map((plan) => (
            <div key={plan.id}>
              <TravelPlanElement
                plan={plan}
                onDelete={handleDelete}
                onModify={handleModify}
              />
            </div>
          ))
        )}
      </div>
      
      {isModification && selectedPlan && (
        <ModificationForm
          plan={selectedPlan}
          isModificationOpen={isModification}
          handleModify={handleModify}
          onClose={handleCloseModification} // Pasamos la función de cierre
        />
      )}
    </div>
  );
};

export default TravelPlanList;






