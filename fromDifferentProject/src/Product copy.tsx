import React from 'react';
import {AbsoluteFill, useVideoConfig, Img, useCurrentFrame, interpolate, spring, Sequence} from 'remotion';
// import { AnimatedTextDiv } from './components/AnimatedTextDiv.js';
import FinalScene from './components/FinalScene'; // Adjust the import path as necessary
import {BottomBar} from './components/BottomBar';

export const Video3: React.FC<{ 
  images: string[], username: string, productName: string, price: string,  
}> = ({ images, username, productName, price }) => {
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
      xPos = interpolate(expansionProgress, [0, 1], [xPosInitial, 300]);
      yPos = interpolate(expansionProgress, [0, 1], [yPosInitial, 440]);
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
      zIndex,
    };
  };

  const finalSceneStartFrame = expansionStart + totalPopups * expansionDuration + (fps/2); // Adjust timing as necessary

  return (
    <AbsoluteFill>
      {/* BottomBar positioned absolutely at the bottom */}
      <Sequence from={0} layout="none" durationInFrames={durationInFrames}>
        <BottomBar username={username} productName={productName} price={price} />
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

      <Sequence from={finalSceneStartFrame} layout="none" durationInFrames={durationInFrames - finalSceneStartFrame}>
        <FinalScene
          username={username}
          productName={productName}
          price={`$${price}`} // Assuming price is just a numeric value and needs a currency symbol
          storeURL={storeURL}
        />
      </Sequence>

    </AbsoluteFill>
  );
};






// import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
// import {Price} from './Old_Components/Price';
// import {Title} from './Old_Components/Title';
// import {PriceTag} from "./Old_Components/PriceTag";
// import {PriceTagPurple} from "./Old_Components/PriceTagPurple";
// import {AmazedGirl} from "./Old_Components/AmazedGirl";
// import {ProductPicture} from "./Old_Components/ProductPicture";
// import {LolaPayLogo} from "./Old_Components/LolaPayLogo";
// import {LolaPayBottom} from "./Old_Components/LolaPayBottom";

// export const Product: React.FC<{
// 	fontFamily: string;
// 	productName: string;
// 	price: string;
// 	username: string;
// 	showAmazedGirl: boolean;
// 	showPrice: boolean;
// 	showPriceTag: boolean;
// 	showPriceTagPurple: boolean;
// 	photos: string[];
// }> = ({fontFamily, productName, price, username, showAmazedGirl, showPrice, showPriceTag, showPriceTagPurple, photos}) => {
// 	const frame = useCurrentFrame();
// 	const videoConfig = useVideoConfig();
// 	const transitionStart = 0;

// 	const opacity = interpolate(
// 		frame,
// 		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
// 		[1, 0],
// 		{
// 			extrapolateLeft: 'clamp',
// 			extrapolateRight: 'clamp',
// 		}
// 	);

// 	return (
// 		<div style={{flex: 1, backgroundColor: '#8885de'}}>
// 			<div style={{opacity}}>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<ProductPicture photos={photos} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<Title productName={productName} fontFamily={fontFamily} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<AmazedGirl show={showAmazedGirl} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<Price price={price} show={showPrice} bottom="37%" fontSize={80} right="5%" />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<PriceTag price={price} show={showPriceTag} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<PriceTagPurple price={price} show={showPriceTagPurple} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<LolaPayBottom username={username} />
// 				</Sequence>
// 			</div>
// 			<div>
// 				<Sequence from={videoConfig.durationInFrames - 26}>
// 					<LolaPayLogo username={username} />
// 				</Sequence>
// 			</div>
// 		</div>
// 	);
// };
