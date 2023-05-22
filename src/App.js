import React, { useEffect, useState } from 'react';
import CreateMemberForm from './components/CreateMemberForm';
import MemberList from './components/MemberList';

const App = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    fetch('http://localhost:3000/members', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const handleMemberCreated = (newMember) => {
    setMembers([...members, newMember]);
  };

  const handleMemberDeleted = (deletedMemberId) => {
    setMembers(members.filter((member) => member.id !== deletedMemberId));
  };

  const handleMemberUpdated = (updatedMember) => {
    setMembers(
      members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };

  return (
    <div className="container">
      <h1 className="my-4">Group 7 CRUD App</h1>
      <CreateMemberForm onMemberCreated={handleMemberCreated} />
      <MemberList
        members={members}
        onDelete={handleMemberDeleted}
        onUpdate={handleMemberUpdated}
      />
    </div>
  );
};

export default App;
