import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Predictions from './components/Predictions';
import Strategies from './components/Strategies';
import Community from './components/Community';
import PushNotifications from './components/PushNotifications';
import RaceConditionAnalysis from './components/RaceConditionAnalysis';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import JockeyStatistics from './components/JockeyStatistics';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/community" element={<Community />} />
          <Route path="/push-notifications" element={<PushNotifications />} />
          <Route path="/race-conditions" element={<RaceConditionAnalysis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jockey-stats" element={<JockeyStatistics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
