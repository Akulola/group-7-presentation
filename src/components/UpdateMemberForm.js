import React, { useState } from 'react';

const UpdateMemberForm = ({ member, onUpdate }) => {
  const [name, setName] = useState(member.name);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMember = {
      ...member,
      name: name,
    };

    onUpdate(updatedMember);
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
