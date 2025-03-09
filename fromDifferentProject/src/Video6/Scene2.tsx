import React, {CSSProperties} from "react";
import {AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

export const Scene2: React.FC<{images: string[], firstImageAnimDuration: number, storeName: string }> = ({images, firstImageAnimDuration, storeName}) => {
    const { fps, width, height } = useVideoConfig();
    const imgWidth = width;
    const imgHeight = height;
    const frame = useCurrentFrame();

    const totalWidth = imgWidth * (images.length - 1);
    const finalPosition = -(totalWidth - imgWidth - (width / 2 - imgWidth / 2));

    const translateX = interpolate(
        frame - firstImageAnimDuration,
        [0, fps * 4],
        [0, finalPosition],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp"
        }
    );

    const translateEffectX = (delay = 0) => interpolate(
        frame - delay,
        [0, fps/4],
        [0, width],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp"
        }
    );

    const input = fps/4;
    const scale = (a = 1, delay = 0) => interpolate(
            frame - delay,
            [0, input*0.5, input * 0.8, input],
            [a, 0.8*a, 1.5*a, 1],
            {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp"
            }
        );

    const blur = interpolate(
        frame,
        [0, input * 0.8, input],
        [4, 4, 1],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp"
        }
    );

    const img: CSSProperties = {
        width: imgWidth, height: imgHeight,
        position: "absolute",
        filter: `brightness(${scale(1, fps/16)}) blur(${blur}px)`,
        opacity: frame >= firstImageAnimDuration ? 0 : 1
    }

    const img0: CSSProperties = {
        ...img, clipPath: "polygon(0 0, 100% 0%, 100% 50%, 0 50%)",
        transform: `translateX(${-width}px) translateX(${translateEffectX()}px)`,
    }

    const img1: CSSProperties = {
        ...img, clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
        transform: `translateX(${width}px) translateX(${-translateEffectX(fps/32)}px)`,
    }

    const TextOverlay = ({index}: {index: number}) => (
        <div style={{
            position: 'absolute',
            top: "60%",
            width: imgWidth,
            textAlign: "center",
            fontFamily: "Antonio",
            fontSize: "xx-large",
            color: "#FFFFFF",
            transform: `translateX(${index * imgWidth}px) translateX(${translateX}px)`,
            opacity: 0.7,
        }}>
            {storeName}
        </div>
    );

    return (
        <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
            {images.map(img => (
                <Img key={img} src={img} style={{ width: imgWidth, height: imgHeight,
                    transform: `translateX(${translateX}px)`}}
                />
            ))}
            {images.map((img, index) => (
                <TextOverlay index={index} />
            ))}

            <Img key={"img00"} src={images[0]} style={{ ...img0, transform: img0.transform + ` scale(${scale()})` }}/>
            <Img key={"img01"} src={images[0]} style={{ opacity: 0.3, ...img0, transform: img0.transform + ` scale(${scale(1.05)})` }}/>
            <Img key={"img02"} src={images[0]} style={{ opacity: 0.3, ...img0,  transform: img0.transform + ` scale(${scale(1.1)})` }}/>

            <Img key={"img10"} src={images[0]} style={{ ...img1, transform: img1.transform + ` scale(${scale()})` }}/>
            <Img key={"img11"} src={images[0]} style={{ opacity: 0.3, ...img1,  transform: img1.transform + ` scale(${scale(1.05)})` }}/>
            <Img key={"img12"} src={images[0]} style={{ opacity: 0.3, ...img1,  transform: img1.transform + ` scale(${scale(1.1)})` }}/>
        </AbsoluteFill>
    );
}
