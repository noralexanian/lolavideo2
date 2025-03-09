// import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
// import {Price} from './Components/Price';
// import {PriceTag} from "./Components/PriceTag";
// import {PriceTagPurple} from "./Components/PriceTagPurple";
// import {AmazedGirl} from "./Components/AmazedGirl";
// import {LolaPayLogo} from "./Components/LolaPayLogo";
// import {LolaPayBottom} from "./Components/LolaPayBottom";
// import {Background2} from "./Components/Background2";

// export const Style2: React.FC<{
// 	username: string;
// 	showAmazedGirl: boolean;
// 	showPrice: boolean;
// 	showPriceTag: boolean;
// 	showPriceTagPurple: boolean;
// 	products: { name: string, price: string, photos: string[] }[];
// }> = ({username, showAmazedGirl, showPrice, showPriceTag, showPriceTagPurple, products}) => {
// 	const frame = useCurrentFrame();
// 	const videoConfig = useVideoConfig();
// 	const transitionStart = 0;

// 	const opacity = interpolate(
// 		frame,
// 		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
// 		[1, 0],
// 		{
// 			extrapolateLeft: 'clamp',
// 			extrapolateRight: 'clamp',
// 		}
// 	);

// 	const outroStart = 26;

// 	const framesPerPhoto = Math.floor((videoConfig.durationInFrames - outroStart) / products.length);
// 	const i = Math.floor(frame / framesPerPhoto);
// 	const product = products[i >= products.length ? products.length - 1 : i];

// 	return (
// 		<div style={{flex: 1, backgroundColor: 'white'}}>
// 			<div style={{opacity}}>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<Background2 photos={product.photos} username={username} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<AmazedGirl show={showAmazedGirl} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<Price price={product.price} show={showPrice} bottom="55%" right="18%" fontSize={55} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<PriceTag price={product.price} show={showPriceTag} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<PriceTagPurple price={product.price} show={showPriceTagPurple} />
// 				</Sequence>
// 				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 					<LolaPayBottom username={username} />
// 				</Sequence>
// 			</div>
// 			<div>
// 				<Sequence from={videoConfig.durationInFrames - 26}>
// 					<LolaPayLogo username={username} />
// 				</Sequence>
// 			</div>
// 		</div>
// 	);
// };
