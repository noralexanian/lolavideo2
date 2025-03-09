import React from 'react';
import { Img, staticFile } from 'remotion';

interface BottomBarProps {
  username: string;
  productName: string;
  price: string;
  type: number;
}

export const BottomBar: React.FC<BottomBarProps> = ({ username, productName, price, type }) => {
  const priceStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
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

  const bottomInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    minWidth: '200px',
    minHeight: '105px',
    background: '#9497ff',
    color: '#fff',
    fontSize: '36px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '10px 20px 10px 20px',
    margin: '0px 10px 10px 10px',
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

  const containerStyle = {
    position: 'fixed' as const,
    bottom: 0,
    zIndex: 30,
    width: '100%',
  };

  const containerStyleTop = {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    zIndex: 30,
  };

  return (
    <div>
      {/* Price tag if type is product */}
      {type === 0 && (
        <div className='here2' style={containerStyleTop}>
          <div style={priceStyle}>
            ${price}
          </div>
        </div>
      )}

      <div className='here2' style={containerStyle}>
        <div className='here1' style={{
          marginBottom: '15px',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2,
          width: '100%',
          padding: '0 60px',
          boxSizing: 'border-box' as const,
        }}>
          <div style={bottomInfoStyle}>
            {type === 0 ? productName : username}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={bottomBarStyle}>
          <Img 
            src={staticFile('assets/logo.png')} 
            style={{  
              width: '150px', 
              marginRight: '20px' 
            }}
            onError={(e) => {
              console.error('Logo failed to load');
              e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg==';
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
            Disponible en: lolapay.com/<strong>{username}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};