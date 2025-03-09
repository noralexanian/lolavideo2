import {AbsoluteFill, Audio, Img, Sequence, staticFile, useVideoConfig} from 'remotion';
import React from "react";
import {FinalScene2} from "../components/FinalScene2";
import {SlidingImages} from "./SlidingImages";
import {AnimationConfig} from "./types";
import {calculateSlidingDuration} from "./animationUtils";
import {BottomBar2} from "../components/BottomBar2";

export const Video5: React.FC<{images: string[], username: string,  productName: string, storeName: string,  price: string, type: number  }> =
    ({images, username, productName, price, type}) => {
    const { fps} = useVideoConfig();
    const finalSceneDuration = 3 * fps;
    const background = "#FFFFFF";
    const audioVolume = 1;
    const nbImg = 11;
    const partialImages = images.slice(0, nbImg);
    const animationConfig: AnimationConfig = {
        initialDelay: fps, // Example: 1 seconds before first movement
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
            <Audio src={staticFile('music_video5.mp3')} volume={audioVolume} />

            <Sequence from={0} durationInFrames={slidingImagesDuration}>
                <SlidingImages images={partialImages} config={animationConfig} productName={productName} />
            </Sequence>
            <Sequence from={slidingImagesDuration} durationInFrames={finalSceneDuration}>
                <FinalScene2 username={username} productName={productName} price={price} />
            </Sequence>
            <Sequence from={ 0 } durationInFrames={slidingImagesDuration}>
                <BottomBar2 username={username} productName={productName} price={price} type={type} />
            </Sequence>

            <Img src={staticFile('zona-segura-reels-ig-imorillas.png')}
                 style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", zIndex: 0 }} />

            <Img src={staticFile('zona-segura-para-tiktok-green-imorillas.png')}
                 style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", zIndex: 300 }} />
        </AbsoluteFill>
    );
};
