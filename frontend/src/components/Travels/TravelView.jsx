import React, { useState, useEffect } from 'react';
import '../../css/TravelView.css';
import TravelList from './TravelList';
import axios from 'axios';

function TravelView() {
  const [activeTab, setActiveTab] = useState('previous');
  const [previousTravels, setPreviousTravels] = useState([]);
  const [nextTravels, setNextTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravels = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:8080/api/plan-viaje'); // Actualiza con la URL de tu API
        const allTravels = response.data;

        const currentDate = new Date();

        // Filtra viajes anteriores y próximos
        const pastTravels = allTravels.filter(
          (travel) => new Date(travel.fechaFin) < currentDate
        );
        const upcomingTravels = allTravels.filter(
          (travel) => new Date(travel.fechaFin) >= currentDate
        );

        setPreviousTravels(pastTravels);
        setNextTravels(upcomingTravels);
      } catch (error) {
        console.error('Error al cargar los datos de viajes:', error);
        setError('No se pudieron cargar los viajes. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="TravelView">
      <div className="Tabs">
        <div
          className={`Tab ${activeTab === 'previous' ? 'active' : ''}`}
          onClick={() => handleTabChange('previous')}
        >
          Viajes Anteriores <span className="Arrow">→</span>
        </div>
        <div
          className={`Tab ${activeTab === 'next' ? 'active' : ''}`}
          onClick={() => handleTabChange('next')}
        >
          Viajes Siguientes <span className="Arrow">→</span>
        </div>
      </div>
      <div className="TravelListContainer">
        {loading ? (
          <p>Cargando viajes...</p>
        ) : error ? (
          <p className="Error">{error}</p>
        ) : activeTab === 'previous' ? (
          <TravelList travels={previousTravels} />
        ) : (
          <TravelList travels={nextTravels} />
        )}
      </div>
    </div>
  );
}

export default TravelView;

