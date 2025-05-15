
import React from "react";
import { Card, CardContent } from "../ui/card";
import BathymetryControls from "./BathymetryControls";
import BathymetryMap from "./BathymetryMap";
import BathymetryLoadingOverlay from "./BathymetryLoadingOverlay";
import { useBathymetryImage } from "@/hooks/useBathymetryImage";
import { useBathymetryControls } from "@/hooks/useBathymetryControls";

const BathymetryViewer = () => {
  // Use custom hooks for functionality
  const { 
    imageRef, 
    loading, 
    loadProgress, 
    imageError, 
    retryLoading 
  } = useBathymetryImage();
  
  const { 
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
    handleScaleChange,
    updateContainerDimensions
  } = useBathymetryControls(imageRef);

  const handleImageLoaded = () => {
    // This is handled by the useBathymetryImage hook
  };

  const handleImageError = () => {
    // This is handled by the useBathymetryImage hook
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : 'space-y-6'}`}>
      {!isFullscreen && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gradient animate-pulse-glow">
            Detali batimetrija
          </h2>
          <p className="mb-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Interaktyvus Bridvaišio ežero batimetrijos žemėlapis. Naudokite valdiklius arba pelės ratuką priartinti/nutolinti, 
            tempkite paveikslą norėdami jį pastumti.
          </p>
        </div>
      )}
      
      <BathymetryControls 
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onReset={resetView}
        onDownload={handleDownload}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        scale={scale}
        onScaleChange={handleScaleChange}
      />

      <Card className={`neo-card overflow-hidden relative ${isFullscreen ? 'h-[calc(100%-80px)]' : 'h-[70vh]'} shadow-xl backdrop-blur-md bg-card/60 border-white/10`}>
        <BathymetryLoadingOverlay 
          loading={loading} 
          loadProgress={loadProgress} 
          imageError={imageError}
          onRetry={retryLoading}
        />
        
        <CardContent className="p-0 overflow-hidden h-full">
          <BathymetryMap
            loading={loading}
            imageError={imageError}
            scale={scale}
            position={position}
            onPositionChange={setPosition}
            onImageLoaded={handleImageLoaded}
            onImageError={handleImageError}
            imageRef={imageRef}
            isFullscreen={isFullscreen}
            onContainerResize={updateContainerDimensions}
            onWheel={handleWheel}
          />
        </CardContent>
      </Card>
      
      {!isFullscreen && (
        <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
          Naudokite pelės ratuką priartinimui/nutolinimui. Tempkite paveikslą norėdami naviguoti.
        </p>
      )}
    </div>
  );
};

export default BathymetryViewer;
