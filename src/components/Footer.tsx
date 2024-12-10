// // BottomBar.tsx

import { WIDTH } from '../lib/consts';
import { Img, staticFile } from 'remotion';
import { loadFont as loadOpenSans } from '@remotion/google-fonts/OpenSans';

const openSans = loadOpenSans(); // OpenSans font

interface FooterProps {
  logo: string;
  store: string; // Name of the store
  backgroundColor?: string;
  theme?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  store,
  backgroundColor = '#6c55bd',
  theme = 'Purple',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: theme === 'Purple' ? '#6c55bd' : '#fff',
        width: WIDTH,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px',
        padding: '10px',
        zIndex: 5,
      }}
    >
      <div style={{ display: 'flex' }}>
        <Img src={theme !== 'White' ? staticFile('logo2.png') : logo} alt="logo" width={100} />
      </div>
      <span
        style={{
          fontSize: '20px',
          fontFamily: openSans.fontFamily,
          // fontFamily: 'OpenSans',
          color: `${theme !== 'White' ? '#fff' : '#000'}`,
          textTransform: 'lowercase',
        }}
      >
        LOLAPAY.COM/<strong>{store}</strong>
      </span>
    </div>
  );
};
