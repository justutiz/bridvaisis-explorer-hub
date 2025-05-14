
import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

// Layout components
import Header from "@/components/layout/Header";
import MobileMenu from "@/components/layout/MobileMenu";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-lake-blue-50 to-lake-teal-100">
      {/* Hero Section with mouse tracking bubbles */}
      <Header isLoaded={isLoaded} bubblesRef={bubblesRef} />

      {/* Mobile menu toggle */}
      {isMobile && (
        <MobileMenu 
          isOpen={menuOpen} 
          toggleMenu={toggleMenu} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          closeMenu={closeMenu} 
        />
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Navigation 
          isLoaded={isLoaded} 
          isMobile={isMobile} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
      
      {/* Footer */}
      <Footer isLoaded={isLoaded} />
    </div>
  );
};

export default Index;
