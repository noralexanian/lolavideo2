import {interpolate, useCurrentFrame} from 'remotion';
import './styles.scss';

export const Price: React.FC<{
	price: string;
	show: boolean;
	bottom: string;
	right: string;
	fontSize: number;
}> = ({price, show, bottom='37%', right='5%', fontSize= 80}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 15], [0, 1]);
	price = "$" + price;
	const display = show ? 'inline-grid' : 'none';
	return (
		<div
			className='sticker purple'
			data-text={price}
			style={{
				fontSize,
				bottom,
				right,
				position: 'absolute',
				fontWeight: 600,
				display,
				opacity,
			}}
		>
			<span style={{
				backgroundColor: 'white'
			}}
			>{price}
			</span>
		</div>
	);
};
