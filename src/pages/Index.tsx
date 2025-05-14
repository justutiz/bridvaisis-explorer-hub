import React, { useState, useEffect, useRef } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ImageGallery from "@/components/ImageGallery";
import VideoGallery from "@/components/VideoGallery";
import SuggestionForm from "@/components/SuggestionForm";
import { Menu, X, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Mouse tracking animation for the header
  useEffect(() => {
    if (!headerRef.current || isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const bubbles = headerRef.current?.querySelectorAll('.bubble');
      if (!bubbles) return;
      
      const rect = headerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      bubbles.forEach((bubble, index) => {
        const el = bubble as HTMLElement;
        const speed = index * 0.03 + 0.05;
        const offsetX = (mouseX - rect.width / 2) * speed;
        const offsetY = (mouseY - rect.height / 2) * speed;
        
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };
    
    headerRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      headerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  useEffect(() => {
    // Reset menu when screen size changes
    if (!isMobile && menuOpen) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lake-blue-50 to-lake-teal-100">
      {/* Hero Section with mouse tracking bubbles */}
      <div 
        ref={headerRef}
        className="relative h-[40vh] md:h-[50vh] bg-cover bg-center overflow-hidden" 
        style={{ backgroundImage: "url('/lovable-uploads/96099880-b1ae-494a-bce4-eb7fce874564.png')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          {/* Diving bubbles that follow the mouse */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`bubble absolute rounded-full bg-white bg-opacity-${20 + i * 10} animate-float-${i % 4 + 1}`}
              style={{
                width: `${10 + i * 5}px`,
                height: `${10 + i * 5}px`,
                left: `${10 + (i * 12)}%`,
                top: `${30 + (i % 4) * 15}%`,
              }}
            />
          ))}
          <div className="text-center text-white p-4 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 animate-fade-in">Bridvaišio ežeras</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto animate-fade-in animation-delay-300">
              Gražus Lietuvos ežeras žinomas dėl išskirtinių nardymo vietų ir gamtos grožio
            </p>
          </div>
        </div>
      </div>

      {/* Mobile menu toggle - updated to match site style */}
      {isMobile && (
        <div className="sticky top-0 z-20 bg-lake-blue-800 text-white py-3 px-4 flex justify-between items-center shadow-lg">
          <h2 className="font-semibold">Bridvaišio ežeras</h2>
          <Button 
            variant="ghost" 
            className="text-white p-1 hover:bg-white/10 rounded-full" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meniu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Mobile menu overlay - updated to match site style */}
        {isMobile && menuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-30 transition-all duration-300" 
            onClick={() => setMenuOpen(false)}
          >
            <div 
              className="w-full md:w-3/4 h-auto max-h-[80vh] rounded-b-lg bg-lake-blue-800 text-white shadow-lg transform transition-transform duration-300 overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-white/20">
                <h3 className="text-xl font-bold">Navigacija</h3>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 p-1 rounded-full transition-all"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Uždaryti meniu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="p-4">
                <div className="flex flex-col space-y-1">
                  {[
                    { id: "about", label: "Apie" },
                    { id: "photos", label: "Batimetrijos žemėlapiai" },
                    { id: "videos", label: "Nardymo video" },
                    { id: "contribute", label: "Prisidėti" }
                  ].map((tab) => (
                    <button 
                      key={tab.id} 
                      className={`flex items-center justify-between p-3 border-b border-white/10 ${
                        activeTab === tab.id 
                          ? 'bg-white/10 font-medium' 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMenuOpen(false);
                      }}
                    >
                      <span>{tab.label}</span>
                      {activeTab === tab.id && (
                        <div className="w-2 h-2 rounded-full bg-lake-teal-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop tabs */}
        <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className={`w-full ${isMobile ? 'hidden' : 'block'}`}>
          <TabsList className="grid w-full grid-cols-4 mb-8 animate-fade-in">
            <TabsTrigger value="about">Apie</TabsTrigger>
            <TabsTrigger value="photos">Batimetrijos žemėlapiai</TabsTrigger>
            <TabsTrigger value="videos">Nardymo video</TabsTrigger>
            <TabsTrigger value="contribute">Prisidėti</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-6 animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 animate-slide-in">Apie Bridvaišio ežerą</h2>
                    <p className="mb-4 animate-slide-in animation-delay-200">
                      Bridvaišio ežeras yra vienas iš Lietuvos gamtos turtų, esantis vakarinėje 
                      šalies dalyje. Garsėjantis skaidriu vandeniu ir įvairiu povandeniniu 
                      kraštovaizdžiu, jis tapo populiaria vieta nardytojams ir gamtos mylėtojams.
                    </p>
                    <p className="mb-4 animate-slide-in animation-delay-300">
                      Ežero maksimalus gylis siekia apie 42 metrus, dėl to jis yra vienas iš 
                      giliausių ežerų regione. Po vandeniu esančios ypatybės apima stačius nuolydžius, 
                      įdomias geologines formacijas ir įvairią vandens gyvūniją.
                    </p>
                    <div className="mb-6 animate-slide-in animation-delay-400">
                      <Button 
                        className="bg-lake-blue-600 hover:bg-lake-blue-700 text-white transition-all duration-300"
                        onClick={() => window.open("https://lt.wikipedia.org/wiki/Bridvaišis", "_blank")}
                      >
                        Skaityti daugiau Vikipedijoje
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative h-[300px] md:h-full min-h-[300px] rounded-lg overflow-hidden animate-scale-in">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2046.1004634699386!2d23.216317685191125!3d55.591421137041344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTXCsDM1JzM2LjAiTiAyM8KwMTMnMTcuMiJF!5e0!3m2!1slt!2slt!4v1747206582718!5m2!1slt!2slt" 
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
          </TabsContent>
          
          <TabsContent value="photos">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 animate-slide-in">Batimetrijos žemėlapiai</h2>
                <p className="mb-4 animate-slide-in animation-delay-200">
                  Žemiau pateikti batimetrijos žemėlapiai rodo Bridvaišio ežero povandeninius 
                  kontūrus, gylio linijas ir nardymo maršrutus. Paspauskite ant paveikslėlių, 
                  kad juos padidintumėte.
                </p>
                <ImageGallery />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videos">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 animate-slide-in">Nardymo vaizdo įrašai</h2>
                <p className="mb-4 animate-slide-in animation-delay-200">
                  Tyrinėkite Bridvaišio ežerą per šiuos povandeninius nardymo vaizdo įrašus. 
                  Jie demonstruoja ežero krištolinio vandens skaidrumą, povandeninius bruožus 
                  ir nardymo maršrutus.
                </p>
                <VideoGallery />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contribute">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 animate-slide-in">Prisidėkite prie šio puslapio</h2>
                <p className="mb-4 animate-slide-in animation-delay-200">
                  Turite pasiūlymų dėl patobulinimų, naujų vaizdo įrašų, nuotraukų ar informacijos 
                  apie Bridvaišio ežerą? Prašome užpildyti žemiau esančią formą ir prisidėti.
                </p>
                <SuggestionForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Mobile content */}
        {isMobile && (
          <div className="space-y-6 animate-fade-in">
            {activeTab === "about" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 animate-slide-in">Apie Bridvaišio ežerą</h2>
                      <p className="mb-4 animate-slide-in animation-delay-200">
                        Bridvaišio ežeras yra vienas iš Lietuvos gamtos turtų, esantis vakarinėje 
                        šalies dalyje. Garsėjantis skaidriu vandeniu ir įvairiu povandeniniu 
                        kraštovaizdžiu, jis tapo populiaria vieta nardytojams ir gamtos mylėtojams.
                      </p>
                      <p className="mb-4 animate-slide-in animation-delay-300">
                        Ežero maksimalus gylis siekia apie 42 metrus, dėl to jis yra vienas iš 
                        giliausių ežerų regione. Po vandeniu esančios ypatybės apima stačius nuolydžius, 
                        įdomias geologines formacijas ir įvairią vandens gyvūniją.
                      </p>
                      <div className="mb-6 animate-slide-in animation-delay-400">
                        <Button 
                          className="bg-lake-blue-600 hover:bg-lake-blue-700 text-white transition-all duration-300"
                          onClick={() => window.open("https://lt.wikipedia.org/wiki/Bridvaišis", "_blank")}
                        >
                          Skaityti daugiau Vikipedijoje
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative h-[300px] rounded-lg overflow-hidden animate-scale-in">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2046.1004634699386!2d23.216317685191125!3d55.591421137041344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTXCsDM1JzM2LjAiTiAyM8KwMTMnMTcuMiJF!5e0!3m2!1slt!2slt!4v1747206582718!5m2!1slt!2slt" 
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
            )}
            
            {activeTab === "photos" && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 animate-slide-in">Batimetrijos žemėlapiai</h2>
                  <p className="mb-4 animate-slide-in animation-delay-200">
                    Žemiau pateikti batimetrijos žemėlapiai rodo Bridvaišio ežero povandeninius 
                    kontūrus, gylio linijas ir nardymo maršrutus. Paspauskite ant paveikslėlių, 
                    kad juos padidintumėte.
                  </p>
                  <ImageGallery />
                </CardContent>
              </Card>
            )}
            
            {activeTab === "videos" && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 animate-slide-in">Nardymo vaizdo įrašai</h2>
                  <p className="mb-4 animate-slide-in animation-delay-200">
                    Tyrinėkite Bridvaišio ežerą per šiuos povandeninius nardymo vaizdo įrašus. 
                    Jie demonstruoja ežero krištolinio vandens skaidrumą, povandeninius bruožus 
                    ir nardymo maršrutus.
                  </p>
                  <VideoGallery />
                </CardContent>
              </Card>
            )}
            
            {activeTab === "contribute" && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6 animate-slide-in">Prisidėkite prie šio puslapio</h2>
                  <p className="mb-4 animate-slide-in animation-delay-200">
                    Turite pasiūlymų dėl patobulinimų, naujų vaizdo įrašų, nuotraukų ar informacijos 
                    apie Bridvaišio ežerą? Prašome užpildyti žemiau esančią formą ir prisidėti.
                  </p>
                  <SuggestionForm />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-lake-blue-800 text-white p-6 mt-12 animate-fade-in">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Bridvaišio ežero informacinis puslapis</p>
          <p className="text-sm mt-2">Šis puslapis skirtas dalintis informacija apie Bridvaišio ežerą ir nardymo patirtis jame.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
