import React, {CSSProperties} from "react";
import {Img, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

export const RenderGrid: React.FC<{images: string[], productName: string}> = ({images, productName}) => {
    const { durationInFrames, fps} = useVideoConfig();
    const frame = useCurrentFrame();
    const intervalBtwNewImage = 5;

    // Circular pattern definition
    const pattern = [
        [0, 7, 6],    // first row
        [1, 8, 5],    // second row
        [2, 3, 4]     // third row
    ];

    const scale = interpolate(
        frame,
        [0, fps/4, durationInFrames - fps/2, durationInFrames - fps/4],
        [0, 1, 1, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    const containerStyle: CSSProperties = {
        display: "flex", 
        flexDirection: "column", 
        width: "100%", 
        height: "100%",
        padding: 10, 
        background: 'white', 
        gap: 10
    };
    const rowStyle = { 
        display: "flex", 
        width: "100%", 
        height: "33%", 
        justifyContent: "space-evenly", 
        gap: 10 
    };
    const colStyle = { 
        width: "33%", 
        height: "100%", 
        overflow: 'hidden', 
        borderRadius: 8 
    };
    const logoStyle = { 
        width: "33%", 
        height: "100%", 
        overflow: 'hidden', 
        borderRadius: 8,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        transform: `scale(${scale})`
    };

    // Ending animation
    const startFadeOut = durationInFrames - (images.length * intervalBtwNewImage);
    const getOpacity = (imageIndex: number) => {
        // If we're in the fade out phase
        if (frame >= startFadeOut) {
            // Calculate when this specific image should start to disappear
            const fadeOutStart = startFadeOut + (imageIndex * intervalBtwNewImage);

            // Return the interpolated opacity
            return interpolate(
                frame,
                [fadeOutStart, fadeOutStart + intervalBtwNewImage],
                [1, 0],
                {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                }
            );
        }
        return 1; // Default opacity when not in fadeout phase
    }
    
    return (
        <div style={containerStyle}>
            {[0, 1, 2].map((row) => (
                <div key={row} style={rowStyle}>
                    {[0, 1, 2].map((col) => {
                        const cellIndex = pattern[row][col];
                        // If it's the center cell (8), display the logo
                        if (cellIndex === 8) {
                            return (
                                <div key={col} style={{...logoStyle}}>
                                    <div style={{ 
                                        fontSize: 30, 
                                        textAlign: "center", 
                                        color: "#726ac6",
                                        fontWeight: 600, 
                                        textShadow: "rgba(0, 0, 0, 0.5) 0px 3px 10px",
                                    }}>
                                        {productName}
                                    </div>
                                </div>
                            );
                        }

                        const imageIndex = images.length - 1 - cellIndex;
                        const hasImage = imageIndex >= 0 && imageIndex < images.length;

                        return (
                            <div key={col} style={{...colStyle, background: hasImage ? 'none' : '#F0F0F000'}}>
                                {hasImage && (
                                    <Img 
                                        src={images[imageIndex]} 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            opacity: getOpacity(imageIndex) 
                                        }}
                                        onError={(e) => {
                                            // Prevent error propagation if image fails to load
                                            console.error('Image failed to load:', images[imageIndex]);
                                            e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg=='; // Transparent 1x1 pixel
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};