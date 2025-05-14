
import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";

// Layout components
import Header from "@/components/layout/Header";
import MobileMenu from "@/components/layout/MobileMenu";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  
  // Determine active tab from URL path
  const getTabFromPath = () => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path === "") return "about"; // Default to about for root path
    return path;
  };
  
  const [activeTab, setActiveTab] = useState(getTabFromPath());
  
  // Update activeTab when URL changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);
  
  // Add a small delay before showing animations to prevent flickering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset menu when screen size changes
    if (!isMobile && menuOpen) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  
  // Handle tab change with URL navigation
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(tab === "about" ? "/" : `/${tab}`);
  };

  // Structured data for JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LakeBodyOfWater",
    "name": "Bridvaišio ežeras",
    "description": "Gražus Lietuvos ežeras žinomas dėl išskirtinių nardymo vietų ir gamtos grožio",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.593333",
      "longitude": "23.221389"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Maksimalus gylis",
        "value": "42 m"
      }
    ],
    "image": "/lovable-uploads/96099880-b1ae-494a-bce4-eb7fce874564.png",
    "url": "https://bridvaisis.lt/"
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-lake-blue-50 to-lake-teal-100">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <title>{activeTab === "about" ? "Bridvaišio ežeras - Informacija" : 
                activeTab === "photos" ? "Bridvaišio ežeras - Momentai" :
                activeTab === "videos" ? "Bridvaišio ežeras - Nardymo video" :
                activeTab === "diving-texts" ? "Bridvaišio ežeras - Nardytojų įspūdžiai" :
                "Bridvaišio ežeras - Detali batimetrija"}
        </title>
        <meta name="description" content={
          activeTab === "about" ? "Susipažinkite su Bridvaišio ežeru - vienu iš gražiausių Lietuvos ežerų, tinkančiu nardymui ir poilsiui gamtoje." :
          activeTab === "photos" ? "Bridvaišio ežero vaizdai, momentai ir nardymo žemėlapiai - pamatykite ežero grožį nuotraukose." :
          activeTab === "videos" ? "Bridvaišio ežero nardymo video medžiaga - pamatykite ką nardytojai atranda po vandeniu." :
          activeTab === "diving-texts" ? "Skaitykite nardytojų įspūdžius ir patirtis Bridvaišio ežere." :
          "Detali Bridvaišio ežero batimetrija - interaktyvus gylio žemėlapis nardytojams ir žvejams."
        } />
      </Helmet>

      {/* Hero Section with mouse tracking bubbles */}
      <Header isLoaded={isLoaded} bubblesRef={bubblesRef} />

      {/* Mobile menu toggle */}
      {isMobile && (
        <MobileMenu 
          isOpen={menuOpen} 
          toggleMenu={toggleMenu} 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          closeMenu={closeMenu} 
        />
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <Navigation 
          isLoaded={isLoaded} 
          isMobile={isMobile} 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
        />
      </section>
      
      {/* Footer */}
      <Footer isLoaded={isLoaded} />
    </main>
  );
};

export default Index;
