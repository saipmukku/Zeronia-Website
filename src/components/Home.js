import React, { useEffect, useRef, useState } from 'react';
import { NavigationBar, SocialLibrary } from './SharedComponents';
import { animate, splitText, stagger } from 'animejs';

function Home() {
  const welcomeTextRef = useRef(null);
  const [serverStatus, setServerStatus] = useState(true);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const checkServerStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const response = await fetch('https://api.mcsrvstat.us/3/play.cubekrowd.net');
      const data = await response.json();
      console.log('Server Status API Response:', data);
      console.log('Server Online Status:', data.online);
      setServerStatus(data.online === true);
    } catch (error) {
      console.error('Error checking server status:', error);
      setServerStatus(false);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {};
    handleScroll();

    let animationTimeout;
    let staggerTimeout;
    
    if (welcomeTextRef.current) {
      animationTimeout = setTimeout(() => {
        try {
          if (!welcomeTextRef.current) {
            console.log('Component unmounted, skipping animation');
            return;
          }

          const split = splitText(welcomeTextRef.current, {
            chars: true
          });

          console.log('Split result:', split);

          if (split && split.chars && split.chars.length > 0) {
            if (welcomeTextRef.current) {
              welcomeTextRef.current.style.visibility = 'visible';
              welcomeTextRef.current.style.opacity = '1';
            }
            
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
              if (welcomeTextRef.current) {
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
            if (welcomeTextRef.current) {
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
          }
        } catch (error) {
          console.error('Animation error:', error);
          if (welcomeTextRef.current) {
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
        }
      }, 1000);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          <div className="clouds" style={{backgroundImage: "url('/pngs/cloud-pixel-art.png')"}}></div>
        </div>
        <div className="server-status">
          <div 
            className="server-status-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              padding: '20px 20px',
              backgroundColor: isCheckingStatus ? 'rgba(255, 255, 0, 0.2)' : (serverStatus ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'),
              border: `2px solid ${isCheckingStatus ? '#ffff00' : (serverStatus ? '#00ff00' : '#ff0000')}`,
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              maxWidth: '300px',
              margin: '0 auto 20px auto',
              fontFamily: 'snowstorm',
              fontSize: '16px',
              fontWeight: 'bold',
              color: isCheckingStatus ? '#ffff00' : (serverStatus ? '#00ff00' : '#ff0000')
            }}
          >
            <img 
              src={isCheckingStatus ? '/pngs/server-offline.png' : (serverStatus ? '/pngs/server-online.png' : '/pngs/server-offline.png')}
              alt={isCheckingStatus ? 'Checking' : (serverStatus ? 'Online' : 'Offline')}
              style={{
                width: '24px',
                height: '24px',
                objectFit: 'contain'
              }}
            />
            <span>
              {isCheckingStatus ? 'Checking Server Status...' : (serverStatus ? 'CubeKrowd Server Online' : 'CubeKrowd Server Offline')}
            </span>
          </div>
          <SocialLibrary />
        </div>
        <img src="/pngs/pixel-tree-footer.png" id="tree-footer" alt="tree-footer"/>
      </div>
    </div>
  );
}

export default Home;
