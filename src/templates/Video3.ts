import { staticFile } from 'remotion';
import Main, { MainSchema } from '../Composition/Composition';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';
import { VideoTemplate } from '../types';

export const Video3Template: VideoTemplate = {
  id: 'Video3',
  component: Main,
  schema: MainSchema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 450,
  defaultProps: {
    theme: 'Purple',
    background: {
      type: 'static',
      background: 'white',
    },
    fonts: {
      primary: 'ArchivoBlack',
      secondary: 'Antonio',
    },
    scene1Duration: 123,
    scene1Props: {
      logo: staticFile('Logo.png'),
      title: 'HYPETHECLOSET',
      images: [
        'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
      ],
    },
    scene2Duration: 165,
    scene2Props: {
      logo: staticFile('Logo.png'),
      images: [
        'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
      ],
      title: 'HYPETHECLOSET',
    },
    scene3Duration: 42,
    scene3Props: {
      logo: staticFile('Logo.png'),
      img: 'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      title: 'HYPETHECLOSET',
      text: 'Disponible en',
    },
    scene4Duration: 120,
    scene4Props: {
      storeName: 'ClosetMetamorphosis',
      productName: 'Producto',
      price: 189,
      title: 'HYPETHECLOSET',
      logo: staticFile('Logo2.png'),
      isProduct: false,
    },
  },
};