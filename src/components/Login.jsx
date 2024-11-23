import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Send login request to server
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Store token in localStorage or state management
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      // Handle login error
      console.error('Login failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1>Login</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleLogin}>
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
          <Button type="submit">Login</Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default Login;
