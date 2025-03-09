import { ReactNode } from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile } from 'remotion';

import { HEIGHT, WIDTH } from '../lib/consts';
import Main from './Composition';

export const Compare: React.FC = (props: any) => {
  return (
    // insert Name of your video from public/examples/ folder
    <CompareWithVideo example={staticFile(`/examples/sample.mov`)}>
      <Main {...props} />
    </CompareWithVideo>
  );
};

export const COMPARE = process.env.COMPARE as 'x' | 'y' | undefined;

export const CompareWithVideo = ({
  example,
  children,
}: {
  example: string;
  children: ReactNode;
}) => {
  return (
    <AbsoluteFill style={{ overflow: 'visible', width: '100%', height: '100%' }}>
      <AbsoluteFill
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          position: 'absolute',
          overflow: 'hidden',
        }}
      >
        {children}
      </AbsoluteFill>
      {COMPARE && (
        <AbsoluteFill style={{ zIndex: 50 }}>
          <OffthreadVideo
            src={example}
            onError={console.log}
            style={{
              marginTop: 'auto',
              marginLeft: 'auto',
              background: 'white',
              height: HEIGHT,
              width: WIDTH,
            }}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
