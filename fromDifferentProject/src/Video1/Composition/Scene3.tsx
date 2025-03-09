import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import { BackgroundProps } from '../backgrounds';
import { defaultSpring, interpolateSpring } from '../lib/helpers';
// import { TextCharsFromRightToLeft } from '../components/animations/TextCharsFromRightToLeft';
import { Footer } from '../components/Footer';
import { WIDTH } from '../lib/consts';

export const scene3Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
  text: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & { background: BackgroundProps };

const Scene3: React.FC<Scene3Props> = (props) => {
  const frame = useCurrentFrame();
  const springEffect = defaultSpring({
    frame,
    delay: 0,
    durationInFrames: 16,
  });
  const scale = interpolateSpring(springEffect, [1.3, 1]);
  const opacity = interpolateSpring(springEffect, [0, 1]);
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6c55bd',
      }}
    >
      <Img
        src={props.img}
        width={WIDTH}
        style={{
          transform: `scale(${scale})`,
          opacity,
        }}
      />
      {/* <span
        style={{
          position: 'absolute',
          color: 'white',
          fontSize: '60px',
          zIndex: 10,
          transform: 'translateX(40%)',
        }}
      >
        <TextCharsFromRightToLeft text={props.text} />
      </span> */}
      <Footer logo={props.logo} store={props.title} theme="Purple" />
    </AbsoluteFill>
  );
};

export default Scene3;
