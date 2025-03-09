import {interpolate, useCurrentFrame} from 'remotion';
import priceTag from './PriceTag.png';

export const PriceTag: React.FC<{
    price: string;
    show: boolean;
}> = ({price, show}) => {
    const frame = useCurrentFrame();
    let textPosition = {
        left: '16%',
        bottom: '36%',
        fontSize: '3rem'
    };

    if (price.length > 3) {
        textPosition = {
            left: '14%',
            bottom: '37%',
            fontSize: '2.5rem'
        };
    }
    price = "$" + price;
    const display = show ? 'block' : 'none';
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    return (
	<div
		style={{
        position: 'absolute',
        bottom: '10%',
        fontSize: '2rem',
        right: '-20%',
        display,
        opacity,
		}}
	>
		<img
			src={priceTag}
            />
		<span style={{
            color: 'white',
            fontSize: textPosition.fontSize,
            fontWeight: 300,
            position: 'absolute',
            fontFamily: 'Dela Gothic One',
            left: textPosition.left,
            bottom: textPosition.bottom,
            transform: 'rotate(346deg)'
		}}
		>{price}
		</span>
	</div>
    );
};
