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
import { FinalScene3 } from './FinalScene3';
import { BottomBar3 } from './BottomBar3';

export const Video7: React.FC<{
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

  // Ensure we always have exactly 6 images
  if (!images || images.length === 0) {
    // Default fallback images
    images = [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
    ];
  } else if (images.length < 6) {
    // If less than 6 images, repeat until we have 6
    const originalImages = [...images];
    let i = 0;
    while (images.length < 6) {
      images.push(originalImages[i % originalImages.length]);
      i++;
    }
  } else if (images.length > 6) {
    // If more than 6 images, use only the first 6
    images = images.slice(0, 6);
  }

  console.log('Video7 props (after image adjustment):', {
    images,
    productName,
    price,
    username,
    type,
  });

  const { fps, width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing - keep under 10 seconds (300 frames at 30fps)
  const bottomBarHeight = 60;
  const cardTransitionDuration = fps * 0.8; // 0.8 seconds per transition
  const cardHoldDuration = fps * 0.4; // 0.4 seconds hold time
  const totalCardCycleDuration = (cardTransitionDuration + cardHoldDuration) * images.length;
  const finalSceneStartFrame = Math.min(totalCardCycleDuration, durationInFrames - fps * 2); // Leave 2 seconds for final scene

  // Card morphing logic
  const getCurrentCardIndex = () => {
    const cycleProgress = frame % totalCardCycleDuration;
    const singleCardDuration = cardTransitionDuration + cardHoldDuration;
    return Math.floor(cycleProgress / singleCardDuration);
  };

  const getCardTransitionProgress = () => {
    const cycleProgress = frame % totalCardCycleDuration;
    const singleCardDuration = cardTransitionDuration + cardHoldDuration;
    const currentCardProgress = cycleProgress % singleCardDuration;
    
    if (currentCardProgress <= cardTransitionDuration) {
      return currentCardProgress / cardTransitionDuration;
    }
    return 1; // Hold phase
  };

  const currentCardIndex = getCurrentCardIndex();
  const nextCardIndex = (currentCardIndex + 1) % images.length;
  const transitionProgress = getCardTransitionProgress();

  // Main card properties
  const cardWidth = width * 0.7;
  const cardHeight = height * 0.6;
  const cardX = (width - cardWidth) / 2;
  const cardY = (height - bottomBarHeight - cardHeight) / 2;

  // Spring animation for card entrance
  const cardEntrance = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 80, mass: 1 },
  });

  // Morphing effect
  const morphRotation = interpolate(
    transitionProgress,
    [0, 0.5, 1],
    [0, 180, 360],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const morphScale = interpolate(
    transitionProgress,
    [0, 0.25, 0.75, 1],
    [1, 1.1, 1.1, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Floating particles effect
  const particles = Array.from({ length: 8 }, (_, i) => {
    const particleFrame = frame - i * (fps / 8);
    const particleSpring = spring({
      fps,
      frame: particleFrame,
      config: { damping: 15, stiffness: 50, mass: 0.8 },
    });

    const angle = (i / 8) * Math.PI * 2;
    const radius = 100 + Math.sin(frame / 20) * 20;
    const x = cardX + cardWidth / 2 + Math.cos(angle) * radius * particleSpring;
    const y = cardY + cardHeight / 2 + Math.sin(angle) * radius * particleSpring;

    return {
      x,
      y,
      opacity: interpolate(particleSpring, [0, 0.3, 1], [0, 1, 0.3]),
      scale: interpolate(particleSpring, [0, 0.5, 1], [0, 1, 0.8]),
    };
  });

  // Product name animation
  const titleY = interpolate(
    cardEntrance,
    [0, 1],
    [height, cardY - 80],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const showFinalScene = frame >= finalSceneStartFrame;

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', overflow: 'hidden' }}>
      {/* Bottom Bar */}
      <Sequence from={0} layout="none" durationInFrames={durationInFrames}>
        <BottomBar3 username={username} productName={productName} price={price} type={type} />
      </Sequence>

      {!showFinalScene && (
        <>
          {/* Floating particles */}
          {particles.map((particle, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: particle.x,
                top: particle.y,
                width: '12px',
                height: '12px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                opacity: particle.opacity,
                transform: `scale(${particle.scale})`,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              }}
            />
          ))}

          {/* Product name */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: titleY,
              transform: 'translateX(-50%)',
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: 'Arial, sans-serif',
              zIndex: 10,
            }}
          >
            {productName}
          </div>

          {/* Main morphing card */}
          <div
            style={{
              position: 'absolute',
              left: cardX,
              top: cardY,
              width: cardWidth,
              height: cardHeight,
              transform: `scale(${cardEntrance * morphScale}) rotateY(${morphRotation}deg)`,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center',
            }}
          >
            {/* Current image */}
            <Img
              src={images[currentCardIndex]}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
                position: 'absolute',
                backfaceVisibility: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                border: '4px solid rgba(255,255,255,0.9)',
              }}
              onError={(e) => {
                console.error('Image failed to load:', images[currentCardIndex]);
                e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg==';
              }}
            />
            
            {/* Next image (for flip effect) */}
            <Img
              src={images[nextCardIndex]}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
                position: 'absolute',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                border: '4px solid rgba(255,255,255,0.9)',
              }}
              onError={(e) => {
                console.error('Image failed to load:', images[nextCardIndex]);
                e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg==';
              }}
            />
          </div>

          {/* Price badge */}
          <div
            style={{
              position: 'absolute',
              right: '20px',
              top: cardY + 20,
              background: 'rgba(255,255,255,0.95)',
              color: '#333',
              padding: '12px 20px',
              borderRadius: '25px',
              fontSize: '24px',
              fontWeight: 'bold',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transform: `scale(${cardEntrance})`,
              zIndex: 5,
            }}
          >
            ${price}
          </div>
        </>
      )}

      {/* Final scene */}
      {showFinalScene && (
        <FinalScene3
          username={username}
          productName={productName}
          price={price}
          type={type}
        />
      )}
    </AbsoluteFill>
  );
}; 