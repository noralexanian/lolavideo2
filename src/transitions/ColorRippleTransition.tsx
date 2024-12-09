import type { TransitionPresentationComponentProps } from '@remotion/transitions';
import type { TransitionPresentation } from '@remotion/transitions';
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate } from 'remotion';

interface Gradient {
  color1: string;
  color2: string;
}

interface GradientDirection {
  x1: string;
  x2: string;
  y1: string;
  y2: string;
}

type CustomPresentationProps = {
  width: number;
  height: number;
  direction: string;
  colors: Array<Gradient>;
  clipId: string;
};

export const RippleTransition: React.FC<
  TransitionPresentationComponentProps<CustomPresentationProps>
> = ({ children, presentationDirection, presentationProgress, passedProps }) => {
  const time = passedProps.direction === 'left' || passedProps.direction === 'right' ? 1.8 : 1;

  const sizes = [
    interpolate(presentationProgress, [0, 1], [0, passedProps.width * time], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(presentationProgress, [0.15, 1], [0, passedProps.width * time], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(presentationProgress, [0.3, 1], [0, passedProps.width * time], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  ];

  const colors = passedProps.colors; // Array of colors

  const style: React.CSSProperties = useMemo(() => {
    return {
      width: '100%',
      height: '100%',
      clipPath: presentationDirection === 'exiting' ? undefined : `url(#${passedProps.clipId})`,
    };
  }, [passedProps.clipId, presentationDirection]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={style}>{children}</AbsoluteFill>
      {presentationDirection === 'exiting' ? null : (
        <AbsoluteFill style={{ background: 'transparent' }}>
          <svg
            style={{ overflow: 'visible' }}
            viewBox={`0 0 ${passedProps.width} ${passedProps.height}`}
          >
            <defs>
              {colors.map((gradient, index) => (
                <linearGradient
                key={index}
                  id={`gradient-${passedProps.clipId}-${index}`}
                  // x1="50%"
                  // y1="30%"
                  // x2="100%"
                  // y2="70%"
                  {...getGradientDirections(passedProps.direction)}
                >
                  <stop offset="0%" style={{ stopColor: gradient.color1, stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: gradient.color2, stopOpacity: 1 }} />
                </linearGradient>
              ))}
              <clipPath id={`${passedProps.clipId}`}>
                <circle
                  cx={getCenterX(passedProps.direction, passedProps.width)}
                  cy={getCenterY(passedProps.direction, passedProps.height)}
                  r={sizes[0]}
                />
              </clipPath>
            </defs>
            {sizes.map((size, index) => (
              <circle
                cx={getCenterX(passedProps.direction, passedProps.width)}
                cy={getCenterY(passedProps.direction, passedProps.height)}
                r={size}
                stroke={`url(#gradient-${passedProps.clipId}-${index})`}
                strokeWidth={600}
                fill="none"
                key={index}
              />
            ))}
          </svg>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

function getCenterX(direction: string, width: number): number {
  switch (direction) {
    case 'left':
      return 0;
    case 'center':
    case 'top':
    case 'bottom':
      return width / 2;
    default:
      return width; // for other directions, default to the full width
  }
}

function getCenterY(direction: string, height: number): number {
  switch (direction) {
    case 'top':
      return 0;
    case 'center':
    case 'left':
    case 'right':
      return height / 2;
    default:
      return height; // for other directions, default to the full height
  }
}

function getGradientDirections(direction: string): GradientDirection {
  switch (direction) {
    case 'left':
    case 'right':
      return { x1: '50%', y1: '30%', x2: '100%', y2: '70%' };
    case 'top':
    case 'bottom':
      return { x1: '0%', y1: '0%', x2: '100%', y2: '0%' };
    default:
      return { x1: '0%', y1: '0%', x2: '100%', y2: '0%' };
  }
}

export const CustomRippleTransition = (
  props: CustomPresentationProps
): TransitionPresentation<CustomPresentationProps> => {
  return { component: RippleTransition, props };
};
