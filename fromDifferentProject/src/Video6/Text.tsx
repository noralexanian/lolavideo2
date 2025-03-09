import {CSSProperties, FC} from "react";
import {translate} from "../animations/translate";
import {interpolate} from "remotion";

interface TextProps {
    text: string,
    style?: CSSProperties,
    animationDelay?: number
}

export const Text: FC<TextProps> = ({text, style = {}}) => {
    const letters: string[] = Array.from(text);

    const divStyle1 = (index: number) => {
        return translate({
            tFrom: {x: 1, y: 20},
            delay: interpolate(index, [0, letters.length], [5, 20]),
            durationInFrames: 30
        });
    }

    return (
        <div style={{ fontFamily: "Antonio", display: "flex", justifyContent: "center", ...style}}>
            {
                letters.map((letter, index) => (
                    <span key={index} style={{ ...divStyle1(index) }}>
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                ))
            }
        </div>
    );
}
