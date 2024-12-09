import type { TransitionPresentationComponentProps } from "@remotion/transitions";
import type { TransitionPresentation } from "@remotion/transitions";
import React, { useMemo, useState } from "react";
import { AbsoluteFill, Easing, interpolate, random } from "remotion";

type CustomPresentationProps = {
  width: number;
  height: number;
};

const Right2LeftPresentation: React.FC<
  TransitionPresentationComponentProps<CustomPresentationProps>
> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  const fullSize = Math.sqrt(passedProps.width ** 2 + passedProps.height ** 2);

  const size = interpolate(presentationProgress, [0, 1], [0, fullSize * 2], {
    easing: Easing.in(Easing.cubic),
  });

  const [clipId] = useState(() => String(random(null)));
  const style: React.CSSProperties = useMemo(() => {
    return {
      width: "100%",
      height: "100%",
      clipPath:
        presentationDirection === "exiting" ? undefined : `url(#${clipId})`,
    };
  }, [clipId, presentationDirection]);

  const stroke1 = 0.4;
  const stroke2 = 0.3;
  const stroke3 = 0.15;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={style}>{children}</AbsoluteFill>
      {presentationDirection === "exiting" ? null : (
        <AbsoluteFill>
          <svg
            width="200%"
            height={passedProps.height * 2.5}
            style={{
              transform: "translateY(-100px) translateX(1350px)", // Adjusted for right to left animation

              overflow: "visible",
            }}
          >
            <defs>
              <clipPath id={clipId}>
                <rect
                  x={passedProps.width - size / 2}
                  y={passedProps.height / 2 - size / 2}
                  width={size}
                  height={size}
                  transform={`rotate(45, ${passedProps.width / 2}, ${passedProps.height / 2}) translate(-80, -480)`} // Adjusted for right to left animation
                />
              </clipPath>
              <linearGradient
                id="gradientStroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#fff", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#c7c7c7", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <>
              <rect
                x={
                  passedProps.width / 2 -
                  (size * (1 + stroke3 + stroke2 + stroke1)) / 2
                }
                y={
                  passedProps.height -
                  (size * (1 + stroke3 + stroke2 + stroke1)) / 2
                }
                width={size * (1 + stroke3 + stroke2 + stroke1)}
                height={size * (1 + stroke3 + stroke2 + stroke1)}
                transform={`rotate(45, ${passedProps.width / 2}, ${passedProps.height / 2})`}
                stroke="#7d7d7d"
                fill="none"
                strokeWidth={size * stroke1}
              />
              <rect
                x={passedProps.width / 2 - (size * (1 + stroke3 + stroke2)) / 2}
                y={passedProps.height - (size * (1 + stroke3 + stroke2)) / 2}
                width={size * (1 + stroke3 + stroke2)}
                height={size * (1 + stroke3 + stroke2)}
                transform={`rotate(45, ${passedProps.width / 2}, ${passedProps.height / 2})`}
                stroke="#ffffff"
                fill="none"
                strokeWidth={size * stroke2}
              />
              <rect
                x={passedProps.width / 2 - (size * (1 + stroke3)) / 2}
                y={passedProps.height - (size * (1 + stroke3)) / 2}
                width={size * (1 + stroke3)}
                height={size * (1 + stroke3)}
                transform={`rotate(45, ${passedProps.width / 2}, ${passedProps.height / 2})`}
                stroke="url(#gradientStroke)"
                fill="none"
                strokeWidth={size * stroke3}
              />
            </>
          </svg>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export default Right2LeftPresentation;

export const customR2LPresentation = (
  props: CustomPresentationProps
): TransitionPresentation<CustomPresentationProps> => {
  return { component: Right2LeftPresentation, props };
};
