import React, { useEffect, useRef } from 'react';
import { NavigationBar } from './SharedComponents';
import { animate, splitText, stagger } from 'animejs';

function Minigames() {
  const headerTextRef = useRef(null);

  useEffect(() => {
    // Split text animation for "Minigames"
    let animationTimeout;
    let staggerTimeout;
    
    if (headerTextRef.current) {
      animationTimeout = setTimeout(() => {
        try {
          // Double-check that the ref still exists (component might have unmounted)
          if (!headerTextRef.current) {
            console.log('Component unmounted, skipping animation');
            return;
          }

          const split = splitText(headerTextRef.current, {
            chars: true
          });

          console.log('Split result:', split);

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
        <h1 ref={headerTextRef}>Minigames</h1>
      </div>
    </div>
  );
}

export default Minigames;
