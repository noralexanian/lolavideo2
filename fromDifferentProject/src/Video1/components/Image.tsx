import { Img, useCurrentFrame } from 'remotion';

interface ImageProps {
  img: string;
  width: number;
  startAt: number;
}

const Image = ({ img, width, startAt }: ImageProps) => {
  const frame = useCurrentFrame();
  const opacity = frame >= startAt ? 1 : 0;

  return <Img src={img} width={`${width}px`} style={{ zIndex: 1, opacity }} />;
};

export default Image;
