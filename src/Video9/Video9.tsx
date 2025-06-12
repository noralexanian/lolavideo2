import React from 'react';
import {
  AbsoluteFill,
  useVideoConfig,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  getInputProps,
  staticFile,
} from 'remotion';
import { Footer } from '../components/Footer';

export const Video9: React.FC<{
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

  // Ensure we always have exactly 4 images
  if (!images || images.length === 0) {
    // Default fallback images
    images = [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
    ];
  } else if (images.length < 4) {
    // If less than 4 images, repeat until we have 4
    const originalImages = [...images];
    let i = 0;
    while (images.length < 4) {
      images.push(originalImages[i % originalImages.length]);
      i++;
    }
  } else if (images.length > 4) {
    // If more than 4 images, use only the first 4
    images = images.slice(0, 4);
  }

  console.log('Video9 props (after image adjustment):', {
    images,
    productName,
    price,
    username,
    type,
  });

  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing - keep under 8 seconds (240 frames at 30fps)
  const spiralCycleDuration = fps * 2; // 2 seconds per complete spiral cycle
  const totalSpiralCycles = 2.5; // 2.5 spiral cycles
  const totalSpiralDuration = spiralCycleDuration * totalSpiralCycles; // 5 seconds
  const finalSceneStartFrame = totalSpiralDuration + fps * 0.5; // Leave 2.5 seconds for final scene

  // Vortex center and properties
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) * 0.4;
  const minRadius = 30;
  const imageSize = 120;

  // Calculate spiral properties for each image
  const getSpiralProperties = (index: number) => {
    // Stagger the start times for each image
    const staggerDelay = index * (fps * 0.3); // 0.3 second delay between images
    const adjustedFrame = Math.max(0, frame - staggerDelay);
    
    // Spring animation for entrance
    const entranceSpring = spring({
      fps,
      frame: adjustedFrame,
      config: { damping: 10, stiffness: 60, mass: 1 },
    });

    // Spiral rotation (continuous)
    const rotationSpeed = 0.02; // Radians per frame
    const baseAngle = (index * Math.PI * 0.5); // 90 degrees apart
    const currentAngle = baseAngle + (adjustedFrame * rotationSpeed);

    // Breathing radius animation (in and out like a vortex)
    const breathingCycle = Math.sin(adjustedFrame / 30) * 0.3 + 0.7; // Oscillates between 0.4 and 1
    const spiralRadius = interpolate(
      Math.sin(adjustedFrame / 60), 
      [-1, 1], 
      [minRadius, maxRadius]
    ) * breathingCycle;

    // Calculate position
    const x = centerX + Math.cos(currentAngle) * spiralRadius;
    const y = centerY + Math.sin(currentAngle) * spiralRadius;

    // Scale animation (pulses with the spiral)
    const pulseScale = 0.8 + Math.sin(adjustedFrame / 20) * 0.3;
    const baseScale = interpolate(entranceSpring, [0, 1], [0, 1]);
    const finalScale = baseScale * pulseScale;

    // Rotation of individual images
    const imageRotation = currentAngle * 2; // Rotates twice as fast as orbit

    // Z-depth simulation (closer images are larger and more opaque)
    const depthFactor = (spiralRadius - minRadius) / (maxRadius - minRadius);
    const depthScale = 0.7 + depthFactor * 0.5;
    const depthOpacity = 0.6 + depthFactor * 0.4;

    return {
      x: x - imageSize / 2,
      y: y - imageSize / 2,
      scale: finalScale * depthScale,
      rotation: imageRotation,
      opacity: entranceSpring * depthOpacity,
      zIndex: Math.floor(depthFactor * 10),
    };
  };

  // Center vortex effect
  const vortexIntensity = Math.sin(frame / 20) * 0.5 + 0.5; // Oscillates between 0 and 1
  const vortexScale = 1 + vortexIntensity * 0.3;
  const vortexRotation = frame * 2; // Fast rotation

  // Product name animation
  const titleAnimation = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });

  const titleOpacity = interpolate(
    frame,
    [0, fps * 0.5, totalSpiralDuration - fps, totalSpiralDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Final scene with simple transition
  const showFinalScene = frame >= finalSceneStartFrame;
  const finalSceneOpacity = interpolate(
    frame,
    [finalSceneStartFrame, finalSceneStartFrame + fps * 0.3],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(45deg, #8360c3 0%, #2ebf91 100%)', 
      overflow: 'hidden' 
    }}>
      {!showFinalScene && (
        <>
          {/* Central vortex core */}
          <div
            style={{
              position: 'absolute',
              left: centerX - 25,
              top: centerY - 25,
              width: '50px',
              height: '50px',
              background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.3) 70%, transparent 100%)',
              borderRadius: '50%',
              transform: `scale(${vortexScale}) rotate(${vortexRotation}deg)`,
              boxShadow: `0 0 ${vortexIntensity * 40}px rgba(255,255,255,0.8)`,
            }}
          />

          {/* Vortex rings */}
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              style={{
                position: 'absolute',
                left: centerX - (ring * 60),
                top: centerY - (ring * 60),
                width: `${ring * 120}px`,
                height: `${ring * 120}px`,
                border: `2px solid rgba(255,255,255,${0.3 / ring})`,
                borderRadius: '50%',
                transform: `rotate(${frame * (ring * 0.5)}deg)`,
                borderStyle: 'dashed',
              }}
            />
          ))}

          {/* Product name or store name */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '10%',
              transform: `translateX(-50%) scale(${titleAnimation})`,
              fontSize: '38px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              fontFamily: 'Arial, sans-serif',
              opacity: titleOpacity,
              zIndex: 20,
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
                color: '#8360c3',
                borderRadius: '25px',
                fontSize: '24px',
                fontWeight: 'bold',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transform: `scale(${titleAnimation})`,
                zIndex: 15,
              }}
            >
              ${price}
            </div>
          )}

          {/* Spiraling images */}
          {images.map((src, index) => {
            const spiralProps = getSpiralProperties(index);
            return (
              <Img
                key={index}
                src={src}
                style={{
                  position: 'absolute',
                  left: spiralProps.x,
                  top: spiralProps.y,
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  objectFit: 'cover',
                  borderRadius: '20px',
                  transform: `scale(${spiralProps.scale}) rotate(${spiralProps.rotation}rad)`,
                  opacity: spiralProps.opacity,
                  zIndex: spiralProps.zIndex,
                  boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                  border: '3px solid rgba(255,255,255,0.8)',
                  filter: 'brightness(1.1) contrast(1.1)',
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

      {/* Footer (reused from Video3 style) */}
      <Footer store={username} logo={staticFile('logo.png')} theme="White" />

      {/* Final scene */}
      {showFinalScene && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: finalSceneOpacity,
            zIndex: 30,
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {username}
          </div>
          {type === 0 && (
            <>
              <div
                style={{
                  fontSize: '36px',
                  color: 'rgba(255,255,255,0.9)',
                  textAlign: 'center',
                  marginBottom: '15px',
                }}
              >
                {productName}
              </div>
              <div
                style={{
                  fontSize: '42px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  textAlign: 'center',
                  marginBottom: '40px',
                }}
              >
                ${price}
              </div>
            </>
          )}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            DISPONIBLE EN
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            lolapay.com/{username}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}; 