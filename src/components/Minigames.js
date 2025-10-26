import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavigationBar } from './SharedComponents';
import { animate, splitText, stagger } from 'animejs';

function Minigames() {
  const headerTextRef = useRef(null);

  // Minigame data
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

  useEffect(() => {
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

          console.log('Split result:', split);

          if (split && split.chars && split.chars.length > 0) {
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

            staggerTimeout = setTimeout(() => {
              if (headerTextRef.current) {
                headerTextRef.current.style.visibility = 'visible';
                headerTextRef.current.style.opacity = '1';
                
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
  }, []);

  return (
    <div className="app">
      <NavigationBar />
      <div className="page-content">
        <div className="first-three">
          <img className="back-pic" src="/pngs/background-pic-1.png" alt="background-pic-1"/>
          <img className="back-pic" src="/pngs/background-pic-2.png" alt="background-pic-2"/>
          <img className="back-pic" src="/pngs/background-pic-3.png" alt="background-pic-3"/>
        </div>
        <h1 ref={headerTextRef}>Minigames</h1>
        
        <div className="minigames-container">
          {minigames.map((minigame, index) => (
            <Link 
              key={minigame.id} 
              to={`/minigame/${minigame.id}`}
              className={`minigame-card ${index % 2 === 0 ? 'left-aligned' : 'right-aligned'}`}
            >
              <div className="minigame-image">
                <img src={minigame.image} alt={minigame.title} />
              </div>
              <div className="minigame-content">
                <h3 className="minigame-title">{minigame.title}</h3>
                <p className="minigame-description">{minigame.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Minigames;
