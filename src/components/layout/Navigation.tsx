
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from "./TabContent";
import { Link } from "react-router-dom";

interface NavigationProps {
  isLoaded: boolean;
  isMobile: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isLoaded, isMobile, activeTab, setActiveTab }) => {
  const handleTabChange = (value: string) => {
    // Track tab change event for analytics
    if (window.gtag) {
      window.gtag('event', 'menu_click', {
        'event_category': 'navigation',
        'event_label': value,
        'value': 1
      });
    }
    
    setActiveTab(value);
  };

  if (isMobile) {
    return (
      <div className={`space-y-6 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <TabContent activeTab={activeTab} />
      </div>
    );
  }

  return (
    <Tabs 
      defaultValue="about" 
      value={activeTab} 
      onValueChange={handleTabChange} 
      className={`w-full ${isMobile ? 'hidden' : 'block'} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
    >
      <TabsList className="grid w-full grid-cols-5 mb-8">
        <TabsTrigger value="about">Apie</TabsTrigger>
        <TabsTrigger value="photos">Momentai</TabsTrigger>
        <TabsTrigger value="videos">Nardymo video</TabsTrigger>
        <TabsTrigger value="diving-texts">Nardytojų įspūdžiai</TabsTrigger>
        <TabsTrigger value="bathymetry">Detali batimetrija</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about">
        <TabContent activeTab="about" />
      </TabsContent>
      
      <TabsContent value="photos">
        <TabContent activeTab="photos" />
      </TabsContent>
      
      <TabsContent value="videos">
        <TabContent activeTab="videos" />
      </TabsContent>
      
      <TabsContent value="diving-texts">
        <TabContent activeTab="diving-texts" />
      </TabsContent>

      <TabsContent value="bathymetry">
        <TabContent activeTab="bathymetry" />
      </TabsContent>
    </Tabs>
  );
};

export default Navigation;
