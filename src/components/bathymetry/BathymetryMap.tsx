
import React, { useState, useRef, useEffect } from "react";

interface BathymetryMapProps {
  loading: boolean;
  imageError: boolean;
  scale: number;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onImageLoaded: () => void;
  onImageError: () => void;
  imageRef: React.RefObject<HTMLImageElement>;
  isFullscreen: boolean;
  onContainerResize: (width: number, height: number) => void;
  onWheel: (e: React.WheelEvent) => void;
}

const BathymetryMap: React.FC<BathymetryMapProps> = ({
  loading,
  imageError,
  scale,
  position,
  onPositionChange,
  onImageLoaded,
  onImageError,
  imageRef,
  isFullscreen,
  onContainerResize,
  onWheel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Update container dimensions when size changes
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        onContainerResize(width, height);
      }
    };

    // Set initial size
    updateSize();

    // Add resize observer
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [onContainerResize, isFullscreen]);

  // Prevent page scrolling when the map container is in focus
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      const container = containerRef.current;
      if (container && container.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    // Add passive: false to override default browser behavior
    window.addEventListener('wheel', preventScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', preventScroll);
    };
  }, []);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    e.preventDefault(); // Prevent text selection during drag
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle touch start for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.preventDefault(); // Prevent scroll during drag
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent unwanted side effects
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    onPositionChange({
      x: newX,
      y: newY,
    });
  };

  // Handle touch move for mobile dragging
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault(); // Prevent scroll during drag
    
    const newX = e.touches[0].clientX - dragStart.x;
    const newY = e.touches[0].clientY - dragStart.y;
    
    onPositionChange({
      x: newX,
      y: newY,
    });
  };

  // Handle mouse up and touch end
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type !== 'mouseleave') {
      e.preventDefault(); // Prevent click events after drag
    }
    setIsDragging(false);
  };

  // Custom wheel event handler that prevents default and calls the provided handler
  const handleWheelEvent = (e: React.WheelEvent) => {
    e.preventDefault();
    onWheel(e);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none w-full h-full`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
      onWheel={handleWheelEvent}
    >
      <div
        className={`absolute transform transition-none will-change-transform ${isDragging ? "transition-none" : "duration-100"}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "0 0", // Changed from "center center" to "0 0" for better positioning
          display: loading || imageError ? 'none' : 'block'
        }}
      >
        <img
          ref={imageRef}
          src="/bridvaisis_bathymetry.png"
          alt="Bridvaišio ežero batimetrija"
          className="max-w-none"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onLoad={onImageLoaded}
          onError={onImageError}
        />
      </div>

      {/* Add placeholder low-res preview image */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <img 
            src="/placeholder.svg" 
            alt="Batimetrijos žemėlapio užkrovimas" 
            className="w-1/2 h-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default BathymetryMap;
