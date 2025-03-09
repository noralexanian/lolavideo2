import { VideoTemplate } from '../types';
import { Video4 } from '../Video4';
import { Video4Schema } from '../Video4Schema';
import { FPS, HEIGHT, WIDTH } from '../lib/consts';

export const Video4Template: VideoTemplate = {
  id: 'Video4',
  component: Video4,
  schema: Video4Schema,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  durationInFrames: 300, // 10 seconds at 30fps
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
    ],
    username: 'LolaStore',
    productName: 'Product Example',
    price: '199',
    type: 0, // 0 for product, 1 for shop
  },
};