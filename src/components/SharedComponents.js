import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { animate } from 'animejs';

// Navigation Bar Component
export function NavigationBar() {
  return (
    <div className="top-bar">
      <div id="logo">
        <img id="logo-icon" src="/pngs/zeronialogo-2021.png" alt="logo"/>
        <h1 id="logo-text">Zeronia</h1>
      </div>
      <div className="nav-bar">
        <Link to="/" className="top-text">Home</Link>
        <Link to="/minigames" className="top-text">Minigames</Link>
        <Link to="/announcements" className="top-text">Announcements</Link>
        <Link to="/about" className="top-text">About</Link>
      </div>
    </div>
  );
}

// Enhanced Social Media Library Component with platform explanations
export function SocialLibrary() {
  const [hoveredPlatform, setHoveredPlatform] = useState(null);
  const logoRefs = useRef({});

  const socialPlatforms = [
    {
      name: "Discord",
      href: "https://discord.gg/X9bZgw7",
      src: "/pngs/discord-logo.png",
      description: "Join our Discord server for real-time chat, community events, and playtest announcements!",
      color: "#5865F2"
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/zeroniaserver",
      src: "/pngs/x-logo-black.png",
      description: "Follow us on X for quick updates, game releases, and community highlights!",
      color: "#000000"
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@zeronia",
      src: "/pngs/yt_logo_rgb_light.png",
      description: "Watch our YouTube channel for gameplay videos, tutorials, and community showcases!",
      color: "#FF0000"
    },
    {
      name: "GitHub",
      href: "https://github.com/ZeroniaServer",
      src: "/pngs/github-logo.png",
      description: "Check out our GitHub for open-source projects, map downloads, and development updates!",
      color: "#333333"
    },
    {
      name: "Planet Minecraft",
      href: "https://www.planetminecraft.com/member/zeroniaserver/",
      src: "/pngs/pmc-logo.png",
      description: "Visit our Planet Minecraft profile to download maps and see our community projects!",
      color: "#00AA00"
    }
  ];

  const handleMouseEnter = (platformName) => {
    setHoveredPlatform(platformName);
    const logoRef = logoRefs.current[platformName];
    if (logoRef) {
      animate(logoRef, {
        keyframes: [
          { scale: 1.2, rotate: 5 }
        ],
        duration: 400,
        ease: 'outElastic(1, .6)'
      });
    }
  };

  const handleMouseLeave = (platformName) => {
    setHoveredPlatform(null);
    const logoRef = logoRefs.current[platformName];
    if (logoRef) {
      animate(logoRef, {
        keyframes: [
          { scale: 1, rotate: 0 }
        ],
        duration: 400,
        ease: 'outElastic(1, .6)'
      });
    }
  };

  return (
    <div className="social-library">
      <h2 className="social-library-title">Connect With Us</h2>
      <div className="social-grid">
        <div className="social-row top-row">
          {socialPlatforms.slice(0, 3).map((platform) => (
            <div 
              key={platform.name}
              className="social-card"
              onMouseEnter={() => handleMouseEnter(platform.name)}
              onMouseLeave={() => handleMouseLeave(platform.name)}
            >
              <a 
                href={platform.href} 
                target="_blank" 
                rel="noreferrer"
                className="social-link"
              >
                <div className="social-logo-container">
                  <img 
                    ref={(el) => logoRefs.current[platform.name] = el}
                    src={platform.src} 
                    alt={`${platform.name} logo`}
                    className="social-logo"
                  />
                </div>
                <h3 className="social-name">{platform.name}</h3>
                {hoveredPlatform === platform.name && (
                  <div className="social-description">
                    <p>{platform.description}</p>
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
        <div className="social-row bottom-row">
          {socialPlatforms.slice(3, 5).map((platform) => (
            <div 
              key={platform.name}
              className="social-card"
              onMouseEnter={() => handleMouseEnter(platform.name)}
              onMouseLeave={() => handleMouseLeave(platform.name)}
            >
              <a 
                href={platform.href} 
                target="_blank" 
                rel="noreferrer"
                className="social-link"
              >
                <div className="social-logo-container">
                  <img 
                    ref={(el) => logoRefs.current[platform.name] = el}
                    src={platform.src} 
                    alt={`${platform.name} logo`}
                    className="social-logo"
                  />
                </div>
                <h3 className="social-name">{platform.name}</h3>
                {hoveredPlatform === platform.name && (
                  <div className="social-description">
                    <p>{platform.description}</p>
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
