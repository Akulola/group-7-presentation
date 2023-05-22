import React from 'react';

const MemberList = ({ members, onDelete }) => {
  const handleDelete = (id) => {
    // Make a DELETE request to remove the member
    fetch(`/db.json/members/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        onDelete(id); // Pass the deleted member ID to the parent component
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ul className="list-group">
      {members.map((member) => (
        <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
          {member.name}
          <button onClick={() => handleDelete(member.id)} className="btn btn-danger">Delete</button>
        </li>
      ))}
    </ul>
  );
  
};

export default MemberList;
