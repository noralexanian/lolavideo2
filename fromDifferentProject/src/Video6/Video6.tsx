import {AbsoluteFill, Audio, Img, Sequence, staticFile, useVideoConfig} from 'remotion';
import React from "react";
import {FinalScene2} from "../components/FinalScene2";
import {Scene1} from "./Scene1";
import {Scene2} from "./Scene2";
import {Scene3} from "./Scene3";
import {BottomBar2} from "../components/BottomBar2";

export const Video6: React.FC<{images: string[], username: string,  productName: string, storeName: string,  price: string, type: number  }> =
    ({images, username, productName, storeName, price, type}) => {
    const { fps } = useVideoConfig();
    const nbImages = 5; // Number of images  to use. Minimum 5
    const imagesToUse = images.slice(0, nbImages);

    const background = "#FFFFFF";
    const audioVolume = 1;
    const finalSceneDuration = 3 * fps;
    const scene1Duration = 4 * fps;
    const firstImageAnimDuration = fps;
    const scene2Duration = (imagesToUse.length) * fps;
    const scene3Duration = 2 * fps;

    return (
        <AbsoluteFill style={{ background }}>
            <Audio src={staticFile('music_video6.mp3')} volume={audioVolume} />

            <Sequence from={0} durationInFrames={scene1Duration}>
                <Scene1 images={imagesToUse} storeName={storeName} />
            </Sequence>
            <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
                <Scene2 images={imagesToUse} firstImageAnimDuration={firstImageAnimDuration} storeName={storeName} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration - 1} durationInFrames={scene3Duration}>
                <Scene3 image1={imagesToUse[imagesToUse.length - 2]} image2={imagesToUse[imagesToUse.length - 1]} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration } durationInFrames={finalSceneDuration}>
                <FinalScene2 username={username} productName={productName} price={price} />
            </Sequence>
            <Sequence from={ 0 } durationInFrames={scene1Duration + scene2Duration + scene3Duration}>
                <BottomBar2 username={username} productName={productName} price={price} type={type} />
            </Sequence>

            <Img src={staticFile('zona-segura-reels-ig-imorillas.png')}
                 style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", zIndex: 0 }} />

            <Img src={staticFile('zona-segura-para-tiktok-green-imorillas.png')}
                 style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", zIndex: 300 }} />
        </AbsoluteFill>
    );
};
