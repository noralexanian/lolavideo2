import {useCurrentFrame, useVideoConfig, interpolate, } from 'remotion'
import {CSSProperties} from "react";

type RotateOption = {
    delay: number,
    durationInFrames: number,
    rotateFrom: number,
    rotateTo: number,
    frame: number,
    speed: number,
}

export const rotate = (option?: Partial<RotateOption>): CSSProperties => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const { delay = 0, durationInFrames = fps, rotateFrom = -45, rotateTo = 0 } = option || {};

    if (frame < delay)
        return {};

    const progress = interpolate(
        frame - delay,
        [0, durationInFrames],
        [0, 1],
        { extrapolateRight: "clamp" }
    );

    const rotateValue = interpolate(progress, [0, 1], [rotateFrom, rotateTo]);
    return { transform: `rotate(${rotateValue}deg)`}
}
