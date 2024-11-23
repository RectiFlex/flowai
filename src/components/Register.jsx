import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Send registration request to server
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      navigate('/login');
    } else {
      // Handle registration error
      console.error('Registration failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1>Register</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleRegister}>
          <Input 
            type="email" 
            label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            type="password" 
            label="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Button type="submit">Register</Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default Register;
