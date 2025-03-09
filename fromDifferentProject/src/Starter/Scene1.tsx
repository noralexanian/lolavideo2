import React from "react";
import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig} from "remotion";

export const Scene1: React.FC<{images: string[] }> = ({images}) => {
    const { fps, width, height } = useVideoConfig();
    const frame = useCurrentFrame();
    const i = Math.floor(frame/(fps/2));
    const img = images[i % images.length];

    return (
        <AbsoluteFill>
            <Img key={img} src={img} style={{ width, height}} />
        </AbsoluteFill>
    );
}
