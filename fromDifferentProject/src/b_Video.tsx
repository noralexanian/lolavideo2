// import {Composition} from 'remotion';

// import React from 'react';
// import {Video2} from './Video2';
// import {Video3} from './Video3';

// export const RemotionRoot: React.FC = () => {
// 	const width = 800;
// 	const height = 1224;
// 	const fps = 30;

// 	// Default props as fallbacks
	import {Video4} from "./Video4";

const defaultProps = {
		images: [
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973627532.jpg', // Example default image
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973628038.jpg', // Example default image
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973629235.jpg', // Example default image
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973630087.jpg',
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973630640.jpg',
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973631200.jpg',
			// 'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973627532.jpg',
			// 'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973631200.jpg',

			// "https://lolapay-products.s3.amazonaws.com/2/2/2/222816/medium_1721870368145.png",
			// "https://lolapay-products.s3.amazonaws.com/2/2/2/222816/medium_1721870367176.jpeg",
			// "https://lolapay-products.s3.amazonaws.com/2/2/2/222816/medium_1721870367647.jpeg",
			"https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547755586.png",
			// "https://lolapay-products.s3.amazonaws.com/2/1/7/217842/medium_1719508972441.png",
			// "https://lolapay-products.s3.amazonaws.com/2/1/7/217842/medium_1719508973304.png"
		],
		storeName: 'Default Store',
		storeURL: 'https://lolapay.com/store',
		// Additional props as needed
		productName: 'Default Product',
		price: '135',
		username: 'defaultuser',
		style: 1,
		fontFamily: 'Default Font',
		type: 1
	};
	
// 	return (
// 		<>
// 			<Composition
// 				id="Video2"
// 				component={Video2}
// 				// durationInFrames={calculateDuration(images.length, fps, revealDuration)} // Adjust calculation as needed
// 				durationInFrames={(defaultProps.images.length * fps) + (fps*5)} // Adjust calculation as needed
// 				fps={fps}
// 				width={width} // Adjust as needed
// 				height={height} // Adjust as needed
// 				defaultProps={defaultProps}
// 			/>
// 			<Composition
// 				id="Video3"
// 				component={Video3}
// 				// durationInFrames={calculateDuration(images.length, fps, revealDuration)} // Adjust calculation as needed
// 				durationInFrames={fps*8} // Adjust calculation as needed
// 				fps={fps}
// 				width={width} // Adjust as needed
// 				height={height} // Adjust as needed
// 				defaultProps={defaultProps}
// 			/>
//  	</>
// 	);
// };


import {Composition, staticFile} from 'remotion';
// import {Product} from './Product';
// import {Style2} from './Style2';
// import {Catalogue} from './Catalogue';

import Video1, { MainSchema } from './Video1/Composition/Composition';
import { FPS, HEIGHT, WIDTH } from './Video1/lib/consts';

import {Video2} from './Video2';
import {Video3} from './Video3';
import {Video5} from "./Video5/Video5";
import {Video6} from "./Video6/Video6";
import {Starter} from "./Starter/Starter";

export const RemotionVideo: React.FC = () => {
	// const width = 500;
	// const height = 888;
	// const width = 800;
	// const height = 1224;
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
				id="Video44"
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
		{/* <Composition
				id="Video3"
				component={Product}
				durationInFrames={75}
				fps={fps}
				width={width}
				height={height}
				defaultProps={{
					fontFamily: "Hussar Ekologiczne",
					productName: 'VESTIDO GALA AZUL NOCHE',
					price: '4.497',
					username: 'alexandra_rose',
					showAmazedGirl: false,
					showPrice: false,
					showPriceTag: false,
					showPriceTagPurple: true,
					photos: [
						'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208543758.png',
						'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208544066.png',
						'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208544316.png',
					]
				}}
			/> */}

			{/* <Composition
				id="Product"
				component={Product}
				durationInFrames={75}
				fps={fps}
				width={width}
				height={height}
				defaultProps={{
					fontFamily: "Hussar Ekologiczne",
					productName: 'VESTIDO GALA AZUL NOCHE',
					price: '4.497',
					username: 'alexandra_rose',
					showAmazedGirl: false,
					showPrice: false,
					showPriceTag: false,
					showPriceTagPurple: true,
					photos: [
						'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208543758.png',
						'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208544066.png',
						'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208544316.png',
					]
				}}
			/>
			<Composition
				id="Style2"
				component={Style2}
				durationInFrames={75}
				fps={fps}
				width={width}
				height={height}
				defaultProps={{
					username: 'alexandra_rose',
					showAmazedGirl: false,
					showPrice: true,
					showPriceTag: false,
					showPriceTagPurple: false,
					products: [
						{
							name: 'VESTIDO GALA AZUL NOCHE',
							price: '4.596',
							photos: [
								'https://user-images.githubusercontent.com/97684604/154685809-3c39f633-b08b-45f6-b65c-1cf805828ffc.jpeg',
								'https://user-images.githubusercontent.com/97684604/154685813-363b9e68-fd28-48b0-beaa-913de7a03a24.jpeg',
							]
						}
					]
				}}
			/>
			<Composition
				id="Catalogue"
				component={Catalogue}
				durationInFrames={150}
				fps={fps}
				width={width}
				height={height}
				defaultProps={{
					fontFamily: "Hussar Ekologiczne",
					username: 'hypethecloset',
					showAmazedGirl: false,
					showPrice: false,
					showPriceTag: false,
					showPriceTagPurple: true,
					products: [
						{
							name: 'VESTIDO GALA AZUL NOCHE',
							price: '4.596',
							photos: [
								'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208543758.png',
								'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208544066.png',
								'https://www.lolapay.com.localhost/products/4/1/41/transparent_1646208544316.png',
							]
						},
						{
							name: 'Chamarra Nike',
							price: '837',
							photos: [
								'https://lolapay-products.s3.amazonaws.com/1/9/8/198/transparent_1646928152017.png',
								'https://lolapay-products.s3.amazonaws.com/1/9/8/198/transparent_1646928152538.png',
								'https://lolapay-products.s3.amazonaws.com/1/9/8/198/transparent_1646928152927.png',
							]
						},
						{
							name: 'Falda short pink magnolia',
							price: '350',
							photos: [
								'https://lolapay-products.s3.amazonaws.com/3/2/7/327/transparent_1647370694569.png',
								'https://lolapay-products.s3.amazonaws.com/3/2/7/327/transparent_1647370695064.png',
								'https://lolapay-products.s3.amazonaws.com/3/2/7/327/transparent_1647370695624.png',
							]
						},
						{
							name: 'Blusa de seda bordada',
							price: '315',
							photos: [
								'https://lolapay-products.s3.amazonaws.com/1/2/1/121/transparent_1646169689528.png',
								'https://lolapay-products.s3.amazonaws.com/1/2/1/121/transparent_1646169690057.png',
								'https://lolapay-products.s3.amazonaws.com/1/2/1/121/transparent_1646169690519.png',
							]
						},
						{
							name: 'Este es un tesoro que traje de Nueva York hermoso!!',
							price: '399',
							photos: [
								'https://lolapay-products.s3.amazonaws.com/1/4/5/145/transparent_1646665078011.png',
								'https://lolapay-products.s3.amazonaws.com/1/4/5/145/transparent_1646665078552.png',
								'https://lolapay-products.s3.amazonaws.com/1/4/5/145/transparent_1646665078999.png',
							]
						}
					]
				}}
			/> */}
		</>
	);
};
