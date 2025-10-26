import React, { useEffect, useRef, useState } from 'react';
import { NavigationBar } from './SharedComponents';
import { animate, splitText, stagger } from 'animejs';
import { fetchAnnouncements } from '../utils/api';

function Announcements() {
  const headerTextRef = useRef(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await fetchAnnouncements();
        setAnnouncements(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  useEffect(() => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="app">
      <NavigationBar />
      <div className="page-content">
        <div className="first-three">
          <img className="back-pic" src="/pngs/background-pic-1.png" alt="background-pic-1"/>
          <img className="back-pic" src="/pngs/background-pic-2.png" alt="background-pic-2"/>
          <img className="back-pic" src="/pngs/background-pic-3.png" alt="background-pic-3"/>
        </div>
        <h1 ref={headerTextRef}>Announcements</h1>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Loading announcements...</p>
          </div>
        )}
        
        {error && (
          <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            <p>Error: {error}</p>
            <p>Make sure the server is running on port 3001</p>
          </div>
        )}
        
        {!loading && !error && announcements.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>No announcements available.</p>
          </div>
        )}
        
        {!loading && !error && announcements.length > 0 && (
          <div className="announcements-container">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="announcement-card">
                <div className="announcement-header">
                  <h2 className="announcement-title">{announcement.title}</h2>
                  <div className="announcement-meta">
                    <span className="announcement-author">By {announcement.author}</span>
                    <span className="announcement-date">
                      {formatDate(announcement.created_at)}
                    </span>
                  </div>
                </div>
                <div className="announcement-content">
                  <p>{announcement.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcements;
