
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
