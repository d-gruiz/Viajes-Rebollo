import React from 'react';
import "../../css/UserElement.css"
const UserElement = ({ user }) => {
  return (
    <div className="userElement">
      <p>Nombre: <strong>{user.name}</strong></p>
      <p>Apellidos: {user.surname}</p>
      <p>Email: {user.email}</p>
      <p>Tipo: {user.type}</p>
    </div>
  );
};

export default UserElement;
