import React from 'react';

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
    minWidth: '120px',
    minHeight: '50px',
    background: 'linear-gradient(135deg, #5de0e6 0%, #004aad 100%)',
    color: '#fff',
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    borderRadius: '25px',
    padding: '8px 16px',
    margin: '0px 0px 10px 0px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.18)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    // border: '2px solid rgba(255,255,255,0.3)',
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
    // border: '2px solid rgba(255,255,255,0.2)',
    letterSpacing: '0.5px',
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
    justifyContent: 'center',
  };

  const containerStyle = {
    position: 'fixed' as const,
    bottom: 0,
    zIndex: 30,
    width: '100%',
  };

  return (
    <div>
      <div style={containerStyle}>
        {/* Only show product info above the bottom bar for product type */}
        {type === 0 && (
          <div style={{
            marginBottom: '18px',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2,
            width: '100%',
            padding: '0 60px',
            boxSizing: 'border-box' as const,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Price above product name */}
            <div style={priceStyle}>
              ${price}
            </div>
            {/* Product name */}
            <div style={bottomInfoStyle}>
              {productName}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div style={bottomBarStyle}>
          <span 
            style={{ 
              fontSize: '18px',
              fontFamily: 'Arial, sans-serif',
              color: '#333',
              fontWeight: '500',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            <strong>¡Compra ahora!</strong> lolapay.com/<strong>LolaStore</strong>
          </span>
        </div>
      </div>
    </div>
  );
}; 