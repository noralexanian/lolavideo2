import React from "react";
import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig} from "remotion";
import {Text} from "./Text";

export const Scene1: React.FC<{
    images: string[],
    storeName: string,
    imageTitles?: string[]
}> = ({
          images,
          storeName,
      }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();
    const nbVisiblesImages = Math.floor(frame/(fps/2));
    const opacity = (i: number) => (
        i + 1 <= nbVisiblesImages ? 1 : 0
    );

    const TextOverlay = ({index, top}: {index: number, top: string}) => (
        <div style={{
            position: 'absolute',
            top,
            width: "50%",
            textAlign: "center",
            fontFamily: "Antonio",
            fontSize: "x-large",
            color: "#FFFFFF",
            opacity: opacity(index) === 1 ? 0.7 : 0,
        }}>
            {storeName}
        </div>
    );

    return (
        <AbsoluteFill>
            <div style={{ display: "flex", gap: 10}}>
                <div style={{ display: "flex", flexDirection: "column", width: "50%", gap: 10}}>
                    <div style={{ fontSize: "xx-large", fontFamily: "Antonio", width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Text text={storeName} />
                    </div>
                    <Img src={images[1]} style={{ width: "100%", height: "40%", opacity: opacity(1)}} /><TextOverlay index={1} top="40%" />
                    <Img src={images[3]} style={{ width: "100%", height: "40%", opacity: opacity(3)}} /><TextOverlay index={3} top="80%" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "50%", gap: 10}}>
                    <Img src={images[0]} style={{ width: "100%", height: "40%", opacity: opacity(0)}} /><TextOverlay index={0} top="20%" />
                    <Img src={images[2]} style={{ width: "100%", height: "40%", opacity: opacity(2)}} /><TextOverlay index={2} top="60%" />
                    <Img src={images[4]}  style={{ width: "100%", height: "40%", opacity: opacity(4)}} /><TextOverlay index={4} top="90%" />
                </div>
            </div>

        </AbsoluteFill>
    );
}
