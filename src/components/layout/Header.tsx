
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
    
    // Initialize bubble positions with a slight delay to ensure they're mounted
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
        
        // Different speeds and directions for each bubble for a more natural feel
        const speed = 0.03 + (index % 4) * 0.012;
        const offsetX = (mouseX - rect.width / 2) * speed;
        const offsetY = (mouseY - rect.height / 2) * speed;
        
        // Apply transform directly without delay to improve responsiveness
        bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };
    
    // Use requestAnimationFrame for smoother performance instead of timeout
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

  // Add a subtle floating animation for bubbles when not being tracked by mouse
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
      className="relative h-[40vh] md:h-[50vh] bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: "url('/lovable-uploads/96099880-b1ae-494a-bce4-eb7fce874564.png')"}}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent flex items-center justify-center">
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
              backfaceVisibility: "hidden",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)"
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
