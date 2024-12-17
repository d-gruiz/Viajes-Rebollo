import React from 'react';
import UserElement from './UserElement';

const UserList = ({ users }) => {
  return (
    <div>
      {users.length === 0 && <p>No hay usuarios aún.</p>}
      {users.map((user, index) => (
        <UserElement key={index} user={user} />
      ))}
    </div>
  );
};

export default UserList;
