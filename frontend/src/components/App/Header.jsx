import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/Header.css"

function Header() {
  const navigate = useNavigate();

  return (
    <div className='Header'>
      <div onClick={() => navigate('/lista de plan de viajes')}>
        <strong>PLANES DE VIAJES</strong>
      </div>
      <div onClick={() => navigate('/templates')}>
        <strong>PLANTILLAS</strong>
      </div>
      <div onClick={() => navigate('/travels')}>
        <strong>VIAJES</strong>
      </div>
    </div>
  );
}

export default Header;
