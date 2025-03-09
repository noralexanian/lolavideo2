import React from 'react';
import { useCurrentFrame, spring, interpolate } from 'remotion';
import logo from "../assets/logo.png";

import { loadFont } from "@remotion/google-fonts/Antonio";
const { fontFamily } = loadFont();

export const AnimatedTextDiv = ({ text, index, total, frame, textFrames }) => {
  const currentFrame = useCurrentFrame();
  const isVisible = frame > textFrames[index];
  const isStoreURL = text.includes('.com');
  const isImg = text === "img";

  // Calculate spring animation for bounce effect
  const scale = spring({
    fps: 30,
    frame: currentFrame - textFrames[index],
    config: {
      damping: 200,
      stiffness: 100,
      mass: 1,
    },
  });

  // Calculate opacity for fade-in effect
  const opacity = interpolate(
    currentFrame,
    [textFrames[index] - 15, textFrames[index]], // Adjust these values as needed
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const textSpanStyle = {
    fontSize: isStoreURL ? '42px' : '72px',
    padding: isImg ? '20px 20px 0 20px' : isStoreURL ? '30px' : '20px',
    // background: 'linear-gradient(135deg, #6e8efb, #88d3ce)',
    background: '#9497ff',
    borderRadius: '10px',
    color: 'white',
    fontFamily,
    fontWeight: '700',
    display: 'inline-block',
    // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    boxShadow: '35px 25px 20px rgba(0, 0, 0, 0.35)',
    textShadow: '0 2px 2px rgba(0,0,0,0.15)',
    opacity: isVisible ? opacity : 0,
    transform: `scale(${scale})`,
  };

  const style = {
    zIndex:10,
    position: 'absolute',
    top: `calc(50% + ${(index - total / 2) * 150}px)`,
    left: '50%',
    textAlign: 'center',
    margin: '10px',
    minWidth: '600px',
    transform: 'translate(-50%, -50%)',
  };

  return isVisible ? (
    <div style={style}>
      {isImg ? (
        <span style={textSpanStyle}>
          <img src={logo} alt="Logo" style={{ width: '275px' }} />
        </span>
      ) : (
        <span style={textSpanStyle}>{text}</span>
      )}
    </div>
  ) : null;
};
