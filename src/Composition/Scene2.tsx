import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';

import { z } from 'zod';
import { BackgroundProps } from '../backgrounds';
import { Footer } from '../components/Footer';
import { defaultSpring, interpolateSpring } from '../lib/helpers';
import { WIDTH } from '../lib/consts';

export const scene2Schema = z.object({
  logo: z.string(),
  images: z.array(z.string()),
  title: z.string(),
});
type Scene2Props = z.infer<typeof scene2Schema> & { background: BackgroundProps };

const Scene2: React.FC<Scene2Props> = ({ images, logo, title, background }) => {
  const frame = useCurrentFrame();
  const springEffect = defaultSpring({ frame, delay: 0, durationInFrames: 12 });
  const transSpringEffect = defaultSpring({
    frame,
    delay: 32,
    durationInFrames: 150,
  });
  const transX = interpolateSpring(transSpringEffect, [0, 1080]);
  const scale = interpolateSpring(springEffect, [1.2, 1]);
  const opacity = interpolateSpring(springEffect, [0.1, 1]);
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6c55bd',
        width: WIDTH * images.length,
      }}
    >
      {images.map((image, index) => {
        return (
          <Img
            src={image}
            key={'scene2' + index}
            width={WIDTH}
            height="auto"
            style={{
              zIndex: 1,
              transform: `scale(${index == 0 ? scale : 1}) translateX(-${transX}px)`,
              opacity: opacity,
            }}
          />
        );
      })}
      <Footer logo={logo} store={title} theme="Purple" />
    </AbsoluteFill>
  );
};

export default Scene2;
