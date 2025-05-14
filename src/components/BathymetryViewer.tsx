
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ZoomIn, ZoomOut, MoveHorizontal, RotateCcw, Download } from "lucide-react";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { AspectRatio } from "./ui/aspect-ratio";
import { toast } from "sonner";

const BathymetryViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  // Preload image with progress tracking
  useEffect(() => {
    setLoading(true);
    setImageError(false);
    setLoadProgress(0);
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/bridvaisis_bathymetry.png', true);
    xhr.responseType = 'arraybuffer';
    
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setLoadProgress(percentComplete);
        
        // When we reach 100%, prepare for transition
        if (percentComplete === 100) {
          // Small delay to show the completed progress before hiding the loader
          setTimeout(() => {
            if (imageRef.current) {
              imageRef.current.onload = () => {
                setLoading(false);
                toast.success("Batimetrijos žemėlapis sėkmingai užkrautas");
              };
            }
          }, 500); // Show the completed progress for 500ms
        }
      }
    };
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Convert array buffer to base64 string
        const uInt8Array = new Uint8Array(xhr.response);
        let binaryString = '';
        for (let i = 0; i < uInt8Array.length; i++) {
          binaryString += String.fromCharCode(uInt8Array[i]);
        }
        
        // Create blob URL from the image data
        const blob = new Blob([xhr.response], {type: 'image/png'});
        const blobUrl = URL.createObjectURL(blob);
        
        // Set the image source to the blob URL
        if (imageRef.current) {
          imageRef.current.src = blobUrl;
          
          // The onload handler is now set in the onprogress event
          // when it reaches 100%
          
          imageRef.current.onerror = () => {
            setImageError(true);
            setLoading(false);
            toast.error("Nepavyko užkrauti batimetrijos žemėlapio");
          };
        }
      } else {
        setImageError(true);
        setLoading(false);
        toast.error("Nepavyko užkrauti batimetrijos žemėlapio");
      }
    };
    
    xhr.onerror = function() {
      setImageError(true);
      setLoading(false);
      toast.error("Nepavyko užkrauti batimetrijos žemėlapio");
    };
    
    xhr.send();
    
    // Cleanup
    return () => {
      xhr.abort();
      if (imageRef.current) {
        imageRef.current.onload = null;
        imageRef.current.onerror = null;
      }
    };
  }, []);
  
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
    
    setPosition({
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
    
    setPosition({
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

  // Add passive event listeners to improve scroll performance
  useEffect(() => {
    const currentContainer = containerRef.current;
    
    // Clean up function
    return () => {
      if (currentContainer) {
        // Remove any lingering event listeners if necessary
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Detali batimetrija</h2>
      <p className="mb-4">
        Interaktyvus Bridvaišio ežero batimetrijos žemėlapis. Naudokite valdiklius arba pelės ratuką priartinti/nutolinti, 
        tempkite paveikslą norėdami jį pastumti.
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          onClick={zoomIn}
          className="flex items-center gap-1 bg-lake-blue-600 hover:bg-lake-blue-700"
        >
          <ZoomIn className="h-4 w-4 mr-1" />
          Priartinti
        </Button>
        <Button 
          onClick={zoomOut}
          className="flex items-center gap-1 bg-lake-blue-600 hover:bg-lake-blue-700"
        >
          <ZoomOut className="h-4 w-4 mr-1" />
          Nutolinti
        </Button>
        <Button 
          onClick={resetView}
          variant="outline" 
          className="flex items-center gap-1"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Atstatyti
        </Button>
        <Button 
          onClick={handleDownload}
          variant="outline" 
          className="flex items-center gap-1 ml-auto"
        >
          <Download className="h-4 w-4 mr-1" />
          Atsisiųsti
        </Button>
      </div>

      <Card className="overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 z-10 bg-background/80 flex flex-col items-center justify-center transition-opacity duration-300">
            <div className="w-full max-w-md px-4 space-y-4">
              <Skeleton className={`h-12 w-12 rounded-full mx-auto ${loadProgress === 100 ? 'animate-ping' : ''}`} />
              <div className="space-y-2">
                <h3 className="text-center font-medium">
                  {loadProgress < 100 ? 'Kraunamas batimetrijos žemėlapis' : 'Apdorojamas žemėlapis...'}
                </h3>
                <Progress value={loadProgress} className="w-full h-2" />
                <p className="text-center text-sm text-muted-foreground">
                  {loadProgress < 100 ? `${loadProgress}% užkrauta...` : 'Baigiama...'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 z-10 bg-background/80 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-destructive font-medium mb-2">Nepavyko užkrauti žemėlapio</p>
              <p className="text-sm text-muted-foreground mb-4">
                Bandykite perkrauti puslapį arba grįžkite vėliau
              </p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Bandyti dar kartą
              </Button>
            </div>
          </div>
        )}
        
        <CardContent className="p-0 overflow-hidden">
          <div
            ref={containerRef}
            className="relative h-[70vh] md:h-[600px] overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            onWheel={handleWheel}
          >
            {!loading && !imageError && (
              <div
                className={`absolute transform transition-none will-change-transform ${isDragging ? "transition-none" : "duration-100"}`}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: "center center",
                }}
              >
                <img
                  ref={imageRef}
                  alt="Bridvaišio ežero batimetrija"
                  className="max-w-none"
                  style={{
                    visibility: loading ? 'hidden' : 'visible',
                    userSelect: 'none', // Prevent text selection during drag
                    // Fix: Using a valid CSS property name with string type
                    WebkitUserSelect: 'none', // Use WebkitUserSelect instead of WebkitUserDrag
                  }}
                  draggable="false" // Prevent native image dragging
                  onDragStart={(e) => e.preventDefault()} // Extra safety for image drag prevention
                />
              </div>
            )}

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
        </CardContent>
      </Card>
      
      <p className="text-sm text-muted-foreground mt-2">
        Naudokite pelės ratuką priartinimui/nutolinimui. Tempkite paveikslą norėdami naviguoti.
      </p>
    </div>
  );
};

export default BathymetryViewer;
