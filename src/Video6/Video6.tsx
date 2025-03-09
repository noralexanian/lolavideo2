import React from 'react';
import {AbsoluteFill, useVideoConfig, Img, useCurrentFrame, interpolate, spring, Sequence, getInputProps} from 'remotion';
import FinalScene from './FinalScene';
import { BottomBar } from './BottomBar';

export const Video6: React.FC<{ 
  images: string[], username: string, productName: string, price: string, type: number
}> = (defaultProps) => {
  // Get input props which will override default props
  const inputProps = getInputProps() || {};
  
  // Merge props, with inputProps taking precedence
  const props = {...defaultProps, ...inputProps};
  
  // Extract individual props
  let { images, username, productName, price, type } = props;
  
  // Ensure we always have exactly 7 images
  if (!images || images.length === 0) {
    // Default fallback images
    images = [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
    ];
  } else if (images.length < 7) {
    // If less than 7 images, repeat the first ones until we have 7
    const originalImages = [...images];
    let i = 0;
    while (images.length < 7) {
      images.push(originalImages[i % originalImages.length]);
      i++;
    }
  } else if (images.length > 7) {
    // If more than 7 images, use only the first 7
    images = images.slice(0, 7);
  }
  
  console.log('Video6 props (after image adjustment):', { images, productName, price, username, type });

  const storeURL = "lolapay.com/" + username;
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();

  // Define the BottomBar's height to account for it in image positioning
  const bottomBarHeight = 60;
  
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

  const calculateProperties = (index: number) => {
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
    
    return {
      opacity: isVisible ? opacity : 0,
      transform: `translate(${xPos}px, ${yPos}px) scale(${scale})`,
      transformOrigin: 'bottom right', // Anchor the expansion
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

      {/* Background image */}
      {images && images.length > 0 && (
        <Img 
          src={images[0]} 
          style={{
            backgroundColor: '#ffffff', 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }} 
          onError={(e) => {
            console.error('Background image failed to load:', images[0]);
            e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg==';
          }}
        />
      )}
      
      {/* Popup images with bounce and fade-in effect */}
      {images && images.slice(1).map((src, index) => {
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
            onError={(e) => {
              console.error('Image failed to load:', src);
              e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg==';
            }}
          />
        );
      })}

      {/* Final scene */}
      {showFinalScene && (
        <FinalScene
          username={username}
          productName={productName}
          price={`$${price}`}
          storeURL={storeURL}
          type={type}
        />
      )}
    </AbsoluteFill>
  );
};