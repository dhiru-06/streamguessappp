import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import GamePage from './pages/Gamepage';
import GlobalGamePage from './pages/Globalgamepage';

function App() {

  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="in" element={<GamePage/>} />
        <Route path="global" element={<GlobalGamePage/>} />
      </Routes>
    </HashRouter >
  );
}

export default App;
