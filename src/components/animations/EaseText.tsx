import { useCurrentFrame } from 'remotion';
import { defaultSpring, interpolateSpring } from '../../lib/helpers';
import { useTextSplitter } from '../../lib/useTextSplitter';
import { WIDTH } from '../../lib/consts';

interface TextProps {
  text: string;
  startAt: number;
  size?: number;
  fontFamily?: string;
}
export const EaseText = ({
  text,
  startAt = 0,
  size = 20,
  fontFamily = 'Archivo Black',
}: TextProps) => {
  const refactoredText = useTextSplitter({
    maxLines: 3,
    maxWidth: WIDTH - 100,
    text: text,
    fontSize: size,
    fontWeight: 'bold',
  });
  const frame = useCurrentFrame();
  const springEffect = defaultSpring({ frame, delay: startAt, durationInFrames: 12 });
  const scaleSpringEffect = defaultSpring({ frame, delay: startAt + 6, durationInFrames: 50 });
  const opacity = interpolateSpring(springEffect, [0, 1]);
  const scale = interpolateSpring(scaleSpringEffect, [1, 1.05]);
  const reText = text.split('\n');

  return (
    <div
      style={{
        display: 'flex',
        color: '#6b56ba',
        opacity,
        ...refactoredText.style,
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 1,
        transform: `scale(${scale})`,
        flexDirection: 'column',
      }}
    >
      <span style={{ fontFamily: fontFamily }}>{reText[0]}</span>
      {reText.length > 1 && (
        <>
          <span style={{ fontFamily: fontFamily, marginTop: '20px' }}>{reText[1]}</span>
        </>
      )}
    </div>
  );
};
