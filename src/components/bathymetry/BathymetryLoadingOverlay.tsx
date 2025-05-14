
import React from "react";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";

interface BathymetryLoadingOverlayProps {
  loading: boolean;
  loadProgress: number;
  imageError: boolean;
  onRetry: () => void;
}

const BathymetryLoadingOverlay: React.FC<BathymetryLoadingOverlayProps> = ({
  loading,
  loadProgress,
  imageError,
  onRetry,
}) => {
  if (!loading && !imageError) return null;
  
  return (
    <>
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
            <button 
              onClick={onRetry} 
              className="px-4 py-2 bg-transparent border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Bandyti dar kartą
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BathymetryLoadingOverlay;
