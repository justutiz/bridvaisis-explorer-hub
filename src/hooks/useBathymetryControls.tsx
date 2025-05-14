
import { useState } from 'react';

export const useBathymetryControls = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle zoom in
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 5)); // Max zoom 5x
  };

  // Handle zoom out
  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
  };

  // Handle reset
  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle wheel zoom with improved smoothness
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY / 500;
    const newScale = Math.max(0.5, Math.min(5, scale + delta)); // Limit scale between 0.5 and 5
    setScale(newScale);
  };

  // Handle download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/bridvaisis_bathymetry.png';
    link.download = 'bridvaisis_bathymetry.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    scale,
    position,
    setPosition,
    zoomIn,
    zoomOut,
    resetView,
    handleWheel,
    handleDownload
  };
};
