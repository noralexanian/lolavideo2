import {AbsoluteFill, Sequence, useVideoConfig, getInputProps} from 'remotion';
import React from "react";
import {FinalScene2} from "../components/FinalScene2";
import {SlidingImages} from "./SlidingImages";
import {AnimationConfig} from "./types";
import {calculateSlidingDuration} from "./animationUtils";
import {BottomBar2} from "../components/BottomBar2";

export const Video5: React.FC<{
    images: string[], 
    username: string,  
    productName: string, 
    price: string, 
    type: number  
}> = (defaultProps) => {
    // Get input props which will override default props
    const inputProps = getInputProps() || {};
    
    // Merge props, with inputProps taking precedence
    const props = {...defaultProps, ...inputProps};
    
    // Extract individual props
    const { images, username, productName, price, type } = props;
    
    console.log('Video5 props (merged):', { images, productName, price, username, type });

    const { fps } = useVideoConfig();
    const finalSceneDuration = 3 * fps;
    const background = "#FFFFFF";
    const nbImg = 11;
    const partialImages = images.slice(0, nbImg);
    
    // Animation configuration
    const animationConfig: AnimationConfig = {
        initialDelay: fps, // 1 second before first movement
        waitDuration: fps/2, // Wait duration between 2 images sliding
        waitGroupDuration: fps * 2, // Wait 2 seconds between 2 groups of sliding
        groupSize: 5, // Slide every 5 images
        moveDuration: fps/6, // Animation duration
        margins: { top: 170, left: 50 }, // Image position on the screen
        spacing: { vertical: 30, horizontal: 30 } // Space between images
    }

    const slidingImagesDuration = calculateSlidingDuration(partialImages.length, animationConfig);

    return (
        <AbsoluteFill style={{ background }}>
            <Sequence from={0} durationInFrames={slidingImagesDuration}>
                <SlidingImages images={partialImages} config={animationConfig} productName={productName} />
            </Sequence>
            
            <Sequence from={slidingImagesDuration} durationInFrames={finalSceneDuration}>
                <FinalScene2 username={username} productName={productName} price={price} />
            </Sequence>
            
            <Sequence from={0} durationInFrames={slidingImagesDuration}>
                <BottomBar2 username={username} productName={productName} price={price} type={type} />
            </Sequence>

            {/* Safety zone images have been removed to avoid rendering issues */}
        </AbsoluteFill>
    );
};