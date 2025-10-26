import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import page components
import Home from './components/Home';
import About from './components/About';
import Announcements from './components/Announcements';
import Minigames from './components/Minigames';
import MinigameDetail from './components/MinigameDetail';
import GamePage from './components/GamePage';

function App() {
  const [gameRoutes, setGameRoutes] = useState([]);

  useEffect(()=> {
    // Mock data for development - replace with actual API call when backend is ready
    const mockData = {
      descs: [
        { name: "Game 1", description: "First game description" },
        { name: "Game 2", description: "Second game description" },
        { name: "Game 3", description: "Third game description" }
      ],
      thumbnails: [
        "/zeronialogo-2021.png",
        "/zeronialogo-2021.png", 
        "/zeronialogo-2021.png"
      ]
    };

    // For now, use mock data. Uncomment below when API is ready:
    // fetch("/api")
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     processGameData(data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching game data:', error);
    //     // Fallback to mock data
    //     processGameData(mockData);
    //   });

    // Process game data (works for both API and mock data)
    const processGameData = (data) => {
      let descList = data["descs"];
      let routeList = [];
      let linkPaths = [];

      for (let i = 0; i < descList.length; i++) {
        let str = "/" + descList[i]["name"].replace(/\s+/g, "_");
        linkPaths.push(str);
        routeList.push(<Route key = {i} path={str} element={<GamePage info={descList[i]} 
          thumbnail={data["thumbnails"][i]} links={linkPaths} descList={descList}/>} />);
      }

      setGameRoutes(routeList);
    };

    // Use mock data for now
    processGameData(mockData);
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/minigames" element={<Minigames />} />
        <Route path="/minigame/:minigameId" element={<MinigameDetail />} />
        <Route path="/about" element={<About />} />
        {gameRoutes}
      </Routes>
    </BrowserRouter>
  );
}


// Final export statement
export default App;