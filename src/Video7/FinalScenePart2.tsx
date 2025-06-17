import React from 'react';
import {AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Img} from 'remotion';

interface FinalScenePart2Props {
  username: string;
  logoUrl: string;
}

export const FinalScenePart2: React.FC<FinalScenePart2Props> = ({ username, logoUrl }) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  
  const fadeInDuration = 0.3; // Fade-in duration in seconds
  const fadeInFrames = fadeInDuration * fps;

  const opacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const callToActionStyle = {
    margin: '60px 0 20px 0',
    lineHeight: '1.2em',
    fontSize: '48px',
    fontFamily: '"Helvetica Neue", "Segoe UI", system-ui, -apple-system, sans-serif',
    fontWeight: '400',
    color: 'white',
    textAlign: 'center' as const,
    letterSpacing: '1px',
  };
  
  const urlStyle = {
    margin: '0',
    lineHeight: '1.2em',
    fontSize: '36px',
    fontFamily: '"Helvetica Neue", "Segoe UI", system-ui, -apple-system, sans-serif',
    fontWeight: '300',
    color: 'white',
    textAlign: 'center' as const,
    letterSpacing: '0.5px',
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: '#8B7ED8',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: opacity,
      padding: '50px',
    }}>
      <div style={{ textAlign: 'center' }}>
        {/* White circle border */}
        <div style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 40px auto',
          padding: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}>
          {/* Logo circle */}
          <div style={{
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
          }}>
            <Img
              src={logoUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                console.error('Logo failed to load:', logoUrl);
                e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg==';
              }}
            />
          </div>
        </div>
        
        <div style={callToActionStyle}>¡Compra ahora!</div>
        <div style={urlStyle}>lolapay.com/<strong>{username}</strong></div>
      </div>
    </AbsoluteFill>
  );
}; 