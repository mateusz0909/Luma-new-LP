import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export function Navbar({ currentPath = '/', onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoSrc = `${import.meta.env?.BASE_URL || '/'}screenshots/logo.webp`;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('http') || path.startsWith('#')) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const navLinks = [
    { label: 'Online Timer', href: '/timer' },
    { label: 'Method Guide', href: '/guide/wim-hof-method' },
    { label: 'Retention Times', href: '/retention-times' },
    { label: 'Science & Safety', href: '/science-and-safety' },
    { label: 'Apple Watch', href: '/apple-watch' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full px-6 py-4 md:px-10 md:py-4 flex justify-between items-center z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-sm">
      {/* Brand Logo */}
      <a 
        href="/" 
        onClick={(e) => handleLinkClick(e, '/')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <img 
          src={logoSrc} 
          alt="Luma Breathwork Logo" 
          width="40" 
          height="40" 
          fetchPriority="high" 
          className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-transform" 
        />
        <div className="font-bold text-xl md:text-2xl tracking-tighter text-white">LUMA.</div>
      </a>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wider uppercase">
        {navLinks.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`transition-colors py-1 ${
                isActive 
                  ? 'text-[#d8d628] font-bold border-b border-[#d8d628]' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      {/* Right Action CTA & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <a 
          href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Download Luma app from Apple App Store"
          data-umami-event="App Store Nav Click"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          <span>Get App</span>
          <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
        </a>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-x-0 top-[65px] bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-3 font-mono text-sm tracking-wider uppercase">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className={`py-2 border-b border-white/5 ${currentPath === '/' ? 'text-[#d8d628] font-bold' : 'text-white/80'}`}
            >
              Home
            </a>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`py-2 border-b border-white/5 ${currentPath === link.href ? 'text-[#d8d628] font-bold' : 'text-white/80'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 mt-2">
            <a
              href="/timer"
              onClick={(e) => handleLinkClick(e, '/timer')}
              data-umami-event="Mobile Menu Timer CTA Click"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold font-mono text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors"
            >
              <span>Try Free Web Timer</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="App Store Mobile Menu Click"
              className="w-full py-3 rounded-xl bg-[#d8d628] text-black font-bold font-mono text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all hover:bg-white"
            >
              <span>Download for iOS & Apple Watch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
