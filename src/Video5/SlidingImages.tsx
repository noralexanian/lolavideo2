import React, { useMemo } from "react";
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from "remotion";
import {AnimationConfig} from "./types";
import {ImageItem} from "./ImageItem";

export const SlidingImages: React.FC<{images: string[], config: AnimationConfig, productName: string }> =
    ({images, config, productName}) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const getWaitDurationForSequence = (sequence: number) => {
        if (sequence === 0) return config.initialDelay;
        return (sequence % config.groupSize === 0)
            ? config.waitGroupDuration
            : config.waitDuration;
    };

    const getCurrentSequenceInfo = (frame: number) => {
        let sequence = 0;
        let totalFrames = 0;

        while (totalFrames <= frame) {
            const waitDuration = getWaitDurationForSequence(sequence);
            const sequenceDuration = waitDuration + config.moveDuration;

            if (totalFrames + sequenceDuration > frame) {
                break;
            }

            totalFrames += sequenceDuration;
            sequence++;
        }

        const frameInSequence = frame - totalFrames;
        const currentWaitDuration = getWaitDurationForSequence(sequence);

        return {
            sequence,
            frameInSequence,
            waitDuration: currentWaitDuration
        };
    };

    const { sequence, frameInSequence, waitDuration } = getCurrentSequenceInfo(frame);

    // Calculate image items for the current state
    const imageItems = useMemo(() => {
        const remainingImages = images.slice(sequence);
        return remainingImages.map((src, index) =>
            new ImageItem(src, index, width, { width, height }, config)
        ).reverse();
    }, [images, sequence, width, height, config]);

    // Update image positions based on animation progress
    if (frameInSequence > waitDuration &&
        frameInSequence <= waitDuration + config.moveDuration) {
        const progress = (frameInSequence - waitDuration) / config.moveDuration;
        imageItems.forEach(item => item.updatePosition(progress, config));
    }

    return (
        <AbsoluteFill style={{ flexDirection: 'row' }}>
            <div style={{ 
                position: "absolute", 
                top: config.margins.top - 45, 
                fontSize: 30, 
                marginLeft: 50, 
                color: "#000000",
                fontWeight: 800, 
                fontFamily: "Arial, sans-serif", 
                textShadow: "rgba(0, 0, 0, 0.2) 0px 3px 10px",
            }}>
                {productName}
            </div>
            {imageItems.map(item => (
                <Img
                    key={item.getSrc()}
                    src={item.getSrc()}
                    style={item.getStyle()}
                    onError={(e) => {
                        console.error('Image failed to load:', item.getSrc());
                        e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg=='; // Transparent 1x1 pixel
                    }}
                />
            ))}
        </AbsoluteFill>
    );
};