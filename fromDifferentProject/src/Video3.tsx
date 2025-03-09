import React from 'react';
import {AbsoluteFill, useVideoConfig, Img, useCurrentFrame, interpolate, spring, Sequence} from 'remotion';
// import { AnimatedTextDiv } from './components/AnimatedTextDiv.js';
import FinalScene from './components/FinalScene'; // Adjust the import path as necessary
import {BottomBar} from './components/BottomBar';

export const Video3: React.FC<{ 
  images: string[], username: string, productName: string, price: string, type: number
}> = ({ images, username, productName, price, type }) => {
  const storeURL = "lolapay.com/" + username;
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();

  // Define the BottomBar's height to account for it in image positioning
  const bottomBarHeight = 60; // Adjust as needed to match your BottomBar component

  // Speed adjustment factor
  const speedAdjustmentFactor = 0.8; // To make video 1.25x faster
  
  // Adjust timing for speedup
  const appearanceInterval = (fps / 2) * speedAdjustmentFactor;
  const initialDelay = (fps / 2) * speedAdjustmentFactor;
  const expansionDuration = (fps * 0.75) * speedAdjustmentFactor;
  const expansionStart = initialDelay + (images.length - 1) * appearanceInterval;

  const totalPopups = images.length - 1;
  const margin = 50; // Margin around the grid of popup images
  const gridColumns = 2;
  
  // Adjust imageWidth to account for margins
  const imageWidth = (width - margin * (gridColumns + 1)) / gridColumns;
  
  // Adjust the available height for popup images to account for the BottomBar
  const availableHeight = height - bottomBarHeight - margin * 2; // Additional margin for the top
  const gridRows = Math.ceil(totalPopups / gridColumns);
  
  // Adjust imageHeight to fit within the availableHeight
  const imageHeight = (availableHeight - margin * (gridRows + 1)) / gridRows;

  const calculateProperties = (index) => {
    const appearanceFrame = initialDelay + index * appearanceInterval;
    const individualExpansionStart = expansionStart + index * expansionDuration;

    const isVisible = frame >= appearanceFrame;
    const isExpanding = frame >= individualExpansionStart;
    const hasFullyExpanded = frame >= individualExpansionStart + expansionDuration;

    const column = index % gridColumns;
    const row = Math.floor(index / gridColumns);
    const xPosInitial = margin + column * (imageWidth + margin);
    const yPosInitial = margin + row * (imageHeight + margin);

    // Spring animation for bounce effect
    const bounce = spring({
      fps,
      frame: frame - appearanceFrame,
      config: {damping: 10, stiffness: 100, mass: 0.5},
    });

    // Fade-in effect
    const opacity = interpolate(frame, [appearanceFrame, appearanceFrame + fps / 4], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    let scale, xPos, yPos, zIndex;
    if (isExpanding || hasFullyExpanded) {
      const expansionProgress = Math.min((frame - individualExpansionStart) / expansionDuration, 1);
      scale = interpolate(expansionProgress, [0, 1], [1, Math.max(width / imageWidth, height / imageHeight)]);
      xPos = interpolate(expansionProgress, [0, 1], [xPosInitial, 175]);
      yPos = interpolate(expansionProgress, [0, 1], [yPosInitial, 380]);
      zIndex = 0;
    } else {
      scale = bounce;
      xPos = xPosInitial * bounce;
      yPos = yPosInitial * bounce;
      zIndex = totalPopups - index;
    }
    
    // Adjust your return statement accordingly
    return {
      opacity: isVisible ? opacity : 0,
      transform: `translate(${xPos}px, ${yPos}px) scale(${scale})`,
      transformOrigin: 'bottom right', // Adjust as needed to anchor the expansion
      zIndex,
    };
  };

  const finalSceneStartFrame = expansionStart + totalPopups * expansionDuration + (fps/2); // Adjust timing as necessary

  // Determine if the FinalScene should be shown
  const showFinalScene = frame >= finalSceneStartFrame;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* BottomBar positioned absolutely at the bottom */}

      <Sequence from={0} layout="none" durationInFrames={durationInFrames}>
        <BottomBar username={username} productName={productName} price={price} type={type} />
      </Sequence>

      <Img src={images[0]} style={{backgroundColor: '#ffffff', width: '100%', height: '100%', objectFit: 'cover'}} />
      
      {/* Popup images with bounce and fade-in effect */}
      {images.slice(1).map((src, index) => {
        const {opacity, transform, zIndex} = calculateProperties(index);
        return (
          <Img
            key={index}
            src={src}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              position: 'absolute',
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
              objectFit: 'cover',
              opacity,
              transform,
              zIndex,
              boxShadow: '35px 25px 20px rgba(0, 0, 0, 0.35)',
            }}
          />
        );
      })}

      {showFinalScene && (
        <FinalScene
          username={username}
          productName={productName}
          price={`$${price}`} // Assuming price is just a numeric value and needs a currency symbol
          storeURL={storeURL}
          type={type}
        />
      )}

    </AbsoluteFill>
  );
};