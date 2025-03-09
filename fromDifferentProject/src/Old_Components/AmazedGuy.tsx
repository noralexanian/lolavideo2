import { Gif } from "@remotion/gif";
import vid from "./amazed-guy-unscreen.gif";

export const AmazedGuy: React.FC = () => {
    return (
	<Gif
		src={vid} style={{
            width: '70%',
            height: '60%',
            bottom: 0,
            left: '-20%',
            position: 'absolute'
		}} />
    );
};