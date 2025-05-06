'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import ChequeBackground from '@/components/ChequeBackground';

export default function WelcomePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('animate-fadeInContainer');
      setTimeout(() => router.push('/dashboard'), 500);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-black flex flex-col justify-between overflow-hidden animate-fadeInContainer"
    >
      {/* Cheque background fills behind content */}
      <div className="absolute inset-0 z-0">
        <ChequeBackground />
      </div>

      {/* Nav at top: always at top, slides down in place */}
      <nav className="relative z-10 flex items-center gap-5 p-10 h-[120px] opacity-0 animate-slideDown">
        <span className="text-xl font-bold md:text-3xl lg:text-4xl text-white">
          NFT Generator
        </span>
        <span className="text-sm bg-grayShade border border-white rounded-full px-3 py-1 font-bold text-white">
          v1.0
        </span>
      </nav>

      {/* Main content: typing */}
      <main className="relative top-[80px] z-10 flex flex-col items-center justify-center gap-3 flex-grow text-white text-center px-4">
        <div className="flex flex-col gap-2">
          <h1
            className="opacity-0 text-[55px] font-bold leading-none overflow-hidden whitespace-nowrap border-r-2 border-white animate-typing"
            style={{ animationDelay: '1s' }}
          >
            Turn Ideas into NFTs,
          </h1>
          <h1
            className="opacity-0 text-[55px] font-bold leading-none overflow-hidden whitespace-nowrap border-r-2 border-white animate-typing delay-[1.5s]"
            style={{ animationDelay: '1.5s' }}
          >
            Launch in Minutes with Simple Clicks!
          </h1>
        </div>
        <p
          className="opacity-0 text-2xl text-white/65 overflow-hidden whitespace-nowrap border-r-2 border-white animate-typing delay-[2s]"
          style={{ animationDelay: '2s' }}
        >
          Effortless NFT creation for creators and brands, no coding required.
        </p>
        <button
          onClick={handleGetStarted}
          style={{ animationDelay: '3.5s' }}
          className="opacity-0 mt-5 animate-fadeInContainer inline-flex items-center justify-center h-12 w-[200px] bg-white text-[#36395A] rounded-md font-bold text-xl tracking-wider shadow-lg transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
        >
          Get Started!
        </button>
      </main>


      {/* Footer at bottom: slides up in place */}
      <footer className="relative z-10 flex items-end justify-center h-[225px] bg-gradient-to-t from-black to-transparent opacity-0 animate-slideUp pointer-events-none">
        <div className="mb-5 text-sm tracking-wider text-white/50">
          Copyright ©2025 Chetan Vaswani | All rights reserved.
        </div>
      </footer>
    </div>
  );
}
