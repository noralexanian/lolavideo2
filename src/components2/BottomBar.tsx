// // BottomBar.tsx
import React from 'react';
import logo from "../assets/logo.png";

import * as OpenSans from "@remotion/google-fonts/Roboto";
import * as Anton from "@remotion/google-fonts/Anton";
OpenSans.loadFont();
Anton.loadFont();

interface BottomBarProps {
  username: string; // Name of the store
  productName: string,
  price: string,
  type: number
}

export const BottomBar: React.FC<BottomBarProps> = ({ username, productName, price, type }) => {
  // const bottomInfoStyle = {
  //   textAlign: 'center',
  //   // minWidth: '200px',
  //   minWidth: '200px',
  //   background: '#9497ff',
  //   color: '#fff',
  //   fontSize: '25px',
  //   fontFamily: 'Anton',
  //   // fontWeight: '700',
  //   // zIndex: 20,
  //   borderRadius: '10px',
  //   padding: '10px 20px 10px 20px',
  //   margin: '0px 10px 7px 10px', // adjust as needed
  //   boxShadow: '25px 15px 10px rgba(0, 0, 0, 0.35)',
  //   textShadow: '0 2px 2px rgba(0,0,0,0.15)',
  // };

  const bottomInfoStyle = {
    display: 'flex',           // Use flexbox for alignment
    alignItems: 'center',      // Center items vertically
    justifyContent: 'center',  // Center items horizontally (optional if you want horizontal centering too)
    textAlign: 'center',
    minWidth: '200px',
    minHeight: '105px',
    background: '#9497ff',
    color: '#fff',
    fontSize: '36px',
    fontFamily: 'Anton',
    borderRadius: '10px',
    padding: '10px 20px 10px 20px',
    margin: '0px 10px 10px 10px', // adjust as needed
    boxShadow: '25px 15px 10px rgba(0, 0, 0, 0.35)',
    textShadow: '0 2px 2px rgba(0,0,0,0.15)',
  };

  const priceStyle = {
    display: 'flex',           // Use flexbox for alignment
    alignItems: 'center',      // Center items vertically
    justifyContent: 'center',  // Center items horizontally (optional if you want horizontal centering too)
    textAlign: 'center',
    minWidth: '50px',
    minHeight: '100px',
    background: '#9497ff',
    color: '#fff',
    fontSize: '42px',
    fontFamily: 'Anton',
    borderRadius: '10px',
    padding: '5px 20px 5px 20px',
    margin: '10px 10px 0px 0px', // adjust as needed
    boxShadow: '25px 15px 10px rgba(0, 0, 0, 0.35)',
    textShadow: '0 2px 2px rgba(0,0,0,0.15)',
  };

  const bottomBarStyle = {
    width: '100%',
    minHeight: '50px',
    backgroundColor: '#fff', // Dark background for the bar
    color: 'white', // Text color
    display: 'flex',
    alignItems: 'center', // Vertically center content
    padding: '10px 0px 10px 0px', // Padding around the content
    margin: '0px 0px 0px 0px',
    boxShadow: '35px 25px 20px rgba(0, 0, 0, 0.35)',
    zIndex: 10,
  };

  const containerStyle = {
    position: 'fixed',
    bottom: 0,
    zIndex: 30,
    width: '100%', // Ensure the container takes up the full width of the screen
  };

  const containerStyleTop = {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 30,
    // width: '100%', // Ensure the container takes up the full width of the screen
  };

  return (
    <div>
      {/* Temp positioning of price */}
      {type === 0 && (
        <div className='here2' style={containerStyleTop}>
          <div style={priceStyle}>
              ${price}
            </div>
        </div>
      )}

      <div className='here2' style={containerStyle}>
        {/* Only if type == 0, bottom info */}
        {/* {type === 0 && (
          <div className='here1' style={{
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
            width: '100%', // Make the parent div take up the full width
            padding: '0 60px', // Add some left and right padding if needed
            boxSizing: 'border-box', // Include the padding in the width calculation
          }}>
            <div style={bottomInfoStyle}>
              {productName}
            </div>

            <div style={bottomInfoStyle}>
              ${price}
            </div>
          </div>
        )} */}

        <div className='here1' style={{
          marginBottom: '15px',
          // display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // position: 'relative',
          zIndex: 2,
          width: '100%', // Make the parent div take up the full width
          padding: '0 60px', // Add some left and right padding if needed
          boxSizing: 'border-box', // Include the padding in the width calculation
        }}>
          {/* {type === 0 && ( */}
            <div style={bottomInfoStyle}>
              {type === 0 ? productName : username}
            </div>
          {/* )} */}

          {/* <div style={bottomInfoStyle}>
            ${price}
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div style={bottomBarStyle}>
          <img 
            src={logo} 
            alt="Logo" 
            style={{  
              width: '150px', 
              marginRight: '20px' 
            }} 
          />
          <span 
            style={{ 
              fontSize: '20px', 
              fontFamily: 'OpenSans',
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







// import React from 'react';
// import logo from "../assets/logo.png";

// import * as OpenSans from "@remotion/google-fonts/Roboto";
// import * as Anton from "@remotion/google-fonts/Anton";
// OpenSans.loadFont();
// Anton.loadFont();

// interface BottomBarProps {
//   username: string; // Name of the store
//   productName: string,
//   price: string,
//   type: number
// }

// export const BottomBar: React.FC<BottomBarProps> = ({ username, productName, price, type }) => {
//   const bottomInfoStyle = {
//     textAlign: 'center',
//     minWidth: '300px',
//     background: '#9497ff',
//     color: '#fff',
//     fontSize: '34px',
//     fontFamily: 'Anton',
//     fontWeight: '700',
//     zIndex: 20,
//     borderRadius: '10px',
//     padding: '10px 20px 15px 20px',
//     margin: '0 20px', // adjust as needed
//     boxShadow: '25px 15px 10px rgba(0, 0, 0, 0.35)',
//     textShadow: '0 2px 2px rgba(0,0,0,0.15)',
//   }

//   return (
//     // Bottom Parent
//     <div className='here2'
//       style={{
//         position: 'fixed',
//         bottom: 0,
//         zIndex: 30
//       }}
//     >

//       {/* Bottom info
//       <div className='here1' style={{
//         marginBottom: '15px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         position: 'relative',
//         zIndex: 2,
//         width: '100%', // add this to make the parent div take up the full width
//         padding: '0 60px', // add some left and right padding if needed
//         boxSizing: 'border-box', // add this to include the padding in the width calculation
//       }}>
//         <div style={bottomInfoStyle}>
//           {productName}
//         </div>

//         <div style={bottomInfoStyle}>
//           ${price}
//         </div>
//       </div> */}
//       {/* only if type == 0, bottom info */}
//       {type === 0 && (
//         <div className='here1' style={{
//           marginBottom: '15px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           position: 'relative',
//           zIndex: 2,
//           width: '100%', // add this to make the parent div take up the full width
//           padding: '0 60px', // add some left and right padding if needed
//           boxSizing: 'border-box', // add this to include the padding in the width calculation
//         }}>
//           <div style={bottomInfoStyle}>
//             {productName}
//           </div>

//           <div style={bottomInfoStyle}>
//             ${price}
//           </div>
//         </div>
//       )}
      
//       {/* Bottom Bar */}
//       <div style={{
//         width: '100%',
//         minHeight: '75px',
//         backgroundColor: '#fff', // Dark background for the bar
//         color: 'white', // Text color
//         display: 'flex',
//         alignItems: 'center', // Vertically center content
//         padding: '15px 0px 10px 20px', // Padding around the content
//         margin: '0px 0px 0px 0px',
//         // borderRadius: '30px 30px 0 0',
//         boxShadow: '35px 25px 20px rgba(0, 0, 0, 0.35)',
//         zIndex: 10
//       }}>
//         <img 
//           src={logo} 
//           alt="Logo" 
//           style={{  
//             width: '150px', 
//             marginRight: '20px' 
//           }} 
//         />
//         <span 
//           style={{ 
//             fontSize: '28px', 
//             fontFamily: 'OpenSans',
//             // fontWeight: 'bold',
//             color: '#000',
//             marginLeft: 'auto',
//             marginRight: '15px'
//           }
//         }>Disponible en: lolapay.com/<strong>{username}</strong></span>
//       </div>
      
//     </div>
//   );
// };
