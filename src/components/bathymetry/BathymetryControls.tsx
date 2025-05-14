
import React from "react";
import { Button } from "../ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Download, Maximize, Minimize } from "lucide-react";
import { Slider } from "../ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface BathymetryControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onDownload: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  scale: number;
  onScaleChange: (value: number[]) => void;
}

const BathymetryControls: React.FC<BathymetryControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onDownload,
  onToggleFullscreen,
  isFullscreen,
  scale,
  onScaleChange,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-wrap gap-2 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onReset}
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Atstatyti</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atstatyti pradinį vaizdą</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center gap-2 flex-1 px-2 max-w-xs">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onZoomOut}
                  size="sm"
                  className="flex items-center gap-1 bg-lake-blue-600 hover:bg-lake-blue-700"
                >
                  <ZoomOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Nutolinti</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Nutolinti vaizdą</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="hidden sm:flex items-center gap-2 flex-1">
            <span className="text-xs text-muted-foreground">0.3x</span>
            <Slider 
              value={[scale]}
              min={0.3}
              max={1.5}
              step={0.1}
              onValueChange={onScaleChange}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">1.5x</span>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onZoomIn}
                  size="sm"
                  className="flex items-center gap-1 bg-lake-blue-600 hover:bg-lake-blue-700"
                >
                  <ZoomIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Priartinti</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Priartinti vaizdą</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="ml-auto flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onToggleFullscreen}
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {isFullscreen ? (
                    <Minimize className="h-4 w-4" />
                  ) : (
                    <Maximize className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {isFullscreen ? "Išeiti" : "Pilnas ekranas"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? "Išeiti iš pilno ekrano" : "Pilnas ekranas"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onDownload}
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Atsisiųsti</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Atsisiųsti batimetrijos žemėlapį</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default BathymetryControls;
