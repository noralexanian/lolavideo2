import { AbsoluteFill, useVideoConfig } from 'remotion';
import { TransitionSeries } from '@remotion/transitions';
import { z } from 'zod';
import { useCurrentFrame } from 'remotion';
import { getInputProps } from 'remotion';

import Scene1, { scene1Schema } from './Scene1';
import Scene2, { scene2Schema } from './Scene2';
import Scene3, { scene3Schema } from './Scene3';
import Scene4, { scene4Schema } from './Scene4';

import { LoadFonts } from '../lib/LoadFonts';
import { getCSSVariables } from '../lib/helpers';
import { Fonts } from '../types';
import { BackgroundProps } from '../backgrounds';

console.log("Main Component Loaded");

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

const Main: React.FC<MainProps> = (props) => {
  const config = useVideoConfig();
  const frame = useCurrentFrame();
  const inputProps = getInputProps();
  console.log("Props from useInputProps:", JSON.stringify(inputProps));
  console.log("Props in Main Component:", JSON.stringify(props));
  console.log("Current Video Config:", JSON.stringify(config));
  console.log("Current Frame:", frame);

  // console.log("Props in Main Component:", JSON.stringify(props));

  const mergedProps = { ...props, ...inputProps }; // Ensure inputProps take precedence
  console.log("Merged Props in Main Component:", mergedProps);

  const fonts = mergedProps.fonts;
  const background = mergedProps.background;
  const scene1Duration = mergedProps.scene1Duration;
  const scene1Props = mergedProps.scene1Props;
  const scene2Duration = mergedProps.scene2Duration;
  const scene2Props = mergedProps.scene2Props;
  const scene3Duration = mergedProps.scene3Duration;
  const scene3Props = mergedProps.scene3Props;
  const scene4Duration = mergedProps.scene4Duration;
  const scene4Props = mergedProps.scene4Props;
  const id = useVideoConfig().id;
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