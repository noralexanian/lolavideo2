import { staticFile } from 'remotion';
import Main, { MainSchema } from '../Composition/Composition';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';
import { VideoTemplate } from '../types';

export const Video1Template: VideoTemplate = {
  id: 'Video1',
  component: Main,
  schema: MainSchema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 400, // Different duration
  defaultProps: {
    theme: 'Blue', // Different theme
    background: {
      type: 'static',
      background: '#f0f8ff', // Light blue background
    },
    fonts: {
      primary: 'ArchivoBlack',
      secondary: 'Antonio',
    },
    scene1Duration: 100,
    scene1Props: {
      logo: staticFile('Logo.png'),
      title: 'TEMPLATE ONE',
      images: [
        'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      ],
    },
    scene2Duration: 150,
    scene2Props: {
      logo: staticFile('Logo.png'),
      images: [
        'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
        'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      ],
      title: 'TEMPLATE ONE',
    },
    scene3Duration: 50,
    scene3Props: {
      logo: staticFile('Logo.png'),
      img: 'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      title: 'TEMPLATE ONE',
      text: 'Available at',
    },
    scene4Duration: 100,
    scene4Props: {
      storeName: 'Template One Store',
      productName: 'Product One',
      price: 99,
      title: 'TEMPLATE ONE',
      logo: staticFile('Logo2.png'),
      isProduct: true,
    },
  },
};