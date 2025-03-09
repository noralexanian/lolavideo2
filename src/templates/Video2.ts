import { staticFile } from 'remotion';
import Main, { MainSchema } from '../Composition/Composition';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';
import { VideoTemplate } from '../types';

export const Video2Template: VideoTemplate = {
  id: 'Video2',
  component: Main,
  schema: MainSchema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 500, // Different duration
  defaultProps: {
    theme: 'Green', // Different theme
    background: {
      type: 'static',
      background: '#f0fff0', // Light green background
    },
    fonts: {
      primary: 'ArchivoBlack',
      secondary: 'Antonio',
    },
    scene1Duration: 140,
    scene1Props: {
      logo: staticFile('Logo.png'),
      title: 'TEMPLATE TWO',
      images: [
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
      ],
    },
    scene2Duration: 180,
    scene2Props: {
      logo: staticFile('Logo.png'),
      images: [
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
      ],
      title: 'TEMPLATE TWO',
    },
    scene3Duration: 60,
    scene3Props: {
      logo: staticFile('Logo.png'),
      img: 'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
      title: 'TEMPLATE TWO',
      text: 'Shop Now',
    },
    scene4Duration: 120,
    scene4Props: {
      storeName: 'Template Two Shop',
      productName: 'Product Two',
      price: 149,
      title: 'TEMPLATE TWO',
      logo: staticFile('Logo2.png'),
      isProduct: true,
    },
  },
};