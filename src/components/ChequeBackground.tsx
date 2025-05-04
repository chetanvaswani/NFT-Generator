import React from "react";

export default function ChequeBackground() {
    return (
      <div
        className="fixed w-screen h-screen flex items-center justify-center bg-black overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        <div
          className="w-full h-full origin-center"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '25px 25px',
            transform: 'rotateX(-60deg) scale(3.5)',
            transformOrigin: 'center',
          }}
        ></div>
      </div>
    );
}