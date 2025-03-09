import {AbsoluteFill, useVideoConfig, Img, useCurrentFrame, interpolate, Sequence} from 'remotion';
import { AnimatedTextDiv } from './components/AnimatedTextDiv.js';
import {BottomBar} from './components/BottomBar';

export const Video2: React.FC<{
  images: string[], productName: string, username: string, price: string
}> = ({ images, productName, username, price }) => {
  const storeURL = "lolapay.com/" + username;
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();

  const bottomBarHeight = 125; // Height of the BottomBar component
  const gridMarginTop = 10; // Top margin for the grid
  const gridMarginSide = 10; // Side margins for the grid

  // Adjust only the width for the grid, height remains the same to not affect the BottomBar
  const adjustedWidth = width - gridMarginSide * 2; 

  const adjustedImages = images.length > 6 ? images.slice(0, 6) : images;
  const columns = 3;
  const rows = 2; 

  const gap = 6; 
  const totalHorizontalGap = gap * (columns - 1);
  const totalVerticalGap = gap * (rows - 1);

  const imageSize = {
    width: (adjustedWidth - totalHorizontalGap) / columns,
    // The height calculation remains unchanged to fill the space above the BottomBar
    height: (height - bottomBarHeight - gridMarginTop - totalVerticalGap) / rows,
  };

  const revealDuration = fps * 0.5;
  const startFrame = fps; // Delay start to 1 second into the video

  // Calculate frame ranges for color and scaling animations
  const frameRanges = adjustedImages.map((_, index) => {
    const start = startFrame + index * revealDuration; // Start later for each subsequent image
    return [start, start + revealDuration];
  });

  const getStyle = (index) => {
    const [start, end] = frameRanges[index];
    const progress = interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    // Scale effect
    const scale = interpolate(progress, [0, 0.5, 1], [1, 1.05, 1]);

    // Grayscale effect transitioning to color immediately with the pop effect
    const grayscaleValue = interpolate(progress, [0, 0.01, 1], [100, 0, 0], {
      extrapolateRight: 'clamp',
    });
    const filter = `grayscale(${grayscaleValue}%)`;

    return {
      filter,
      transform: `scale(${scale})`,
      borderRadius: '10px',
      border: '5px solid white',
      position: 'absolute',
      width: '100%', // Use 100% of the container's width to maintain aspect ratio
      height: '100%', // Use 100% of the container's height to maintain aspect ratio
      objectFit: 'cover', // Ensure the images are covered well without being stretched
      zIndex: progress > 0 ? 1 : 0, // Dynamically adjust zIndex to prioritize the currently animating image
    };
  };

  
  // Inside your Video2 component, adjust your textFrames and content to include
  const textContent = [username, productName, `$${price}`, "Available in", "img", storeURL];

  // Assuming you want the LolaPayBar to bounce in just like the texts
  const lastImageRevealFrame = adjustedImages.length * revealDuration;
  const textAppearFrame = lastImageRevealFrame + fps/1.3;
  let textFrames = [textAppearFrame];
  for (let i = 1; i <= textContent.length; i++) { // Adjusted loop to account for LolaPayBar
    textFrames[i] = textFrames[i-1] + (fps / 2);
  }

  return (
    <AbsoluteFill style={{backgroundColor: '#9497ff'}}>
      {/* Container for images with top and side margins */}
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: `${gap}px`, paddingTop: `${gridMarginTop}px`, paddingLeft: `${gridMarginSide}px`, paddingRight: `${gridMarginSide}px`, marginBottom: bottomBarHeight}}>
        {adjustedImages.map((src, index) => (
          <div key={index} style={{ width: imageSize.width, height: imageSize.height, position: 'relative', boxSizing: 'border-box' }}>
            <Img src={src} style={getStyle(index)} />
          </div>
        ))}
      </div>

      {textContent.map((text, index) => (
        <AnimatedTextDiv
          key={index}
          text={text}
          index={index}
          total={textContent.length}
          frame={frame}
          textFrames={textFrames}
          // storeURL={text === "Found in" ? "https://lolapay.com/"+username : undefined}
        />
      ))}

      {/* BottomBar positioned absolutely at the bottom */}
      <Sequence from={0} layout="none" durationInFrames={durationInFrames}>
        <BottomBar username={username} productName={productName} price={price} />
      </Sequence>
    </AbsoluteFill>
  );
};
