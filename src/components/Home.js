import React, { useEffect, useRef } from 'react';
import { NavigationBar, SocialLibrary } from './SharedComponents';
import { animate, splitText, stagger } from 'animejs';

function Home() {
  const welcomeTextRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll handling can be added here if needed
    };
    handleScroll();

    // Split text animation for "We Are Zeronia"
    let animationTimeout;
    let staggerTimeout;
    
    if (welcomeTextRef.current) {
      animationTimeout = setTimeout(() => {
        try {
          // Double-check that the ref still exists (component might have unmounted)
          if (!welcomeTextRef.current) {
            console.log('Component unmounted, skipping animation');
            return;
          }

          const split = splitText(welcomeTextRef.current, {
            chars: true
          });

          console.log('Split result:', split);

          if (split && split.chars && split.chars.length > 0) {
            // Make parent element visible but keep characters hidden initially
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

            // Animate characters in with stagger
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
            // Fallback animation - make element visible and animate
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
          // Fallback: simple fade-in animation - make element visible and animate
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
      }, 1000); // Increased delay to ensure DOM is ready
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          <div className="clouds"></div>
        </div>
        <SocialLibrary />
        <img src="/pngs/pixel-tree-footer.png" id="tree-footer" alt="tree-footer"/>
      </div>
    </div>
  );
}

export default Home;
