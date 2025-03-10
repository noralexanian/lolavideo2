import { VideoTemplate } from '../types';
import { Video6 } from '../Video6/Video6';
import { Video6Schema } from '../Video6Schema';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';

export const Video6Template: VideoTemplate = {
  id: 'Video6',
  component: Video6,
  schema: Video6Schema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 250, // This is approximate, the component calculates actual duration dynamically
  defaultProps: {
    images: [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
    ],
    username: 'LolaStore',
    productName: 'Pop-up Gallery',
    price: '399',
    type: 0, // 0 for product, 1 for shop
  },
};