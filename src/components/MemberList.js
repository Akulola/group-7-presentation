import React, { useState } from 'react';
import UpdateMemberForm from './UpdateMemberForm';

const MemberList = ({ members, onDelete, onUpdate }) => {
  const [editingMemberId, setEditingMemberId] = useState(null);

  const handleDelete = (id) => {
    // Make a DELETE request to remove the member
    fetch(`http://localhost:3000/members/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        onDelete(id); // Pass the deleted member ID to the parent component
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleUpdate = (updatedMember) => {
    // Make a PUT request to update the member
    fetch(`http://localhost:3000/members/${updatedMember.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMember),
    })
      .then(() => {
        onUpdate(updatedMember); // Pass the updated member object to the parent component
        setEditingMemberId(null); // Reset the editing member ID
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCancelUpdate = () => {
    setEditingMemberId(null); // Reset the editing member ID when canceling the update
  };

  return (
    <ul className="list-group">
      {members.map((member) => (
        <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
          {editingMemberId === member.id ? (
            <UpdateMemberForm
              member={member}
              onUpdate={handleUpdate}
              onCancelUpdate={handleCancelUpdate}
            />
          ) : (
            <>
              {member.name}
              <div>
                <button onClick={() => setEditingMemberId(member.id)} className="btn btn-primary mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(member.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MemberList;
