import React from 'react';
import {
  AbsoluteFill,
  useVideoConfig,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  Sequence,
  getInputProps,
} from 'remotion';
import FinalScene from '../Video6/FinalScene';
import { BottomBar } from '../Video6/BottomBar';

export const Video8: React.FC<{
  images: string[];
  username: string;
  productName: string;
  price: string;
  type: number;
}> = (defaultProps) => {
  // Get input props which will override default props
  const inputProps = getInputProps() || {};

  // Merge props, with inputProps taking precedence
  const props = { ...defaultProps, ...inputProps };

  // Extract individual props
  let { images, username, productName, price, type } = props;

  // Ensure we always have exactly 5 images
  if (!images || images.length === 0) {
    // Default fallback images
    images = [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
    ];
  } else if (images.length < 5) {
    // If less than 5 images, repeat until we have 5
    const originalImages = [...images];
    let i = 0;
    while (images.length < 5) {
      images.push(originalImages[i % originalImages.length]);
      i++;
    }
  } else if (images.length > 5) {
    // If more than 5 images, use only the first 5
    images = images.slice(0, 5);
  }

  console.log('Video8 props (after image adjustment):', {
    images,
    productName,
    price,
    username,
    type,
  });

  const storeURL = "lolapay.com/" + username;
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing - keep under 8 seconds (240 frames at 30fps)
  const bottomBarHeight = 60;
  const magneticCycleDuration = fps * 1.5; // 1.5 seconds per magnetic cycle
  const totalCycles = 3; // 3 attraction/repulsion cycles
  const totalMagneticDuration = magneticCycleDuration * totalCycles; // 4.5 seconds
  const finalSceneStartFrame = Math.min(totalMagneticDuration + fps * 0.5, durationInFrames - fps * 2); // Leave 2 seconds for final scene

  // Magnetic physics simulation
  const centerX = width / 2;
  const centerY = (height - bottomBarHeight) / 2;
  const imageSize = 140;

  // Calculate magnetic attraction state
  const currentCycle = Math.floor(frame / magneticCycleDuration);
  
  // Alternate between attraction (true) and repulsion (false)
  const isAttracting = currentCycle % 2 === 0;
  
  // Spring-based physics for smooth movement
  const magneticForce = spring({
    fps,
    frame: frame % magneticCycleDuration,
    config: { damping: 8, stiffness: 60, mass: 1.2 },
  });

  // Calculate positions for each image
  const getImageProperties = (index: number) => {
    // Starting positions (scattered around the edges)
    const angles = [0, 72, 144, 216, 288]; // Evenly distributed around circle
    const startRadius = Math.max(width, height) * 0.6;
    const startAngle = (angles[index] * Math.PI) / 180;
    const startX = centerX + Math.cos(startAngle) * startRadius;
    const startY = centerY + Math.sin(startAngle) * startRadius;

    // Target positions when attracted (clustered near center)
    const clusterRadius = 80;
    const clusterAngle = (index * 72 * Math.PI) / 180; // Slight offset for each image
    const clusterX = centerX + Math.cos(clusterAngle) * clusterRadius;
    const clusterY = centerY + Math.sin(clusterAngle) * clusterRadius;

    // Repulsion positions (spread out but not as far as start)
    const repelRadius = 200;
    const repelAngle = (index * 72 * Math.PI) / 180 + Math.PI / 4; // Offset from cluster
    const repelX = centerX + Math.cos(repelAngle) * repelRadius;
    const repelY = centerY + Math.sin(repelAngle) * repelRadius;

    let targetX, targetY, targetScale, targetRotation;

    if (isAttracting) {
      // Moving towards center (attraction)
      targetX = interpolate(magneticForce, [0, 1], [startX, clusterX]);
      targetY = interpolate(magneticForce, [0, 1], [startY, clusterY]);
      targetScale = interpolate(magneticForce, [0, 0.3, 1], [0.3, 1.2, 0.9]);
      targetRotation = interpolate(magneticForce, [0, 1], [0, 360]);
    } else {
      // Moving away from center (repulsion)
      targetX = interpolate(magneticForce, [0, 1], [clusterX, repelX]);
      targetY = interpolate(magneticForce, [0, 1], [clusterY, repelY]);
      targetScale = interpolate(magneticForce, [0, 0.5, 1], [0.9, 0.7, 1.1]);
      targetRotation = interpolate(magneticForce, [0, 1], [0, -180]);
    }

    // Add some oscillation for more dynamic movement
    const oscillation = Math.sin(frame / 15 + index) * 10;
    
    return {
      x: targetX + oscillation,
      y: targetY + oscillation * 0.5,
      scale: targetScale,
      rotation: targetRotation,
      opacity: interpolate(frame, [0, fps * 0.3], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }),
    };
  };

  // Product name animation
  const titleOpacity = interpolate(
    frame,
    [0, fps * 0.5, totalMagneticDuration - fps * 0.5, totalMagneticDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const titleScale = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 100, mass: 1 },
  });

  const showFinalScene = frame >= finalSceneStartFrame;

  return (
    <AbsoluteFill style={{ 
      background: 'radial-gradient(circle at center, #1e3c72 0%, #2a5298 100%)', 
      overflow: 'hidden' 
    }}>
      {/* Bottom Bar */}
      <Sequence from={0} layout="none" durationInFrames={durationInFrames}>
        <BottomBar username={username} productName={productName} price={price} type={type} />
      </Sequence>

      {!showFinalScene && (
        <>
          {/* Magnetic field visualization */}
          <div
            style={{
              position: 'absolute',
              left: centerX - 150,
              top: centerY - 150,
              width: '300px',
              height: '300px',
              border: `2px solid rgba(255,255,255,0.${isAttracting ? '3' : '1'})`,
              borderRadius: '50%',
              transform: `scale(${isAttracting ? magneticForce * 1.5 : 2 - magneticForce})`,
              transition: 'border-color 0.3s ease',
            }}
          />

          {/* Central magnetic core */}
          <div
            style={{
              position: 'absolute',
              left: centerX - 20,
              top: centerY - 20,
              width: '40px',
              height: '40px',
              background: isAttracting 
                ? 'radial-gradient(circle, #ff6b6b 0%, #ee5a24 100%)'
                : 'radial-gradient(circle, #74b9ff 0%, #0984e3 100%)',
              borderRadius: '50%',
              transform: `scale(${magneticForce * 1.5})`,
              boxShadow: `0 0 ${magneticForce * 30}px rgba(255,255,255,0.8)`,
            }}
          />

          {/* Product name or store name */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '15%',
              transform: `translateX(-50%) scale(${titleScale})`,
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              fontFamily: 'Arial, sans-serif',
              opacity: titleOpacity,
              zIndex: 10,
            }}
          >
            {type === 0 ? productName : username}
          </div>

          {/* Price badge - only show for products */}
          {type === 0 && (
            <div
              style={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.9)',
                color: '#1e3c72',
                borderRadius: '25px',
                fontSize: '24px',
                fontWeight: 'bold',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transform: `scale(${titleScale})`,
                zIndex: 15,
              }}
            >
              ${price}
            </div>
          )}

          {/* Magnetic images */}
          {images.map((src, index) => {
            const imageProps = getImageProperties(index);
            return (
              <Img
                key={index}
                src={src}
                style={{
                  position: 'absolute',
                  left: imageProps.x - imageSize / 2,
                  top: imageProps.y - imageSize / 2,
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  objectFit: 'cover',
                  borderRadius: '15px',
                  transform: `scale(${imageProps.scale}) rotate(${imageProps.rotation}deg)`,
                  opacity: imageProps.opacity,
                  boxShadow: `0 10px 25px rgba(0,0,0,0.4)`,
                  border: '3px solid rgba(255,255,255,0.8)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onError={(e) => {
                  console.error('Image failed to load:', src);
                  e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg==';
                }}
              />
            );
          })}
        </>
      )}

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