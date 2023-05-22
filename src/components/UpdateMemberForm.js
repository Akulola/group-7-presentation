import React, { useState } from 'react';

const UpdateMemberForm = ({ member, onUpdate }) => {
  const [name, setName] = useState(member.name);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a PUT request to update the member
    fetch(`/db.json/members/${member.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data); // Pass the updated member data to the parent component
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter updated name"
          value={name}
          onChange={handleNameChange}
        />
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  );
  
};

export default UpdateMemberForm;
