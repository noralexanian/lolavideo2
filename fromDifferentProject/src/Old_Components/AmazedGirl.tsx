import { Gif } from "@remotion/gif";
import vid from "./AmazedGirl.gif";

export const AmazedGirl: React.FC<{
    show: boolean;
}> = ({show}) => {
    const display = show ? 'block' : 'none';
    return (
	<Gif
		src={vid} style={{
            width: '70%',
            height: '60%',
            bottom: 0,
            left: '-10%',
            position: 'absolute',
            display
		}} />
    );
};