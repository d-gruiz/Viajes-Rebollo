import React, { useState } from 'react';
import '../../css/TravelView.css';
import TravelList from './TravelList';

function TravelView() {
  const [activeTab, setActiveTab] = useState('previous'); // Estado para manejar la pestaña activa

  // Datos de ejemplo
  const previousTravels = [
    { name: 'Viaje a Roma', destination: 'Italia', duration: '4 días', price: 700 },
    { name: 'Descubre Atenas', destination: 'Grecia', duration: '5 días', price: 850 },
  ];

  const nextTravels = [
    { name: 'Explora Tokio', destination: 'Japón', duration: '7 días', price: 1500 },
    { name: 'Safari en Sudáfrica', destination: 'Sudáfrica', duration: '10 días', price: 2000 },
  ];

  // Maneja el cambio de pestañas
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
        <div className="TravelListContainer">
          {activeTab === 'previous' ? (
            <TravelList travels={previousTravels} />
          ) : null}
        </div>        
        <div
          className={`Tab ${activeTab === 'next' ? 'active' : ''}`}
          onClick={() => handleTabChange('next')}
        >
          Viajes Siguientes <span className="Arrow">→</span>
        </div>
      </div>
      <div className="TravelListContainer">
        {activeTab === 'previous' ? (
          null
        ) : (
          <TravelList travels={nextTravels} />
        )}
      </div>
    </div>
  );
}

export default TravelView;
