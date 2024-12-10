import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import Image from '../components/Image';
import { Footer } from '../components/Footer';
import { loadFont as loadAnton } from '@remotion/google-fonts/Anton';

const anton = loadAnton(); // Anton font

export const scene1Schema = z.object({
  logo: z.string(),
  title: z.string(),
  images: z.array(z.string()),
});
type Scene1Props = z.infer<typeof scene1Schema> & { background: BackgroundProps };

const refactorImageProps = (images: any[]) => {
  const result: any[] = [];
  for (let i = 0; i < images.length; i++) {
    result.push({
      src: images[i],
      startAt: 24 + i * 14,
    });
  }
  return result;
};

const Scene1: React.FC<Scene1Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const [width, height] = [280, 195];
  const refactoredImages = refactorImageProps(props.images);
  return (
    <>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        {/* The background component is always the same setup like this. 
      Get's it's input from the root */}
        <Background {...props.background} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: width,
              minHeight: height,
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: anton.fontFamily,
              fontSize: '25px',
              zIndex: 1,
              textWrap: 'nowrap',
              color: 'black',
            }}
          >
            <TitleTextFromRight text={props.title} />
          </div>
          {refactoredImages.map(
            (image, index) =>
              index % 2 == 1 && (
                <Image key={'scene1' + index} img={image.src} width={280} startAt={image.startAt} />
              )
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {refactoredImages.map((image, index) => {
            return (
              !(index & 1) && (
                <Image key={'scene1' + index} img={image.src} width={250} startAt={image.startAt} />
              )
            );
          })}
        </div>
      </AbsoluteFill>
      <Footer store={props.title} logo={props.logo} theme="White" />
    </>
  );
};

export default Scene1;
