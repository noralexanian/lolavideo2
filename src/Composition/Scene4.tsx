import { AbsoluteFill, Img, useCurrentFrame } from 'remotion';

import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { EaseText } from '../components/animations/EaseText';
import { defaultSpring, interpolateSpring } from '../lib/helpers';
import { loadFont as loadOpenSans } from '@remotion/google-fonts/OpenSans';
import { loadFont as loadArchivoBlack } from '@remotion/google-fonts/ArchivoBlack';
const openSans = loadOpenSans();
const archivoBlack = loadArchivoBlack();

export const scene4Schema = z.object({
  logo: z.string(),
  storeName: z.string(),
  productName: z.string(),
  price: z.number(),
  title: z.string(),
  isProduct: z.boolean(),
});

type Scene4Props = z.infer<typeof scene4Schema> & {
  background: BackgroundProps;
};

const Scene4: React.FC<Scene4Props> = (props) => {
  const frame = useCurrentFrame();
  const springEffect = defaultSpring({ frame, delay: 10, durationInFrames: 10 });
  const tSpringEffect = defaultSpring({ frame, delay: 0, durationInFrames: 10 });
  const tSpringEffect2 = defaultSpring({ frame, delay: 5, durationInFrames: 10 });

  const opacity = interpolateSpring(springEffect, [0, 1]);
  const transY1 = interpolateSpring(tSpringEffect, [-195, 0]);
  const transY2 = interpolateSpring(tSpringEffect2, [-155, 0]);
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <Background {...props.background} />
      <svg width={540} height={350} style={{ position: 'absolute', top: 0, right: 0 }}>
        <path
          d="M0 0H540V171C342.226 264.338 409.033 21.724 0 25.545Z"
          fill="#685fbe"
          style={{ transform: `translateY(${transY1}px)` }}
        />
        <path
          d="M259.53 0H540V117.986C411.377 210.424 373.872 83.843 237.914 1.799Z"
          fill="#604bb4"
          style={{ transform: `translateY(${transY2}px)` }}
        />
      </svg>
      <Img
        src={props.logo}
        width={100}
        style={{
          position: 'absolute',
          top: 30,
          right: 30,
          zIndex: 1,
          opacity,
        }}
      />
      <div
        style={{
          display: 'flex',
          height: '50%',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily: archivoBlack.fontFamily,
        }}
      >
        <EaseText text={props.storeName} startAt={11} size={50} />
        {!props.isProduct && <EaseText text={props.productName} startAt={15} size={40} />}
        {!props.isProduct && <EaseText text={'$' + props.price} startAt={20} size={50} />}
        <EaseText
          text={'Disponible en\nlolapay.com/' + props.title}
          startAt={29}
          size={25}
          fontFamily={openSans.fontFamily}
          boldText={props.title} // Pass the title to make it bold
        />

      </div>
    </AbsoluteFill>
  );
};

export default Scene4;
