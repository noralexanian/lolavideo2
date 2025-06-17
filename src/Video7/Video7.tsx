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
import { FinalScenePart1 } from './FinalScenePart1';
import { FinalScenePart2 } from './FinalScenePart2';
import { BottomBar3 } from './BottomBar3';

export const Video7: React.FC<{
  images: string[];
  username: string;
  productName: string;
  price: string;
  type: number;
  logoUrl?: string;
}> = (defaultProps) => {
  // Get input props which will override default props
  const inputProps = getInputProps() || {};

  // Merge props, with inputProps taking precedence
  const props = { ...defaultProps, ...inputProps };

  // Extract individual props
  let { images, username, productName, price, type, logoUrl } = props;

  // Set default logoUrl if not provided
  if (!logoUrl) {
    logoUrl = 'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png';
  }

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

  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing - sped up by 1.25x (divide durations by 1.25)
  const bottomBarHeight = 60;
  const cardTransitionDuration = fps * 1.2; // 1.2 seconds per transition (was 1.5s, now 1.25x faster)
  const cardHoldDuration = fps * 0.8; // 0.8 seconds hold time (was 1.0s, now 1.25x faster)
  const singleCardDuration = cardTransitionDuration + cardHoldDuration;
  const totalCardCycleDuration = singleCardDuration * images.length;
  
  // Calculate when main animation ends and final scenes start
  const lastCardTransitionEnd = (images.length - 1) * singleCardDuration + cardTransitionDuration;
  const mainAnimationEndFrame = lastCardTransitionEnd; // Keep full original animation duration
  
  // Final scene timing - 2 seconds each (added after main animation)
  const finalScenePart1StartFrame = mainAnimationEndFrame;
  const finalScenePart1Duration = fps * 2; // 2 seconds
  const finalScenePart2StartFrame = finalScenePart1StartFrame + finalScenePart1Duration;
  const finalScenePart2Duration = fps * 2; // 2 seconds

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
      const linearProgress = currentCardProgress / cardTransitionDuration;
      // Apply smooth easing function for more natural movement
      return interpolate(
        linearProgress,
        [0, 1],
        [0, 1],
        { easing: (t) => t * t * (3 - 2 * t) } // Smooth hermite interpolation
      );
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

  // Morphing effect - much smoother and more elegant
  const morphRotation = interpolate(
    transitionProgress,
    [0, 1],
    [0, 180], // Only 180 degrees for a clean flip
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const morphScale = interpolate(
    transitionProgress,
    [0, 0.15, 0.85, 1],
    [1, 1.05, 1.05, 1], // Gentler scaling
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Floating particles effect - gentler and more mesmerizing
  const particles = Array.from({ length: 6 }, (_, i) => {
    const particleFrame = frame - i * (fps / 6);
    const particleSpring = spring({
      fps,
      frame: particleFrame,
      config: { damping: 20, stiffness: 30, mass: 1.2 }, // Softer movement
    });

    const angle = (i / 6) * Math.PI * 2 + frame / 60; // Slower rotation
    const radius = 120 + Math.sin(frame / 40) * 15; // Gentler breathing
    const x = cardX + cardWidth / 2 + Math.cos(angle) * radius * particleSpring;
    const y = cardY + cardHeight / 2 + Math.sin(angle) * radius * particleSpring;

    return {
      x,
      y,
      opacity: interpolate(particleSpring, [0, 0.4, 1], [0, 0.7, 0.4]), // Gentler opacity
      scale: interpolate(particleSpring, [0, 0.6, 1], [0, 0.8, 0.6]), // Softer scaling
    };
  });

  // Product name animation
  const titleY = interpolate(
    cardEntrance,
    [0, 1],
    [height, cardY - 80],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const showMainAnimation = frame < mainAnimationEndFrame;
  const showFinalScenePart1 = frame >= finalScenePart1StartFrame && frame < finalScenePart2StartFrame;
  const showFinalScenePart2 = frame >= finalScenePart2StartFrame;

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', overflow: 'hidden' }}>
      {/* Bottom Bar - only show during main animation */}
      <Sequence from={0} layout="none" durationInFrames={mainAnimationEndFrame}>
        <BottomBar3 username={username} productName={productName} price={price} type={type} />
      </Sequence>

      {/* Main Animation */}
      {showMainAnimation && (
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

          {/* Store name (always show username at top) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: titleY,
              transform: 'translateX(-50%)',
              fontSize: '36px',
              fontWeight: '400',
              color: 'white',
              textAlign: 'center',
              textShadow: '0 2px 2px rgba(0,0,0,0.15)',
              fontFamily: '"Helvetica Neue", "Segoe UI", system-ui, -apple-system, sans-serif',
              letterSpacing: '1px',
              zIndex: 10,
            }}
          >
            {username}
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
        </>
      )}

      {/* Final Scene Part 1 */}
      {showFinalScenePart1 && (
        <Sequence from={finalScenePart1StartFrame} durationInFrames={finalScenePart1Duration}>
          <FinalScenePart1
            username={username}
            productName={productName}
            price={price}
            type={type}
          />
        </Sequence>
      )}

      {/* Final Scene Part 2 */}
      {showFinalScenePart2 && (
        <Sequence from={finalScenePart2StartFrame} durationInFrames={finalScenePart2Duration}>
          <FinalScenePart2
            username={username}
            logoUrl={logoUrl}
          />
        </Sequence>
      )}
    </AbsoluteFill>
  );
}; 