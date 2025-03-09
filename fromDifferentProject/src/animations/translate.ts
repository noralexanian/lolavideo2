import {useCurrentFrame, useVideoConfig, interpolate, EasingFunction, Easing} from 'remotion'
import {CSSProperties} from "react";

type TranslateOption = {
    delay: number,
    durationInFrames: number,
    tFrom: Coordinates,
    tTo: Coordinates,
    displayBeforeDelay: boolean,
    easing: EasingFunction
}

export type Coordinates = {
    x: number,
    y: number
}

export const translate = (option?: Partial<TranslateOption>): CSSProperties => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const { delay = 0, durationInFrames = fps,
        tFrom= {x: 20, y:100},
        tTo= {x: 0, y: 0},
        displayBeforeDelay = false,
        easing = Easing.inOut(Easing.ease)
    } = option || {};

    if (frame < delay)
        return {display: "none"};

    const progress = interpolate(
        frame - delay,
        [0, durationInFrames],
        [0, 1],
        { extrapolateRight: "clamp", easing }
    );

    const x = interpolate(progress, [0, 0.5, 1], [tFrom.x, (tFrom.x - tTo.x)/2, tTo.x]);
    const y = interpolate(progress, [0, 0.5, 1], [tFrom.y, -tFrom.y/2, tTo.y]);
    return { transform: `translate(${x}px, ${y}px)` }
}
