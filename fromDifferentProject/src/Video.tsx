
// 	// Default props as fallbacks
import {Composition, staticFile} from 'remotion';

import Video1, { MainSchema } from './Video1/Composition/Composition';
import { FPS, HEIGHT, WIDTH } from './Video1/lib/consts';

import {Video2} from './Video2';
import {Video3} from './Video3';
import {Video4} from "./Video4";
import {Video5} from "./Video5/Video5";
import {Video6} from "./Video6/Video6";
import {Starter} from "./Starter/Starter";

import defaultProps from './defaultProps.js';

// console.log('Registering composition <Video4> with defaultProps =', defaultProps);

export const RemotionVideo: React.FC = () => {
	const width = 540;
	const height = 960;
	const fps = 30;

	return (
		<>
		<Composition
        id="Video1"
        component={Video1}
        schema={MainSchema}
        fps={FPS}
        width={WIDTH}
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
            storeName: 'ClosetMetamorphosis',
            productName: 'Proñducto',
            price: 189,
            title: 'HYPETHECLOSET',
            logo: staticFile('Logo2.png'),
            isProduct: false,
          },
        }}
      />
		<Composition
				id="Starter"
				component={Starter}
				// durationInFrames={calculateDuration(images.length, fps, revealDuration)} // Adjust calculation as needed
				durationInFrames={fps * 13} // Adjust calculation as needed
				fps={fps}
				width={width} // Adjust as needed
				height={height} // Adjust as needed
				defaultProps={defaultProps}
			/>
		<Composition
				id="Video2"
				component={Video2}
				// durationInFrames={calculateDuration(images.length, fps, revealDuration)} // Adjust calculation as needed
				durationInFrames={(defaultProps.images.length * fps) + (fps*5)} // Adjust calculation as needed
				fps={fps}
				width={width} // Adjust as needed
				height={height} // Adjust as needed
				defaultProps={defaultProps}
			/>
		<Composition
				id="Video3"
				component={Video3}
				// durationInFrames={calculateDuration(images.length, fps, revealDuration)} // Adjust calculation as needed
				durationInFrames={fps*8} // Adjust calculation as needed
				fps={fps}
				width={width} // Adjust as needed
				height={height} // Adjust as needed
				defaultProps={defaultProps}
			/>

			<Composition
				id="Video4"
				component={Video4}
				// durationInFrames={calculateDuration(images.length, fps, revealDuration)} // Adjust calculation as needed
				durationInFrames={fps*11} // Adjust calculation as needed
				fps={fps}
				width={width} // Adjust as needed
				height={height} // Adjust as needed
				defaultProps={defaultProps}
			/>

			<Composition
				id="Video5"
				component={Video5}
				// durationInFrames={calculateDuration(images.length, fps, revealDuration)} // Adjust calculation as needed
				durationInFrames={fps*13 - 15} // Adjust calculation as needed
				fps={fps}
				width={width}
				height={height}
				defaultProps={defaultProps}
			/>

			<Composition
				id="Video6"
				component={Video6}
				// durationInFrames={calculateDuration(images.length, fps, revealDuration)} // Adjust calculation as needed
				durationInFrames={fps*14} // Adjust calculation as needed
				fps={fps}
				width={width}
				height={height}
				defaultProps={defaultProps}
			/>
		</>
	);
};
