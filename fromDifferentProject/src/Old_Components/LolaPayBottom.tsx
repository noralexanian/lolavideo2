import {Img} from 'remotion';
import logo from "../images/logo.svg";

export const LolaPayBottom: React.FC<{
    username: string;
}> = ({username}) => {
    return (
	<div
		style={{
                bottom: 0,
                left: 0,
                position: 'absolute',
                width: '100%',
                padding: '15px',
                backgroundColor: 'white',
                display: "flex",
                justifyContent: "space-between"
		}}
	>
		<Img
			style={{
                    width: '140px',
                    verticalAlign: 'middle',
                    display: 'inline-block',
			}}
			src={logo} />
		<span
			style={{
                    fontSize: '150%',
                    fontWeight: 300,
                    fontFamily: 'Arial',
                    textAlign: 'right',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginTop: "auto",
                    marginBottom: "auto"
			}}
		>lolapay.com/{username}
		</span>
	</div>
    );
};
