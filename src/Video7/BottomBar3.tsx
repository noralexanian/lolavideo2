import React from 'react';
import { Img, staticFile } from 'remotion';

interface BottomBar3Props {
  username: string;
  productName: string;
  price: string;
  type: number;
}

export const BottomBar3: React.FC<BottomBar3Props> = ({ username, productName, price, type }) => {
  const priceStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    minWidth: '60px',
    minHeight: '68px',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    color: '#fff',
    fontSize: '28px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    borderRadius: '12px',
    padding: '4px 14px',
    margin: '10px 10px 0px 0px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.18)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    border: '2px solid rgba(255,255,255,0.3)',
  };

  const bottomInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    minWidth: '200px',
    minHeight: '95px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    fontSize: '32px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    borderRadius: '20px',
    padding: '12px 25px',
    margin: '0px 15px 15px 15px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    border: '2px solid rgba(255,255,255,0.2)',
  };

  const bottomBarStyle = {
    width: '100%',
    minHeight: '50px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0px',
    margin: '0px',
    boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.15)',
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    justifyContent: 'space-between',
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
        <div style={containerStyleTop}>
          <div style={priceStyle}>
            ${price}
          </div>
        </div>
      )}

      <div style={containerStyle}>
        <div style={{
          marginBottom: '18px',
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
              width: '80px',
              marginLeft: '16px',
              marginRight: '16px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
            onError={(e) => {
              console.error('Logo failed to load');
              e.currentTarget.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOYvCQAAAABJRU5ErkJggg==';
            }} 
          />
          <span 
            style={{ 
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
              color: '#333',
              marginLeft: 'auto',
              marginRight: '16px',
              fontWeight: '500',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Disponible en: lolapay.com/<strong style={{color: '#667eea'}}>{username}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}; 