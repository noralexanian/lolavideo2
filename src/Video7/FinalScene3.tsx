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



  const storeURL = `lolapay.com/${username}`;

  const textStyle = {
    margin: '0 0 40px 0',
    lineHeight: '1.2em',
    fontSize: '60px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center' as const,
  };
  
  const textStyleURL = {
    margin: '0',
    lineHeight: '1.2em',
    fontSize: '35px',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    textAlign: 'center' as const,
  };
  
  const container = {
    margin: type === 0 ? '75px 0 0 0' : '350px 0 0 0',
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: '#9497ff',
      alignItems: 'center',
      opacity: opacity,
      maxWidth: '101%',
      minWidth: '101%',
      zIndex: 40,
      paddingRight: '50px',
      paddingLeft: '50px',
    }}>
      {/* Text content for product */}
      {type === 0 && (
        <div style={container}>
          <p style={textStyle}>{username}</p>
          <p style={textStyle}>{productName}</p>
          <p style={textStyle}>${price}</p>
          <div style={{marginTop: '100px'}}>
            <p style={textStyleURL}>DISPONIBLE EN</p>
            <p style={textStyleURL}>{storeURL}</p>
          </div>
        </div>
      )}

      {/* Text content for store */}
      {type === 1 && (
        <div style={container}>
          <p style={textStyle}>{username}</p>
          <div style={{marginTop: '100px'}}>
            <p style={textStyleURL}>DISPONIBLE EN</p>
            <p style={textStyleURL}>{storeURL}</p>
          </div>
        </div>
      )}

      <Img 
        src={staticFile('assets/logo2.png')} 
        style={{
          position: 'absolute',
          bottom: 0,
          width: 250,
          marginBottom: 70
        }}
        onError={(e) => {
          console.error('Logo failed to load');
          e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg=='; // Transparent 1x1 pixel
        }}
      />
    </AbsoluteFill>
  );
}; 