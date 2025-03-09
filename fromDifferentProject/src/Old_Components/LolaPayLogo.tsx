import {Img, spring, useCurrentFrame, useVideoConfig} from "remotion";
import logo from "../images/favicon.png";

export const LolaPayLogo: React.FC<{
    username: string;
}> = ({username}) => {
    const videoConfig = useVideoConfig();
    const frame = useCurrentFrame();

    return (
	<div style={{
	    backgroundColor: '#b1acf1',
        width: '100%'
	}}
	>
		<h1
			className=' bold'
			style={{
                fontFamily: "Hussar Ekologiczne",
                position: 'absolute',
                top: "27%",
                width: '100%',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '3.5rem',
                color: 'white',
                textTransform: 'uppercase'
			}}
		>
			<p style={{
                marginBottom: '11px'
			}}
			>Disponible
			</p>
			<p style={{
                marginTop: '0'
			}}
			>en
			</p>
		</h1>
		<h1
			className='bold'
			style={{
                fontFamily: "SANS-SERIF",
                position: 'absolute',
                top: '52%',
                width: '100%',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '1.7rem',
                textTransform: "lowercase",
                color: "white"
			}}
		>
			lolapay.com/{username}
		</h1>
		<div
			style={{
                position: 'absolute',
                bottom: '15%',
                width: '100%',
                textAlign: 'center',
                fontSize: '30px',
                textShadow: "-4px -4px 0 #fff, 4px -4px 0 #fff, -4px 4px 0 #fff, 4px 4px 0 #fff",
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
		>🔥
		</div>
	</div>
    );
};