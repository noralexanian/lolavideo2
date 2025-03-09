import { getBoundingBox, translatePath } from "@remotion/paths";
import { makeRect } from "@remotion/shapes";
import type { TransitionPresentationComponentProps } from "@remotion/transitions";
import type { TransitionPresentation } from "@remotion/transitions";
import React, { useMemo, useState } from "react";
import { AbsoluteFill, random } from "remotion";

export type CustomPresentationProps = {
  width: number;
  height: number;
  rotation: number;
};
const rectWidenPresentation: React.FC<
  TransitionPresentationComponentProps<CustomPresentationProps>
> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
    const finishedRadius =
      Math.sqrt(passedProps.width ** 2 + passedProps.height ** 2) / 2;
    const hei = finishedRadius * presentationProgress;

    const { path } = makeRect({
      height: hei * 4,
      width: passedProps.width * 4,
    });

    // const { path: path2 } = makeRect({
    //   height: hei + 200 * 2,
    //   width: passedProps.width * 2,
    // });
    const boundingBox = getBoundingBox(path);
    const translatedPath = translatePath(
      path,
      passedProps.width / 2 - boundingBox.width / 2,
      passedProps.height / 2 - boundingBox.height / 2,
    );

    // const translatedPath2 = translatePath(
    //   path2,
    //   passedProps.width / 2 - boundingBox.width / 2,
    //   passedProps.height / 2 - boundingBox.height / 2,
    // );
    const [clipId] = useState(() => String(random(null)));
    const style: React.CSSProperties = useMemo(() => {
      return {
        width: "100%",
        height: "100%",
        clipPath:
          presentationDirection === "exiting" ? undefined : `url(#${clipId})`,
      };
    }, [clipId, presentationDirection]);
    return (
      <AbsoluteFill style={{ zIndex: 9 }}>
        <AbsoluteFill style={style}>{children}</AbsoluteFill>
        {presentationDirection === "exiting" ? null : (
          <AbsoluteFill>
            <svg  >
              <defs>
                <clipPath id={clipId}>
                  <path style={{
                    transformOrigin: 'center',
                    transform: `rotate(${passedProps.rotation}deg)`
                  }} d={translatedPath} fill="black" />
                </clipPath>
                {/* <path style={{
                  transformOrigin: 'center',
                  transform: `rotate(${passedProps.rotation}deg)`,
                }} d={translatedPath2} /> */}


              </defs>
             
            </svg>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    );
  };

export const customPresentation = (
  props: CustomPresentationProps,
): TransitionPresentation<CustomPresentationProps> => {
  return { component: rectWidenPresentation, props };
};
