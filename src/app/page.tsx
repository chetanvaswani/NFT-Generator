'use client';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';
import ChequeBackground from "@/components/ChequeBackground";

export default function WelcomePage() {
  const router = useRouter();
  const welcomePageRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (welcomePageRef.current) {
      welcomePageRef.current.classList.add('animate-fadeOut');
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      <div ref={welcomePageRef} className="relative w-full h-full">
        <ChequeBackground />
        <nav className="fixed top-0 w-full h-[120px] flex items-center justify-start gap-5 pt-10 p-10">
          <span className="text-xl font-bold md:text-3xl lg:text-4xl">NFT Generator</span>
          <span className="text-sm bg-grayShade border border-white rounded-full px-3 py-1 font-bold">
            v1.0
          </span>
        </nav>
        <main className="fixed top-1/2 w-full flex flex-col items-center gap-8 transform -translate-y-1/2">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="text-[55px] font-bold leading-none">
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-[2px] border-white animate-typing">Turn Ideas into NFTs,</span>
            </div>
            <div className="text-[55px] font-bold leading-none">
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-[2px] border-white  animate-typing" style={{ animationDelay: '1.5s' } as React.CSSProperties}>
                Launch in Minutes with Simple Clicks!
              </span>
            </div>
            <div className="text-2xl text-white/65 mt-2">
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-[2px] border-white  animate-typing" style={{ animationDelay: '3.5s' } as React.CSSProperties}>
                Effortless NFT creation for creators and brands, no coding required.
              </span>
            </div>
          </div>
          <div>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center justify-center h-12 w-[200px] bg-white text-[#36395A] rounded-md font-bold text-xl tracking-wider shadow-[0_2px_4px_rgba(45,35,66,0.4),0_7px_13px_-3px_rgba(45,35,66,0.3),0_-3px_0_inset_#D6D6E7] transition-all duration-150 hover:shadow-[0_4px_8px_rgba(45,35,66,0.4),0_7px_13px_-3px_rgba(45,35,66,0.3),0_-3px_0_inset_#D6D6E7] hover:-translate-y-0.5 active:shadow-[0_3px_7px_inset_#D6D6E7] active:translate-y-0.5"
            >
              Get Started!
            </button>
          </div>
        </main>
        <footer className="fixed bottom-0 w-full h-[225px] bg-gradient-to-t from-black to-transparent flex items-end justify-center pointer-events-none">
          <div className="mb-5 text-sm tracking-wider">
            Copyright ©2025 Chetan Vaswani | All rights reserved.
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blink {
          50% { border-color: transparent; }
        }
      `}</style>
    </div>
  );
}