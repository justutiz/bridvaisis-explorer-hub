
import React, { useState } from "react";
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

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] md:h-[50vh] bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1280')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">Lake Bridvaišis</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              A beautiful Lithuanian lake known for its exceptional diving spots and natural beauty
            </p>
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="bg-white text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                onClick={() => setActiveTab("about")}
              >
                Explore The Lake
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="photos">Bathymetry Maps</TabsTrigger>
            <TabsTrigger value="videos">Diving Videos</TabsTrigger>
            <TabsTrigger value="contribute">Contribute</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About Lake Bridvaišis</h2>
                    <p className="mb-4">
                      Lake Bridvaišis is one of Lithuania's natural treasures, located in the 
                      western part of the country. Known for its clear water and diverse underwater
                      landscape, it has become a popular spot for divers and nature enthusiasts alike.
                    </p>
                    <p className="mb-4">
                      The lake has a maximum depth of approximately 42 meters, making it one of the 
                      deeper lakes in the region. Its underwater features include steep drops, 
                      interesting geological formations, and varied aquatic life.
                    </p>
                    <div className="mb-6">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => window.open("https://en.wikipedia.org/wiki/Lake_Bridvai%C5%A1is", "_blank")}
                      >
                        Read More on Wikipedia
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative h-[300px] md:h-full min-h-[300px] rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2046.1004634699386!2d23.216317685191125!3d55.591421137041344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTXCsDM1JzM2LjAiTiAyM8KwMTMnMTcuMiJF!5e0!3m2!1sen!2slt!4v1747206582718!5m2!1sen!2slt" 
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
                <h2 className="text-2xl font-bold mb-6">Bathymetry Maps</h2>
                <p className="mb-4">
                  The bathymetry maps below show the underwater topography of Lake Bridvaišis, 
                  including depth contours and diving routes. Click on images to enlarge.
                </p>
                <ImageGallery />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videos">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Diving Videos</h2>
                <p className="mb-4">
                  Explore Lake Bridvaišis through these underwater diving videos. They showcase
                  the lake's crystal clear waters, underwater features, and diving routes.
                </p>
                <VideoGallery />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contribute">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Contribute to This Page</h2>
                <p className="mb-4">
                  Have suggestions for improvement, new videos, photos or information about 
                  Lake Bridvaišis? Please fill out the form below to contribute.
                </p>
                <SuggestionForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Lake Bridvaišis Information Page</p>
          <p className="text-sm mt-2">This site is dedicated to sharing information about Lake Bridvaišis and its diving experiences.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
