import flower from '../images/flower.png';
import heart from '../images/heart.png';
import arrow from '../images/arrow.png';
import {useCurrentFrame, useVideoConfig} from "remotion";
import vid from "../images/AmazedGirl2.gif";
import {Gif} from "@remotion/gif";

export const Background2: React.FC<{
	photos: string[];
	username: string;
}> = ({photos, username}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const framesPerPhoto = Math.floor(videoConfig.durationInFrames / photos.length);
	const i = Math.floor(frame / framesPerPhoto);
	const photo = photos[i >= photos.length ? photos.length - 1 : i];

    return (
	<div
		style={{
                width: '100%',
                height: '100%',
                backgroundColor: "#b1abef",
		}}
	>
		<img
			style={{
				width: '200px',
				top: '8%',
				left: '9%',
				position: 'absolute',
			}} src={photo} />
		<img
			style={{
			width: '90px',
			top: '38%',
			left: '3%',
			position: 'absolute',
			}} src={flower}/>
		<img
			style={{
			width: '120px',
			top: '18%',
			left: '44%',
			position: 'absolute',
			transform: 'rotate(347deg)'
			}} src={arrow}/>
		<img
			style={{
			width: '80px',
			top: '18%',
			right: '12%',
			position: 'absolute',
			transform: 'rotate(336deg)'
			}} src={heart}/>
		<Gif
			src={vid} style={{
			width: '120%',
			bottom: "7%",
			left: '10%',
			position: 'absolute'
			}} />
	</div>
    );
};