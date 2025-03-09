import {AbsoluteFill, Audio, Img, Sequence, staticFile, useVideoConfig} from 'remotion';
import React from "react";
import {FinalScene2} from "../components/FinalScene2";
import {Scene1} from "./Scene1";
import {Scene2} from "./Scene2";

export const Starter: React.FC<{images: string[], username: string,  productName: string, storeName: string,  price: string, type: number  }> =
    ({images, username, productName, price}) => {
    const { fps } = useVideoConfig();
    const background = "#FFFFFF";
    const audioVolume = 1;
    const finalSceneDuration = 3 * fps;
    const scene1Duration = 5 * fps;
    const scene2Duration = 5 * fps;

    return (
        <AbsoluteFill style={{ background }}>
            <Audio src={staticFile('music_video6.mp3')} volume={audioVolume} />

            <Sequence from={0} durationInFrames={scene1Duration}>
                <Scene1 images={images} />
            </Sequence>
            <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
                <Scene2 images={images} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration} durationInFrames={finalSceneDuration}>
                <FinalScene2 username={username} productName={productName} price={price} />
            </Sequence>

            <Img src={staticFile('zona-segura-reels-ig-imorillas.png')}
                 style={{ opacity: 0.2, position: "absolute", width: "100%", height: "100%", zIndex: 0 }} />

            <Img src={staticFile('zona-segura-para-tiktok-green-imorillas.png')}
                 style={{ opacity: 0.5, position: "absolute", width: "100%", height: "100%", zIndex: 300 }} />
        </AbsoluteFill>
    );
};
