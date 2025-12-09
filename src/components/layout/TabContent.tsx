
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
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-display text-gradient-static">
                  Apie Bridvaišio ežerą
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    Bridvaišio ežeras yra vienas iš Lietuvos gamtos turtų, esantis vakarinėje 
                    šalies dalyje. Garsėjantis skaidriu vandeniu ir įvairiu povandeniniu 
                    kraštovaizdžiu, jis tapo populiaria vieta nardytojams ir gamtos mylėtojams.
                  </p>
                  <p>
                    Ežero maksimalus gylis siekia apie 42 metrus, dėl to jis yra vienas iš 
                    giliausių ežerų regione. Po vandeniu esančios ypatybės apima stačius nuolydžius, 
                    įdomias geologines formacijas ir įvairią vandens gyvūniją.
                  </p>
                </div>
                <div>
                  <Button 
                    className="glass-button-primary"
                    onClick={() => window.open("https://lt.wikipedia.org/wiki/Bridvaišis", "_blank")}
                  >
                    Skaityti daugiau Vikipedijoje
                  </Button>
                </div>
              </div>
              
              <div className="relative h-[300px] md:h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/10 shadow-glass">
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
          <CardContent className="pt-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-display text-gradient-static mb-4">Momentai</h2>
              <p className="text-foreground/70 max-w-2xl">
                Žemiau pateikti momentai rodo Bridvaišio ežero povandeninius 
                kontūrus, gylio linijas ir nardymo maršrutus. Paspauskite ant paveikslėlių, 
                kad juos padidintumėte.
              </p>
            </div>
            <ImageGallery />
          </CardContent>
        </Card>
      );
    
    case "videos":
      return (
        <Card>
          <CardContent className="pt-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-display text-gradient-static mb-4">Nardymo vaizdo įrašai</h2>
              <p className="text-foreground/70 max-w-2xl">
                Tyrinėkite Bridvaišio ežerą per šiuos povandeninius nardymo vaizdo įrašus. 
                Jie demonstruoja ežero krištolinio vandens skaidrumą, povandeninius bruožus 
                ir nardymo maršrutus.
              </p>
            </div>
            <VideoGallery />
          </CardContent>
        </Card>
      );
    
    case "diving-texts":
      return (
        <Card>
          <CardContent className="pt-8 text-left">
            <DivingTexts />
          </CardContent>
        </Card>
      );
    
    case "bathymetry":
      return (
        <Card>
          <CardContent className="pt-8">
            <BathymetryViewer />
          </CardContent>
        </Card>
      );
    
    default:
      return null;
  }
};

export default TabContent;
