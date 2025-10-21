import React from 'react';
import { NavigationBar } from './SharedComponents';

function Minigames() {
  return (
    <div className="app">
      <NavigationBar />
      <div className="page-content">
        <h1>Minigames</h1>
        <p>Explore our collection of custom Minecraft minigames!</p>
        <p>All games are built in vanilla Minecraft and designed for multiplayer fun.</p>
      </div>
    </div>
  );
}

export default Minigames;
