import React from 'react';
import {AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate} from 'remotion';
import logoSrc from '../assets/logo2.png'; // Ensure the path to your logo is correct

interface FinalSceneProps {
  username: string;
  productName: string;
  price: string;
  storeURL: string;
  type: number;
}

import * as Anton from "@remotion/google-fonts/Anton";
import * as OpenSans from "@remotion/google-fonts/OpenSans"
import { Background2 } from '../Old_Components/Background2';
Anton.loadFont();
OpenSans.loadFont();

const FinalScene: React.FC<FinalSceneProps> = ({ username, productName, price, storeURL, type }) => {
  const {width, height, fps} = useVideoConfig();

  const fadeInDuration = 0.25; // Fade-in duration in seconds
  const fadeInFrames = fadeInDuration * fps; // Convert seconds to frames

  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: 'clamp', // Ensure opacity does not go below 0 before the animation starts
    extrapolateRight: 'clamp', // Ensure opacity does not exceed 1 after the animation ends
  });

  // const textStyle = {
  //   // margin: '-0.25em',
  //   // lineHeight: '100px',
  //   fontSize: '95px',
  //   fontFamily: 'Anton',
  //   color: 'white', 
  //   textAlign: 'center'
  // }

  // const textStyleURL = {
  //   // margin: '0em',
  //   fontSize: '35px',
  //   fontFamily: 'OpenSans',
  //   color: 'white', 
  //   textAlign: 'center'
  // }

  const textStyle = {
    margin: '0 0 40px 0',           // Remove default margin
    lineHeight: '1.2em',   // Adjust line height to control space between lines
    // fontSize: '85px',
    fontSize: '60px',
    fontFamily: 'Anton',
    color: 'white',
    textAlign: 'center'
  }
  
  const textStyleURL = {
    margin: '0',           // Remove default margin
    lineHeight: '1.2em',   // Adjust line height to control space between lines
    fontSize: '35px',
    fontFamily: 'OpenSans',
    color: 'white',
    textAlign: 'center'
  }  
  
  const container = {
    // top: 0,
    margin: type === 0 ? '75px 0 0 0' : '350px 0 0 0',
    // background: "#00000022",
    // display: 'flex',
    // flexDirection: 'column',

    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }

  return (
    <AbsoluteFill style={{
      backgroundColor: '#9497ff', 
      // display: 'flex',
      // flexDirection: 'column', 
      // justifyContent: 'center',
      alignItems: 'center',
      opacity: opacity,
      maxWidth: '101%',
      minWidth: '101%',
      zIndex: 40,
      paddingRight: '50px',
      paddingLeft: '50px',
    }}>

      {/* Text */}
      {type === 0 && (
        <div style={container}>
          <p style={textStyle}>{username}</p>

          <p style={textStyle}>{productName}</p>
          <p style={textStyle}>{price}</p>

          <div style={{
            marginTop: '100px'
          }}>
            <p style={textStyleURL}>DISPONIBLE EN</p>
            <p style={textStyleURL}>{storeURL}</p>
          </div>
        </div>
      )}

      {type === 1 && (
        <div style={container}>
          <p style={textStyle}>{username}</p>

          <div style={{
            marginTop: '100px'
          }}>
            <p style={textStyleURL}>DISPONIBLE EN</p>
            <p style={textStyleURL}>{storeURL}</p>
          </div>
        </div>
      )}

      <img src={logoSrc} alt="Logo" style={{
        position: 'absolute',
        bottom: 0,
        width: 250,
        // marginTop: 100,
        marginBottom: 70
      }} />
    </AbsoluteFill>
  );
};

export default FinalScene;
