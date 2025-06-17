import React from 'react';
import {AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate} from 'remotion';

interface FinalScenePart1Props {
  username: string;
  productName: string;
  price: string;
  type: number;
}

export const FinalScenePart1: React.FC<FinalScenePart1Props> = ({ username, productName, price, type }) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  
  const fadeInDuration = 0.3; // Fade-in duration in seconds
  const fadeInFrames = fadeInDuration * fps;

  const opacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const storeNameStyle = {
    margin: '0 0 60px 0',
    lineHeight: '1.2em',
    fontSize: '60px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center' as const,
  };
  
  const productNameStyle = {
    margin: '0 0 40px 0',
    lineHeight: '1.2em',
    fontSize: '60px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center' as const,
  };
  
  const priceStyle = {
    margin: '0',
    lineHeight: '1.2em',
    fontSize: '60px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center' as const,
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: '#8B7ED8',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: opacity,
      padding: '50px',
    }}>
      <div>
        <div style={storeNameStyle}>{username}</div>
        {type === 0 && (
          <>
            <div style={productNameStyle}>{productName}</div>
            <div style={priceStyle}>${price}</div>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
}; 