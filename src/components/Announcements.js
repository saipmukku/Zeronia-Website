import React from 'react';
import { NavigationBar } from './SharedComponents';

function Announcements() {
  return (
    <div className="app">
      <NavigationBar />
      <div className="page-content">
        <h1>Announcements</h1>
        <p>Stay updated with the latest news and announcements from Zeronia!</p>
        <p>This page will contain important updates about our minigames, events, and community news.</p>
      </div>
    </div>
  );
}

export default Announcements;
