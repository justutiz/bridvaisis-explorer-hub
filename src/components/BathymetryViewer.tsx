
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ZoomIn, ZoomOut, MoveHorizontal, RotateCcw, Download } from "lucide-react";

const BathymetryViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  
  // Handle loading state
  useEffect(() => {
    if (imageRef.current) {
      if (imageRef.current.complete) {
        setLoading(false);
      } else {
        imageRef.current.onload = () => setLoading(false);
      }
    }
    
    return () => {
      if (imageRef.current) {
        imageRef.current.onload = null;
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
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle touch start for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  // Handle touch move for mobile dragging
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  // Handle mouse up and touch end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Handle wheel zoom
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
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        )}
        <CardContent className="p-0 overflow-hidden">
          <div
            ref={containerRef}
            className="relative h-[70vh] md:h-[600px] overflow-hidden cursor-move touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            onWheel={handleWheel}
          >
            <div
              className={`absolute transform transition-none ${isDragging ? "" : "duration-100"}`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center",
              }}
            >
              <img
                ref={imageRef}
                src="/bridvaisis_bathymetry.png"
                alt="Bridvaišio ežero batimetrija"
                className="max-w-none"
              />
            </div>
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
