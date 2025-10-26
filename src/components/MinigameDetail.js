import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NavigationBar } from './SharedComponents';
import { animate, splitText, stagger } from 'animejs';
import { IoMdArrowRoundBack } from "react-icons/io";

function MinigameDetail() {
  const { minigameId } = useParams();
  const headerTextRef = useRef(null);

  // Minigame data (same as in Minigames.js)
  const minigames = [
    {
      id: 1,
      title: "Rocket Riders",
      description: "Ride rockets as bombs to destroy your opponent's base! Launch yourself across the battlefield and crash into enemy fortifications in this explosive combat experience.",
      image: "/pngs/background-pic-1.png"
    },
    {
      id: 2,
      title: "Crafty Cannoneers",
      description: "Weaken your opponent's ship while fighting for resources on a center island! Master naval warfare and strategic resource control in this maritime battle.",
      image: "/pngs/background-pic-2.png"
    },
    {
      id: 3,
      title: "Snowy Skirmish",
      description: "A quick and fun snowball fight where players collect Giftboxes or knock opponents off the map to gain points! Build snow barricades for cover and use powerups from Red Giftboxes to gain the advantage.",
      image: "/pngs/background-pic-3.png"
    },
    {
      id: 4,
      title: "The Purple",
      description: "A fresh take on the classic game of tag! Explore alien landscapes, collect unique artifacts, and avoid The Purple infection. Spectators can affect gameplay and sometimes even rejoin the game.",
      image: "/pngs/background-pic-1.png"
    },
    {
      id: 5,
      title: "Howl and Hoard",
      description: "Slay, loot, mine, and explore in the Wolf's dungeon! Collect enough treasure to outweigh the Scale Wolf, or you will perish. Upgrade items and perks to progress through the dangerous depths.",
      image: "/pngs/background-pic-2.png"
    },
    {
      id: 6,
      title: "Planetary Pirates",
      description: "Roleplay as pirates against your friends and steal from one another! Command your crew, raid enemy ships, and plunder treasures across the galaxy in this swashbuckling adventure.",
      image: "/pngs/background-pic-3.png"
    },
    {
      id: 7,
      title: "Scatter Wars",
      description: "Use scattering weapons to fight against opponents in chaotic battles! Master the art of area-of-effect combat and strategic positioning to dominate your enemies.",
      image: "/pngs/background-pic-1.png"
    },
    {
      id: 8,
      title: "Battle Chunks",
      description: "Quick battles between players in a tournament style setting! Face off in intense 1v1 or team matches with fast-paced combat and elimination rounds.",
      image: "/pngs/background-pic-2.png"
    },
    {
      id: 9,
      title: "Borderline",
      description: "A zombie apocalypse where teams fight each other while battling ruthless and sentient zombies! Survive the undead hordes and outlast your human opponents in this survival horror experience.",
      image: "/pngs/background-pic-3.png"
    }
  ];

  const minigame = minigames.find(game => game.id === parseInt(minigameId));

  useEffect(() => {
    // Split text animation for the minigame title
    let animationTimeout;
    let staggerTimeout;
    
    if (headerTextRef.current) {
      animationTimeout = setTimeout(() => {
        try {
          if (!headerTextRef.current) {
            console.log('Component unmounted, skipping animation');
            return;
          }

          const split = splitText(headerTextRef.current, {
            chars: true
          });

          if (split && split.chars && split.chars.length > 0) {
            // Set initial state for characters (hidden)
            animate(split.chars, {
              keyframes: [
                { 
                  opacity: 0,
                  y: 50,
                  scale: 0.8
                }
              ],
              duration: 0
            });

            // Make parent element visible and animate characters in with stagger
            staggerTimeout = setTimeout(() => {
              if (headerTextRef.current) {
                // Make the container visible
                headerTextRef.current.style.visibility = 'visible';
                headerTextRef.current.style.opacity = '1';
                
                // Animate characters in
                animate(split.chars, {
                  keyframes: [
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }
                  ],
                  duration: 800,
                  ease: 'outElastic(1, .6)',
                  delay: stagger(100)
                });
              }
            }, 200);
          } else {
            console.error('Split failed or no characters found');
            // Fallback animation
            if (headerTextRef.current) {
              headerTextRef.current.style.visibility = 'visible';
              headerTextRef.current.style.opacity = '0';
              animate(headerTextRef.current, {
                keyframes: [
                  { opacity: 1, y: 0 }
                ],
                duration: 1000,
                ease: 'outElastic(1, .6)'
              });
            }
          }
        } catch (error) {
          console.error('Animation error:', error);
          // Fallback: simple fade-in animation
          if (headerTextRef.current) {
            headerTextRef.current.style.visibility = 'visible';
            headerTextRef.current.style.opacity = '0';
            animate(headerTextRef.current, {
              keyframes: [
                { opacity: 1, y: 0 }
              ],
              duration: 1000,
              ease: 'outElastic(1, .6)'
            });
          }
        }
      }, 500);
    }

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
      if (staggerTimeout) {
        clearTimeout(staggerTimeout);
      }
    }
  }, [minigameId]);

  if (!minigame) {
    return (
      <div className="app">
        <NavigationBar />
        <div className="page-content">
          <h1>Minigame not found</h1>
          <Link to="/minigames">← Back to Minigames</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <NavigationBar />
      <div className="page-content">
        <div className="first-three">
          <img className="back-pic" src="/pngs/background-pic-1.png" alt="background-pic-1"/>
          <img className="back-pic" src="/pngs/background-pic-2.png" alt="background-pic-2"/>
          <img className="back-pic" src="/pngs/background-pic-3.png" alt="background-pic-3"/>
        </div>
        
        <div className="minigame-detail-container">
          <div className="back-button-container">
            <Link to="/minigames" className="back-button">
              <IoMdArrowRoundBack />
              Back to Minigames
            </Link>
          </div>
          
          <div className="minigame-header">
            <h1 ref={headerTextRef}>{minigame.title}</h1>
            <p className="minigame-description">{minigame.description}</p>
          </div>

          <div className="minigame-content">
            <div className="content-section">
              <h2>Gallery</h2>
              <div className="gallery-placeholder">
                <p>Gallery images will be displayed here</p>
              </div>
            </div>

            <div className="content-section">
              <h2>Gameplay Video</h2>
              <div className="video-placeholder">
                <p>YouTube embed will be displayed here</p>
              </div>
            </div>

            <div className="content-section">
              <h2>Download</h2>
              <div className="download-section">
                <div className="download-item">
                  <h3>Map Download</h3>
                  <p>Download the latest version of the {minigame.title} map</p>
                  <button className="download-button">Download Map</button>
                </div>
                <div className="download-item">
                  <h3>Resource Pack</h3>
                  <p>Get the custom resource pack for {minigame.title}</p>
                  <button className="download-button">Download Pack</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinigameDetail;
