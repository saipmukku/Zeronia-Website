import React from 'react';
import { NavigationBar } from './SharedComponents';

function About() {
  return (
    <div className="app">
      <NavigationBar />
      <div className="page-content">
        <h1>About Zeronia</h1>
        <p>Founded in 2017, we are a group of minigame developers for Minecraft: Java Edition. All of our custom
          multiplayer maps and games are made in vanilla Minecraft, and we are officially recognized as Minecraft Realms
          partners. On this website, you can check out and download our minigames to play with your friends!</p>
        <p>Our team is passionate about creating unique and engaging multiplayer experiences that bring communities together through the power of Minecraft.</p>
        <p>Learn more about our team, our mission, and our community!</p>
      </div>
    </div>
  );
}

export default About;
