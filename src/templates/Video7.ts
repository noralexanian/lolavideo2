import { VideoTemplate } from '../types';
import { Video7 } from '../Video7/Video7';
import { Video7Schema } from '../Video7Schema';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';

export const Video7Template: VideoTemplate = {
  id: 'Video7',
  component: Video7,
  schema: Video7Schema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 280, // Approximately 9.3 seconds at 30fps - under 10 seconds
  defaultProps: {
    images: [
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png',
      'https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png',
    ],
    username: 'LolaStore',
    productName: 'Product Example',
    price: '199',
    type: 0, // 0 for product, 1 for shop
  },
}; 