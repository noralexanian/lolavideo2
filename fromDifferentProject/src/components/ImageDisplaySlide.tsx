import React, { useEffect, useState } from 'react';
import {Img, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

interface ImageDisplayProps {
  src: string;
  rotation: number;
  slideFromRight: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, rotation, slideFromRight }) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();

  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);

  // Prepare the animation to start off-screen and slide in
  useEffect(() => {
    const positionOffset = width; // Use the screen width as the offset
    setStartPosition(slideFromRight ? positionOffset : -positionOffset);
    setEndPosition(0); // End at the center
  }, [width, slideFromRight]);

  // Make the sliding animation faster
  const slideDuration = fps * 0.75; // Faster slide
  const startFrame = 0;
  const endFrame = startFrame + slideDuration;
  
  // Ensure smooth linear interpolation for the slide
  const progress = Math.min((frame - startFrame) / slideDuration, 1);
  const positionX = interpolate(progress, [0, 1], [startPosition, endPosition]);

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translateX(${positionX}px) rotate(${rotation}deg)`,
        border: '30px solid white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
      }}
    >
      <Img src={src} style={{ width: '400px', height: 'auto' }} />
    </div>
  );
};
