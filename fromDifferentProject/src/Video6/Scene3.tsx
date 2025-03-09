import React from "react";
import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

export const Scene3: React.FC<{image1: string, image2: string }> = ({image1, image2}) => {
    const { width, height, durationInFrames } = useVideoConfig();
    console.log(durationInFrames);
    const imgWidth = width;
    const imgHeight = height;
    const frame = useCurrentFrame();

    const scale = interpolate(
        frame,
        [0, durationInFrames/2, durationInFrames],
        [1, 1.5, 1],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp"
        }
    );

    const y = interpolate(
        frame,
        [durationInFrames/3, durationInFrames],
        [100, 0],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.out(Easing.ease)
        },
    );

    const img = frame <= durationInFrames/2 ? image1 : image2;

    return (
        <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
            <Img src={img} style={{ width: imgWidth, height: imgHeight,
                transform: `scale(${scale})` }}
            />

            <div style={{
                position: 'absolute',
                top: "40%",
                width: imgWidth,
                textAlign: "center",
                fontFamily: "Antonio",
                fontSize: 80,
                color: "#FFFFFF",
                transform: `translateY(${y - 100}px)`,
                opacity: 0.7,
                clipPath: `polygon(0 ${y}%, 100% ${y}%, 100% 100%, 0% 100%)`
            }}>
                SHOW NOW
            </div>
        </AbsoluteFill>
    );
}
