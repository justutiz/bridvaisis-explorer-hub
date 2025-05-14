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
  }, []);

  // Function to constrain position within boundaries
  const constrainPosition = useCallback((pos: { x: number, y: number }, newScale: number = scale) => {
    if (!imageRef?.current || imageDimensions.width === 0) return pos;

    const scaledImageWidth = imageDimensions.width * newScale;
    const scaledImageHeight = imageDimensions.height * newScale;

    // Calculate boundaries
    let minX = containerDimensions.width - scaledImageWidth;
    let minY = containerDimensions.height - scaledImageHeight;
    
    // If image is smaller than container, center it
    if (scaledImageWidth < containerDimensions.width) {
      minX = (containerDimensions.width - scaledImageWidth) / 2;
    } else {
      minX = Math.min(0, minX);
    }

    if (scaledImageHeight < containerDimensions.height) {
      minY = (containerDimensions.height - scaledImageHeight) / 2;
    } else {
      minY = Math.min(0, minY);
    }

    // Maximum positions are 0 or the centering offset
    const maxX = scaledImageWidth < containerDimensions.width ? minX : 0;
    const maxY = scaledImageHeight < containerDimensions.height ? minY : 0;

    return {
      x: Math.max(minX, Math.min(maxX, pos.x)),
      y: Math.max(minY, Math.min(maxY, pos.y))
    };
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
      }
      
      return newScale;
    });
  }, [position, constrainPosition]);

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
      }
      
      return newScale;
    });
  }, [position, constrainPosition]);

  // Handle reset
  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    toast.info("Vaizdas atstatytas į pradinę padėtį");
  }, []);

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
