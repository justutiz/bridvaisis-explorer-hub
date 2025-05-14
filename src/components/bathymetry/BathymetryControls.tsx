
import React from "react";
import { Button } from "../ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";

interface BathymetryControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onDownload: () => void;
}

const BathymetryControls: React.FC<BathymetryControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onDownload,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        onClick={onZoomIn}
        className="flex items-center gap-1 bg-lake-blue-600 hover:bg-lake-blue-700"
      >
        <ZoomIn className="h-4 w-4 mr-1" />
        Priartinti
      </Button>
      <Button 
        onClick={onZoomOut}
        className="flex items-center gap-1 bg-lake-blue-600 hover:bg-lake-blue-700"
      >
        <ZoomOut className="h-4 w-4 mr-1" />
        Nutolinti
      </Button>
      <Button 
        onClick={onReset}
        variant="outline" 
        className="flex items-center gap-1"
      >
        <RotateCcw className="h-4 w-4 mr-1" />
        Atstatyti
      </Button>
      <Button 
        onClick={onDownload}
        variant="outline" 
        className="flex items-center gap-1 ml-auto"
      >
        <Download className="h-4 w-4 mr-1" />
        Atsisiųsti
      </Button>
    </div>
  );
};

export default BathymetryControls;
