
import React from 'react';

interface FooterProps {
  isLoaded: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLoaded }) => {
  return (
    <footer 
      className={`
        relative overflow-hidden
        bg-gradient-to-r from-background/95 via-background/90 to-background/95
        backdrop-blur-2xl border-t border-white/[0.06]
        p-8 mt-16
        transition-all duration-700
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center space-y-4">
          <p className="text-foreground/80 text-sm font-medium">
            &copy; {new Date().getFullYear()} Bridvaišio ežero informacinis puslapis
          </p>
          <p className="text-muted-foreground text-xs max-w-md mx-auto">
            Šis puslapis skirtas dalintis informacija apie Bridvaišio ežerą ir nardymo patirtis jame.
          </p>
          <div className="pt-4">
            <p className="text-gradient text-sm font-medium italic">
              One Man. One Lake. A Lifelong Bond – Justas Maziliauskas
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
