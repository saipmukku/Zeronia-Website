import React, { useEffect, useRef } from 'react';
import { NavigationBar } from './SharedComponents';
import { animate, splitText, stagger } from 'animejs';

const teamMembers = ["evtema3", "UnitTest", "helloname", "ThatsCoolBro", "Tacocat010"];

function About() {
  const headerTextRef = useRef(null);

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
            // Fallback animation - make element visible and animate
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
          // Fallback: simple fade-in animation - make element visible and animate
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
      }, 500); // Reduced delay for faster animation start
    }

    return () => {
      // Clean up timeouts to prevent errors when component unmounts
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
        <h1 ref={headerTextRef}>About Zeronia</h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            padding: '35px 50px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '2px solid #e0e0e0',
            maxWidth: '800px',
            width: '100%',
            zIndex: 0,
            position: 'relative'
          }}>
            <p style={{ textAlign: 'center', fontSize: "30px", margin: '0 0 20px 0' }}>Founded in 2017, we are a group of minigame developers for Minecraft: Java Edition. All of our custom
              multiplayer maps and games are made in vanilla Minecraft, and we are officially recognized as Minecraft Realms
              partners. On this website, you can check out and download our minigames to play with your friends!</p>
            <p style={{ textAlign: 'center', fontSize: "30px", margin: '0 0 20px 0' }}>Our team is passionate about creating unique and engaging multiplayer experiences that bring communities together through the power of Minecraft.</p>
            <p style={{ textAlign: 'center', fontSize: "30px", margin: 0 }}>Learn more about our team below!</p>
          </div>
        </div>
         <div>
           <h2 style={{ textAlign: 'center', fontSize: "48px"  }}>Team</h2>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
             {teamMembers.map((username) => (
               <TeamMember key={username} username={username} />
             ))}
           </div>
         </div>
      </div>
    </div>
  );
}

function TeamMember({ username }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '50px',
      padding: '35px 250px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e0e0e0',
      maxWidth: '300px',
      width: '100%',
      zIndex: 0,
      position: 'relative'
    }}>
      <img 
        src={`https://mc-heads.net/body/${username}/right`} 
        alt={username}
        style={{ width: '200px', height: '200px' }}
      />
      <span style={{ 
        fontFamily: 'snowstorm', 
        fontSize: '36px', 
        fontWeight: 'bold',
        color: '#333'
      }}>
        {username}
      </span>
    </div>
  );
}

export default About;