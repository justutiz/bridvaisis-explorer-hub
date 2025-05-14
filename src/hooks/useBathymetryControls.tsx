
import { useState, useCallback, useEffect, RefObject } from 'react';
import { toast } from "sonner";

export const useBathymetryControls = (imageRef?: RefObject<HTMLImageElement>) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  // Update image dimensions when the image loads or changes
  useEffect(() => {
    if (imageRef?.current) {
      const updateDimensions = () => {
        setImageDimensions({
          width: imageRef.current?.naturalWidth || 0,
          height: imageRef.current?.naturalHeight || 0
        });
      };

      // Set initial dimensions if image is already loaded
      if (imageRef.current.complete) {
        updateDimensions();
      }

      // Add listener for when image loads
      imageRef.current.addEventListener('load', updateDimensions);
      
      return () => {
        imageRef.current?.removeEventListener('load', updateDimensions);
      };
    }
  }, [imageRef]);

  // Function to update container dimensions
  const updateContainerDimensions = useCallback((width: number, height: number) => {
    setContainerDimensions({ width, height });
    // Re-apply constraints when container size changes
    setPosition(prev => constrainPosition(prev, scale));
  }, [scale]);

  // Improved function to constrain position within boundaries
  const constrainPosition = useCallback((pos: { x: number, y: number }, newScale: number = scale) => {
    if (!imageRef?.current || imageDimensions.width === 0) return pos;

    const scaledImageWidth = imageDimensions.width * newScale;
    const scaledImageHeight = imageDimensions.height * newScale;
    
    let newX = pos.x;
    let newY = pos.y;

    // If image is smaller than container, center it horizontally and vertically
    if (scaledImageWidth <= containerDimensions.width) {
      newX = (containerDimensions.width - scaledImageWidth) / 2;
    } else {
      // Otherwise constrain it to not show empty space
      const minX = containerDimensions.width - scaledImageWidth;
      newX = Math.min(0, Math.max(minX, newX));
    }

    if (scaledImageHeight <= containerDimensions.height) {
      newY = (containerDimensions.height - scaledImageHeight) / 2;
    } else {
      // Otherwise constrain it to not show empty space
      const minY = containerDimensions.height - scaledImageHeight;
      newY = Math.min(0, Math.max(minY, newY));
    }

    return { x: newX, y: newY };
  }, [containerDimensions, imageDimensions, scale, imageRef]);

  // Handle zoom in with centered point
  const zoomIn = useCallback((centerX?: number, centerY?: number) => {
    setScale(prev => {
      const newScale = Math.min(prev + 0.2, 5); // Max zoom 5x
      
      // If center point is provided, zoom toward that point
      if (centerX !== undefined && centerY !== undefined) {
        const zoomFactor = newScale / prev;
        
        // Calculate new position to keep the point under cursor
        const newPosition = {
          x: centerX - (centerX - position.x) * zoomFactor,
          y: centerY - (centerY - position.y) * zoomFactor
        };
        
        setPosition(constrainPosition(newPosition, newScale));
      } else {
        // Use container center for zooming if no specific point provided
        const centerX = containerDimensions.width / 2;
        const centerY = containerDimensions.height / 2;
        
        const zoomFactor = newScale / prev;
        const newPosition = {
          x: centerX - (centerX - position.x) * zoomFactor,
          y: centerY - (centerY - position.y) * zoomFactor
        };
        
        setPosition(constrainPosition(newPosition, newScale));
      }
      
      return newScale;
    });
  }, [position, constrainPosition, containerDimensions]);

  // Handle zoom out with centered point
  const zoomOut = useCallback((centerX?: number, centerY?: number) => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.2, 0.5); // Min zoom 0.5x
      
      // If center point is provided, zoom toward that point
      if (centerX !== undefined && centerY !== undefined) {
        const zoomFactor = newScale / prev;
        
        // Calculate new position to keep the point under cursor
        const newPosition = {
          x: centerX - (centerX - position.x) * zoomFactor,
          y: centerY - (centerY - position.y) * zoomFactor
        };
        
        setPosition(constrainPosition(newPosition, newScale));
      } else {
        // Use container center for zooming if no specific point provided
        const centerX = containerDimensions.width / 2;
        const centerY = containerDimensions.height / 2;
        
        const zoomFactor = newScale / prev;
        const newPosition = {
          x: centerX - (centerX - position.x) * zoomFactor,
          y: centerY - (centerY - position.y) * zoomFactor
        };
        
        setPosition(constrainPosition(newPosition, newScale));
      }
      
      return newScale;
    });
  }, [position, constrainPosition, containerDimensions]);

  // Handle reset
  const resetView = useCallback(() => {
    setScale(1);
    setPosition(constrainPosition({ x: 0, y: 0 }, 1));
    toast.info("Vaizdas atstatytas į pradinę padėtį");
  }, [constrainPosition]);

  // Handle slider scale change with center point
  const handleScaleChange = useCallback((values: number[]) => {
    const newScale = values[0];
    
    // Calculate the center of the container
    const centerX = containerDimensions.width / 2;
    const centerY = containerDimensions.height / 2;

    // Apply zoom with the container center as reference point
    setScale(prevScale => {
      const zoomFactor = newScale / prevScale;
      
      // Calculate new position to keep center point
      const newPosition = {
        x: centerX - (centerX - position.x) * zoomFactor,
        y: centerY - (centerY - position.y) * zoomFactor
      };
      
      setPosition(constrainPosition(newPosition, newScale));
      return newScale;
    });
  }, [containerDimensions, position, constrainPosition]);

  // Handle wheel zoom with improved smoothness and correct center point
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY / 500;
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Get the mouse position relative to the container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setScale(prevScale => {
      const newScale = Math.max(0.5, Math.min(5, prevScale + delta)); // Limit scale between 0.5 and 5
      const zoomFactor = newScale / prevScale;
      
      // Calculate new position to keep the point under cursor
      const newPosition = {
        x: mouseX - (mouseX - position.x) * zoomFactor,
        y: mouseY - (mouseY - position.y) * zoomFactor
      };
      
      setPosition(constrainPosition(newPosition, newScale));
      return newScale;
    });
  }, [position, constrainPosition]);

  // Position setter with boundary constraints
  const setConstrainedPosition = useCallback((newPosition: { x: number, y: number }) => {
    setPosition(constrainPosition(newPosition));
  }, [constrainPosition]);

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

    // Re-apply constraints after toggling fullscreen
    setTimeout(() => {
      setPosition(prev => constrainPosition(prev, scale));
    }, 50); // Small timeout to let the UI update
  }, [isFullscreen, constrainPosition, scale]);

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

  // Keep position within bounds when scale changes
  useEffect(() => {
    setPosition(prev => constrainPosition(prev, scale));
  }, [scale, constrainPosition]);

  return {
    scale,
    position,
    isFullscreen,
    setPosition: setConstrainedPosition,
    zoomIn,
    zoomOut,
    resetView,
    handleWheel,
    handleDownload,
    toggleFullscreen,
    handleScaleChange,
    updateContainerDimensions,
  };
};
