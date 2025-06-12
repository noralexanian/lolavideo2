import { VideoTemplate } from '../types';
import { Video9 } from '../Video9/Video9';
import { Video9Schema } from '../Video9Schema';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';

export const Video9Template: VideoTemplate = {
  id: 'Video9',
  component: Video9,
  schema: Video9Schema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 225, // 7.5 seconds at 30fps - under 8 seconds
  defaultProps: {
    images: [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
    ],
    username: 'LolaStore',
    productName: 'Product Example',
    price: '129',
    type: 0, // 0 for product, 1 for shop
  },
}; 