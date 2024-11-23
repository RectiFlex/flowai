import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';

function Profile() {
  const [user, setUser] = useState({ name: '', email: '', bettingHistory: [] });

  useEffect(() => {
    // Fetch user profile data from server
    const fetchProfile = async () => {
      const response = await fetch('/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUser(data);
    };
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    // Send updated profile data to server
    await fetch('/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <Card>
      <CardHeader>
        <h1>Profile</h1>
      </CardHeader>
      <CardBody>
        <Input 
          type="text" 
          label="Name" 
          value={user.name} 
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <Input 
          type="email" 
          label="Email" 
          value={user.email} 
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Button onClick={updateProfile}>Update Profile</Button>
        {/* Display betting history */}
      </CardBody>
    </Card>
  );
}

export default Profile;
