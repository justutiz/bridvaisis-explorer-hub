
import { useState, useRef, useEffect } from 'react';
import { toast } from "sonner";

export const useBathymetryImage = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  const loadImage = () => {
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
      }
    };
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Convert array buffer to blob
        const blob = new Blob([xhr.response], {type: 'image/png'});
        const blobUrl = URL.createObjectURL(blob);
        
        // Set the image source to the blob URL
        if (imageRef.current) {
          // Clear any previous handlers
          imageRef.current.onload = null;
          imageRef.current.onerror = null;
          
          // Set new handlers
          imageRef.current.onload = () => {
            setLoading(false);
            toast.success("Batimetrijos žemėlapis sėkmingai užkrautas");
          };
          
          imageRef.current.onerror = () => {
            setImageError(true);
            setLoading(false);
            toast.error("Nepavyko užkrauti batimetrijos žemėlapio");
          };
          
          // Set the image source - this will trigger the onload event
          imageRef.current.src = blobUrl;
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
    
    return () => {
      xhr.abort();
      if (imageRef.current) {
        imageRef.current.onload = null;
        imageRef.current.onerror = null;
      }
    };
  };

  useEffect(() => {
    const cleanup = loadImage();
    return cleanup;
  }, []);
  
  const retryLoading = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
    }
    loadImage();
  };

  return {
    imageRef,
    loading,
    loadProgress,
    imageError,
    retryLoading
  };
};
