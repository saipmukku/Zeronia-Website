import './App.css';
import React, { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { animate, splitText, stagger } from 'animejs';

// Main Page functions
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
    <div>
      <h1>{info["name"]}</h1>
      <img src={thumbnail} alt="thumbnail"/>
      {gameList}
    </div>
  );
}

function Home() {
  const welcomeTextRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll handling can be added here if needed
    };
    handleScroll();

    // Split text animation for "We Are Zeronia"
    if (welcomeTextRef.current) {
      setTimeout(() => {
        try {
          const split = splitText(welcomeTextRef.current, {
            chars: true
          });

          console.log('Split result:', split);

          if (split && split.chars && split.chars.length > 0) {
            // Make parent element visible but keep characters hidden initially
            welcomeTextRef.current.style.visibility = 'visible';
            welcomeTextRef.current.style.opacity = '1';
            
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

            // Animate characters in with stagger
            setTimeout(() => {
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
            }, 200);
          } else {
            console.error('Split failed or no characters found');
            // Fallback animation - make element visible and animate
            welcomeTextRef.current.style.visibility = 'visible';
            welcomeTextRef.current.style.opacity = '0';
            animate(welcomeTextRef.current, {
              keyframes: [
                { opacity: 1, y: 0 }
              ],
              duration: 1000,
              ease: 'outElastic(1, .6)'
            });
          }
        } catch (error) {
          console.error('Animation error:', error);
          // Fallback: simple fade-in animation - make element visible and animate
          welcomeTextRef.current.style.visibility = 'visible';
          welcomeTextRef.current.style.opacity = '0';
          animate(welcomeTextRef.current, {
            keyframes: [
              { opacity: 1, y: 0 }
            ],
            duration: 1000,
            ease: 'outElastic(1, .6)'
          });
        }
      }, 1000); // Increased delay to ensure DOM is ready
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="app">
      {GenerateNavigationBar()}
      <div className="welcome">
        <h1 id="welcome-text" ref={welcomeTextRef}>We Are<br />Zeronia</h1>
      </div>
      <div className="collage">
        <div className="first-three">
          <img className="back-pic"  src="/pngs/background-pic-1.png" alt="background-pic-1"/>
          <img className="back-pic"  src="/pngs/background-pic-2.png" alt="background-pic-2"/>
          <img className="back-pic"  src="/pngs/background-pic-3.png" alt="background-pic-3"/>
        </div>
        <div className="cloud-container">
          <img className="clouds" src="/pngs/cloud-pixel-art.png" alt="cloud-scroll-handling"/>
        </div>
        <p className="home-desc">
          Founded in 2017, we are a group of minigame developers for Minecraft: Java Edition. All of our custom
          multiplayer maps and games are made in vanilla Minecraft, and we are officially recognized as Minecraft Realms
          partners. On this website, you can check out and download our minigames to play with your friends!
        </p>
        <p className="home-desc">
          Join our Discord server to interact with our community and stay in the loop with playtests.
        </p>
        <GenerateSocials />
        <img src="/pngs/pixel-tree-footer.png" id="tree-footer" alt="tree-footer"/>
      </div>
    </div>
  );
}

function App() {
  const [gameRoutes, setGameRoutes] = useState([]);
  const [homeRoute, setHomeRoute] = useState([]);

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
      setHomeRoute(<Route path="/" element={<Home/>} />);
    };

    // Use mock data for now
    processGameData(mockData);
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        {homeRoute}
        {gameRoutes}
      </Routes>
    </BrowserRouter>
  );
}

// Component functions

// Generate parts of the webpage
function GenerateNavigationBar() {
  return (
    <div className="top-bar">
      <div id="logo">
        <img id = "logo-icon" src="/pngs/zeronialogo-2021.png" alt="logo"/>
        <h1 id="logo-text">Zeronia</h1>
      </div>
      <div className="nav-bar">
        <label className="top-text" href="default.asp">Home</label>
        <label className="top-text" href="default.asp">Announcements</label>
        <label className="top-text" href="default.asp">Minigames</label>
        <label className="top-text" href="default.asp">About</label>
      </div>
    </div>
  );
}

// DiscordBubbleEffect component - currently unused but kept for future use
// function DiscordBubbleEffect() {
//   const [isVisible, setIsVisible] = useState(false);
//
//   const handleMouseEnter = () => {
//     setIsVisible(true);
//   }
//
//   const handleMouseLeave = () => {
//     setIsVisible(false);
//   }
//
//   if(isVisible) {
//     return (
//       <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//         <img src="/pngs/pixel-bubble-bottom.png" className="bottom-pixel-bubble" alt="discord-bubble"/>
//       </div>
//     );
//   } else return;
// }

// Social Media Logo Component with Anime.js hover effect
function SocialLogo({ href, src, alt, className, target = "_blank" }) {
  const logoRef = useRef(null);

  const handleMouseEnter = () => {
    if (logoRef.current) {
      animate(logoRef.current, {
        keyframes: [
          { scale: 1.15 }
        ],
        duration: 300,
        ease: 'outElastic(1, .6)'
      });
    }
  };

  const handleMouseLeave = () => {
    if (logoRef.current) {
      animate(logoRef.current, {
        keyframes: [
          { scale: 1 }
        ],
        duration: 300,
        ease: 'outElastic(1, .6)'
      });
    }
  };

  return (
    <a 
      href={href} 
      className="home-socials" 
      target={target} 
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        ref={logoRef}
        src={src} 
        className={className} 
        alt={alt}
        style={{ 
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }}
      />
    </a>
  );
}

function GenerateSocials() {
  return (
    <div className="home-body">
        <div className="discord-info">
          <SocialLogo 
            href="https://discord.gg/X9bZgw7"
            src="/pngs/discord-logo.png"
            alt="discord-logo"
            className="discord-logo"
          />
          {/* <img src="/pngs/discord-info-bubble.png" className="bottom-pixel-bubble" alt="discord-bubble"/> */}
        </div>
      <br></br>
      <span id="click-for-socials">Click to visit our other socials!</span>
      <br></br>
      {/* <div className="social-info">
        <img src="/pngs/x-info-bubble.png" className="flex-bubble" id="x-info" alt="x-flex"/>
        <img src="/pngs/youtube-info-bubble.png" className="flex-bubble" id="youtube-info" alt="x-flex"/>
        <img src="/pngs/github-info-bubble.png" className="flex-bubble" id="github-info" alt="x-flex"/>
        <img src="/pngs/pmc-info-bubble.png" className="flex-bubble" id="pmc-info" alt="x-flex"/>
      </div> */}
      <div className="other-socials">
        <SocialLogo 
          href="https://x.com/zeroniaserver"
          src="/pngs/x-logo-black.png"
          alt="x-logo"
          className="logo"
        />
        <br></br>
        <SocialLogo 
          href="https://youtube.com/@zeronia"
          src="/pngs/yt_logo_rgb_light.png"
          alt="youtube-logo"
          className="logo"
        />
        <br></br>
        <SocialLogo 
          href="https://github.com/ZeroniaServer"
          src="/pngs/github-logo.png"
          alt="github-logo"
          className="logo"
        />
        <br></br>
        <SocialLogo 
          href="https://www.planetminecraft.com/member/zeroniaserver/"
          src="/pngs/pmc-logo.png"
          alt="pmc-logo"
          className="logo"
        />
        <br></br>
      </div>
    </div>
  );
}

// Helper functions
// GenerateAnnouncements component - currently unused but kept for future use
// function GenerateAnnouncements() {
//   const [announcements, setAnnouncements] = useState([]);
//
//   fetch("/announcements").then(response => response.json().then(data => {
//     setAnnouncements(data);
//   }));
//
//   return (
//     <div>
//       <h1>{announcements.title}</h1>
//       <h2>{announcements.date}</h2>
//       <p>
//         {announcements.description}
//       </p>
//     </div>
//   );
// }

// Final export statement
export default App;