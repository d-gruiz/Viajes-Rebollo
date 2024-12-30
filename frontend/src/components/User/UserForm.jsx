import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onClose, addUser }) => {
  const [name, setName] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('viajero'); // Mantienes el tipo de usuario

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = { name, telefono, email, type };
  
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios', user);

      console.log('Usuario agregado:', response.data);
      
      addUser({ ...response.data, type: type });
      
      onClose();
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      alert('Hubo un error al agregar el usuario. Por favor, intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Usuario</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div>
        <label>
          Tipo de usuario:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="viajero">Viajero</option>
            <option value="comprador">Comprador</option>
          </select>
        </label>
      </div>
      <button type="submit">Agregar</button>
      <button type="button" onClick={onClose}>Cerrar</button>
    </form>
  );
};

export default UserForm;


