import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Price} from './Old_Components/Price';
import {Title} from './Old_Components/Title';
import {PriceTag} from "./Old_Components/PriceTag";
import {PriceTagPurple} from "./Old_Components/PriceTagPurple";
import {AmazedGirl} from "./Old_Components/AmazedGirl";
import {ProductPicture} from "./Old_Components/ProductPicture";
import {LolaPayLogo} from "./Old_Components/LolaPayLogo";
import {LolaPayBottom} from "./Old_Components/LolaPayBottom";

export const Product: React.FC<{
	fontFamily: string;
	productName: string;
	price: string;
	username: string;
	showAmazedGirl: boolean;
	showPrice: boolean;
	showPriceTag: boolean;
	showPriceTagPurple: boolean;
	photos: string[];
}> = ({fontFamily, productName, price, username, showAmazedGirl, showPrice, showPriceTag, showPriceTagPurple, photos}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	const transitionStart = 0;

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div style={{flex: 1, backgroundColor: '#8885de'}}>
			<div style={{opacity}}>
				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
					<ProductPicture photos={photos} />
				</Sequence>
				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
					<Title productName={productName} fontFamily={fontFamily} />
				</Sequence>
				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
					<AmazedGirl show={showAmazedGirl} />
				</Sequence>
				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
					<Price price={price} show={showPrice} bottom="37%" fontSize={80} right="5%" />
				</Sequence>
				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
					<PriceTag price={price} show={showPriceTag} />
				</Sequence>
				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
					<PriceTagPurple price={price} show={showPriceTagPurple} />
				</Sequence>
				<Sequence from={transitionStart} durationInFrames={videoConfig.durationInFrames - 25}>
					<LolaPayBottom username={username} />
				</Sequence>
			</div>
			<div>
				<Sequence from={videoConfig.durationInFrames - 26}>
					<LolaPayLogo username={username} />
				</Sequence>
			</div>
		</div>
	);
};
