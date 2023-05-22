import React, { useState } from 'react';

const CreateMemberForm = ({ onMemberCreated }) => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to create a new member
    fetch('/db.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
        onMemberCreated(data); // Pass the created member data to the parent component
        setName(''); // Reset the name input field
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
          placeholder="Enter member name"
          value={name}
          onChange={handleNameChange}
        />
        <button type="submit" className="btn btn-primary">
          Add Member
        </button>
      </div>
    </form>
  );
  
};

export default CreateMemberForm;
  