
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    {
      id: 1,
      src: "/lovable-uploads/26234cb5-daf8-4d19-9f18-72129d5dc1bd.png",
      alt: "Bridvaišio ežero nardymo žemėlapis ir momentai",
      description: "Detalus momentų žemėlapis, rodantis nardymo maršrutus ir gylio kontūrus"
    },
    {
      id: 2, 
      src: "/lovable-uploads/cfd67dc6-0125-4fd6-8cb6-91d7d208269e.png",
      alt: "Povandeninės kėdės Bridvaišio ežere",
      description: "Povandeninės kėdės ir objektai ant ežero dugno"
    },
    {
      id: 3,
      src: "/lovable-uploads/73a9e4ef-aa8e-4700-996d-1c92c2c6a8b9.png",
      alt: "Senovinis ratas Bridvaišio ežere",
      description: "Povandeninis archeologinis radinys - senovinis medinis ratas"
    },
    {
      id: 4,
      src: "/lovable-uploads/17ae0b68-a6ef-4239-b429-79ac419a07b2.png",
      alt: "Povandeninis gyvūnas Bridvaišio ežere",
      description: "Ežero fauna apšviesta nardytojo prožektoriumi"
    },
    {
      id: 5,
      src: "/lovable-uploads/f6a6302d-28a9-445f-98c4-a2d685311fc4.png",
      alt: "Povandeninis kompiuteris Bridvaišio ežere",
      description: "Neįprastas radinys - senovinis kompiuteris po vandeniu"
    },
    {
      id: 6,
      src: "/lovable-uploads/579660c0-a3d6-4aaf-acb5-b45a65dd5063.png",
      alt: "Bridvaišio ežero žuvis",
      description: "Ežero žuvis tarp povandeninių uolų ir augalijos"
    },
    {
      id: 7,
      src: "/lovable-uploads/24901f23-4164-47be-9b91-00da2abb38dc.png",
      alt: "Povandeninė būtybė Bridvaišio ežere",
      description: "Paslaptinga povandeninė būtybė aptikta tyrinėjant ežero gelmes"
    },
    {
      id: 8,
      src: "/lovable-uploads/0f304de0-4ad7-4dbc-b105-cef82c2e9a89.png",
      alt: "Paskendusi valtis Bridvaišio ežere",
      description: "Sena medinė valtis ežero dugne, apšviesta povandeninio prožektoriaus"
    },
    {
      id: 9,
      src: "/lovable-uploads/cbce118e-f0ca-4709-93e0-a1647693eae9.png",
      alt: "Žieminis Bridvaišio ežeras",
      description: "Užšalęs ežeras žiemos metu su nardytojais pralaužtoje eketėje"
    },
    {
      id: 10,
      src: "/lovable-uploads/8d86d055-7d0c-46f1-aa39-14e2dc883ed0.png",
      alt: "Nardytojai Bridvaišio ežere iš paukščio skrydžio",
      description: "Oro vaizdas su trimis nardytojais seklioje ežero pakrantėje"
    },
    {
      id: 11,
      src: "/lovable-uploads/0a97cfc6-1b48-4d99-8c15-c6a6596cb359.png",
      alt: "Bridvaišio ežero informacinis stendas",
      description: "Informatyvus stendas su ežero aprašymu, žemėlapiu ir bioįvairove"
    },
    {
      id: 12,
      src: "/lovable-uploads/dae13423-b788-42be-894f-cb603b4689f6.png",
      alt: "Bridvaišio ežero aprašas",
      description: "Detalus ežero istorijos ir biologinės įvairovės aprašymas"
    },
    {
      id: 13,
      src: "/lovable-uploads/bfdc4145-70dc-486b-b79a-b237df96bc28.png",
      alt: "Ežero vėžiagyviai",
      description: "Bridvaišio ežere aptinkamų vėžiagyvių rūšys - plačiažnyplis vėžys ir keturspyglė šoniplauka"
    },
    {
      id: 14,
      src: "/lovable-uploads/ddf7bfc0-070a-48c0-adb2-4265225529f9.png",
      alt: "Ežero fauna - vijūnas",
      description: "Vijūnas (Misgurnus fossilis) - reta žuvis, aptinkama Bridvaišio ežere"
    },
    {
      id: 15,
      src: "/lovable-uploads/f8a55ea5-c870-4cc2-99e7-e4e14b3a0640.png",
      alt: "Bridvaišio ežeras istoriniame kontekste",
      description: "Istorinė ežero nuotrauka ir šiuolaikinė vėgėlė (Lota lota)"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Bridvaišio ežero nuotraukų galerija">
      {images.map((image) => (
        <article key={image.id} className="relative group">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-zoom-in overflow-hidden rounded-md" role="button" aria-label={`Atidaryti ${image.alt}`}>
                <AspectRatio ratio={4/3}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Spustelkite, kad padidintumėte
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-[95vw] p-0 overflow-hidden flex items-center justify-center">
              <DialogTitle className="sr-only">{image.alt}</DialogTitle>
              <div className="w-full h-full flex flex-col">
                <div className="relative flex-grow flex items-center justify-center bg-black overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-h-[80vh] w-auto h-auto object-contain"
                  />
                </div>
                <div className="bg-black bg-opacity-70 text-white p-4 w-full">
                  <p>{image.description}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <p className="mt-2 text-sm text-gray-600">{image.description}</p>
        </article>
      ))}
    </section>
  );
};

export default ImageGallery;
