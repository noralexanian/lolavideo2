import { VideoTemplate } from '../types';
import { Video5 } from '../Video5/Video5';
import { Video5Schema } from '../Video5Schema';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';

export const Video5Template: VideoTemplate = {
  id: 'Video5',
  component: Video5,
  schema: Video5Schema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 400, // Duration will be calculated dynamically in the component
  defaultProps: {
    images: [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png',
    ],
    username: 'LolaStore',
    productName: 'Product Example',
    price: '299',
    type: 0, // 0 for product, 1 for shop
  },
};