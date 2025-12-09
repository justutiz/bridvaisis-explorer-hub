
import React, { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  isLoaded: boolean;
  bubblesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const Header: React.FC<HeaderProps> = ({ isLoaded, bubblesRef }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Mouse tracking animation for the header with smoother transitions
  useEffect(() => {
    if (!headerRef.current || isMobile) return;
    
    setTimeout(() => {
      bubblesRef.current.forEach((bubble) => {
        if (bubble) {
          bubble.style.transition = "transform 0.8s ease-out";
        }
      });
    }, 100);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      
      const rect = headerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      bubblesRef.current.forEach((bubble, index) => {
        if (!bubble) return;
        
        const speed = 0.03 + (index % 4) * 0.012;
        const offsetX = (mouseX - rect.width / 2) * speed;
        const offsetY = (mouseY - rect.height / 2) * speed;
        
        bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };
    
    let animationFrameId: number;
    let isMoving = false;
    
    const animateMouseMove = (e: MouseEvent) => {
      if (!isMoving) return;
      handleMouseMove(e);
      animationFrameId = requestAnimationFrame(() => animateMouseMove(e));
    };
    
    const startTracking = (e: MouseEvent) => {
      isMoving = true;
      animateMouseMove(e);
    };
    
    const stopTracking = () => {
      isMoving = false;
      cancelAnimationFrame(animationFrameId);
    };
    
    headerRef.current.addEventListener('mousemove', startTracking);
    headerRef.current.addEventListener('mouseleave', stopTracking);
    
    return () => {
      if (headerRef.current) {
        headerRef.current.removeEventListener('mousemove', startTracking);
        headerRef.current.removeEventListener('mouseleave', stopTracking);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, bubblesRef]);

  // Reset bubble positions when mouse leaves the header
  useEffect(() => {
    if (!headerRef.current || isMobile) return;
    
    const handleMouseLeave = () => {
      bubblesRef.current.forEach((bubble) => {
        if (bubble) {
          bubble.style.transition = "transform 1.2s ease-out";
          bubble.style.transform = 'translate(0px, 0px)';
        }
      });
    };
    
    headerRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (headerRef.current) {
        headerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile, bubblesRef]);

  // Subtle floating animation for bubbles
  useEffect(() => {
    if (isMobile) return;
    
    const floatBubbles = () => {
      bubblesRef.current.forEach((bubble, index) => {
        if (!bubble || bubble.style.transform.includes('translate')) return;
        
        const time = Date.now() / 1000;
        const floatX = Math.sin(time + index) * 5;
        const floatY = Math.cos(time + index * 0.5) * 5;
        
        bubble.style.transform = `translate(${floatX}px, ${floatY}px)`;
      });
    };
    
    const intervalId = setInterval(floatBubbles, 50);
    
    return () => clearInterval(intervalId);
  }, [bubblesRef, isMobile]);

  return (
    <div 
      ref={headerRef}
      className="relative h-[45vh] md:h-[55vh] overflow-hidden"
    >
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000"
        style={{ backgroundImage: "url('/lovable-uploads/96099880-b1ae-494a-bce4-eb7fce874564.png')" }}
      />
      
      {/* Glassmorphism gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background backdrop-blur-[2px]" />
      
      {/* Aurora-like glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/15 rounded-full blur-[120px] animate-float-2" />
      </div>
      
      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Floating glass bubbles */}
        {isLoaded && [...Array(10)].map((_, i) => (
          <div 
            key={i} 
            ref={el => bubblesRef.current[i] = el}
            className="absolute rounded-full"
            style={{
              width: `${12 + i * 6}px`,
              height: `${12 + i * 6}px`,
              left: `${8 + (i * 10)}%`,
              top: `${25 + (i % 5) * 12}%`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,${0.25 - i * 0.015}), rgba(255,255,255,${0.05}))`,
              border: `1px solid rgba(255,255,255,${0.2 - i * 0.01})`,
              backdropFilter: 'blur(4px)',
              animationDelay: `${i * 0.15}s`,
              willChange: "transform",
              backfaceVisibility: "hidden",
              boxShadow: `
                0 4px 16px rgba(0, 200, 255, ${0.15 - i * 0.01}),
                inset 0 1px 2px rgba(255,255,255,0.2)
              `
            }}
          />
        ))}
        
        {/* Title container with glass effect */}
        <div className="relative text-center p-8 z-10">
          <div className="glass-strong px-8 py-6 md:px-12 md:py-8 rounded-3xl max-w-3xl mx-auto">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 text-gradient ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              Bridvaišio ežeras
            </h1>
            <p className={`text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed ${isLoaded ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
              Gražus Lietuvos ežeras žinomas dėl išskirtinių nardymo vietų ir gamtos grožio
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default Header;
