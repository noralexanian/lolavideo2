import { VideoTemplate } from '../types';
import { Video8 } from '../Video8/Video8';
import { Video8Schema } from '../Video8Schema';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';

export const Video8Template: VideoTemplate = {
  id: 'Video8',
  component: Video8,
  schema: Video8Schema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 210, // 7 seconds at 30fps - under 8 seconds
  defaultProps: {
    images: [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
    ],
    username: 'LolaStore',
    productName: 'Magnetic Gallery',
    price: '149',
    type: 0, // 0 for product, 1 for shop
  },
}; 