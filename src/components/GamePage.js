import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavigationBar } from './SharedComponents';

function GamePage({thumbnail, info, links, descList}) {
  const [gameList, setGameList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    let routeList = [];
    for (let i = 0; i < links.length; i++) {
      routeList.push(<button key = {i} onClick={()=>navigate(links[i])}>{descList[i]["name"]}</button>);
    }
    setGameList(routeList);
  },[descList, links, navigate]);

  return (
    <div className="app">
      <NavigationBar />
      <div className="page-content">
        <h1>{info["name"]}</h1>
        <img src={thumbnail} alt="thumbnail"/>
        {gameList}
      </div>
    </div>
  );
}

export default GamePage;
