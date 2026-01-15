
import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useAppState } from '../AppContext';

export const Hero: React.FC = () => {
  const { settings } = useAppState();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-0.5 to 0.5)
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#000000]">
      {/* 1. Abstract Flowing Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base dark canvas */}
        <div className="absolute inset-0 bg-[#020205]"></div>
        
        {/* Animated Waves Container */}
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) scale(1.15)`,
          }}
        >
          {/* Deep Navy/Purple Curve (Lower Layer) */}
          <div 
            className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[120%] opacity-50 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at 20% 80%, #1e00aa 0%, transparent 60%)',
              filter: 'blur(100px)',
              transform: `rotate(${mousePos.x * 5}deg)`
            }}
          ></div>

          {/* Vibrant Purple Wave (Main Shape) */}
          <svg 
            viewBox="0 0 1000 1000" 
            className="absolute inset-0 w-full h-full opacity-70 transition-transform duration-700"
            preserveAspectRatio="none"
            style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4c00ff', stopOpacity: 0.9 }} />
                <stop offset="40%" style={{ stopColor: '#8a2be2', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="30" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path 
              d="M 0 350 Q 250 150 500 450 T 1000 400 L 1000 1000 L 0 1000 Z" 
              fill="url(#curveGradient)"
              filter="url(#glow)"
              className="animate-pulse"
              style={{ animationDuration: '6s' }}
            />
          </svg>

          {/* Highlight Edge Curve (Bright Violet) */}
          <svg 
            viewBox="0 0 1000 1000" 
            className="absolute inset-0 w-full h-full opacity-40 mix-blend-plus-lighter"
            preserveAspectRatio="none"
            style={{ transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -15}px)` }}
          >
            <path 
              d="M 0 355 Q 250 155 500 455 T 1000 405" 
              stroke="#a855f7" 
              strokeWidth="4" 
              fill="none" 
              filter="blur(15px)"
            />
          </svg>

          {/* Secondary Soft Glow */}
          <div 
            className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]"
            style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * -20}px)` }}
          ></div>
        </div>

        {/* Ambient Dark Overlay (Vignette) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_120%)]"></div>
        
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
      </div>
      
      {/* 2. Content Layer */}
      <div className="max-w-6xl mx-auto px-6 text-center z-20 relative">
        <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur-xl">
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-purple-200 uppercase">
            Elevating Brands into Art
          </span>
        </div>
        
        <h1 className="fade-up [animation-delay:200ms] text-5xl md:text-9xl font-black mb-10 leading-[1] tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-gray-500 drop-shadow-2xl">
            {settings.heroText.split('\n')[0]}
          </span>
          <br />
          <span className="text-indigo-500 inline-block mt-2 filter drop-shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-colors hover:text-purple-400">
             {settings.heroText.split('\n')[1] || ''}
          </span>
        </h1>
        
        <p className="fade-up [animation-delay:400ms] text-lg md:text-2xl text-gray-300/70 mb-14 max-w-3xl mx-auto leading-relaxed font-light whitespace-pre-line tracking-tight">
          {settings.heroSubText}
        </p>

        <div className="fade-up [animation-delay:600ms] flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#portfolio" 
            onClick={(e) => handleScroll(e, 'portfolio')}
            className="group relative px-12 py-5 bg-indigo-600 overflow-hidden text-white font-bold rounded-full transition-all duration-500 shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">포트폴리오 보기</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, 'contact')}
            className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full transition-all duration-300 backdrop-blur-xl border border-white/10 hover:border-white/20 active:scale-95"
          >
            무료 컨설팅 신청
          </a>
        </div>
      </div>

      {/* 3. Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20 transition-opacity hover:opacity-100 cursor-pointer"
        onClick={(e) => handleScroll(e, 'portfolio')}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Scroll Down</span>
        <div className="animate-bounce">
          <ChevronDown className="text-indigo-400" size={24} />
        </div>
      </div>
    </section>
  );
};
