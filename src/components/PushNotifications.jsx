import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';

function PushNotifications() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY'
    });

    // Send subscription to server
    await fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });
  };

  return (
    <Card>
      <CardHeader>
        <h1>Push Notifications</h1>
      </CardHeader>
      <CardBody>
        <Button onClick={subscribeToPush}>Subscribe to Push Notifications</Button>
      </CardBody>
    </Card>
  );
}

export default PushNotifications;
