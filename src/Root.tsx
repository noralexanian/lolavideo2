import { Composition, staticFile } from 'remotion';
import { Compare } from './Composition/Compare';
import { FPS, HEIGHT, WIDTH } from './lib/consts';
import { templates } from './templates';
import { MainSchema } from './Composition/Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Dynamically render all template compositions */}
      {templates.map((template) => (
        <Composition
          key={template.id}
          id={template.id}
          component={template.component}
          schema={template.schema}
          fps={template.fps}
          width={template.width}
          height={template.height}
          durationInFrames={template.durationInFrames}
          defaultProps={template.defaultProps}
        />
      ))}

      {/* Keep the Compare composition */}
      <Composition
        id="Compare"
        component={Compare}
        schema={MainSchema}
        fps={FPS}
        width={WIDTH * 2}
        height={HEIGHT}
        durationInFrames={450}
        defaultProps={{
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
            storeName: 'Test Store',
            productName: 'Product',
            price: 189,
            title: 'HYPETHECLOSES',
            logo: staticFile('Logo2.png'),
            isProduct: true,
          },
        }}
      />
    </>
  );
};