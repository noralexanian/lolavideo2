import React from 'react';
import {AbsoluteFill, useVideoConfig, useCurrentFrame, Sequence, Img, staticFile} from 'remotion';
import {RenderGrid} from "./components/RenderGrid";
import {getRandomInt} from "./helpers";
import {BottomBar2} from "./components/BottomBar2";
import {FinalScene2} from "./components/FinalScene2";

export const Video4: React.FC<{ 
  images: string[], username: string, productName: string, price: string, type: number,
}> = ({ images, username, productName, price, type }) => {
  const { durationInFrames, fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const delay = 10;
  const nbImg = 8;
  const partialImages = images.slice(0, nbImg);
  const finalSceneDuration = 3 * fps;
  const productPresentationDuration = durationInFrames - finalSceneDuration;

  const intervalBtwNewImage = fps *2/3;

  const imagesToShow: string[] = [];
  for (let i=0; i<partialImages.length; i++) {
      if (frame - delay >= i * getRandomInt(intervalBtwNewImage/2, intervalBtwNewImage, i)) {
          imagesToShow.push(partialImages[i]);
      }
  }

  return (
	<AbsoluteFill style={{ overflow: 'hidden' }}>
		<Sequence from={0} layout="none" durationInFrames={productPresentationDuration}>
			<RenderGrid images={imagesToShow} productName={productName} />
		</Sequence>
		
		<Sequence from={0} layout="none" durationInFrames={productPresentationDuration}>
			<BottomBar2 username={username} productName={productName} price={price} type={type} />
		</Sequence>

        <Sequence from={productPresentationDuration} durationInFrames={finalSceneDuration}>
            <FinalScene2 username={username} productName={productName} price={price} />
        </Sequence>

        <Sequence from={ 0 } durationInFrames={productPresentationDuration}>
            <BottomBar2 username={username} productName={productName} price={price} type={type} />
        </Sequence>

        <Img src={staticFile('zona-segura-reels-ig-imorillas.png')}
             style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }} />

        <Img src={staticFile('zona-segura-para-tiktok-green-imorillas.png')}
             style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }} />

	</AbsoluteFill>
  );
};
