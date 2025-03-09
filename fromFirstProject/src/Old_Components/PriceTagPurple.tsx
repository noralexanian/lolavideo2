import {interpolate, useCurrentFrame} from 'remotion';

export const PriceTagPurple: React.FC<{
    price: string;
    show: boolean;
}> = ({price, show}) => {
    const frame = useCurrentFrame();
    price = "$" + price;
    const display = show ? 'flex' : 'none';
    const opacity = interpolate(frame, [0, 10], [0, 1]);

    return (
	<div
		style={{
        position: 'absolute',
        bottom: '25%',
        fontSize: '2rem',
        left: '10%',
        padding: '5px',
        borderRadius: '4px',
        display,
        opacity,
		}}
	>
		<svg
			viewBox="0 0 100 300" width="30px" style={{
            borderRadius: "10px 0px 0px 10px"
			}}
		>
			<defs>
				<mask id="mask" x="0" y="0" width="80" height="30">
					<rect x="5" y="0" width="90" height="300" fill="#fff"/>
					<circle cx="50" cy="150" r="15"/>
				</mask>
			</defs>
			<rect x="0" y="0" width="100" height="300" mask="url(#mask)" fill="rgb(169, 161, 230)"/>
		</svg>

		<span style={{
            color: 'white',
            fontSize: "3rem",
            fontWeight: 300,
            fontFamily: 'Dela Gothic One',
            textShadow: '1px 6px #7870d6',
            backgroundColor: '#a9a1e6',
            fontStyle: 'italic',
            marginLeft: '-2px',
            padding: '10px',
            paddingRight: '20px',
            paddingTop: '5px',
            borderRadius: "0px 10px 10px 0px"
		}}
		>{price}
		</span>
	</div>
    );
};
