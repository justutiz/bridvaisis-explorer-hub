
import React from "react";
import { Card, CardContent } from "../ui/card";
import BathymetryControls from "./BathymetryControls";
import BathymetryMap from "./BathymetryMap";
import BathymetryLoadingOverlay from "./BathymetryLoadingOverlay";
import { useBathymetryImage } from "@/hooks/useBathymetryImage";
import { useBathymetryControls } from "@/hooks/useBathymetryControls";
import { Button } from "../ui/button";

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
    setPosition, 
    zoomIn, 
    zoomOut, 
    resetView, 
    handleWheel, 
    handleDownload 
  } = useBathymetryControls();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Detali batimetrija</h2>
      <p className="mb-4">
        Interaktyvus Bridvaišio ežero batimetrijos žemėlapis. Naudokite valdiklius arba pelės ratuką priartinti/nutolinti, 
        tempkite paveikslą norėdami jį pastumti.
      </p>
      
      <BathymetryControls 
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetView}
        onDownload={handleDownload}
      />

      <Card className="overflow-hidden relative">
        <BathymetryLoadingOverlay 
          loading={loading} 
          loadProgress={loadProgress} 
          imageError={imageError}
          onRetry={retryLoading}
        />
        
        <CardContent className="p-0 overflow-hidden">
          <BathymetryMap
            loading={loading}
            imageError={imageError}
            scale={scale}
            position={position}
            onPositionChange={setPosition}
            onImageLoaded={() => {}}
            onImageError={() => {}}
            imageRef={imageRef}
          />
        </CardContent>
      </Card>
      
      <p className="text-sm text-muted-foreground mt-2">
        Naudokite pelės ratuką priartinimui/nutolinimui. Tempkite paveikslą norėdami naviguoti.
      </p>
    </div>
  );
};

export default BathymetryViewer;
