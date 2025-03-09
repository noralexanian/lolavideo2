import React, {CSSProperties} from 'react';
import { Img, staticFile } from 'remotion';

interface BottomBarProps {
  username: string,
  productName: string,
  price: string,
  type: number
}

export const BottomBar2: React.FC<BottomBarProps> = ({ username, price, type }) => {
  const priceStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minWidth: '50px',
    minHeight: '100px',
    background: '#9497ff',
    color: '#fff',
    fontSize: '42px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '5px 20px 5px 20px',
    margin: '10px 10px 0px 0px',
    boxShadow: '25px 15px 10px rgba(0, 0, 0, 0.35)',
    textShadow: '0 2px 2px rgba(0,0,0,0.15)',
  };

  const bottomBarStyle = {
    width: '100%',
    minHeight: '50px',
    backgroundColor: '#fff',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0px 10px 0px',
    margin: '0px 0px 0px 0px',
    boxShadow: '35px 25px 20px rgba(0, 0, 0, 0.35)',
    zIndex: 10,
  };

  const containerStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    zIndex: 30,
    width: '100%',
  };

  const containerStyleTop: CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 30,
  };

  return (
    <div>
      {type === 0 && (
        <div className='here2' style={containerStyleTop}>
          <div style={priceStyle}>
              ${price}
            </div>
        </div>
      )}

      <div className='here2' style={containerStyle}>
        <div style={bottomBarStyle}>
          <Img 
            src={staticFile('assets/logo.png')} 
            style={{  
              width: '150px', 
              marginRight: '20px' 
            }}
            onError={(e) => {
              // Prevent error propagation if image fails to load
              console.error('Logo failed to load');
              e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg=='; // Transparent 1x1 pixel
            }}
          />
          <span 
            style={{ 
              fontSize: '20px', 
              fontFamily: 'Arial, sans-serif',
              color: '#000',
              marginLeft: 'auto',
              marginRight: '15px'
            }}
          >
            lolapay.com/<strong>{username}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};