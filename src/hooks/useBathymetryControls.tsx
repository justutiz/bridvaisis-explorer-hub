
import { useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";

export const useBathymetryControls = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle zoom in
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 5)); // Max zoom 5x
  }, []);

  // Handle zoom out
  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
  }, []);

  // Handle reset
  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    toast.info("Vaizdas atstatytas į pradinę padėtį");
  }, []);

  // Handle slider scale change
  const handleScaleChange = useCallback((values: number[]) => {
    setScale(values[0]);
  }, []);

  // Handle wheel zoom with improved smoothness
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY / 500;
    const newScale = Math.max(0.5, Math.min(5, scale + delta)); // Limit scale between 0.5 and 5
    setScale(newScale);
  }, [scale]);

  // Handle download
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/bridvaisis_bathymetry.png';
    link.download = 'bridvaisis_bathymetry.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Batimetrijos žemėlapis atsisiunčiamas");
  }, []);

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
    
    // Add/remove body scroll lock when entering/exiting fullscreen
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
      toast.info("Įjungtas pilno ekrano režimas", { duration: 2000 });
    } else {
      document.body.style.overflow = '';
      toast.info("Išjungtas pilno ekrano režimas", { duration: 2000 });
    }
  }, [isFullscreen]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''; // Ensure scroll is enabled when component unmounts
    };
  }, []);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullscreen, toggleFullscreen]);

  return {
    scale,
    position,
    isFullscreen,
    setPosition,
    zoomIn,
    zoomOut,
    resetView,
    handleWheel,
    handleDownload,
    toggleFullscreen,
    handleScaleChange
  };
};
