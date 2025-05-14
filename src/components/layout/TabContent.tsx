
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageGallery from "@/components/ImageGallery";
import VideoGallery from "@/components/VideoGallery";
import DivingTexts from "@/pages/DivingTexts";
import BathymetryViewer from "@/components/BathymetryViewer";

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  switch (activeTab) {
    case "about":
      return (
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Apie Bridvaišio ežerą</h2>
                <p className="mb-4">
                  Bridvaišio ežeras yra vienas iš Lietuvos gamtos turtų, esantis vakarinėje 
                  šalies dalyje. Garsėjantis skaidriu vandeniu ir įvairiu povandeniniu 
                  kraštovaizdžiu, jis tapo populiaria vieta nardytojams ir gamtos mylėtojams.
                </p>
                <p className="mb-4">
                  Ežero maksimalus gylis siekia apie 42 metrus, dėl to jis yra vienas iš 
                  giliausių ežerų regione. Po vandeniu esančios ypatybės apima stačius nuolydžius, 
                  įdomias geologines formacijas ir įvairią vandens gyvūniją.
                </p>
                <div className="mb-6">
                  <Button 
                    className="bg-lake-blue-600 hover:bg-lake-blue-700 text-white transition-all duration-300"
                    onClick={() => window.open("https://lt.wikipedia.org/wiki/Bridvaišis", "_blank")}
                  >
                    Skaityti daugiau Vikipedijoje
                  </Button>
                </div>
              </div>
              
              <div className="relative h-[300px] md:h-full min-h-[300px] rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d9509.850262103346!2d23.21526926028054!3d55.591421137041344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTXCsDM1JzM2LjAiTiAyM8KwMTMnMTcuMiJF!5e1!3m2!1slt!2slt!4v1747206582718!5m2!1slt!2slt" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    
    case "photos":
      return (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6">Momentai</h2>
            <p className="mb-4">
              Žemiau pateikti momentai rodo Bridvaišio ežero povandeninius 
              kontūrus, gylio linijas ir nardymo maršrutus. Paspauskite ant paveikslėlių, 
              kad juos padidintumėte.
            </p>
            <ImageGallery />
          </CardContent>
        </Card>
      );
    
    case "videos":
      return (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6">Nardymo vaizdo įrašai</h2>
            <p className="mb-4">
              Tyrinėkite Bridvaišio ežerą per šiuos povandeninius nardymo vaizdo įrašus. 
              Jie demonstruoja ežero krištolinio vandens skaidrumą, povandeninius bruožus 
              ir nardymo maršrutus.
            </p>
            <VideoGallery />
          </CardContent>
        </Card>
      );
    
    case "diving-texts":
      return (
        <Card>
          <CardContent className="pt-6">
            <DivingTexts />
          </CardContent>
        </Card>
      );
    
    case "bathymetry":
      return (
        <Card>
          <CardContent className="pt-6">
            <BathymetryViewer />
          </CardContent>
        </Card>
      );
    
    default:
      return null;
  }
};

export default TabContent;
