
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
    
    // Initialize bubble positions
    bubblesRef.current.forEach((bubble) => {
      if (bubble) {
        bubble.style.transition = "transform 0.8s ease-out";
      }
    });
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      
      const rect = headerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      bubblesRef.current.forEach((bubble, index) => {
        if (!bubble) return;
        
        // Different speeds and directions for each bubble for a more natural feel
        const speed = 0.03 + (index % 4) * 0.012;
        const offsetX = (mouseX - rect.width / 2) * speed;
        const offsetY = (mouseY - rect.height / 2) * speed;
        
        // Apply transition with small delay between bubbles for cascading effect
        const delay = index * 0.05;
        bubble.style.transitionDelay = `${delay}s`;
        bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };
    
    // Add debounced mousemove event to improve performance
    let timeoutId: number | null = null;
    const debounceMouseMove = (e: MouseEvent) => {
      if (timeoutId) return;
      timeoutId = window.setTimeout(() => {
        handleMouseMove(e);
        timeoutId = null;
      }, 5);
    };
    
    headerRef.current.addEventListener('mousemove', debounceMouseMove);
    
    return () => {
      if (headerRef.current) {
        headerRef.current.removeEventListener('mousemove', debounceMouseMove);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMobile, isLoaded, bubblesRef]);

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
  }, [isMobile, isLoaded, bubblesRef]);

  return (
    <div 
      ref={headerRef}
      className="relative h-[40vh] md:h-[50vh] bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: "url('/lovable-uploads/96099880-b1ae-494a-bce4-eb7fce874564.png')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        {/* Diving bubbles that follow the mouse */}
        {isLoaded && [...Array(8)].map((_, i) => (
          <div 
            key={i} 
            ref={el => bubblesRef.current[i] = el}
            className={`bubble absolute rounded-full bg-white bg-opacity-${20 + i * 10} animate-float-${i % 4 + 1}`}
            style={{
              width: `${10 + i * 5}px`,
              height: `${10 + i * 5}px`,
              left: `${10 + (i * 12)}%`,
              top: `${30 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.1}s`,
              willChange: "transform",
              backfaceVisibility: "hidden"
            }}
          />
        ))}
        <div className="text-center text-white p-4 z-10">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>Bridvaišio ežeras</h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
            Gražus Lietuvos ežeras žinomas dėl išskirtinių nardymo vietų ir gamtos grožio
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
