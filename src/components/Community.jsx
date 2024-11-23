import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button, Card, CardBody, CardHeader, Input, Avatar, Text } from '@nextui-org/react';

const socket = io('http://localhost:3001');

function Community() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ name: 'Anonymous', avatar: 'path/to/default-avatar.png' });

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('message', { user, message });
      setMessage('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1>Community</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={sendMessage}>
          <Input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Type your message here..."
          />
          <Button type="submit">Send</Button>
        </form>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <Avatar src={msg.user.avatar} />
              <Text>{msg.user.name}: {msg.message}</Text>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

export default Community;
