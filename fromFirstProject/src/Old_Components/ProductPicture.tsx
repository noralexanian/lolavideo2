import {Img, useCurrentFrame, useVideoConfig} from "remotion";

export const ProductPicture: React.FC<{
    photos: string[];
}> = ({photos}) => {
    const videoConfig = useVideoConfig();
    const frame = useCurrentFrame();

    if (photos.length > 3) {
        photos = photos.slice(0, 3);
    }

    const framesPerPhoto = Math.floor(videoConfig.durationInFrames / photos.length);
    const i = Math.floor(frame / framesPerPhoto);
    const photo = photos[i >= photos.length ? photos.length - 1 : i];
    return (
	<Img
		style={{
        height: '73%',
        bottom: '70px',
        position: 'absolute',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
		}} src={photo} />
    );
};