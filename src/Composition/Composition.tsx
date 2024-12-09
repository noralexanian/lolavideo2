import { AbsoluteFill, useVideoConfig } from 'remotion';
import { TransitionSeries } from '@remotion/transitions';
import { z } from 'zod';

import Scene1, { scene1Schema } from './Scene1';
import Scene2, { scene2Schema } from './Scene2';
import Scene3, { scene3Schema } from './Scene3';
import Scene4, { scene4Schema } from './Scene4';

import { LoadFonts } from '../lib/LoadFonts';
import { getCSSVariables } from '../lib/helpers';
import { Fonts } from '../types';
import { BackgroundProps } from '../backgrounds';

export const MainSchema = z.object({
  fonts: Fonts,
  background: BackgroundProps,
  theme: z.string(),
  scene1Duration: z.number(),
  scene1Props: scene1Schema,
  scene2Duration: z.number(),
  scene2Props: scene2Schema,
  scene3Duration: z.number(),
  scene3Props: scene3Schema,
  scene4Duration: z.number(),
  scene4Props: scene4Schema,
});

type MainProps = z.infer<typeof MainSchema>;

const Main: React.FC<MainProps> = ({
  background,
  theme,
  fonts,
  scene1Duration,
  scene1Props,
  scene2Duration,
  scene2Props,
  scene3Duration,
  scene3Props,
  scene4Duration,
  scene4Props,
}) => {
  const { id } = useVideoConfig();

  // You work will be mainly with the Scenes files

  // Work in this File:
  // adapt the transitions to an existing one or to your new one

  // If you want to use a different component than a <TransitionSeries>
  // then you'll have to talk to me why it's necessary.

  return (
    <LoadFonts fonts={fonts}>
      <AbsoluteFill
        id={id}
        style={{
          background: 'black',
          ...getCSSVariables({ fonts: fonts, roundness: 1 }),
        }}
      >
        {/* change the name of your music file in the public folder to match music.mp3  */}
        {/* <Audio src={staticFile('music.mp3')} volume={audioVolume} /> */}
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={scene1Duration}>
            <Scene1 {...scene1Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence durationInFrames={scene2Duration}>
            <Scene2 {...scene2Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence durationInFrames={scene3Duration}>
            <Scene3 {...scene3Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Sequence durationInFrames={scene4Duration}>
            <Scene4 {...scene4Props} background={background} />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </LoadFonts>
  );
};

export default Main;
