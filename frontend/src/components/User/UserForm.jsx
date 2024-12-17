import React, { useState } from 'react';

const UserForm = ({ onClose, addUser }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('viajero'); // Por defecto, el tipo es 'viajero'

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, surname, email, type };
    addUser(user); // Añadir el usuario
    onClose(); // Cerrar el formulario
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
        placeholder="Apellido"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
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
