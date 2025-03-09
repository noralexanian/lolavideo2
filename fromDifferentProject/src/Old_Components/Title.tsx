import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import './styles.scss';


export const Title: React.FC<{
	productName: string;
	fontFamily: string;
}> = ({productName, fontFamily}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	let h1Classes = '';
	const styles = {
		WebkitTextStroke: 'unset',
		color: 'white',
		fontSize: '3rem',
		textShadow: "",
		letterSpacing: "",
		textTransform: "",
	};

	switch (fontFamily) {
		case "Joliet Regular":
			styles.fontSize = "4rem";
			styles.letterSpacing = "6px";
			break;
		case "Thicker Inline":
			/*
			styles.WebkitTextStroke = "1px white";
			styles.color = "rgb(136, 133, 222)";

			*/
			break;
		case "Hussar Ekologiczne":
		case "Playlist Script":
			styles.textTransform = "uppercase";
			//styles.textShadow = "2px 2px #a9a1e6b0, -2px -2px #a9a1e6b0";
			break;
		default:
			h1Classes = "sticker bold";
			break
	}

	return (
		<h1
			className={h1Classes}
			data-text={productName}
			style={{
				fontFamily,
				WebkitTextStroke: styles.WebkitTextStroke,
				textShadow: styles.textShadow,
				textTransform: styles.textTransform,
				letterSpacing: styles.letterSpacing,
				textAlign: 'center',
				position: 'absolute',
				fontSize: styles.fontSize,
				color: styles.color,
				top: '5%',
				width: '98%',
				transform: `scale(${spring({
					fps: videoConfig.fps,
					frame,
					config: {
						damping: 100,
						stiffness: 200,
						mass: 0.5,
					},
				})})`,
			}}
		>
			<span>{productName}</span>
		</h1>
	);
};
