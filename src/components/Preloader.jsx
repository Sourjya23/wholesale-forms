import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Preloader = ({ onComplete }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        flexDirection: 'column'
      }}
    >
      <DotLottieReact
        src="https://lottie.host/c5f6564c-443b-48d0-8355-a9af8e696ee5/2Zw9xzwTkF.lottie"
        loop={false}
        autoplay
        onComplete={onComplete}
        style={{
          width: '300px',
          height: '300px'
        }}
      />
      <div style={{
        marginTop: '20px',
        fontSize: '18px',
        color: '#374151',
        fontWeight: '500'
      }}>
        Loading...
      </div>
    </div>
  );
};

export default Preloader;
