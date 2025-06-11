import React from 'react';
import {AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Img, staticFile, spring} from 'remotion';

interface FinalScene3Props {
  username: string;
  productName: string;
  price: string;
  type: number;
}

export const FinalScene3: React.FC<FinalScene3Props> = ({ username, productName, price, type }) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  
  const fadeInDuration = 0.3; // Fade-in duration in seconds
  const fadeInFrames = fadeInDuration * fps; // Convert seconds to frames

  const opacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spring animation for elements
  const springAnimation = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 100, mass: 1 },
  });

  const titleTranslateY = interpolate(springAnimation, [0, 1], [50, 0]);
  const logoScale = interpolate(springAnimation, [0, 1], [0.8, 1]);

  const storeURL = `lolapay.com/${username}`;

  const titleStyle = {
    margin: '0 0 30px 0',
    lineHeight: '1.1em',
    fontSize: '55px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center' as const,
    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
    transform: `translateY(${titleTranslateY}px)`,
  };
  
  const productStyle = {
    margin: '0 0 25px 0',
    lineHeight: '1.1em',
    fontSize: '45px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center' as const,
    textShadow: '0 2px 6px rgba(0,0,0,0.25)',
    transform: `translateY(${titleTranslateY * 0.8}px)`,
  };

  const priceStyle = {
    margin: '0 0 60px 0',
    lineHeight: '1.1em',
    fontSize: '50px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: '#feca57',
    textAlign: 'center' as const,
    textShadow: '0 3px 6px rgba(0,0,0,0.3)',
    transform: `translateY(${titleTranslateY * 0.6}px)`,
  };
  
  const urlContainerStyle = {
    marginTop: '80px',
    padding: '25px 40px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '25px',
    border: '2px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    transform: `translateY(${titleTranslateY * 0.4}px)`,
  };

  const urlLabelStyle = {
    margin: '0 0 15px 0',
    lineHeight: '1.2em',
    fontSize: '28px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center' as const,
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };

  const urlStyle = {
    margin: '0',
    lineHeight: '1.2em',
    fontSize: '32px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center' as const,
    textShadow: '0 2px 4px rgba(0,0,0,0.25)',
  };
  
  const container = {
    margin: type === 0 ? '60px 0 0 0' : '280px 0 0 0',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  };

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      alignItems: 'center',
      opacity: opacity,
      maxWidth: '101%',
      minWidth: '101%',
      zIndex: 40,
      paddingRight: '50px',
      paddingLeft: '50px',
      overflow: 'hidden',
    }}>
      {/* Floating background circles */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        transform: `scale(${springAnimation})`,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        right: '-150px',
        width: '400px',
        height: '400px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%',
        transform: `scale(${springAnimation * 0.8})`,
      }} />

      {/* Text content for product */}
      {type === 0 && (
        <div style={container}>
          <p style={titleStyle}>{username}</p>
          <p style={productStyle}>{productName}</p>
          <p style={priceStyle}>${price}</p>
          <div style={urlContainerStyle}>
            <p style={urlLabelStyle}>DISPONIBLE EN</p>
            <p style={urlStyle}>{storeURL}</p>
          </div>
        </div>
      )}

      {/* Text content for store */}
      {type === 1 && (
        <div style={container}>
          <p style={titleStyle}>{username}</p>
          <div style={urlContainerStyle}>
            <p style={urlLabelStyle}>DISPONIBLE EN</p>
            <p style={urlStyle}>{storeURL}</p>
          </div>
        </div>
      )}

      <Img 
        src={staticFile('assets/logo2.png')} 
        style={{
          position: 'absolute',
          bottom: 0,
          width: 220,
          marginBottom: 70,
          transform: `scale(${logoScale})`,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
        }}
        onError={(e) => {
          console.error('Logo failed to load');
          e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg=='; // Transparent 1x1 pixel
        }}
      />
    </AbsoluteFill>
  );
}; 