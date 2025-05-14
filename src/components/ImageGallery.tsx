
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    {
      id: 1,
      src: "/lovable-uploads/26234cb5-daf8-4d19-9f18-72129d5dc1bd.png",
      alt: "Bridvaišio ežero nardymo žemėlapis ir batimetrija",
      description: "Detalus batimetrinis žemėlapis, rodantis nardymo maršrutus ir gylio kontūrus"
    },
    {
      id: 2, 
      src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      alt: "Bridvaišio ežero povandeninis kraštovaizdis",
      description: "Upė, apsupta uolų formacijų Bridvaišio ežere"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Bridvaišio ežero gyvūnija",
      description: "Gyvūnija netoli Bridvaišio ežero"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-zoom-in overflow-hidden rounded-md">
                <AspectRatio ratio={4/3}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Spustelkite, kad padidintumėte
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 overflow-hidden">
              <div className="relative w-full h-full overflow-auto">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                  <p>{image.description}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <p className="mt-2 text-sm text-gray-600">{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
