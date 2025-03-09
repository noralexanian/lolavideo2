// import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
// import {Price} from './Components/Price';
// import {Title} from './Components/Title';
// import {PriceTag} from "./Components/PriceTag";
// import {AmazedGirl} from "./Components/AmazedGirl";
// import {ProductPicture} from "./Components/ProductPicture";
// import {LolaPayLogo} from "./Components/LolaPayLogo";
// import {PriceTagPurple} from "./Components/PriceTagPurple";
// import {LolaPayBottom} from "./Components/LolaPayBottom";

// export const Catalogue: React.FC<{
// 	fontFamily: string;
//     username: string;
//     showAmazedGirl: boolean;
//     showPrice: boolean;
//     showPriceTag: boolean;
//     showPriceTagPurple: boolean;
//     products: { name: string, price: string, photos: string[] }[];
// }> = ({fontFamily, username, showAmazedGirl, showPrice, showPriceTag, showPriceTagPurple, products}) => {
//     const frame = useCurrentFrame();
//     const videoConfig = useVideoConfig();
//     const transitionStart = 0;

//     const opacity = interpolate(
//         frame,
//         [videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
//         [1, 0],
//         {
//             extrapolateLeft: 'clamp',
//             extrapolateRight: 'clamp',
//         }
//     );
//     const outroStart = 26;

//     const framesPerPhoto = Math.floor((videoConfig.durationInFrames - outroStart) / products.length);
//     const i = Math.floor(frame / framesPerPhoto);
//     const product = products[i >= products.length ? products.length - 1 : i];

//     // only grab the first image of each product if there is more than one
//     if (products.length > 1) {
// 		product.photos = [product.photos[0]];
// 	}

//     return (
// 	<div style={{flex: 1, backgroundColor: '#b1abef'}}>
// 		<div style={{opacity}}>
// 			<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 				<ProductPicture photos={product.photos} />
// 			</Sequence>
// 			<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 				<Title productName={product.name} fontFamily={fontFamily} />
// 			</Sequence>
// 			<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 				<AmazedGirl show={showAmazedGirl} />
// 			</Sequence>
// 			<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
// 				<LolaPayBottom username={username} />
// 			</Sequence>
// 		</div>
// 		<div>
// 			<Sequence from={videoConfig.durationInFrames - outroStart}>
// 				<LolaPayLogo username={username} />
// 			</Sequence>
// 		</div>
// 	</div>
//     );
// };
