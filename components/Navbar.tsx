
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppState } from '../AppContext.tsx';

export const Navbar: React.FC = () => {
  const { settings } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: '홈', href: '#' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: '서비스', href: '#services' },
    { name: '문의하기', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')}
          className="text-2xl font-bold tracking-tighter hover:text-purple-500 transition-colors"
        >
          {settings.siteTitle.toUpperCase()}
          <span className="text-purple-600">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium hover:text-purple-500 transition-colors tracking-wide relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-white hover:text-purple-500 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="text-2xl font-bold">{settings.siteTitle.toUpperCase()}</span>
            <button onClick={() => setIsOpen(false)} className="p-2"><X size={32} /></button>
          </div>
          <div className="flex flex-col space-y-8 text-4xl font-black">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-purple-500 transition-colors inline-block"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-gray-500 text-sm">© 2024 DING STUDIO. All rights reserved.</p>
          </div>
        </div>
      </div>
    </nav>
  );
};